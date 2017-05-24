const express = require('express');
const pg = require('pg');
const app = express();

app.set('views', 'views');
app.set('view engine', 'pug');

// Route for homepage
app.get('/', (request, response) => {
	response.render('index');
});

// Route with form for posting message
app.get('/post_message', (request, response) => {
	response.render('post_message');
});

// Post request that handles the new input
app.post('/post_message', (request, response) => {
	response.render('message_posted');
});

const listener = app.listen(3000, () => {
	console.log('The server has started at port:' + listener.address().port);
});