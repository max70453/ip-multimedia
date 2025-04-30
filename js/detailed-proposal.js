document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('detailedProposalForm');
    const modal = document.getElementById('detailedProposalModal');
    const modalInstance = new bootstrap.Modal(modal);

    // Маска для телефона
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        IMask(phoneInput, {
            mask: '+{7}(000)000-00-00'
        });
    }

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Валидация формы
        if (!form.checkValidity()) {
            e.stopPropagation();
            form.classList.add('was-validated');
            return;
        }

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        data.solutions = formData.getAll('solutions[]');

        try {
            // Здесь будет отправка данных на сервер
            // const response = await fetch('/api/detailed-proposal', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(data)
            // });

            // Временная имитация отправки
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Очистка формы и закрытие модального окна
            form.reset();
            form.classList.remove('was-validated');
            modalInstance.hide();

            // Показ уведомления об успешной отправке
            Swal.fire({
                title: 'Спасибо!',
                text: 'Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.',
                icon: 'success',
                confirmButtonText: 'OK',
                confirmButtonColor: '#008b8b'
            });

        } catch (error) {
            console.error('Ошибка при отправке формы:', error);
            Swal.fire({
                title: 'Ошибка!',
                text: 'Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.',
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#008b8b'
            });
        }
    });
});