## How to backup all data in mongodb database

docker exec -i <container_name> /usr/bin/mongodump --uri "mongodb://localhost:27017" --archive > ~/Desktop/mongodb.dump

## How to restore all data into mongodb database

docker exec -i dropbot-mongodb /usr/bin/mongorestore --uri "mongodb://localhost:27017" --archive < ~/Desktop/mongodb.dump