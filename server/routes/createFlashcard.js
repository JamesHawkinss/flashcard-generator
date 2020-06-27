const { draw, generateUuid } = require('../../shared/helpers');

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
        draw(contents[key], `../../content/${uuid}`, key);
    });

    return res.send({
        "result": "success",
        "uuid": uuid,
        "paths": {
            "question": `/cards/${uuid}/question.png`,
            "answer": `/cards/${uuid}/answer.png`,
        }
    })
}

module.exports = createFlashcard;