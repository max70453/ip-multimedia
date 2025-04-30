// Инициализация AOS (Animate On Scroll) библиотеки
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация AOS с настройками
    AOS.init({
        duration: 1000,        // длительность анимации
        easing: 'ease-in-out', // тип анимации
        once: true,            // анимация происходит только один раз
        mirror: false,         // анимация не повторяется при прокрутке вверх
        offset: 120,           // смещение (в px) от элемента, когда анимация должна запуститься
    });

    // Добавление интерактивности к временной шкале
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.querySelector('.timeline-content').style.backgroundColor = '#f8f9fa';
            this.querySelector('.timeline-content').style.transform = 'translateY(-5px)';
            this.querySelector('.timeline-content').style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.querySelector('.timeline-content').style.backgroundColor = 'white';
            this.querySelector('.timeline-content').style.transform = 'translateY(0)';
            this.querySelector('.timeline-content').style.boxShadow = 'none';
        });
    });

    // Улучшенная анимация для иконок в секции ценностей
    const valueIcons = document.querySelectorAll('.values-icon i');
    
    // Добавляем стили для анимации иконок
    valueIcons.forEach((icon, index) => {
        // Базовые стили
        icon.style.transition = 'all 0.3s ease-in-out';
        icon.style.display = 'inline-block';
        
        // Начальная анимация с разной задержкой для каждой иконки
        setTimeout(() => {
            icon.style.transform = 'scale(1.2)';
            setTimeout(() => {
                icon.style.transform = 'scale(1)';
            }, 300);
        }, index * 200);
        
        // Периодическая пульсация
        setInterval(() => {
            icon.classList.add('animated', 'pulse');
            
            setTimeout(() => {
                icon.classList.remove('animated', 'pulse');
            }, 1000);
        }, 5000 + (index * 1000)); // Разное время для каждой иконки
        
        // Интерактивность при наведении
        const parentItem = icon.closest('.values-item');
        if (parentItem) {
            parentItem.addEventListener('mouseenter', function() {
                icon.style.transform = 'scale(1.5) rotate(10deg)';
                icon.style.color = '#ffffff'; // Меняем цвет на белый при наведении
            });
            
            parentItem.addEventListener('mouseleave', function() {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.color = ''; // Возвращаем исходный цвет
            });
            
            // Добавляем эффект при клике
            parentItem.addEventListener('click', function() {
                // Анимация вращения
                icon.style.transform = 'scale(1.2) rotate(360deg)';
                
                setTimeout(() => {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }, 500);
                
                // Подсветка всего блока
                this.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.5)';
                
                setTimeout(() => {
                    this.style.boxShadow = '';
                }, 500);
            });
        }
    });
    
    // Добавляем эффект свечения для блоков ценностей
    const valuesItems = document.querySelectorAll('.values-item');
    valuesItems.forEach(item => {
        item.style.transition = 'all 0.3s ease';
        item.style.borderRadius = '10px';
        item.style.overflow = 'hidden';
    });
    
    // Добавляем анимацию появления для всех секций при скролле
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.classList.add('section-animated');
        sectionObserver.observe(section);
    });
});

// Добавляем стили для анимации секций
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .section-animated {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .section-visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .team-bio {
            transition: opacity 0.3s ease;
            background-color: #f8f9fa;
            padding: 10px;
            border-radius: 5px;
            margin-top: 10px;
        }
        
        .certificate-item {
            cursor: pointer;
            overflow: hidden;
            position: relative;
            margin-bottom: 20px;
            border-radius: 5px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .certificate-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(0,0,0,0.2);
        }
        
        .certificate-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .certificate-info {
            color: white;
            text-align: center;
            padding: 20px;
        }
    `;
    document.head.appendChild(style);
});