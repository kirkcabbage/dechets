/*
Savoir quand l'user clique sur jouer
Afficher 1re question
Connaître réponse
Afficher un message ou l'autre selon réponse
Savoir quand user clique sur question suvante
Afficher question suivante
Savoir quand toutes les questions ont été faites
Afficher dernière page

récup réponse formulaire (front)
event listener
afficher/masquer element html
window.location
*/
const questions = [
    {
        "id":"1",
        "waste":"emballage",
        "answer":"no",
        "image":{
            "src":"emballage.svg",
            "alt":"Emballage de barre chocolatée"
        },
        "explanation":"Délai de dégradation : X ans"
    },
    {
        "id":"2",
        "waste":"trognon",
        "answer":"no",
        "image":{
            "src":"trognon.svg",
            "alt":"Trognon de pomme"
        },
        "explanation":"Délai de dégradation : X ans"
    },
]

document.addEventListener("DOMContentLoaded", () => {
getButton(".js-play-button")
})

function getButton(selector) {
    const button = document.querySelector(selector)
    /*console.log(button)*/
    button.addEventListener("click", startGame)
}

function startGame() {
    const questionSection = document.querySelector(".js-questions")
    questionSection.classList.remove('hidden');
    
    const startPage = document.querySelector(".js-startpage")
    startPage.classList.add("hidden")

    play()
}

function play() {
    let questionId = 1
    initQuestion(questionId)
    const inputs = document.querySelectorAll('.js-form input[type="radio"]')
    inputs.forEach((input) => {
        input.addEventListener("click", (event)=> {
            showAnswer(event, questionId)
            questionId = questionId + 1
        })
    })

}

function showAnswer(event, currentQuestionId) {
    const userAnswer = event.target.value
    const index = currentQuestionId - 1
    const correctAnswer = questions[index].answer
    const result = document.querySelector(".js-result")
    const explanation = document.querySelector(".js-explanation")

    if (userAnswer === correctAnswer) {
        result.textContent = "Bonne réponse !"
    }
    else {
        result.textContent = "Mauvaise réponse !"
    }

    explanation.textContent = questions[index].explanation
    const answerSection = document.querySelector(".js-answer")
    answerSection.classList.remove('hidden');
    if (currentQuestionId === 2) {
        endGame(document.querySelector(".js-questions"))
    } else {
        nextQuestion(currentQuestionId)
    }
}

function nextQuestion(currentQuestionId) {
    const button = document.querySelector(".js-next-question")
    console.log(currentQuestionId)
    button.addEventListener("click", ()=> {
        initQuestion(currentQuestionId +1) 
    })
}

function initQuestion(questionId) {
    const index = questionId - 1
    const image = document.querySelector(".js-image")
    image.src = "images/"+ questions[index].image.src
    /*console.log(questions[index].image.src)*/

    const answerSection = document.querySelector(".js-answer")
    answerSection.classList.add('hidden');
}

function endGame(questionSection) {
    console.log("endgame")
    const endPage = document.querySelector(".js-end-game")
    endPage.classList.remove('hidden');
    questionSection.classList.add('hidden')
}
