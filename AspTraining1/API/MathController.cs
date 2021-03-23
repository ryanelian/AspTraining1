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
    public class MathController : ControllerBase
    {
        public MathController(IMathService mathService)
        {
            this.MathSvc = mathService;
        }

        public IMathService MathSvc { get; }

        public int Get()
        {
            return MathSvc.Add(1, 2);
        }
    }
}
