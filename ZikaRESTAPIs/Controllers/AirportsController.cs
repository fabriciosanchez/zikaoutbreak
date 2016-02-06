using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using ZikaRESTAPIs.Models;

namespace ZikaRESTAPI.Controllers
{
    public class AirportsController : ApiController
    {
        private AlertsDBEntities db = new AlertsDBEntities();

        // GET: api/Airports
        public IQueryable<Airports> GetAirports()
        {
            return db.Airports;
        }

        // GET: api/Airports/5
        [ResponseType(typeof(Airports))]
        public IHttpActionResult GetAirports(int id)
        {
            Airports airports = db.Airports.Find(id);
            if (airports == null)
            {
                return NotFound();
            }

            return Ok(airports);
        }

        // PUT: api/Airports/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAirports(int id, Airports airports)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != airports.AirportID)
            {
                return BadRequest();
            }

            db.Entry(airports).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AirportsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Airports
        [ResponseType(typeof(Airports))]
        public IHttpActionResult PostAirports(Airports airports)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Airports.Add(airports);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = airports.AirportID }, airports);
        }

        // DELETE: api/Airports/5
        [ResponseType(typeof(Airports))]
        public IHttpActionResult DeleteAirports(int id)
        {
            Airports airports = db.Airports.Find(id);
            if (airports == null)
            {
                return NotFound();
            }

            db.Airports.Remove(airports);
            db.SaveChanges();

            return Ok(airports);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AirportsExists(int id)
        {
            return db.Airports.Count(e => e.AirportID == id) > 0;
        }

        // GET: api/Airports/{airport_code}
        [ResponseType(typeof(Airports))]
        [HttpGet]
        public IHttpActionResult GetAirportRisk(string AirportCode)
        {
            var airport = (from a in db.Airports
                           where a.Code == AirportCode
                           select a).FirstOrDefault();

            if (airport == null)
            {
                return NotFound();
            }

            return Ok(airport);
        }
    }
}