(function ($) {
    "use strict";

    // Анимация при прокрутке с использованием Intersection Observer
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.wow');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated');
                const animationClass = entry.target.dataset.wowAnimation || 'animate__fadeIn';
                entry.target.classList.add(animationClass);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(element => observer.observe(element));
};

// Анимация для преимуществ и решений
const initAdvantagesAnimation = () => {
    const items = document.querySelectorAll('.advantage-item, .solution-item');
    items.forEach((item, index) => {
        item.classList.add('wow', 'zoomIn');
        item.dataset.wowDelay = `${index * 0.3}s`;
    });
};

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 40) {
            $('.navbar').addClass('sticky-top');
        } else {
            $('.navbar').removeClass('sticky-top');
        }
    });
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        margin: 45,
        dots: true,
        loop: true,
        center: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });

    // оставить комментарий
    const coments = $('.comments');
    
    $('.comment-form').on("submit", function (e) {
        e.preventDefault();
      const data = $('.comment-form').serializeArray();
      coments.append(`
        <div class="d-flex ms-5 mb-4">
            <div class="ps-3">
                <h6><a href="">${data[0].value}</a> <small><i>01 Мая 2023</i></small></h6>
                <p>
                    ${data[3].value}
                </p>
                <strong style="color: red;">Ожидает модерации</strong>
                <button class="btn btn-sm btn-light">Ответить</button>
            </div>
        </div>
    `)
    $('.comment-form').trigger("reset");
    });
    
})(jQuery);

