using System;
using System.Collections.Generic;

namespace AspTraining1.Entities
{
    public class Customer
    {
        public Guid CustomerID { set; get; }

        public string Name { set; get; }

        public string Email { set; get; }

        public ICollection<Cart> Carts { set; get; }
    }
}
