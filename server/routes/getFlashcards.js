const fs = require('fs');

function getFlashcard(req, res) {
    const uuid = req.params.uuid;
    // todo: uuid regex checking

    const data = fs.readdirSync(`${__dirname}/../${uuid}`);
    if (data.length != 2) {
        return res.send({
            "result": "error",
            "stack": "cards do not exist"
        });
    }

    return res.send({
        "result": "success",
        "paths": {
            "question": `/cards/${uuid}/question.png`,
            "answer": `/cards/${uuid}/answer.png`
        }
    });    
}

module.exports = getFlashcard;