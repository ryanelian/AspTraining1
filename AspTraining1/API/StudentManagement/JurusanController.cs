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
    public class JurusanController : ControllerBase
    {
        // GET: api/<JurusanController>
        [HttpGet]
        public ActionResult<List<Jurusan>> Get(Guid fakultasID)
        {
            var jurusans = new List<Jurusan>();
            jurusans.Add(new Jurusan
            {
                JurusanID = new Guid("f61e3819-6d35-4266-b8fc-d63ed8ea529d"),
                Name = "Teknik Informatika",
                FakultasID = new Guid("365a094a-5314-428c-a438-1774bf2d09b1")
            });
            jurusans.Add(new Jurusan
            {
                JurusanID = new Guid("237a6255-0b3a-4727-bc82-5a393dcb4a66"),
                Name = "Sistem Informasi",
                FakultasID = new Guid("365a094a-5314-428c-a438-1774bf2d09b1")
            });
            jurusans.Add(new Jurusan
            {
                JurusanID = new Guid("8679d5a3-5049-4cac-a06c-d527a9e6d290"),
                Name = "Creativepreneurship",
                FakultasID = new Guid("e8d912cc-6ede-4e8b-b640-2886753221b7")
            });
            jurusans.Add(new Jurusan
            {
                JurusanID = new Guid("c9849a43-3c92-43c2-bf5f-4bd696650ae3"),
                Name = "Management",
                FakultasID = new Guid("e8d912cc-6ede-4e8b-b640-2886753221b7")
            });
            jurusans.Add(new Jurusan
            {
                JurusanID = new Guid("d190bf0c-f8be-4f6a-a927-d6a9c641990c"),
                Name = "Interior Design",
                FakultasID = new Guid("876e2459-8ab8-420b-b147-90036a55db10")
            });
            jurusans.Add(new Jurusan
            {
                JurusanID = new Guid("1ab29759-ce65-477e-9e18-0ae19cb9ecdc"),
                Name = "Visual Communication Design",
                FakultasID = new Guid("876e2459-8ab8-420b-b147-90036a55db10")
            });

            return jurusans.Where(Q => Q.FakultasID == fakultasID).ToList();
        }
    }

    public class Jurusan
    {
        public Guid JurusanID { set; get; }

        public string Name { set; get; }

        public Guid FakultasID { set; get; }
    }
}
