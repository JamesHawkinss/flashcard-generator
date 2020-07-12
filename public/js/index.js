var getFlashcardResult = Handlebars.compile(document.getElementById("getFlashcardResult").innerHTML);
var createFlashcardsResultTemplate = Handlebars.compile(document.getElementById("createFlashcardsResultTemplate").innerHTML);

function addChild() {
    const elements = document.getElementById("card-creators");
    const element = document.createElement("div");
    element.classList.add("card-creator");
    
    const question = document.createElement("input");
    question.classList.add("option");
    question.setAttribute("type", "text");
    question.setAttribute("name", "question");
    question.setAttribute("placeholder", "Question");
    
    const answer = document.createElement("input");
    answer.classList.add("option");
    answer.setAttribute("type", "text");
    answer.setAttribute("name", "answer");
    answer.setAttribute("placeholder", "Answer");
    
    const questionLabel = document.createElement("label");
    questionLabel.innerHTML = "Question ";
    questionLabel.setAttribute("for", "question");
    
    const answerLabel = document.createElement("label");
    answerLabel.innerHTML = " Answer ";
    answerLabel.setAttribute("for", "answer");
    
    element.append(questionLabel);
    element.append(question);
    element.appendChild(answerLabel);
    element.append(answer);
    elements.appendChild(element);
}

async function createFlashcards() {
    const flashcards = [];
    const urls = [];

    const cardCreatorsChildren = document.getElementById("card-creators").children;
    var question = "";
    var answer = "";

    for (let i = 0; i < cardCreatorsChildren.length; i++) {
        for (let j = 0; j < cardCreatorsChildren[i].children.length; j++) {
            let child = cardCreatorsChildren[i].children[j];
            if (child.tagName == "INPUT") {
                if (child.id == "question") {
                    question = child.value;
                    child.value = "";
                } else {
                    answer = child.value;
                    child.value = "";
                }
            }
        }
        flashcards.push({ question, answer });
    }
    
    for (let i = 0; i < flashcards.length; i++) {
        if (flashcards[i].question == "" || flashcards[i].answer == "") continue;
        try {
            var data = await fetch(`/api/create`, {
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify(flashcards[i])
            });
            data = await data.json();
            urls.push({
                uuid: data.uuid,
                question: data.paths.question,
                answer: data.paths.answer
            });
        } catch (err) {
            console.log(err);
        }
    }

    document.getElementById("createFlashcardsResult").innerHTML = "";
    document.getElementById("createFlashcardsResult").innerHTML = createFlashcardsResultTemplate({ data: urls });
}

function getFlashcard() {
    const uuid = document.getElementById("findCardUuid").value;
    if (!uuid) return;

    fetch(`/api/${uuid}`)
        .then((res) => res.json())
        .then((data) => {
            document.getElementById("findCardResults").innerHTML = "";
            document.getElementById("findCardResults").innerHTML = getFlashcardResult(data);
        })
        .catch((err) => console.log(err));
}

function toggleFunction(name) {
    document.getElementById(name).toggleAttribute("hidden");
}

Handlebars.registerHelper('json', function (context) {
    console.log(context);
    return JSON.stringify(context).replace(/"/g, '&quot;');
});

function printCards(paths) {
    console.log(paths);
    printJS({
        printable: [paths.question, paths.answer],
        type: 'image',
        header: 'Flashcard Generator',
        maxWidth: 2000,
        style: 'width:50%;margin-bottom:20px;border: 1px solid black;',
        targetStles: ['*']
    });
}