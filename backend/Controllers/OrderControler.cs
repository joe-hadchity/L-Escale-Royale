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

        [HttpPost("CreateOrder")]
        public IActionResult CreateOrder([FromBody] JsonElement jsonElement)
        {
            // Convert the JSON element to a JSON string
            string jsonString = jsonElement.GetRawText();

            // Parse the JSON string to a BsonDocument
            BsonDocument document = BsonDocument.Parse(jsonString);

            // Get the MongoDB collection (e.g., "Orders" instead of "User")
            var collection = _database.GetCollection<BsonDocument>("Orders");

            // Insert the document into the collection
            collection.InsertOne(document);

            // Optionally, return the inserted document's ID or success message
            return Ok(new { message = "Order created successfully", orderId = document["_id"].ToString() });
        }



        [HttpGet("PrintOrders")]
        public IActionResult PrintOrders()
        {
            // Get the MongoDB collection
            var collection = _database.GetCollection<BsonDocument>("Orders");

            // Retrieve all documents (orders) from the collection
            var orders = collection.Find(new BsonDocument()).ToList();

            // Loop through each order and print the order details and item descriptions to the console
            foreach (var order in orders)
            {
                Console.WriteLine($"Order ID: {order["_id"]}");
                Console.WriteLine($"Type: {order["type"]}");
                Console.WriteLine($"Status: {order["status"]}");
                Console.WriteLine("Items:");

                var items = order["items"].AsBsonArray;
                foreach (var item in items)
                {
                    Console.WriteLine($"\tItem Name: {item["ItemName"]}");
                    Console.WriteLine($"\tDescription: {item["Description"]}");
                    Console.WriteLine($"\tPrice: {item["price"]}");
                    Console.WriteLine();
                }
            }

            // Return a simple success message
            return Ok("Orders printed to console.");
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
