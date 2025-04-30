// Конфигурация помощника выбора решения
const wizardConfig = {
    steps: [
        {
            id: 1,
            question: 'Какой тип решения вас интересует?',
            options: [
                { id: 'video', text: 'Видеонаблюдение' },
                { id: 'access', text: 'Контроль доступа' },
                { id: 'automation', text: 'Автоматизация' },
                { id: 'integration', text: 'Интеграция систем' }
            ]
        },
        {
            id: 2,
            question: 'Масштаб вашего проекта?',
            options: [
                { id: 'small', text: 'Небольшой объект' },
                { id: 'medium', text: 'Средний бизнес' },
                { id: 'large', text: 'Крупное предприятие' },
                { id: 'custom', text: 'Особые требования' }
            ]
        },
        {
            id: 3,
            question: 'Какие функции наиболее важны?',
            options: [
                { id: 'security', text: 'Безопасность' },
                { id: 'analytics', text: 'Аналитика' },
                { id: 'integration', text: 'Интеграция' },
                { id: 'automation', text: 'Автоматизация' }
            ]
        }
    ]
};

// База знаний
const knowledgeBase = {
    instructions: [
        {
            title: 'Настройка системы видеонаблюдения',
            description: 'Пошаговая инструкция по установке и настройке',
            link: '#'
        },
        {
            title: 'Интеграция с СКУД',
            description: 'Руководство по интеграции систем',
            link: '#'
        },
        {
            title: 'Обновление программного обеспечения',
            description: 'Инструкция по обновлению ПО',
            link: '#'
        }
    ],
    videos: [
        {
            title: 'Базовая настройка системы',
            description: 'Видеоурок по начальной настройке',
            link: '#'
        },
        {
            title: 'Расширенные функции',
            description: 'Обзор продвинутых возможностей',
            link: '#'
        },
        {
            title: 'Устранение неполадок',
            description: 'Решение типовых проблем',
            link: '#'
        }
    ],
    faq: [
        {
            question: 'Как сбросить пароль администратора?',
            answer: 'Подробная инструкция по сбросу пароля...'
        },
        {
            question: 'Что делать при потере связи с камерами?',
            answer: 'Пошаговое руководство по восстановлению связи...'
        },
        {
            question: 'Как настроить уведомления?',
            answer: 'Инструкция по настройке уведомлений...'
        }
    ]
};

// Начальные сообщения чат-бота
const initialMessages = [
    {
        type: 'bot',
        text: 'Здравствуйте! Я виртуальный помощник IP-Multimedia. Чем могу помочь?'
    },
    {
        type: 'bot',
        text: 'Вы можете задать мне вопрос о наших продуктах, технической поддержке или запросить помощь.'
    }
];

// Инициализация помощника выбора решения
function initWizard() {
    const wizardSteps = document.getElementById('solution-wizard');
    const wizardContent = document.querySelector('.wizard-content');

    let currentStep = 0;
    const userAnswers = {};

    function renderStep(step) {
        const stepData = wizardConfig.steps[step];
        if (!stepData) return;

        wizardContent.innerHTML = `
            <div class="step-content">
                <h4 class="mb-4">${stepData.question}</h4>
                <div class="options-container">
                    ${stepData.options.map(option => `
                        <button class="btn btn-outline-primary m-2" data-option="${option.id}">
                            ${option.text}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

        // Обработчики для кнопок
        const buttons = wizardContent.querySelectorAll('button');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                userAnswers[stepData.id] = button.dataset.option;
                currentStep++;
                if (currentStep < wizardConfig.steps.length) {
                    renderStep(currentStep);
                } else {
                    showResult();
                }
            });
        });
    }

    function showResult() {
        // Здесь логика подбора решения на основе ответов
        wizardContent.innerHTML = `
            <div class="result-content text-center">
                <h4 class="mb-4">Рекомендованное решение</h4>
                <p>На основе ваших ответов мы подготовили персональные рекомендации.</p>
            </div>
        `;
    }

    renderStep(currentStep);
}

// Инициализация поиска по базе знаний
function initKnowledgeBase() {
    const searchInput = document.getElementById('kb-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        // Реализация поиска по базе знаний
    });
}

// Инициализация чат-бота
function initChat() {
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-message');

    // Отображение начальных сообщений
    initialMessages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.className = `chat-message ${message.type}`;
        messageElement.innerHTML = `<p>${message.text}</p>`;
        chatMessages.appendChild(messageElement);
    });

    // Обработка отправки сообщений
    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;

        // Добавление сообщения пользователя
        const userMessage = document.createElement('div');
        userMessage.className = 'chat-message user';
        userMessage.innerHTML = `<p>${message}</p>`;
        chatMessages.appendChild(userMessage);

        // Очистка поля ввода
        chatInput.value = '';

        // Автоматический скролл вниз
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Здесь будет логика обработки сообщения и генерации ответа бота
        setTimeout(() => {
            const botMessage = document.createElement('div');
            botMessage.className = 'chat-message bot';
            botMessage.innerHTML = `<p>Спасибо за ваш вопрос. Наш специалист скоро свяжется с вами.</p>`;
            chatMessages.appendChild(botMessage);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
    }

    sendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
}

// Инициализация всех компонентов
document.addEventListener('DOMContentLoaded', () => {
    initWizard();
    initKnowledgeBase();
    initChat();
});