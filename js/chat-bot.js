// Базовые ответы бота
const botResponses = {
    greeting: ['Здравствуйте! Чем могу помочь?', 'Добрый день! Как я могу вам помочь?'],
    farewell: ['До свидания! Обращайтесь, если понадобится помощь.', 'Всего доброго! Буду рад помочь снова.'],
    default: ['Извините, я не совсем понял ваш вопрос. Можете переформулировать?', 'Уточните, пожалуйста, ваш вопрос.'],
    solutions: ['У нас есть решения в области IP-телефонии, видеоконференцсвязи и контакт-центров. Какое направление вас интересует?'],
    contacts: ['Вы можете связаться с нами по телефону +7 (949) 099 50 07 или по email trinity.donetsk@gmail.com'],
    support: ['Для получения технической поддержки вы можете заполнить форму обратной связи или позвонить в службу поддержки.']
};

// Ключевые слова для распознавания намерений пользователя
const keywords = {
    greeting: ['привет', 'здравствуйте', 'добрый день', 'доброе утро', 'добрый вечер'],
    farewell: ['до свидания', 'пока', 'всего доброго', 'прощайте'],
    solutions: ['решение', 'продукт', 'услуга', 'ip-телефония', 'видеоконференция', 'контакт'],
    contacts: ['контакт', 'телефон', 'почта', 'email', 'адрес'],
    support: ['поддержка', 'помощь', 'проблема', 'вопрос', 'консультация']
};

// Получение случайного ответа из массива
function getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
}

// Определение намерения пользователя по ключевым словам
function detectIntent(message) {
    message = message.toLowerCase();
    for (let intent in keywords) {
        if (keywords[intent].some(keyword => message.includes(keyword))) {
            return intent;
        }
    }
    return 'default';
}

// Добавление сообщения в чат
function addMessage(message, isBot = false) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${isBot ? 'bot' : 'user'}`;
    messageDiv.innerHTML = `
        <div class="message-content">
            ${isBot ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>'}
            <span>${message}</span>
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Имитация набора сообщения ботом
function showTypingIndicator() {
    const chatMessages = document.getElementById('chat-messages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.innerHTML = '<span></span><span></span><span></span>';
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return typingDiv;
}

// Обработка отправки сообщения
function handleMessage() {
    const inputField = document.getElementById('chat-input');
    const message = inputField.value.trim();
    
    if (message) {
        // Добавляем сообщение пользователя
        addMessage(message, false);
        inputField.value = '';
        
        // Показываем индикатор набора текста
        const typingIndicator = showTypingIndicator();
        
        // Имитируем задержку ответа бота
        setTimeout(() => {
            // Удаляем индикатор набора
            typingIndicator.remove();
            
            // Определяем намерение и получаем ответ
            const intent = detectIntent(message);
            const response = getRandomResponse(botResponses[intent] || botResponses.default);
            
            // Добавляем ответ бота
            addMessage(response, true);
        }, 1000);
    }
}

// Инициализация чата
document.addEventListener('DOMContentLoaded', () => {
    // Добавляем приветственное сообщение
    setTimeout(() => {
        addMessage(getRandomResponse(botResponses.greeting), true);
    }, 500);

    // Обработчики событий
    document.getElementById('send-message').addEventListener('click', handleMessage);
    document.getElementById('chat-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleMessage();
        }
    });
});