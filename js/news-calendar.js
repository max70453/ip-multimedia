// Инициализация календаря и функциональности новостного блока
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация тултипов для календаря
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })

    // Функциональность календаря
    const currentMonthEl = document.getElementById('current-month');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');

    // Текущая дата
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    // Обработчики кнопок переключения месяцев
    if (prevMonthBtn && nextMonthBtn) {
        prevMonthBtn.addEventListener('click', function() {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            updateCalendarHeader();
        });

        nextMonthBtn.addEventListener('click', function() {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            updateCalendarHeader();
        });
    }

    // Обновление заголовка календаря
    function updateCalendarHeader() {
        const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        if (currentMonthEl) {
            currentMonthEl.textContent = `${months[currentMonth]} ${currentYear}`;
        }
    }

    // Инициализация фильтрации новостей
    const newsTabLinks = document.querySelectorAll('.nav-link[data-bs-toggle="pill"]');
    newsTabLinks.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            
            // Удаляем активный класс у всех вкладок
            newsTabLinks.forEach(t => t.classList.remove('active'));
            
            // Добавляем активный класс текущей вкладке
            this.classList.add('active');
            
            // Скрываем все панели с контентом
            document.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.remove('show', 'active');
            });
            
            // Показываем выбранную панель
            const targetPane = document.querySelector(target);
            if (targetPane) {
                targetPane.classList.add('show', 'active');
            }
        });
    });

    // Обработка формы подписки
    const newsletterForm = document.querySelector('#latest-news form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Получаем данные формы
            const nameInput = this.querySelector('input[type="text"]');
            const emailInput = this.querySelector('input[type="email"]');
            const categories = [];
            
            // Собираем выбранные категории
            this.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
                categories.push(checkbox.nextElementSibling.textContent.trim());
            });
            
            // Проверяем заполнение обязательных полей
            if (nameInput.value && emailInput.value) {
                // Здесь будет код для отправки данных на сервер
                // Для демонстрации просто показываем сообщение
                alert(`Спасибо за подписку, ${nameInput.value}! Вы будете получать новости на email: ${emailInput.value}`);
                
                // Очищаем форму
                this.reset();
            }
        });
    }
});