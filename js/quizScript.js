document.addEventListener("DOMContentLoaded", function(event) {

const quizData = [
  {
    question: "Выберите производителя IP-камеры?", 
    elements: 
      [
        { id: 'a', a: "HiWatch DS-T200S 2.8mm", price: 5000},
        { id: 'b', b: "Dahua Imou IPC-K22AP-IMOU 2.8мм", price: 2500},
        { id: 'c', c: "Xiaomi Smart Camera C200", price: 2500},
        { id: 'd', d: "Xiaomi Xiaovv Outdoor PTZ Camera", price: 3800}
      ]
  },
  {
    question: "Выберите сетевое оборудование?", 
    elements: 
      [
        { id: 'a', a: "TP-Link", price: 1367},
        { id: 'b', b: "Keenetic", price: 1598},
        { id: 'c', c: "MikroTikр", price: 2305},
        { id: 'd', d: "ASUS", price: 3990}
      ]
  },
  {
    question: "Устройства хранения видеоархива",
    elements:
      [
        { id: 'a', a: "Карта памяти", price: 800},
        { id: 'b', b: "USB-флеш-накопитель", price: 400},
        { id: 'c', c: "Жёсткий диск", price: 2000},
        { id: 'd', d: "Облачное пространство", price:  1000}
      ]
  },
  {
    question: "Программное обеспечение для видеонаблюдения",
    elements:
      [
        { id: 'a', a: "Zoneminder", price: 800},
        { id: 'b', b: "EyeLine Video Surveillance", price: 400},
        { id: 'c', c: "AtHome Video Streamer", price: 2000},
        { id: 'd', d: "Video Monitor", price: 1000}
      ]
  },
  {
    question: "Установка и настройка",
    elements:
      [
        { id: 'a', a: "Монтажные работы", price: 800},
        { id: 'b', b: "Пусконаладочные работы", price: 400},
        { id: 'c', c: "Техническая поддержка и обслуживание", price: 2000},
        { id: 'd', d: "Все", price: 1000}
      ]
  }
];

const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");
const loadingProgress = document.getElementById("loading-bar-progress");

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
  deselectAnswers();

  const currentQuizData = quizData[currentQuiz];
  questionEl.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.elements[0].a;
  b_text.innerText = currentQuizData.elements[1].b;
  c_text.innerText = currentQuizData.elements[2].c;
  d_text.innerText = currentQuizData.elements[3].d;  
}

function deselectAnswers() {
  answerEls.forEach((answerEl) => (answerEl.checked = false));
}

function getSelected() {
  let answer;

  answerEls.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });

  return answer;
}

submitBtn.addEventListener("click", () => {
  const answer = getSelected();

  if (answer) {
    if (answer === quizData[currentQuiz].correct) {
      score++;
    }
    
    quizData[currentQuiz].elements.forEach( (el, value) => {
      if(answer === el.id)
        score += el.price;
    })

    currentQuiz++;
    loadingProgress.style.width = `${(currentQuiz * 100) / quizData.length}%`;

    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      quiz.innerHTML = `
                <h2>Минимальная стоимость равна: ${score} р</h2>
                <p style="text-align: center;">Стоимость может отличаться, для уточнения цены свяжитесь с нами</p>
                <button onclick="location.reload()">Пройти еще раз <i class="fa-solid fa-arrows-rotate"></i></button>
            `;
    }
  }
});

});