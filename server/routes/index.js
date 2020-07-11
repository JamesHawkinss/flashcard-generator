const { draw, generateUuid } = require('../../shared/helpers');
const fs = require('fs');

function createFlashcard(req, res) {
    const contents = {
        question: req.body.question,
        answer: req.body.answer
    }

    if (typeof req.body.question === "undefined" || typeof req.body.answer === "undefined") {
        return res.send({ "result": "error", "stack": "required question and answer" });
    }

    const uuid = generateUuid();

    Object.keys(contents).forEach((key) => {
        draw(contents[key], `../content/${uuid}`, key);
    });

    return res.send({
        "result": "success",
        "uuid": uuid,
        "paths": {
            "question": `http://localhost:3000/cards/${uuid}/question.png`,
            "answer": `http://localhost:3000/cards/${uuid}/answer.png`,
        }
    })
}

function getFlashcard(req, res) {
    const uuid = req.params.uuid;
    // todo: uuid regex checking

    try {
        const data = fs.readdirSync(`${__dirname}/../../content/${uuid}`);

        return res.send({
            "result": "success",
            "paths": {
                "question": `/cards/${uuid}/question.png`,
                "answer": `/cards/${uuid}/answer.png`
            }
        });
    } catch (err) {
        return res.send({
            "result": "error",
            "stack": "cards do not exist"
        });
    }
}

module.exports = { createFlashcard, getFlashcard }