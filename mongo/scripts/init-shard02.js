rs.initiate(
   {
      _id: "shard02",
      members: [
         { _id: 0, host: "shard02a:27017" },
         { _id: 1, host: "shard02b:27017" },
      ]
   }
)
