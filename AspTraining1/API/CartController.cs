using AspTraining1.Services;
using Microsoft.AspNetCore.Mvc;
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
    public class CartController : ControllerBase
    {
        public CartController(CartService cartService)
        {
            this.CartSvc = cartService;
        }

        public CartService CartSvc { get; }

        [HttpPost("read")]
        public async Task<ActionResult<List<CartListItem>>> ReadCart([FromBody] GetCartModel value)
        {
            if (ModelState.IsValid == false)
            {
                return BadRequest(ModelState);
            }

            return await CartSvc.GetCartForCustomer(value.CustomerID);
        }

        [HttpPost("add")]
        public async Task<ActionResult<bool>> AddToCart([FromBody] AddToCartModel value)
        {
            if (await CartSvc.HasCustomerID(value.CustomerID) == false)
            {
                ModelState.AddModelError("CustomerID", "Customer does not exists!");
            }

            if (await CartSvc.HasProductID(value.ProductID) == false)
            {
                ModelState.AddModelError("ProductID", "Product does not exists!");
            }

            if (ModelState.IsValid == false)
            {
                return BadRequest(ModelState);
            }

            await CartSvc.AddToCart(value.CustomerID, value.ProductID, value.Qty);
            return true;
        }

        [HttpPost("update")]
        public async Task<ActionResult<bool>> UpdateCart([FromBody] UpdateCartModel value)
        {
            if (await CartSvc.HasCartID(value.CartID) == false)
            {
                ModelState.AddModelError("CartID", "Item in cart does not exists!");
            }

            if (ModelState.IsValid == false)
            {
                return BadRequest(ModelState);
            }

            await CartSvc.UpdateCart(value.CartID, value.Qty);
            return true;
        }

        [HttpPost("remove")]
        public async Task<ActionResult<bool>> RemoveItemInCart([FromBody] RemoveItemInCartModel value)
        {
            if (await CartSvc.HasCartID(value.CartID) == false)
            {
                ModelState.AddModelError("CartID", "Item in cart does not exists!");
            }

            if (ModelState.IsValid == false)
            {
                return BadRequest(ModelState);
            }

            await CartSvc.RemoveItemInCart(value.CartID);
            return true;
        }

        #region Models
        public class GetCartModel
        {
            [Required]
            public Guid CustomerID { set; get; }
        }

        public class CartListItem
        {
            public long CartID { set; get; }

            public Guid ProductID { set; get; }

            public string ProductName { set; get; }

            public decimal Price { set; get; }

            public int Qty { set; get; }
        }

        public class AddToCartModel
        {
            [Required]
            public Guid CustomerID { set; get; }

            [Required]
            public Guid ProductID { set; get; }

            [Required]
            [Range(1, 1000)]
            public int Qty { set; get; }
        }

        public class UpdateCartModel
        {
            [Required]
            public long CartID { set; get; }

            [Required]
            [Range(1, 1000)]
            public int Qty { set; get; }
        }

        public class RemoveItemInCartModel
        {
            [Required]
            public long CartID { set; get; }
        }
        #endregion
    }
}
