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

// const contents = JSON.parse(fs.readFileSync('./contents.json'));
// contents.forEach((content, i) => {
//     if (content.hasOwnProperty("question")) {
//         draw(content.question, i, "question")
//     }

//     if (content.hasOwnProperty("answer")) {
//         draw(content.answer, i, "answer")
//     }
// });

app.listen(config.server.port, () => console.log(`Listening on :${config.server.port}`));
