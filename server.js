const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route to serve the "index.html" file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/pages/index.html'));
});

// Redirect requests for "/index.html" to the root path "/"
app.get('/index.html', (req, res) => {
    res.redirect('/');
});

// Define routes to serve the HTML files
app.get('/sign_up.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/pages/sign_up.html'));
});

app.get('/log_in.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/pages/log_in.html'));
});

app.get('/decision_page.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/pages/decision_page.html'));
});

app.get('/book_recommendation.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/pages/book_recommendation.html'));
});

app.get('/song_recommendation.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/pages/song_recommendation.html'));
});

app.get('/book_display.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/pages/book_display.html'));
});

app.get('/song_display.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/pages/song_display.html'));
});

// Basic error handling
app.use((req, res, next) => {
    res.status(404).send('Sorry, page not found');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
