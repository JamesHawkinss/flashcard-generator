function addChild() {
    const elements = document.getElementById("card-creators");

    const element = document.createElement("div");
    const question = document.createElement("input");
    const answer = document.createElement("input");

    element.classList.add("card-creator");

    question.classList.add("option");
    answer.classList.add("option")
    
    element.append(question);
    element.append(answer);
    elements.appendChild(element);
}