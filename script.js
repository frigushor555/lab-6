// Кнопка "Наверх" - упрощенная рабочая версия
document.addEventListener('DOMContentLoaded', function () {
    const scrollBtn = document.getElementById('scrollTopBtn');

    console.log('Кнопка найдена:', scrollBtn); // Для отладки

    if (!scrollBtn) {
        console.error('Кнопка "Наверх" не найдена!');
        return;
    }

    // Скрываем кнопку при загрузке
    scrollBtn.style.display = 'none';

    // Обработчик скролла
    window.addEventListener('scroll', function () {
        console.log('Прокрутка:', window.pageYOffset); // Для отладки

        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    });

    // Обработчик клика
    scrollBtn.addEventListener('click', function () {
        console.log('Клик по кнопке!'); // Для отладки

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Аккордеон
(function () {
    const headers = document.querySelectorAll('.accordion-header');
    if (!headers || headers.length === 0) {
        console.warn('Аккордеон: заголовки не найдены');
        return;
    }

    headers.forEach(header => {
        header.addEventListener('click', () => {
            const expanded = header.getAttribute('aria-expanded') === 'true';
            // Закрыть все (если нужен множественный — убрать этот блок)
            document.querySelectorAll('.accordion-header').forEach(h => {
                h.setAttribute('aria-expanded', 'false');
                const body = h.nextElementSibling;
                if (body) body.style.maxHeight = null;
            });

            if (!expanded) {
                header.setAttribute('aria-expanded', 'true');
                const body = header.nextElementSibling;
                if (body) {
                    body.style.maxHeight = body.scrollHeight + 'px';
                }
            }
        });

        const body = header.nextElementSibling;
        if (body && header.getAttribute('aria-expanded') === 'true') {
            body.style.maxHeight = body.scrollHeight + 'px';
        }
    });
})();

// Фильтруемая галерея и модальное окно
(function () {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.gallery-item');
    const gallery = document.getElementById('gallery');

    if (!gallery) {
        console.warn('Галерея не найдена');
        return;
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');

            items.forEach(it => {
                const cat = it.getAttribute('data-category');
                if (filter === 'all' || cat === filter) {
                    it.classList.remove('hidden');
                } else {
                    it.classList.add('hidden');
                }
            });
        });
    });

    // Модальное окно
    const modal = document.getElementById('imageModal');
    const modalImg = modal ? modal.querySelector('.modal-img') : null;
    const modalCaption = modal ? modal.querySelector('.modal-caption') : null;
    const modalClose = modal ? modal.querySelector('.modal-close') : null;

    function openModal(src, alt, caption) {
        if (!modal || !modalImg) return;
        modalImg.src = src;
        modalImg.alt = alt || '';
        modalCaption && (modalCaption.textContent = caption || alt || '');
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        if (modalImg) modalImg.src = '';
        document.body.style.overflow = '';
    }

    gallery.addEventListener('click', (e) => {
        const img = e.target.closest('img');
        if (!img) return;
        const src = img.src;
        const alt = img.alt;
        const caption = img.getAttribute('data-caption') || '';
        openModal(src, alt, caption);
    });

    modalClose && modalClose.addEventListener('click', closeModal);
    modal && modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
            closeModal();
        }
    });
})();