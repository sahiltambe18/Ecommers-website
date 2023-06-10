const mongodb = require('mongodb');
const dotenv=require("dotenv").config()

const MongoClient = mongodb.MongoClient;

// let mongodbUrl = 'mongodb://127.0.0.1:27017';


// if (process.env.MONGODB_URL) {
 let mongodbUrl = process.env.MONGODB_URL;
// }


console.log(mongodbUrl)
let database;

async function connectToDatabase() {
  const client = await MongoClient.connect(
    mongodbUrl
    );
    database = client.db('online-store');
}

function getDb() {
  if (!database) {
    throw { message: 'You must connect first!' };
  }
  return database;
}

module.exports = {
  connectToDatabase: connectToDatabase,
  getDb: getDb,
};
