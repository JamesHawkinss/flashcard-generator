const fs = require('fs');
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const { draw } = require('../shared/helpers');

rl.question(
    `==========\n1) Use the CLI interface\n2) Read directly from the contents.json file and create flashcards\n===========\nInput >> `, 
    function(choice) {
        if (choice == "1") {

        } else if (choice == "2") {
            const contents = JSON.parse(fs.readFileSync('./contents.json'));

            if (typeof contents !== "object") {
                return console.log("Error >> contents.json is invalid!")
            }

            contents.forEach((content, i) => {
                if (content.hasOwnProperty("question")) {
                    draw(content.question, `generated/${i}`, "question")
                }
                if (content.hasOwnProperty("answer")) {
                    draw(content.answer, `generated/${i}`, "answer")
                }
            });

            console.log("Exit >> Operation complete!")
            rl.close();
        } else {
            console.log("Error >> Invalid choice")
            rl.close();
        }
});

rl.on("close", function() {
    console.log("Exit >> Operation closed!");
    process.exit(0);
});