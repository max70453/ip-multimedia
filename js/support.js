// Данные для помощника выбора решения
const wizardData = {
    steps: [
        {
            id: 'purpose',
            title: 'Цель использования',
            options: [
                { id: 'security', text: 'Безопасность объекта' },
                { id: 'communication', text: 'Коммуникации' },
                { id: 'automation', text: 'Автоматизация процессов' }
            ]
        },
        {
            id: 'scale',
            title: 'Масштаб проекта',
            options: [
                { id: 'small', text: 'Малый бизнес' },
                { id: 'medium', text: 'Средний бизнес' },
                { id: 'enterprise', text: 'Крупное предприятие' }
            ]
        },
        {
            id: 'features',
            title: 'Необходимые функции',
            options: [
                { id: 'basic', text: 'Базовый функционал' },
                { id: 'advanced', text: 'Расширенные возможности' },
                { id: 'custom', text: 'Индивидуальные требования' }
            ]
        }
    ]
};

// Инициализация помощника выбора решения
function initSolutionWizard() {
    const wizardSteps = document.getElementById('solution-wizard');
    const wizardContent = document.querySelector('.wizard-content');

    // Создание шагов
    wizardData.steps.forEach((step, index) => {
        const stepElement = document.createElement('div');
        stepElement.className = `wizard-step ${index === 0 ? 'active' : ''}`;
        stepElement.innerHTML = `
            <div class="step-number">${index + 1}</div>
            <div class="step-title">${step.title}</div>
        `;
        wizardSteps.appendChild(stepElement);
    });

    showWizardStep(0);
}

// Показ шага помощника
function showWizardStep(stepIndex) {
    const step = wizardData.steps[stepIndex];
    const wizardContent = document.querySelector('.wizard-content');

    wizardContent.innerHTML = `
        <h4 class="mb-4">${step.title}</h4>
        <div class="options-container d-flex justify-content-between">
            ${step.options.map(option => `
                <div class="option-card" data-option="${option.id}">
                    <h5>${option.text}</h5>
                    <button class="btn btn-primary mt-3" onclick="selectOption('${option.id}', ${stepIndex})">Выбрать</button>
                </div>
            `).join('')}
        </div>
    `;
}

// Выбор опции в помощнике
function selectOption(optionId, currentStep) {
    if (currentStep < wizardData.steps.length - 1) {
        showWizardStep(currentStep + 1);
        updateWizardSteps(currentStep + 1);
    } else {
        showRecommendation();
    }
}

// Обновление статуса шагов
function updateWizardSteps(activeStep) {
    const steps = document.querySelectorAll('.wizard-step');
    steps.forEach((step, index) => {
        step.classList.toggle('active', index === activeStep);
    });
}

// Показ рекомендации
function showRecommendation() {
    const wizardContent = document.querySelector('.wizard-content');
    wizardContent.innerHTML = `
        <div class="recommendation-container text-center">
            <i class="fas fa-check-circle fa-3x text-primary mb-3"></i>
            <h4>Рекомендованное решение</h4>
            <p>На основе ваших ответов мы подобрали оптимальное решение для вашего бизнеса.</p>
            <a href="#" class="btn btn-primary">Подробнее о решении</a>
        </div>
    `;
}

// Инициализация поиска по базе знаний
function initKnowledgeBaseSearch() {
    const searchInput = document.getElementById('kb-search');
    searchInput.addEventListener('input', debounce(handleSearch, 300));
}

// Обработка поиска
function handleSearch(event) {
    const query = event.target.value.toLowerCase();
    // Здесь будет логика поиска по базе знаний
}

// Функция debounce для оптимизации поиска
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Чат-бот
class Chatbot {
    constructor() {
        this.messages = document.getElementById('chat-messages');
        this.input = document.getElementById('chat-input');
        this.sendButton = document.getElementById('send-message');

        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        this.addMessage('bot', 'Здравствуйте! Я виртуальный помощник. Как я могу вам помочь?');
    }

    sendMessage() {
        const message = this.input.value.trim();
        if (message) {
            this.addMessage('user', message);
            this.input.value = '';
            this.processMessage(message);
        }
    }

    addMessage(type, text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${type} animate-slide-in`;
        messageDiv.innerHTML = `
            <div class="message-content">${text}</div>
        `;
        this.messages.appendChild(messageDiv);
        this.messages.scrollTop = this.messages.scrollHeight;
    }

    processMessage(message) {
        // Здесь будет логика обработки сообщений
        setTimeout(() => {
            this.addMessage('bot', 'Спасибо за ваш вопрос. Я обрабатываю ваш запрос...');
        }, 500);
    }
}

// Инициализация компонентов при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    initSolutionWizard();
    initKnowledgeBaseSearch();
    new Chatbot();
});