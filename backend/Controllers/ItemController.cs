using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using backend.Models;
using MongoDB.Bson;
using System.Diagnostics;
using System.Text.Json;
using Microsoft.AspNetCore.Identity.Data;
namespace backend.Controllers
{
    public class ItemController : Controller
    {

        private readonly ILogger<ItemController> _logger;
        private readonly IMongoDatabase _database;

        public ItemController(ILogger<ItemController> logger, IMongoDatabase database)
        {
            _logger = logger;
            _database = database;
        }

        //start of cat

        [Route("api/[controller]")]
        public IActionResult Index()
        {
      
            var collection = _database.GetCollection<BsonDocument>("Category");
            var documents = collection.Find(new BsonDocument()).ToList();

            // Convert documents to JSON
            var jsonResult = documents.Select(doc => doc.ToJson()).ToList();

            // Return the data as JSON
            return Json(jsonResult);
        }

        public IActionResult Privacy()
        {
            return View();
        }


        // Create a new document
        [HttpPost("CreateCategory")]
        public IActionResult CreateCategory([FromBody] JsonElement jsonElement)
        {
            // Convert the JSON element to a JSON string
            string jsonString = jsonElement.GetRawText();

            // Parse the JSON string to a BsonDocument
            BsonDocument document = BsonDocument.Parse(jsonString);

            // Get the collection and insert the document
            var collection = _database.GetCollection<BsonDocument>("Category");
            collection.InsertOne(document);

            return Ok();
        }


        [HttpPut("UpdateCategory/{id}")]
        public IActionResult UpdateCategory(string id, [FromBody] JsonElement jsonElement)
        {
            // Convert the JSON element to a JSON string
            string jsonString = jsonElement.GetRawText();

            // Parse the JSON string to a BsonDocument
            BsonDocument document;
            try
            {
                document = BsonDocument.Parse(jsonString);
            }
            catch (Exception ex)
            {
                return BadRequest($"Invalid JSON format: {ex.Message}");
            }

            // Ensure id is a valid ObjectId
            if (!ObjectId.TryParse(id, out var objectId))
            {
                return BadRequest("Invalid ID format.");
            }

            // Get the collection and create the filter
            var collection = _database.GetCollection<BsonDocument>("Category");
            var filter = Builders<BsonDocument>.Filter.Eq("_id", objectId);

            // Replace the document
            var updateResult = collection.ReplaceOne(filter, document);

            if (updateResult.MatchedCount == 0)
            {
                return NotFound("Document not found.");
            }

            return Ok("Document updated successfully.");
        }


        [HttpDelete("DeleteCategory/{id}")]
        public IActionResult DeleteCategory(string id)
        {
            var collection = _database.GetCollection<BsonDocument>("Category");
            var filter = Builders<BsonDocument>.Filter.Eq("_id", new ObjectId(id));
            var deleteResult = collection.DeleteOne(filter);

            if (deleteResult.DeletedCount == 0)
            {
                return NotFound();
            }

            return Ok();
        }
        //end of cat


        //start of items
        [HttpPost("CreateItem")]
        public IActionResult CreateItem([FromBody] JsonElement jsonElement)
        {
            // Convert the JSON element to a JSON string
            string jsonString = jsonElement.GetRawText();

            // Parse the JSON string to a BsonDocument
            BsonDocument document = BsonDocument.Parse(jsonString);

            // Get the collection and insert the document
            var collection = _database.GetCollection<BsonDocument>("Item");
            collection.InsertOne(document);

            return Ok();
        }


        [HttpPut("UpdateItem/{id}")]
        public IActionResult UpdateItem(string id, [FromBody] JsonElement jsonElement)
        {
            // Convert the JSON element to a JSON string
            string jsonString = jsonElement.GetRawText();

            // Parse the JSON string to a BsonDocument
            BsonDocument document;
            try
            {
                document = BsonDocument.Parse(jsonString);
            }
            catch (Exception ex)
            {
                return BadRequest($"Invalid JSON format: {ex.Message}");
            }

            // Ensure id is a valid ObjectId
            if (!ObjectId.TryParse(id, out var objectId))
            {
                return BadRequest("Invalid ID format.");
            }

            // Get the collection and create the filter
            var collection = _database.GetCollection<BsonDocument>("Category");
            var filter = Builders<BsonDocument>.Filter.Eq("_id", objectId);

            // Replace the document
            var updateResult = collection.ReplaceOne(filter, document);

            if (updateResult.MatchedCount == 0)
            {
                return NotFound("Document not found.");
            }

            return Ok("Document updated successfully.");
        }

        [HttpDelete("GetItem/{id}")]

        public IActionResult GetItems()
        {

            var collection = _database.GetCollection<BsonDocument>("Item");
            var documents = collection.Find(new BsonDocument()).ToList();

            // Convert documents to JSON
            var jsonResult = documents.Select(doc => doc.ToJson()).ToList();

            // Return the data as JSON
            return Json(jsonResult);
        }

        [HttpDelete("DeleteItem/{id}")]
        public IActionResult DeleteItem(string id)
        {
            var collection = _database.GetCollection<BsonDocument>("Category");
            var filter = Builders<BsonDocument>.Filter.Eq("_id", new ObjectId(id));
            var deleteResult = collection.DeleteOne(filter);

            if (deleteResult.DeletedCount == 0)
            {
                return NotFound();
            }

            return Ok();
        }
    }
}
