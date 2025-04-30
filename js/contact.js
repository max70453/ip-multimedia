// Инициализация AOS
AOS.init();

// Данные об офисах
const offices = [
    {
        id: 1,
        name: 'Головной офис',
        address: 'ул. Примерная, 123, Москва',
        coordinates: [55.7558, 37.6173],
        phone: '+7 (949) 099 50 07',
        email: 'moscow@ip-multimedia.ru'
    },
    {
        id: 2,
        name: 'Офис в Санкт-Петербурге',
        address: 'ул. Тестовая, 456, Санкт-Петербург',
        coordinates: [59.9343, 30.3351],
        phone: '+7 (949) 099 50 08',
        email: 'spb@ip-multimedia.ru'
    },
    {
        id: 3,
        name: 'Офис в Донецке',
        address: 'ул. Тестовая, 789, Донецк',
        coordinates: [48.023, 37.8022],
        phone: '+7 (949) 099 50 09',
        email:'support@ip-multimedia.ru',
    }
];

// Данные об отделах
const departments = [
    {
        id: 1,
        name: 'Отдел продаж',
        category: 'sales',
        icon: 'fa-shopping-cart',
        phone: '+7 (949) 099 50 10',
        email: 'sales@ip-multimedia.ru',
        description: 'Консультации по решениям и продуктам'
    },
    {
        id: 2,
        name: 'Техническая поддержка',
        category: 'support',
        icon: 'fa-headset',
        phone: '+7 (949) 099 50 11',
        email: 'support@ip-multimedia.ru',
        description: 'Помощь в настройке и обслуживании'
    },
    {
        id: 3,
        name: 'Отдел разработки',
        category: 'development',
        icon: 'fa-code',
        phone: '+7 (949) 099 50 12',
        email: 'dev@ip-multimedia.ru',
        description: 'Разработка индивидуальных решений'
    }
];

// Инициализация карты
const map = L.map('officesMap').setView([55.7558, 37.6173], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Добавление маркеров офисов на карту
offices.forEach(office => {
    const marker = L.marker(office.coordinates)
        .addTo(map)
        .bindPopup(`
            <strong>${office.name}</strong><br>
            ${office.address}<br>
            Тел: ${office.phone}<br>
            Email: ${office.email}
        `);
});

// Обработка формы обратной связи
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        department: document.getElementById('department').value,
        message: document.getElementById('message').value
    };

    // Здесь будет логика отправки данных на сервер
    console.log('Отправка формы:', formData);
    alert('Спасибо за обращение! Мы свяжемся с вами в ближайшее время.');
    this.reset();
});

// Фильтрация отделов
function renderDepartments(filter = 'all') {
    const departmentGrid = document.querySelector('.department-grid');
    departmentGrid.innerHTML = '';

    const filteredDepartments = filter === 'all' 
        ? departments 
        : departments.filter(dept => dept.category === filter);

    filteredDepartments.forEach(dept => {
        const departmentCard = `
            <div class="col-lg-4 col-md-6" data-aos="fade-up">
                <div class="department-card">
                    <div class="icon">
                        <i class="fas ${dept.icon}"></i>
                    </div>
                    <h4>${dept.name}</h4>
                    <p>${dept.description}</p>
                    <div class="contact-info">
                        <p><i class="fas fa-phone me-2"></i>${dept.phone}</p>
                        <p><i class="fas fa-envelope me-2"></i>${dept.email}</p>
                    </div>
                </div>
            </div>
        `;
        departmentGrid.insertAdjacentHTML('beforeend', departmentCard);
    });
}

// Инициализация отображения отделов
renderDepartments();

// Обработка кликов по фильтрам отделов
document.querySelector('.department-filters').addEventListener('click', function(e) {
    if (e.target.classList.contains('btn')) {
        const filter = e.target.getAttribute('data-filter');
        
        // Обновление активного состояния кнопок
        this.querySelectorAll('.btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        // Обновление отображения отделов
        renderDepartments(filter);
    }
});