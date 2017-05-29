const express = require('express');
const pg = require('pg');
const app = express();
const bodyParser = require('body-parser')();

//Database connection
var connection = 'postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/bulletinboard';

app.set('views', 'views');
app.set('view engine', 'pug');

app.use(express.static('public'));
app.use('/', bodyParser);

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
	pg.connect(connection, (err, client, done) => {
		if(err) throw err;
		client.query(`INSERT INTO messages (title, body) VALUES ('${request.body.title}', '${request.body.body}')`, (err, result) => {
			client.query("SELECT * FROM messages", (err, result) => {
				console.log(result.rows);
				response.render('message_posted', { messages: result.rows});
				done();
				pg.end();
			});
		});
	});
});

const listener = app.listen(3000, () => {
	pg.connect(connection, (err, client, done) => {
		if(err) throw err;
		client.query('TRUNCATE TABLE messages', (err, result) => {
			if(err) throw err;
			console.log('table truncated');
		});			
		done();
	});
	console.log('The server has started at port:' + listener.address().port);
});