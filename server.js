// server.js
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

const Post = mongoose.model('Post', {
    title: String,
    content: String
});

app.use(express.json());

app.get('/api/posts', (req, res) => {
    Post.find().then(posts => res.json(posts)).catch(err => console.error(err));
});

app.post('/api/posts', (req, res) => {
    const { title, content } = req.body;
    const newPost = new Post({ title, content });
    newPost.save().then(post => res.json(post)).catch(err => console.error(err));
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
