const { createCanvas } = require('canvas');
const fs = require('fs');
const uuid = require('uuid');

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
    return new Promise((resolve, reject) => {
        fs.mkdirSync(`./${folderName}`, { recursive: true });
        const canvas = createCanvas(1000, 500);
        const ctx = canvas.getContext('2d');
    
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#000";
        ctx.font = '50px Arial'
        ctx.textAlign = "center";
        
        let lines = getLines(ctx, text, canvas.width-10);
        const offset = ((lines.length * 50) / 2);
        lines = lines.join('\n');
        
        ctx.fillText(lines, (canvas.width / 2), (canvas.height / 2) - offset)
        
        const stream = fs.createWriteStream(`./${folderName}/${type}.png`);
        stream.on('finish', () => resolve());
        const canvasStream = canvas.createPNGStream();
        canvasStream.pipe(stream);
    });
}

function generateUuid() {
    return uuid.v4();
}

module.exports = {
    getLines,
    draw,
    generateUuid
}