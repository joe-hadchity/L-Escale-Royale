using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using backend.Models;
using MongoDB.Bson;
using System.Diagnostics;
using System.Text.Json;
using Microsoft.AspNetCore.Identity.Data;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    public class OrderController : Controller
    {
        private readonly ILogger<OrderController> _logger;
        private readonly IMongoDatabase _database;

        public OrderController(ILogger<OrderController> logger, IMongoDatabase database)
        {
            _logger = logger;
            _database = database;
        }
   
        public IActionResult Index()
        {
            int x = 0;
            var collection = _database.GetCollection<BsonDocument>("Order");
            var documents = collection.Find(new BsonDocument()).ToList();

            // Convert documents to JSON
            var jsonResult = documents.Select(doc => doc.ToJson()).ToList();

            // Return the data as JSON
            return Json(jsonResult);
        }

        [HttpGet("GetOrdersinProcess")]
        public IActionResult GetOrdersinProcess()
        {
            var collection = _database.GetCollection<Order>("Order");

            // Find orders with status "Pending"
            var pendingOrders = collection.Find(order => order.status == "Pending").ToList();

            // Print the status of each pending order to the console
            foreach (var order in pendingOrders)
            {
                Console.WriteLine($"Order Status: {order.status}");
            }

            // Convert pending orders to JSON
            var jsonResult = pendingOrders.Select(order => JsonSerializer.Serialize(order)).ToList();

            // Return the data as JSON
            return Json(jsonResult);
        }



    }
}
