# TLDR

Tad's hacked technique

## Running the API and WORKER with docker compose

docker-compose up

## Running TEMPORAL with docker compose

docker-compose -f docker-compose-temporal.yml up

## Useful tips

- docker rm temporal-admin-tools temporal-ui temporal
- Running Temporal
```
cd deploy/dev/temporal
docker-compose -f docker-compose-temporal.yml up -d
```
- Running Mongo
```
cd deploy/dev/mongo
docker-compose -f docker-compose-mongo.yml up -d
```