// change these
const baseUrl = "http://localhost:3000";

var template = Handlebars.compile(document.getElementById("getFlashcardResult").innerHTML);

function addChild() {
    const elements = document.getElementById("card-creators");

    const element = document.createElement("div");
    const question = document.createElement("input");
    const answer = document.createElement("input");

    element.classList.add("card-creator");

    question.classList.add("option");
    question.setAttribute("required", "");
    answer.classList.add("option");
    answer.setAttribute("required", "");
    
    element.append(question);
    element.append(answer);
    elements.appendChild(element);
}

function createFlashcard(question, answer) {
    // /api/create
    // body: question, answer
}

function getFlashcard() {
    const uuid = document.getElementById("findCardUuid").value;
    if (!uuid) return;
    fetch(`${baseUrl}/api/${uuid}`)
        .then((res) => res.json())
        .then((data) => {
            document.getElementById("findCardResults").innerHTML = "";
            document.getElementById("findCardResults").innerHTML = template(data);
        })
        .catch((err) => {});
}

function toggleFunction(name) {
    const element = document.getElementById(name);
    if (Boolean(element.hasAttribute("hidden")) !== true) {
        document.getElementById(name).setAttribute("hidden", "");
    } else {
        document.getElementById(name).removeAttribute("hidden");
    }
}