﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AspTraining1.Entities
{
    public class ShopDbContext : DbContext
    {
        public ShopDbContext(DbContextOptions<ShopDbContext> options): base(options)
        {
        }

        public DbSet<Customer> Customers { set; get; }

        public DbSet<Product> Products { set; get; }

        public DbSet<Cart> Carts { set; get; }
    }
}
