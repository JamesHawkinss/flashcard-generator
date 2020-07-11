var getFlashcardResult = Handlebars.compile(document.getElementById("getFlashcardResult").innerHTML);
var createFlashcardsResultTemplate = Handlebars.compile(document.getElementById("createFlashcardsResultTemplate").innerHTML);

function addChild() {
    const elements = document.getElementById("card-creators");
    const element = document.createElement("div");
    const question = document.createElement("input");
    const questionLabel = document.createElement("label");
    const answer = document.createElement("input");
    const answerLabel = document.createElement("label");

    element.classList.add("card-creator");

    question.classList.add("option");
    question.setAttribute("type", "text");
    question.setAttribute("name", "question");
    question.setAttribute("placeholder", "Question");

    answer.classList.add("option");
    answer.setAttribute("type", "text");
    answer.setAttribute("name", "answer");
    answer.setAttribute("placeholder", "Answer");

    questionLabel.innerHTML = "Question ";
    questionLabel.setAttribute("for", "question");

    answerLabel.innerHTML = " Answer ";
    answerLabel.setAttribute("for", "answer");
    
    element.append(questionLabel);
    element.append(question);
    element.appendChild(answerLabel);
    element.append(answer);
    elements.appendChild(element);
}

function createFlashcards() {
    const flashcards = [];
    const urls = [];

    const cardCreatorsChildren = document.getElementById("card-creators").children;
    var question = "";
    var answer = "";

    for (let i = 0; i < cardCreatorsChildren.length; i++) {
        for (let j = 0; j < cardCreatorsChildren[i].children.length; j++) {
            if (cardCreatorsChildren[i].children[j].tagName == "INPUT") {
                if (cardCreatorsChildren[i].children[j].id == "question") {
                    question = cardCreatorsChildren[i].children[j].value;
                } else {
                    answer = cardCreatorsChildren[i].children[j].value;
                }

            }
        }
        flashcards.push({ question, answer });
    }
    
    for (let i = 0; i < flashcards.length; i++) {
        fetch(`/api/create`, {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(flashcards[i])
        })
        .then((res) => res.json())
        .then((data) => {
            urls.push({
                uuid: data.uuid,
                question: data.paths.question,
                answer: data.paths.answer
            });
        })
        .catch((err) => console.log(err));
    }

    document.getElementById("createFlashcardsResult").innerHTML = "";
    document.getElementById("createFlashcardsResult").innerHTML = createFlashcardsResultTemplate(urls);
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