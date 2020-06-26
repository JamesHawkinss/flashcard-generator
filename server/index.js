const fs = require('fs');
const { getLines, draw } = require('./helpers');

const express = require('express');
const app = express();

app.use('/', express.static('../public'));

// const contents = JSON.parse(fs.readFileSync('./contents.json'));
// contents.forEach((content, i) => {
//     if (content.hasOwnProperty("question")) {
//         draw(content.question, i, "question")
//     }

//     if (content.hasOwnProperty("answer")) {
//         draw(content.answer, i, "answer")
//     }
// });

app.listen(3000, () => {});

