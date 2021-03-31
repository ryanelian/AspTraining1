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
    public class FakultasController : ControllerBase
    {
        // GET: api/<FakultasManagement>
        [HttpGet]
        public ActionResult<List<Fakultas>> Get()
        {
            var fakultass = new List<Fakultas>();

            fakultass.Add(new Fakultas
            {
                FakultasID = new Guid("365a094a-5314-428c-a438-1774bf2d09b1"),
                Name = "School of Computer Science"
            });
            fakultass.Add(new Fakultas
            {
                FakultasID = new Guid("e8d912cc-6ede-4e8b-b640-2886753221b7"),
                Name = "Faculty of Economics and Communication"
            });
            fakultass.Add(new Fakultas
            {
                FakultasID = new Guid("876e2459-8ab8-420b-b147-90036a55db10"),
                Name = "School of Design"
            });
            return fakultass;
        }
    }

    public class Fakultas
    {
        public Guid FakultasID { set; get; }

        public string Name { set; get; }
    }
}
