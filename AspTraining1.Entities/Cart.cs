using System;

namespace AspTraining1.Entities
{
    public class Cart
    {
        public long CartID { set; get; }

        public Guid CustomerID { set; get; }

        public Guid ProductID { set; get; }

        public Customer Customer { set; get; }

        public Product Product { set; get; }
    }
}
