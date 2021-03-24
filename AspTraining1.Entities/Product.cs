using System;
using System.Collections.Generic;

namespace AspTraining1.Entities
{
    public class Product
    {
        public Guid ProductID { set; get; }

        public string Name { set; get; }

        public decimal Price { set; get; }

        public ICollection<Cart> Carts { set; get; }
    }
}
