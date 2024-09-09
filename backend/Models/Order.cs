﻿using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.IdGenerators;

namespace backend.Models
{
    public class Order
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
     public  string Id { get; set; }
        public string type { get; set; }
        public string status { get; set; }

        public List<Item> items { get; set; }



    }
}
