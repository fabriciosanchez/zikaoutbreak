//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ZikaRESTAPIs.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Airports
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public string CityCode { get; set; }
        public string CityName { get; set; }
        public string CountryName { get; set; }
        public string CountryCode { get; set; }
        public string Timezone { get; set; }
        public string Lat { get; set; }
        public string Lon { get; set; }
        public Nullable<int> NumAirports { get; set; }
        public string City { get; set; }
        public Nullable<int> RiskLevel { get; set; }
        public int AirportID { get; set; }
    }
}