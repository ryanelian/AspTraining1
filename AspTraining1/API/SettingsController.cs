using AspTraining1.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AspTraining1.API
{
    [Route("api/[controller]")]
    [ApiController]
    public class SettingsController : ControllerBase
    {
        public SettingsController(AppSettings appSettings)
        {
            this.Settings = appSettings;
        }

        public AppSettings Settings { get; }

        [Produces("application/json")]
        public string Get()
        {
            return Settings.CompanyName;
        }
    }
}
