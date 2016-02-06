﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace ZikaRESTAPIs
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "ApiWithActionName",
                routeTemplate: "api/{controller}/{action}/{AirportCode}",
                defaults: new { AirportCode = RouteParameter.Optional }
            );

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
