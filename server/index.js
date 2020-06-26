const fs = require('fs');
const { getLines, draw } = require('./helpers');

const padding = 100;

const contents = JSON.parse(fs.readFileSync('./contents.json'));
contents.forEach((content, i) => {
    if (content.hasOwnProperty("question")) {
        draw(content.question, i, "question")
    }

    if (content.hasOwnProperty("answer")) {
        draw(content.answer, i, "answer")
    }
});

