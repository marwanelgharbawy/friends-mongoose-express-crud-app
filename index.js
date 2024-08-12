const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')

const Friend = require('./models/friend');

const db = "friendsListTest"
mongoose.connect(`mongodb://127.0.0.1:27017/${db}`) // Working in "friendsListTest" database
    .then(() => {
        console.log(`Connected to ${db} database successfully :)`)
    })
    .catch((err) => {
        console.log("Error, failed to connect to Mongo :(", err)
    })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

// Homepage
app.get('/', (req, res) => {
    res.render('home')
})

// Page for showing all friends
app.get('/friends', async (req, res) => {
    const friends = await Friend.find()
    res.render('friends/index', { friends })
})

// Page for adding a new friend
app.get('/friends/new', (req, res) => {
    res.render('friends/new')
})

// Post route to add a friend
app.post('/friends', async (req, res) => {
    console.log("New friend registered!")
    console.log(req.body)

    // Destructure the req.body object
    const { name, date, note } = req.body;

    // Create a new object for Mongoose
    const friendData = { name, date };

    // Add note if exists
    if (note) {
        friendData.note = note;
    }

    // Create a new Friend 
    const newFriend = new Friend(friendData);

    // Save the new friend to the database
    await newFriend.save();
    res.redirect(`/friends/${newFriend._id}`)
})

// Show a specific friend
app.get('/friends/:id', async (req, res) => {
    const { id } = req.params;
    const friend = await Friend.findById(id)
    res.render('friends/show', { friend })
})

// Modify data for a friend
app.get('/friends/:id/edit', async (req, res) => {
    const { id } = req.params;
    const friend = await Friend.findById(id);
    res.render('friends/edit', { friend })
})

// Put route for a modification
app.put('/friends/:id', async (req, res) => {
    const { id } = req.params;
    const friend = await Friend.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    console.log("A friend has been updated!")
    console.log(friend)
    res.redirect(`/friends/${friend._id}`);
})

// Delete route
app.delete('/friends/:id', async (req, res) => {
    const { id } = req.params;
    const deletedFriend = await Friend.findByIdAndDelete(id);
    console.log("A friend has been deleted! :(")
    console.log(deletedFriend)
    res.redirect('/friends');
})

// Catch-all route
app.get('*', (req, res) => {
    res.send("Not available")
})

// Server setup
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000")
})