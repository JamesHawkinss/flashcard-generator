const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = require('./router');
const config = require('./config.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static('../public'));
app.use('/api', router);
app.use('/cards', express.static('../content'));

app.listen(config.server.port, () => console.log(`Listening on :${config.server.port}`));
