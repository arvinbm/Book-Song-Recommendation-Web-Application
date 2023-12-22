const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

// Define a route to serve the "index.html" file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/pages/index.html');
});

// Define a route to serve the "sign_up.html" file
app.get('/sign_up.html', (req, res) => {
    res.sendFile(__dirname + '/public/pages/sign_up.html');
});

// Define a route to serve the "log_in.html" file
app.get('/log_in.html', (req, res) => {
    res.sendFile(__dirname + '/public/pages/log_in.html');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});