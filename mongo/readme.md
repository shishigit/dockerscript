# Mongo 分片集群

## Mongo 组件

## 第一次运行

**启动**

```text
docker-compose up -d
```

**初始化集群**

```sh
sh init.sh
```

等待集群初始化完毕（20秒），

**检查集群状态**

```
docker-compose exec router mongo
mongos> sh.status()

--- Sharding Status ---
  sharding version: {
	"_id" : 1,
	"minCompatibleVersion" : 5,
	"currentVersion" : 6,
	"clusterId" : ObjectId("5981df064c97b126d0e5aa0e")
}
  shards:
	{  "_id" : "shard01",  "host" : "shard01/shard01a:27017,shard01b:27017",  "state" : 1 }
	{  "_id" : "shard02",  "host" : "shard02/shard02a:27017,shard02b:27017",  "state" : 1 }
	{  "_id" : "shard03",  "host" : "shard03/shard03a:27017,shard03b:27017",  "state" : 1 }
  active mongoses:
	"3.4.6" : 1
 autosplit:
	Currently enabled: yes
  balancer:
	Currently enabled:  yes
	Currently running:  no
		Balancer lock taken at Wed Aug 02 2017 14:17:42 GMT+0000 (UTC) by ConfigServer:Balancer
	Failed balancer rounds in last 5 attempts:  0
	Migration Results for the last 24 hours:
		No recent migrations
  databases:
```

## 再次启动

不需要执行初始化脚本. 只执行 `docker-compose up` or `docker-compose up -d`

### 连接集群

```
docker-compose exec router mongo
```

### 重置集群

停止所有的容器，执行:

```
docker-compose rm
```