using AspTraining1.API;
using AspTraining1.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AspTraining1.Services
{
    public class CartService
    {
        public CartService(ShopDbContext shopDbContext)
        {
            this.DB = shopDbContext;
        }

        public ShopDbContext DB { get; }

        internal async Task AddToCart(Guid customerID, Guid productID, int qty)
        {
            var cart = await DB.Carts
                .Where(Q => Q.CustomerID == customerID && Q.ProductID == productID)
                .FirstOrDefaultAsync();

            if (cart == null)
            {
                cart = new Cart
                {
                    CustomerID = customerID,
                    ProductID = productID,
                    Qty = 0
                };
                DB.Carts.Add(cart);
            }

            cart.Qty += qty;
            await DB.SaveChangesAsync();
        }

        internal Task<List<CartController.CartListItem>> GetCartForCustomer(Guid customerID)
        {
            return DB.Carts.AsNoTracking()
                .Where(Q => Q.CustomerID == customerID)
                .Select(Q => new CartController.CartListItem
                {
                    CartID = Q.CartID,
                    Price = Q.Product.Price,
                    ProductID = Q.ProductID,
                    ProductName = Q.Product.Name,
                    Qty = Q.Qty
                }).ToListAsync();
        }

        internal async Task UpdateCart(long cartID, int qty)
        {
            var cart = await DB.Carts
                .Where(Q => Q.CartID == cartID)
                .FirstOrDefaultAsync();

            cart.Qty = qty;
            await DB.SaveChangesAsync();
        }

        internal Task<bool> HasCustomerID(Guid customerID)
        {
            return DB.Customers.AsNoTracking()
                .Where(Q => Q.CustomerID == customerID)
                .AnyAsync();
        }

        internal Task<bool> HasProductID(Guid productID)
        {
            return DB.Products.AsNoTracking()
                .Where(Q => Q.ProductID == productID)
                .AnyAsync();
        }

        internal Task<bool> HasCartID(long cartID)
        {
            return DB.Carts.AsNoTracking()
                .Where(Q => Q.CartID == cartID)
                .AnyAsync();
        }

        internal async Task RemoveItemInCart(long cartID)
        {
            var cart = await DB.Carts
                .Where(Q => Q.CartID == cartID)
                .FirstOrDefaultAsync();

            DB.Carts.Remove(cart);
            await DB.SaveChangesAsync();
        }
    }
}
