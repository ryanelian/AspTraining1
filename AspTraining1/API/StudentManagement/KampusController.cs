using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AspTraining1.API.StudentManagement
{
    [Route("api/[controller]")]
    [ApiController]
    public class KampusController : ControllerBase
    {

        // GET: api/<KampusController>
        [HttpGet]
        public ActionResult<List<Kampus>> Get()
        {
            return new List<Kampus>
            {
                new Kampus
                {
                    KampusID = new Guid("60C815B5-8FB6-421D-8713-761AB3EB937F"),
                    Name = "BINUS Kemanggisan"
                },
                new Kampus
                {
                    KampusID = new Guid("A84DEA5D-85F2-416D-83B9-FDEFF9B36CD8"),
                    Name = "BINUS Alam Sutera"
                }
            };
        }
    }

    public class Kampus
    {
        public Guid KampusID { set; get; }

        public string Name { set; get; }
    }
}
