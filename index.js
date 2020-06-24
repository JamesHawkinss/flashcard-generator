const { createCanvas } = require('canvas');
const fs = require('fs');

const padding = 100;

function getLines(ctx, text, maxWidth) {
    var words = text.split(" ");
    var lines = [];
    var currentLine = words[0];
    
    for (var i = 1; i < words.length; i++) {
        var word = words[i];
        var width = ctx.measureText(currentLine + " " + word).width;
        if (width < maxWidth) {
            currentLine += " " + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    return lines;
}

function draw(text, folderName, type) {
    fs.mkdirSync(`./${folderName}`, { recursive: true });
    const canvas = createCanvas(1000, 500);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000";
    ctx.font = '50px Arial'
    ctx.textAlign = "center";
    //ctx.textBaseline = "middle";
    
    let lines = getLines(ctx, text, canvas.width-10);
    const offset = ((lines.length * 50) / 2);
    lines = lines.join('\n');
    
    ctx.fillText(lines, (canvas.width / 2), (canvas.height / 2) - offset)
    
    const stream = fs.createWriteStream(`./${folderName}/${type}.png`);
    const canvasStream = canvas.createPNGStream();
    canvasStream.pipe(stream);
    stream.on('finish', () => console.log(`${type} ${folderName} done`));
}


const contents = JSON.parse(fs.readFileSync('./contents.json'));
contents.forEach((content, i) => {
    if (content.hasOwnProperty("question")) {
        draw(content.question, i, "question")
    }

    if (content.hasOwnProperty("answer")) {
        draw(content.answer, i, "answer")
    }
});

