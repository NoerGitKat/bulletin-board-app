const express = require('express');
const pg = require('pg');
const app = express();
const bodyParser = require('body-parser');

//Database connection
var connection = "postgres://postgres:Blabla_55@localhost/bulletin_board";

app.set('views', 'views');
app.set('view engine', 'pug');

app.use(express.static('public'));

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
	var message = [];

	pg.connect(connection, (err, client, done) => {
		if(err) {
			return console.log('Beep boop an error has occurred: ', err);
		}
		client.query('INSERT INTO messages (title, body) VALUES ($1, $2)', 
			[request.body.title, request.body.body]);
			for (var i = 0; i < result.length; i++) {

	  			// Create an object to save current row's data
		  		var newMessage = {
		  			'title':result[i].title,
					'body':result[i].body,
				}

				message.push(newMessage);
			}

			response.render('message_posted', {messages: message});
			done();
	});
});

const listener = app.listen(3000, () => {
	console.log('The server has started at port:' + listener.address().port);
});