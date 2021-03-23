using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AspTraining1.Services
{
    public class MathService : IMathService
    {
        public int Add(int a, int b)
        {
            return a + b;
        }
    }
}
