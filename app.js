const express = require('express');
const pg = require('pg');
const app = express();

app.set('views', 'views');
app.set('view engine', 'pug');

const listener = app.listen(3000, () => {
	console.log('The server has started at port:' + listener.address().port);
})