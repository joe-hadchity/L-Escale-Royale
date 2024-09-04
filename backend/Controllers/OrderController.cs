using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;

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
            var collection = _database.GetCollection<BsonDocument>("Order");
            var documents = collection.Find(new BsonDocument()).ToList();

            // Convert documents to JSON
            var jsonResult = documents.Select(doc => doc.ToJson()).ToList();

            // Return the data as JSON
            return Json(jsonResult);
        }

        [HttpPost("GetCategories")]
        public IActionResult GetCateogories()
        {
            var collection = _database.GetCollection<BsonDocument>("Category");
            var documents = collection.Find(new BsonDocument()).ToList();

            // Convert documents to JSON
            var jsonResult = documents.Select(doc => doc.ToJson()).ToList();

            // Return the data as JSON
            return Json(jsonResult);
        }
    }
}
