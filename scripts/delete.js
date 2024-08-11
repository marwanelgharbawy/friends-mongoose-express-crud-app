const mongoose = require('mongoose');
const Friend = require('./models/friend');

const db = "friendsListDemo"
mongoose.connect(`mongodb://127.0.0.1:27017/${db}`) // Working in "friendsListDemo" database
    .then(() => {
        console.log(`Connected to ${db} database successfully :)`)
    })
    .catch((err) => {
        console.log("Error, failed to connect to Mongo :(", err)
    })

async function run() {
    try {
        // Delete all documents with superTrusted: true
        const deleteResult = await Friend.deleteMany({});
        console.log(`Deleted ${deleteResult.deletedCount} documents`);
    } catch (err) {
        console.error("Error occurred:", err);
    } finally {
        mongoose.connection.close(); // Close connection after operations
    }
}

run();