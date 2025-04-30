// Данные о кейсах
const cases = [
    {
        id: 1,
        title: 'Модернизация контакт-центра банка',
        industry: 'finance',
        solution: 'cc',
        image: 'img/bank.png',
        description: 'Внедрение современного контакт-центра для крупного банка',
        clientTask: 'Повышение эффективности обработки клиентских обращений и улучшение качества обслуживания',
        solutions: [
            { name: 'Контакт-центр', link: 'solutions.html#cc' },
            { name: 'Речевая аналитика', link: 'solutions.html#analytics' }
        ],
        results: {
            metrics: [
                { label: 'Скорость обработки обращений', before: 15, after: 5 },
                { label: 'Удовлетворенность клиентов', before: 75, after: 95 }
            ]
        },
        testimonial: {
            text: 'Благодаря новому решению мы смогли значительно повысить качество обслуживания клиентов',
            author: 'Директор по клиентскому сервису'
        },
        gallery: ['img/bank-1.webp', 'img/bank-2.jpg', 'img/bank-3.jpg'],
        location: { lat:  48.023, lng: 37.8022, name: 'Донецк' }
    },
    // Дополнительные кейсы будут добавлены здесь
];

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    initializeFilters();
    renderCases(cases);
    initializeMap();
    initializeCounters();
});

// Инициализация фильтров
function initializeFilters() {
    const industryFilter = document.getElementById('industryFilter');
    const solutionFilter = document.getElementById('solutionFilter');

    [industryFilter, solutionFilter].forEach(filter => {
        filter.addEventListener('change', () => {
            const filteredCases = filterCases(
                industryFilter.value,
                solutionFilter.value
            );
            renderCases(filteredCases);
        });
    });
}

// Фильтрация кейсов
function filterCases(industry, solution) {
    return cases.filter(caseItem => {
        const industryMatch = !industry || caseItem.industry === industry;
        const solutionMatch = !solution || caseItem.solution === solution;
        return industryMatch && solutionMatch;
    });
}

// Отрисовка карточек кейсов
function renderCases(casesToRender) {
    const grid = document.getElementById('casesGrid');
    grid.innerHTML = casesToRender.map(caseItem => `
        <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
            <div class="case-card" data-case-id="${caseItem.id}">
                <img src="${caseItem.image}" style="width: 100%;" class="case-image" alt="${caseItem.title}">
                <div class="case-content">
                    <div class="case-tags">
                        <span class="case-tag industry">${getIndustryName(caseItem.industry)}</span>
                        <span class="case-tag solution">${getSolutionName(caseItem.solution)}</span>
                    </div>
                    <h5>${caseItem.title}</h5>
                    <p>${caseItem.description}</p>
                    <button class="btn btn-primary" onclick="showCaseDetails(${caseItem.id})">Подробнее</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Отображение детальной информации о кейсе
function showCaseDetails(caseId) {
    const caseData = cases.find(c => c.id === caseId);
    const modal = new bootstrap.Modal(document.getElementById('caseModal'));
    
    document.querySelector('#caseModal .modal-title').textContent = caseData.title;
    
    const modalBody = document.querySelector('#caseModal .modal-body');
    modalBody.innerHTML = `
        <div class="case-modal-content">
            <div class="case-section">
                <h4 class="case-section-title">Задача клиента</h4>
                <p>${caseData.clientTask}</p>
            </div>
            
            <div class="case-section">
                <h4 class="case-section-title">Использованные решения</h4>
                <div class="solutions-links">
                    ${caseData.solutions.map(sol => 
                        `<a href="${sol.link}" class="solution-link">${sol.name}</a>`
                    ).join('')}
                </div>
            </div>
            
            <div class="case-section">
                <h4 class="case-section-title">Результаты внедрения</h4>
                <canvas id="resultsChart"></canvas>
            </div>
            
            <div class="case-section">
                <h4 class="case-section-title">Отзыв клиента</h4>
                <div class="testimonial-slider">
                    <blockquote>
                        <p>${caseData.testimonial.text}</p>
                        <footer>${caseData.testimonial.author}</footer>
                    </blockquote>
                </div>
            </div>
            
            <div class="case-section">
                <h4 class="case-section-title">Галерея реализации</h4>
                <div class="gallery-container">
                    ${caseData.gallery.map(img => 
                        `<div class="gallery-item">
                            <img src="${img}" alt="Фото реализации">
                        </div>`
                    ).join('')}
                </div>
            </div>
        </div>
    `;

    // Инициализация графика результатов
    initializeResultsChart(caseData.results.metrics);
    
    modal.show();
}

// Инициализация графика результатов
function initializeResultsChart(metrics) {
    const ctx = document.getElementById('resultsChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: metrics.map(m => m.label),
            datasets: [
                {
                    label: 'До внедрения',
                    data: metrics.map(m => m.before),
                    backgroundColor: '#cce5ff'
                },
                {
                    label: 'После внедрения',
                    data: metrics.map(m => m.after),
                    backgroundColor: '#28a745'
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            },
            animation: {
                duration: 1500
            }
        }
    });
}

// Инициализация карты
function initializeMap() {
    const map = L.map('implementationMap').setView([55.7558, 37.6173], 4);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    cases.forEach(caseItem => {
        L.marker([caseItem.location.lat, caseItem.location.lng])
            .bindPopup(`<b>${caseItem.title}</b><br>${caseItem.location.name}`)
            .addTo(map);
    });
}

// Инициализация счетчиков статистики
function initializeCounters() {
    const counterUpElements = document.querySelectorAll('[data-toggle="counter-up"]');
    
    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const duration = 2000;
                    const startValue = 0;
                    const endValue = parseInt(element.textContent);
                    
                    element.classList.add('visible');
                    
                    const counter = {
                        value: startValue
                    };
                    
                    gsap.to(counter, {
                        value: endValue,
                        duration: duration / 1000,
                        ease: 'power1.out',
                        onUpdate: () => {
                            element.textContent = Math.round(counter.value);
                        }
                    });
                    
                    observer.unobserve(element);
                }
            });
        },
        { threshold: 0.5 }
    );
    
    counterUpElements.forEach(el => observer.observe(el));
}

// Вспомогательные функции для отображения названий
function getIndustryName(industry) {
    const industries = {
        telecom: 'Телекоммуникации',
        finance: 'Финансы',
        retail: 'Ритейл',
        manufacturing: 'Производство'
    };
    return industries[industry] || industry;
}

function getSolutionName(solution) {
    const solutions = {
        uc: 'Объединенные коммуникации',
        cc: 'Контакт-центр',
        video: 'Видеоконференции'
    };
    return solutions[solution] || solution;
}