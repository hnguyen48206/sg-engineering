const fs = require("fs");
const path = require("path");
const dbPath = path.join(__dirname, "DBs/database.sqlite");
const { createConnection } = require("typeorm");
var orm_confis = require("../Configs/ormconfig.json");

async function db_initilization() {
  if (fs.existsSync(dbPath)) {
    orm_confis.synchronize = false;
  }
  try {
    global.db = await createConnection(orm_confis);
    console.log("Successfully connect to database");
    return Promise.resolve(true);
  } catch (error) {
    console.log("Fail to connect to database ", error);
    return Promise.reject(false);
  }
}

module.exports = db_initilization;
