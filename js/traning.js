// JavaScript для страницы обучения

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация AOS для анимации
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Инициализация WOW для анимации
    new WOW().init();

    // Обработчик для кнопок записи на курс
    const enrollButtons = document.querySelectorAll('.btn-primary');
    enrollButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.textContent.trim() === 'Записаться') {
                e.preventDefault();
                showEnrollForm(this);
            }
        });
    });

    // Обработчик для кнопок "Подробнее"
    const detailButtons = document.querySelectorAll('.course-overlay .btn');
    detailButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const courseItem = this.closest('.course-item');
            const courseTitle = courseItem.querySelector('h4').textContent;
            showCourseDetails(courseTitle);
        });
    });

    // Добавление интерактивности к элементам курса
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach(item => {
        item.classList.add('interactive-element');
        item.addEventListener('click', function() {
            const featureText = this.textContent.replace(/^[^\w]+/, '').trim();
            showFeatureInfo(featureText);
        });
    });
});

// Функция для отображения формы записи на курс
function showEnrollForm(button) {
    const courseItem = button.closest('.course-item');
    const courseTitle = courseItem.querySelector('h4').textContent;
    const coursePrice = courseItem.querySelector('.course-price').textContent;
    
    // Создаем модальное окно
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'enrollModal';
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('aria-labelledby', 'enrollModalLabel');
    modal.setAttribute('aria-hidden', 'true');
    
    modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header bg-primary text-white">
                    <h5 class="modal-title" id="enrollModalLabel">Запись на курс: ${courseTitle}</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="enrollForm">
                        <div class="mb-3">
                            <label for="name" class="form-label">ФИО</label>
                            <input type="text" class="form-control" id="name" required>
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email</label>
                            <input type="email" class="form-control" id="email" required>
                        </div>
                        <div class="mb-3">
                            <label for="phone" class="form-label">Телефон</label>
                            <input type="tel" class="form-control" id="phone" required>
                        </div>
                        <div class="mb-3">
                            <label for="company" class="form-label">Компания</label>
                            <input type="text" class="form-control" id="company">
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <button type="submit" class="btn btn-primary">Отправить заявку</button>
                            <div class="course-price">${coursePrice}</div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Инициализация и отображение модального окна
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
    
    // Обработчик отправки формы
    document.getElementById('enrollForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            company: document.getElementById('company').value,
            course: courseTitle
        };
        
        // Здесь можно добавить код для отправки данных на сервер
        console.log('Отправка заявки:', formData);
        
        // Закрываем модальное окно
        modalInstance.hide();
        
        // Показываем сообщение об успешной отправке
        showSuccessMessage();
        
        // Удаляем модальное окно из DOM после закрытия
        modal.addEventListener('hidden.bs.modal', function() {
            document.body.removeChild(modal);
        });
    });
}

// Функция для отображения подробной информации о курсе
function showCourseDetails(courseTitle) {
    // Создаем модальное окно для отображения подробной информации
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'detailsModal';
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('aria-labelledby', 'detailsModalLabel');
    modal.setAttribute('aria-hidden', 'true');
    
    // Определяем содержимое в зависимости от названия курса
    let courseContent = '';
    
    if (courseTitle.includes('IP-телефония')) {
        courseContent = `
            <h5>О курсе:</h5>
            <p>Курс предназначен для IT-специалистов, желающих освоить технологии IP-телефонии. Вы изучите основы VoIP, протоколы SIP и H.323, научитесь настраивать IP-АТС и интегрировать телефонию с другими системами.</p>
            
            <h5>Программа курса:</h5>
            <ul>
                <li>Введение в IP-телефонию</li>
                <li>Протоколы VoIP (SIP, H.323, IAX)</li>
                <li>Настройка IP-АТС Asterisk</li>
                <li>Маршрутизация вызовов</li>
                <li>Интеграция с CRM-системами</li>
                <li>Безопасность IP-телефонии</li>
                <li>Мониторинг и отчетность</li>
            </ul>
            
            <h5>Требования к участникам:</h5>
            <p>Базовые знания сетевых технологий, понимание принципов работы TCP/IP.</p>
        `;
    } else if (courseTitle.includes('видеоконференций')) {
        courseContent = `
            <h5>О курсе:</h5>
            <p>Курс охватывает все аспекты организации видеоконференций: от выбора оборудования до настройки программного обеспечения и проведения эффективных онлайн-встреч.</p>
            
            <h5>Программа курса:</h5>
            <ul>
                <li>Обзор платформ для видеоконференций</li>
                <li>Настройка аудио и видео оборудования</li>
                <li>Организация вебинаров и онлайн-презентаций</li>
                <li>Управление участниками и модерация</li>
                <li>Запись и хранение видеоконференций</li>
                <li>Интеграция с календарями и системами планирования</li>
                <li>Обеспечение безопасности видеоконференций</li>
            </ul>
            
            <h5>Требования к участникам:</h5>
            <p>Базовые навыки работы с компьютером и интернетом.</p>
        `;
    } else if (courseTitle.includes('Администрирование систем')) {
        courseContent = `
            <h5>О курсе:</h5>
            <p>Углубленный курс для IT-специалистов по администрированию и обслуживанию мультимедийных систем в корпоративной среде.</p>
            
            <h5>Программа курса:</h5>
            <ul>
                <li>Архитектура мультимедийных систем</li>
                <li>Установка и настройка серверов</li>
                <li>Управление пользователями и правами доступа</li>
                <li>Мониторинг производительности</li>
                <li>Резервное копирование и восстановление</li>
                <li>Устранение неисправностей</li>
                <li>Оптимизация работы системы</li>
                <li>Обеспечение отказоустойчивости</li>
            </ul>
            
            <h5>Требования к участникам:</h5>
            <p>Опыт администрирования серверных систем, знание основ сетевых технологий.</p>
        `;
    }
    
    modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header bg-primary text-white">
                    <h5 class="modal-title" id="detailsModalLabel">${courseTitle}</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    ${courseContent}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                    <button type="button" class="btn btn-primary enroll-from-details">Записаться на курс</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Инициализация и отображение модального окна
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
    
    // Обработчик для кнопки записи из окна деталей
    modal.querySelector('.enroll-from-details').addEventListener('click', function() {
        modalInstance.hide();
        
        // Находим соответствующую кнопку записи на странице
        const courseCards = document.querySelectorAll('.course-item');
        let enrollButton;
        
        courseCards.forEach(card => {
            if (card.querySelector('h4').textContent === courseTitle) {
                enrollButton = card.querySelector('.btn-primary');
            }
        });
        
        if (enrollButton) {
            // Удаляем модальное окно из DOM
            modal.addEventListener('hidden.bs.modal', function() {
                document.body.removeChild(modal);
                // Показываем форму записи
                setTimeout(() => {
                    showEnrollForm(enrollButton);
                }, 500);
            });
        }
    });
    
    // Удаляем модальное окно из DOM после закрытия
    modal.addEventListener('hidden.bs.modal', function() {
        document.body.removeChild(modal);
    });
}

// Функция для отображения информации о функции курса
function showFeatureInfo(featureText) {
    // Создаем всплывающую подсказку
    const tooltip = document.createElement('div');
    tooltip.className = 'feature-tooltip';
    tooltip.style.position = 'fixed';
    tooltip.style.padding = '10px 15px';
    tooltip.style.backgroundColor = 'rgba(40, 120, 235, 0.9)';
    tooltip.style.color = '#fff';
    tooltip.style.borderRadius = '5px';
    tooltip.style.zIndex = '1000';
    tooltip.style.maxWidth = '300px';
    tooltip.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
    
    // Определяем содержимое в зависимости от текста функции
    let tooltipContent = '';
    
    switch(featureText) {
        case 'Базовые принципы VoIP':
            tooltipContent = 'Изучение основных принципов передачи голоса по IP-сетям, включая кодеки, протоколы и архитектуру VoIP-систем.';
            break;
        case 'Настройка IP-АТС':
            tooltipContent = 'Практические занятия по установке и настройке IP-АТС, включая маршрутизацию вызовов, создание внутренних номеров и подключение к провайдерам.';
            break;
        case 'Интеграция с CRM':
            tooltipContent = 'Методы интеграции IP-телефонии с CRM-системами для автоматизации бизнес-процессов и улучшения обслуживания клиентов.';
            break;
        case 'Выбор платформы':
            tooltipContent = 'Обзор и сравнение различных платформ для проведения видеоконференций, их преимущества и недостатки для разных сценариев использования.';
            break;
        case 'Настройка оборудования':
            tooltipContent = 'Рекомендации по выбору и настройке аудио и видео оборудования для обеспечения качественной связи во время видеоконференций.';
            break;
        case 'Проведение вебинаров':
            tooltipContent = 'Методики организации и проведения эффективных вебинаров, включая подготовку материалов, взаимодействие с аудиторией и анализ результатов.';
            break;
        case 'Мониторинг систем':
            tooltipContent = 'Инструменты и методы мониторинга работы мультимедийных систем, выявление узких мест и предотвращение сбоев.';
            break;
        case 'Устранение неполадок':
            tooltipContent = 'Практические навыки диагностики и устранения типичных проблем в работе IP-систем, включая сетевые и программные неисправности.';
            break;
        case 'Оптимизация работы':
            tooltipContent = 'Методы оптимизации производительности мультимедийных систем, настройка параметров для обеспечения максимальной эффективности.';
            break;
        default:
            tooltipContent = 'Подробная информация о данной функции будет доступна в полной программе курса.';
    }
    
    tooltip.textContent = tooltipContent;
    document.body.appendChild(tooltip);
    
    // Позиционируем подсказку рядом с курсором
    document.addEventListener('mousemove', moveTooltip);
    
    function moveTooltip(e) {
        tooltip.style.left = (e.clientX + 15) + 'px';
        tooltip.style.top = (e.clientY + 15) + 'px';
        
        // Проверяем, не выходит ли подсказка за пределы экрана
        const tooltipRect = tooltip.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        if (tooltipRect.right > viewportWidth) {
            tooltip.style.left = (e.clientX - tooltipRect.width - 15) + 'px';
        }
        
        if (tooltipRect.bottom > viewportHeight) {
            tooltip.style.top = (e.clientY - tooltipRect.height - 15) + 'px';
        }
    }
    
    // Удаляем подсказку при клике
    document.addEventListener('click', removeTooltip);
    
    function removeTooltip() {
        document.body.removeChild(tooltip);
        document.removeEventListener('mousemove', moveTooltip);
        document.removeEventListener('click', removeTooltip);
    }
    
    // Удаляем подсказку через 5 секунд
    setTimeout(removeTooltip, 5000);
}

// Функция для отображения сообщения об успешной отправке заявки
function showSuccessMessage() {
    const toast = document.createElement('div');
    toast.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    toast.innerHTML = `
        <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header bg-success text-white">
                <strong class="me-auto">Успешно!</strong>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.
            </div>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    const toastElement = toast.querySelector('.toast');
    const bsToast = new bootstrap.Toast(toastElement, { delay: 5000 });
    bsToast.show();
    
    // Удаляем элемент после скрытия
    toastElement.addEventListener('hidden.bs.toast', function() {
        document.body.removeChild(toast);
    });
}