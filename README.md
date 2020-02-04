## OnShop

OnShop is an internal shopping tool with real time inventory counts and a tracking system. The user will be able to purchase or rent an item when available.

Extend Later


### Development

#### Development with docker

Install and setup docker desktop. To have project running on local with docker will be created 2 containers

- create mysql dump for test database with all setup for wordpress
- ensure that all datetime fields has `1000-01-01 00:00:00` as minimal datetime value instead of `0000-00-00 00:00:00` or reconfigure your mysql docker to allow another datetime range
- put dump as `seeds.sql` in `./src/api/db-seeds/` dir
- add `_config.json` in `./src/api/` dir with structure:
```
{
  "dbhost": "db-onshop",
  "dbname": "<DB_NAME>",
  "dbusername": "<DB_USER_NAME>", // for dev use root
  "dbpassword": "<DB_PASSWORD>",
  "use-debug": false
}
```
- use the same creds in docker container env for db-onshop container in docker-compose.yml
- run `docker-compose up --build` in `./src/api/.docker` from project root dir
- if docker db setup done you will be able to see wp login page on `http://localhost:8202/wp-admin`