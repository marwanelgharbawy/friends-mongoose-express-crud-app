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

const friends = [
    {
        name: 'Karo',
        date: 2015,
        note: 'i hate you'
    },
    {
        name: 'Taro',
        date: 2017,
        note: 'i kinda hate you'
    },
    {
        name: 'M',
        date: 1970,
        note: "you have no limits my dear"
    }
]

Friend.insertMany(friends)
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    })