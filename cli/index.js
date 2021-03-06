const fs = require('fs');
const readline = require("readline");
const { draw } = require('../shared/helpers');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


rl.question(
    `==========\n1) Use the CLI interface\n2) Read directly from the contents.json file and create flashcards\n===========\nInput >> `, 
    async (choice) => {
        if (choice == "1") {
            const contents = [];
            const askQuestion = () => rl.question(
                `===========\n1) Add new flashcard\n2) Generate flashcards\n==========\nInput >> `,
                async (choice) => {
                    if (choice == "1") {
                        rl.question(`Question >> Enter question\nInput >> `, (q) => {
                            rl.question(`Answer >> Enter answer\nInput >> `, (a) => {
                                contents.push({ question: q, answer: a });
                                askQuestion();
                            })
                        })
                    } else if (choice == "2") {
                        const thing = contents.map(async (content, i) => {
                            if (content.hasOwnProperty("question")) {
                                await draw(content.question, `${i}`, "question");
                            }
                            if (content.hasOwnProperty("answer")) {
                                await draw(content.answer, `${i}`, "answer")
                            }
                        });

                        await Promise.all(thing);

                        console.log("Exit >> Operation complete!");
                        rl.close();
                    }
                }
            );

            askQuestion();
        } else if (choice == "2") {
            const contents = JSON.parse(fs.readFileSync('./contents.json'));

            if (typeof contents !== "object") {
                return console.log("Error >> contents.json is invalid!")
            }

            const thing2 = contents.map(async (content, i) => {
                if (content.hasOwnProperty("question")) {
                    await draw(content.question, `${i}`, "question");
                }
                if (content.hasOwnProperty("answer")) {
                    await draw(content.answer, `${i}`, "answer")
                }
            });

            await Promise.all(thing2);

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