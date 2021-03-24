using AspTraining1.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AspTraining1.API
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        public ShopDbContext DB { get; }

        public class CustomerListItem
        {
            public Guid CustomerID { set; get; }

            public string Name { set; get; }

            public string Email { set; get; }
        }

        public CustomerController(ShopDbContext shopDbContext)
        {
            this.DB = shopDbContext;
        }

        // GET: api/<CustomerController>
        [HttpGet]
        public async Task<ActionResult<List<CustomerListItem>>> Get()
        {
            var data = await DB.Customers.AsNoTracking()
                .OrderBy(Q => Q.Name)
                .Select(Q => new CustomerListItem
                {
                    CustomerID = Q.CustomerID,
                    Email = Q.Email,
                    Name = Q.Name
                })
                .ToListAsync();

            return data;
        }

        // GET api/<CustomerController>/5
        [HttpGet("{id:Guid}")]
        public async Task<ActionResult<CustomerListItem>> Get(Guid id)
        {
            var data = await DB.Customers.AsNoTracking()
                .Where(Q => Q.CustomerID == id)
                .Select(Q => new CustomerListItem
                {
                    CustomerID = Q.CustomerID,
                    Email = Q.Email,
                    Name = Q.Name
                })
                .FirstOrDefaultAsync();

            if (data == null)
            {
                return NotFound();
            }

            return data;
        }

        public class CustomerCreateOrUpdateModel
        {
            [Required]
            [StringLength(256)]
            public string Name { set; get; }

            [Required]
            [StringLength(256)]
            public string Email { set; get; }
        }


        // POST api/<CustomerController>
        [HttpPost]
        public async Task<ActionResult<string>> Post([FromBody] CustomerCreateOrUpdateModel model)
        {
            if (ModelState.IsValid == false)
            {
                return BadRequest(ModelState);
            }

            var data = new Customer
            {
                CustomerID = Guid.NewGuid(),
                Name = model.Name,
                Email = model.Email
            };

            DB.Customers.Add(data);
            await DB.SaveChangesAsync();

            return $"Successfully created new customer: {data.Name}";
        }

        // PUT api/<CustomerController>/5
        [HttpPut("{id:Guid}")]
        public async Task<ActionResult<string>> Put(Guid id, [FromBody] CustomerCreateOrUpdateModel model)
        {
            var data = await DB.Customers
                .Where(Q => Q.CustomerID == id)
                .FirstOrDefaultAsync();

            if (data == null)
            {
                return NotFound();
            }

            if (ModelState.IsValid == false)
            {
                return BadRequest(ModelState);
            }

            data.Name = model.Name;
            data.Email = model.Email;
            await DB.SaveChangesAsync();

            return $"Successfully updated customer data: {data.Name}";
        }

        // DELETE api/<CustomerController>/5
        [HttpDelete("{id:Guid}")]
        public async Task<ActionResult<bool>> Delete(Guid id)
        {
            var data = await DB.Customers
                .Where(Q => Q.CustomerID == id)
                .FirstOrDefaultAsync();

            if (data == null)
            {
                return NotFound();
            }

            DB.Customers.Remove(data);
            await DB.SaveChangesAsync();
            return true;
        }
    }
}
