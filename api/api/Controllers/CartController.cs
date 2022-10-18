using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

namespace api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CartController : ControllerBase
    {
        private readonly IMemoryCache memoryCache;
        const string CacheKey = "Cart";

        public CartController(IMemoryCache memoryCache)
        {
            this.memoryCache = memoryCache ?? throw new ArgumentNullException(nameof(memoryCache));
        }

        [HttpGet]
        public IEnumerable<CartItem> GetCart()
        {
            return GetCachedCart();
        }

        [HttpPut]
        public List<CartItem> Add([FromBody] int id)
        {
            if(id == 4)
            {
                throw new ArgumentException("What!");
            }

            var cart = GetCachedCart();
            var cartItem = cart.FirstOrDefault(f => f.Id == id);
            if (cartItem == null)
            {
                cart.Add(new CartItem { Id = id, Count = 1 });
            }
            else
            {
                cartItem.Count++;
            }
            SetCachedCart(cart);
            return cart;
        }

        [HttpDelete]
        public ActionResult Remove(int id)
        {
            var cart = GetCachedCart();
            var cartItem = cart.FirstOrDefault(f => f.Id == id);
            if (cartItem == null)
            {
                return NotFound();
            }
            else
            {
                if (cartItem.Count > 1)
                {
                    cartItem.Count --;
                }
                else
                {
                    cart.Remove(cartItem);
                }
            }
            SetCachedCart(cart);
            return Ok(cart);
        }

        private List<CartItem> GetCachedCart()
        {
            if (memoryCache.TryGetValue(CacheKey, out List<CartItem> items))
            {
                return items;
            }
            else
            {
                return new List<CartItem>();
            }
        }

        private void SetCachedCart(List<CartItem> items)
        {
            memoryCache.Set(CacheKey, items);
        }
    }

    public class CartItem
    {
        public int Id { get; set; }
        public int Count { get; set; }
    }
}
