const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let mongodbUrl = 'mongodb://127.0.0.1:27017';

const uri = "mongodb+srv://Sahil18:Sahil1167@cluster0.9asq33s.mongodb.net/?retryWrites=true&w=majority";

// if (process.env.MONGODB_URL) {
//   mongodbUrl = process.env.MONGODB_URL;
// }

let database;

async function connectToDatabase() {
  const client = await MongoClient.connect(
    uri
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
