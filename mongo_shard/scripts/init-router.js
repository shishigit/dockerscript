sh.addShard("shard01/shard01a:27017,shard01b:27017")

sh.addShard("shard02/shard02a:27017,shard02b:27017")

sh.addShard("shard03/shard03a:27017,shard03b:27017")

use admin

db.createUser(
    {
        user: "root",
        pwd: 'shishi',
        roles: ["root"]
    }
)