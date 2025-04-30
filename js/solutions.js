// Инициализация AOS
AOS.init({
    duration: 1000,
    once: true
});

// Фильтрация решений
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.solution-filters .btn');
    const solutionItems = document.querySelectorAll('.solution-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Удаление активного класса у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            solutionItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => item.classList.add('show'), 50);
                } else {
                    item.style.display = 'none';
                    item.classList.remove('show');
                }
            });
        });
    });

    // Показать все элементы при загрузке
    solutionItems.forEach(item => item.classList.add('show'));
});

// Обработка кликов по функциям решений
document.addEventListener('DOMContentLoaded', function() {
    const featureLinks = document.querySelectorAll('.feature-link');
    const featureModal = new bootstrap.Modal(document.getElementById('featureModal'));
    const modalTitle = document.querySelector('#featureModal .modal-title');
    const modalBody = document.querySelector('#featureModal .modal-body');

    featureLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const feature = link.getAttribute('data-feature');
            
            // Обновляем заголовок модального окна
            modalTitle.textContent = link.textContent.trim();

            // Настройка содержимого модального окна в зависимости от типа функции
            switch(feature) {
                case 'demo':
                case 'features-demo':
                    setupFeatureDemo();
                    break;
                case 'calculator':
                    setupSavingsCalculator();
                    break;
                case 'roi-calculator':
                    setupROICalculator();
                    break;
                case 'interface-demo':
                    setupInterfaceDemo();
                    break;
                case 'virtual-tour':
                    setupVirtualTour();
                    break;
                case 'simulator':
                case 'call-simulator':
                    setupSimulator();
                    break;
                case 'integration-scheme':
                    setupIntegrationScheme();
                    break;
                case 'use-cases':
                case 'use-scenarios':
                    setupUseCases();
                    break;
                case 'cc-model':
                    setupContactCenterModel();
                    break;
                case 'operator-panel':
                    setupOperatorPanel();
                    break;
                case 'demo-access':
                    setupDemoAccess();
                    break;
                default:
                    modalBody.innerHTML = '<div class="alert alert-info">Функционал находится в разработке</div>';
            }

            featureModal.show();
        });
    });
});

// Калькулятор экономии
function setupSavingsCalculator() {
    const modalBody = document.querySelector('#featureModal .modal-body');
    modalBody.innerHTML = `
        <div class="calculator-container">
            <div class="form-group mb-3">
                <label>Количество сотрудников</label>
                <input type="number" class="form-control" id="employeeCount" value="10">
            </div>
            <div class="form-group mb-3">
                <label>Текущие ежемесячные затраты на связь (руб.)</label>
                <input type="number" class="form-control" id="currentCosts" value="50000">
            </div>
            <button class="btn btn-primary" onclick="calculateSavings()">Рассчитать экономию</button>
            <div class="calculator-result mt-3" id="savingsResult"></div>
        </div>
    `;
}

// Расчет экономии
function calculateSavings() {
    const employeeCount = parseInt(document.getElementById('employeeCount').value);
    const currentCosts = parseInt(document.getElementById('currentCosts').value);
    
    // Примерный расчет экономии (заглушка)
    const monthlySavings = currentCosts * 0.4; // 40% экономии
    const annualSavings = monthlySavings * 12;
    
    document.getElementById('savingsResult').innerHTML = `
        <h4>Ваша потенциальная экономия:</h4>
        <p>Ежемесячная экономия: ${monthlySavings.toLocaleString()} руб.</p>
        <p>Годовая экономия: ${annualSavings.toLocaleString()} руб.</p>
    `;
}

// Калькулятор ROI
function setupROICalculator() {
    const modalBody = document.querySelector('#featureModal .modal-body');
    modalBody.innerHTML = `
        <div class="calculator-container">
            <div class="form-group mb-3">
                <label>Инвестиции в оборудование (руб.)</label>
                <input type="number" class="form-control" id="investment" value="500000">
            </div>
            <div class="form-group mb-3">
                <label>Ожидаемое увеличение производительности (%)</label>
                <input type="number" class="form-control" id="productivity" value="20">
            </div>
            <button class="btn btn-primary" onclick="calculateROI()">Рассчитать ROI</button>
            <div class="calculator-result mt-3" id="roiResult"></div>
        </div>
    `;
}

// Расчет ROI
function calculateROI() {
    const investment = parseInt(document.getElementById('investment').value);
    const productivity = parseInt(document.getElementById('productivity').value);
    
    // Примерный расчет ROI (заглушка)
    const annualBenefit = investment * (productivity / 100);
    const roi = (annualBenefit / investment) * 100;
    const paybackPeriod = investment / annualBenefit;
    
    document.getElementById('roiResult').innerHTML = `
        <h4>Результаты расчета ROI:</h4>
        <p>Годовая выгода: ${annualBenefit.toLocaleString()} руб.</p>
        <p>ROI: ${roi.toFixed(2)}%</p>
        <p>Срок окупаемости: ${paybackPeriod.toFixed(1)} лет</p>
    `;
}

// Демонстрация возможностей
function setupFeatureDemo() {
    const modalBody = document.querySelector('#featureModal .modal-body');
    modalBody.innerHTML = `
        <div class="feature-demo-container">
            <div class="demo-section mb-4">
                <h4>Основные возможности</h4>
                <ul class="list-group">
                    <li class="list-group-item">✓ Высокое качество связи HD Voice</li>
                    <li class="list-group-item">✓ Интеграция с CRM-системами</li>
                    <li class="list-group-item">✓ Многоканальность и масштабируемость</li>
                    <li class="list-group-item">✓ Статистика и аналитика в реальном времени</li>
                </ul>
            </div>
            <div class="demo-video">
                <div class="ratio ratio-16x9">
                    <iframe src="https://www.youtube.com/embed/demo-placeholder" title="Демонстрация возможностей" allowfullscreen></iframe>
                </div>
            </div>
        </div>
    `;
}

// Демонстрация интерфейса
function setupInterfaceDemo() {
    const modalBody = document.querySelector('#featureModal .modal-body');
    modalBody.innerHTML = `
        <div class="interface-demo-container">
            <div class="interface-preview mb-4">
                <img src="img/interface.jpg" class="img-fluid rounded" style="display: block; margin: 0 auto;" alt="Интерфейс системы">
            </div>
            <div class="interface-features">
                <h4>Ключевые элементы интерфейса</h4>
                <div class="row mt-3">
                    <div class="col-md-6">
                        <div class="card mb-3">
                            <div class="card-body">
                                <h5>Панель управления</h5>
                                <p>Интуитивно понятное управление всеми функциями системы</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card mb-3">
                            <div class="card-body">
                                <h5>Статистика</h5>
                                <p>Детальная аналитика и отчетность в реальном времени</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Виртуальный тур
function setupVirtualTour() {
    const modalBody = document.querySelector('#featureModal .modal-body');
    modalBody.innerHTML = `
        <div class="virtual-tour-container">
            <div class="tour-viewer">
                <div class="ratio ratio-16x9">
                    <iframe src="virtual-tour-placeholder.html" title="Виртуальный тур" allowfullscreen></iframe>
                </div>
            </div>
            <div class="tour-controls mt-3">
                <button class="btn btn-primary me-2">◀ Назад</button>
                <button class="btn btn-primary me-2">Вперед ▶</button>
                <button class="btn btn-secondary">🔄 Сброс</button>
            </div>
        </div>
    `;
}

// Симулятор системы
function setupSimulator() {
    const modalBody = document.querySelector('#featureModal .modal-body');
    modalBody.innerHTML = `
        <div class="simulator-container">
            <div class="simulator-interface p-3 border rounded">
                <div class="toolbar mb-3">
                    <button class="btn btn-sm btn-primary me-2">Новый звонок</button>
                    <button class="btn btn-sm btn-success me-2">Принять</button>
                    <button class="btn btn-sm btn-danger">Завершить</button>
                </div>
                <div class="call-info p-3 bg-light rounded">
                    <p class="mb-2">Статус: <span class="badge bg-success">Активный</span></p>
                    <p class="mb-2">Длительность: 00:00:00</p>
                    <p class="mb-0">Качество связи: Отличное</p>
                </div>
            </div>
        </div>
    `;
}

// Схема интеграции
function setupIntegrationScheme() {
    const modalBody = document.querySelector('#featureModal .modal-body');
    modalBody.innerHTML = `
        <div class="integration-scheme-container">
            <div class="scheme-image text-center mb-3">
                <img src="img/integration.jpg" class="img-fluid" alt="Схема интеграции">
            </div>
            <div class="scheme-legend">
                <h4>Компоненты системы</h4>
                <div class="row">
                    <div class="col-md-6">
                        <ul class="list-group">
                            <li class="list-group-item">🔵 Серверная часть</li>
                            <li class="list-group-item">🟢 Клиентские приложения</li>
                        </ul>
                    </div>
                    <div class="col-md-6">
                        <ul class="list-group">
                            <li class="list-group-item">🟡 Внешние системы</li>
                            <li class="list-group-item">🔴 Точки интеграции</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Сценарии использования
function setupUseCases() {
    const modalBody = document.querySelector('#featureModal .modal-body');
    modalBody.innerHTML = `
        <div class="use-cases-container">
            <div class="accordion" id="useCasesAccordion">
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#useCase1">
                            Сценарий 1: Обработка входящих обращений
                        </button>
                    </h2>
                    <div id="useCase1" class="accordion-collapse collapse show" data-bs-parent="#useCasesAccordion">
                        <div class="accordion-body">
                            <ul>
                                <li class="list-group-item">1. Регистрация обращения: Ваше обращение регистрируется в нашей системе, и ему присваивается уникальный номер.</li>
                                <li class="list-group-item">2. Первичная обработка: Специалист изучает ваше обращение и определяет его приоритет.</li>
                                <li class="list-group-item">3. Передача специалисту: Ваше обращение направляется специалисту, обладающему необходимыми знаниями и опытом для решения вашей проблемы.</li>
                                <li class="list-group-item">4. Решение проблемы: Специалист связывается с вами и предоставляет решение.</li>
                                <li class="list-group-item">5. Обратная связь: Мы просим вас оценить качество нашей работы, чтобы постоянно совершенствовать наш сервис.</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#useCase2">
                            Сценарий 2: Командная работа
                        </button>
                    </h2>
                    <div id="useCase2" class="accordion-collapse collapse" data-bs-parent="#useCasesAccordion">
                        <div class="accordion-body">
                            <ul>
                                <li class="list-group-item">1. Определение целей: Мы совместно определяем цели проекта и задачи каждого участника.</li>
                                <li class="list-group-item">2. Распределение ролей: Каждый член команды получает роль, соответствующую его навыкам и опыту.</li>
                                <li class="list-group-item">3. Совместное планирование: Мы разрабатываем план работы, учитывая мнения и предложения всех участников.</li>
                                <li class="list-group-item">4. Регулярное общение: Мы поддерживаем постоянную связь для обмена информацией и решения проблем.</li>
                                <li class="list-group-item">5. Обратная связь и корректировка: Мы регулярно анализируем результаты работы и вносим корректировки в план, если это необходимо.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Модель работы контакт-центра
function setupContactCenterModel() {
    const modalBody = document.querySelector('#featureModal .modal-body');
    modalBody.innerHTML = `
        <div class="cc-model-container">
            <div class="model-diagram text-center mb-4">
                <img src="img/koll-czentr.jpg" class="img-fluid" alt="Модель контакт-центра">
            </div>
            <div class="model-description">
                <h4>Ключевые компоненты</h4>
                <div class="row">
                    <div class="col-md-4">
                        <div class="card h-100">
                            <div class="card-body">
                                <h5>Маршрутизация</h5>
                                <p>Интеллектуальное распределение обращений</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card h-100">
                            <div class="card-body">
                                <h5>Обработка</h5>
                                <p>Многоканальная обработка обращений</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card h-100">
                            <div class="card-body">
                                <h5>Аналитика</h5>
                                <p>Система отчетности и аналитики</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Панель оператора
function setupOperatorPanel() {
    const modalBody = document.querySelector('#featureModal .modal-body');
    modalBody.innerHTML = `
        <div class="operator-panel-container">
            <div class="panel-preview mb-4">
                <div class="card">
                    <div class="card-header bg-primary text-white">
                        <h5 class="mb-0">Панель оператора</h5>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="status-widget p-3 border rounded mb-3">
                                    <h6>Статус</h6>
                                    <select class="form-select">
                                        <option>Онлайн</option>
                                        <option>Перерыв</option>
                                        <option>Не беспокоить</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-8">
                                <div class="calls-widget p-3 border rounded">
                                    <h6>Текущие звонки</h6>
                                    <div class="list-group">
                                        <a href="#" class="list-group-item list-group-item-action">
                                            <div class="d-flex w-100 justify-content-between">
                                                <h6 class="mb-1">Входящий звонок</h6>
                                                <small>сейчас</small>
                                            </div>
                                            <p class="mb-1">+7 (XXX) XXX-XX-XX</p>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Демо-доступ
function setupDemoAccess() {
    const modalBody = document.querySelector('#featureModal .modal-body');
    modalBody.innerHTML = `
        <div class="demo-access-container">
            <div class="alert alert-info mb-4">
                <h5>Доступ к демо-версии</h5>
                <p class="mb-0">Заполните форму ниже для получения доступа к демонстрационной версии системы</p>
            </div>
            <form id="demoAccessForm">
                <div class="mb-3">
                    <label class="form-label">Имя</label>
                    <input type="text" class="form-control" required>
                </div>
                <div class="mb-3">
                    <label class="form-label">Email</label>
                    <input type="email" class="form-control" required>
                </div>
                <div class="mb-3">
                    <label class="form-label">Компания</label>
                    <input type="text" class="form-control" required>
                </div>
                <div class="mb-3">
                    <label class="form-label">Телефон</label>
                    <input type="tel" class="form-control" required>
                </div>
                <button type="submit" class="btn btn-primary">Получить доступ</button>
            </form>
        </div>
    `;
}