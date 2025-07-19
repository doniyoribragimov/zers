jQuery(document).ready(function ($) {
    // ДЛЯ DISABLED КНОПКИ, ЕСЛИ ЧЕКБОКС В ФОРМЕ НЕ CHECKED
    $('.form__confirm input').click(function () {
        var isChecked = $(this).prop('checked');
        var $submitButton = $(this).closest('.form').find('button[type="submit"]');
        $submitButton.prop('disabled', !isChecked);
    });

    // ДЛЯ ОТКРЫТИЯ МОДАЛКИ
    function openModalOrMenu(trigger, targetSelector) {
        $(trigger).addClass('active');
        $('body').css('overflow-y', 'hidden');
        $(targetSelector).on('click', function (e) {
            if (e.target === this) {
                $(this).removeClass('active');
                $('body').css('overflow-y', 'initial');
            }
        });
    }

    // ДЛЯ ЗАКРЫТИЯ МОДАЛКИ, КОГДА ПРОКЛИКАНО ЗА ПРЕДЕЛЫ МОДАЛКИ
    function closeModalOrMenu(trigger) {
        $(trigger).removeClass('active');
        $('body').css('overflow-y', 'initial');
    }

    // ДЛЯ ВЫБОРА HREF ДЛЯ МОДАЛКИ
    $('a.getModal').on('click', function (e) {
        e.preventDefault();
        let triggerHref = $(this).attr('href');
        openModalOrMenu(triggerHref, triggerHref);
    });

    // ДЛЯ ЗАКРЫТИЯ МОДАЛКИ
    $('.modal__close').on('click', function () {
        closeModalOrMenu($(this).parents('.modal'));
    });

    // ДЛЯ ЗАКРЫТИЯ МОБИЛЬНОГО МЕНЮ
    $('.mobile-menu__close, .mobile-menu, .mobile-menu a').on('click', function () {
        closeModalOrMenu($(this).parents('.mobile-menu'));
    });

});

function createSelectTab(tabName, contentName, selectName) {
    tabName = document.querySelectorAll(tabName);
    contentName = document.querySelectorAll(contentName);
    const select = document.querySelector(selectName);

    if (select) {
        let tabsArray = Array.from(tabName);
        tabsArray.map((tab, tabIndex) => {
            tab.addEventListener('click', function (e) {
                e.preventDefault();
                for (let tabAll of tabName) tabAll.classList.remove('active');
                this.classList.add('active');

                for (let tabsContents of contentName) tabsContents.classList.remove('active');
                contentName[tabIndex].classList.add('active');
                select.selectedIndex = tabIndex;
            });
        });

        select.addEventListener('change', function () {
            let selectedIndex = this.selectedIndex;

            for (let tabAll of tabName) tabAll.classList.remove('active');
            for (let tabsContents of contentName) tabsContents.classList.remove('active');

            tabName[selectedIndex].classList.add('active');
            contentName[selectedIndex].classList.add('active');
        });
    }
}
createSelectTab('.item__list a', '.item .tabs__content', '.item__select');


// SWIPER слайдеры
const stratsSlider = new Swiper('.strats__slider', {
    loop: true,
    spaceBetween: 25,
    slidesPerView: 3,
    speed: 600,
    navigation: {
        prevEl: ".strats .arrow--left",
        nextEl: ".strats .arrow--right",
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
            spaceBetween: 10,
            autoHeight: true,
        },

        620: {
            spaceBetween: 20,
            slidesPerView: 2,
        },

        1400: {
            slidesPerView: 3,
        },
    }
});


const contactSlider = new Swiper('.contact__slider', {
    loop: true,
    spaceBetween: 30,
    slidesPerView: 1,
    speed: 600,
    autoHeight: true,
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    navigation: {
        prevEl: ".contact .arrow--left",
        nextEl: ".contact .arrow--right",
    },
  
    breakpoints: {
        0: {
            spaceBetween: 10,
        },

        620: {
            spaceBetween: 20,
        },

        1400: {
            spaceBetween: 30,
        },
    }
});


const partnersSlider = new Swiper('.partners__slider', {
    loop: true,
    spaceBetween: 20,
    slidesPerView: 4.5,
    speed: 600,
    navigation: {
        prevEl: ".partners .arrow--left",
        nextEl: ".partners .arrow--right",
    },
    breakpoints: {
        0: {
            slidesPerView: 1.5,
            spaceBetween: 18,
        },

        620: {
            slidesPerView: 2.5,
        },

        768: {
            slidesPerView: 3.5,
        },

        1024: {
            slidesPerView: 4.5,
        },

        1600: {
            slidesPerView: 4.5,
        },
    }
});

// ФУНКЦИЯ ДЛЯ ОТСЧЁТА ОТ 0 ДО N
function animateCounter(selector, duration = 2000) {
    const elements = document.querySelectorAll(selector);

    function startCounting(element) {
        const start = parseInt(element.dataset.counterStart, 10);
        const end = parseInt(element.dataset.counterEnd, 10);
        const increment = (end - start) / (duration / 16);
        let current = start;

        function updateCounter() {
            current += increment;
            if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                element.textContent = end.toFixed(0);
            } else {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            }
        }

        updateCounter();
    }

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounting(entry.target);
                observer.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.5 }); 

    elements.forEach(element => {
        observer.observe(element);
    });
}
animateCounter('.factory__line span', 3000);


// ДЛЯ ЗАКРЫТИЯ МОДАЛКИ, КОГДА ПРОКЛИКАНО ЗА ПРЕДЕЛЫ МОДАЛКИ - УНИВЕРСАЛЬНЫЙ
let body = document.querySelector('body')
function closeModal(modalName, reverse = false) {
    modalName = document.querySelector(modalName)
    window.addEventListener('click', function (e) {
        if (reverse) {
            if (e.target === modalName) {
                modalName.classList.remove('active')
                body.style.overflowY = 'initial'

            }
        } else {
            if (e.target !== modalName) {
                modalName.classList.remove('active')
                body.style.overflowY = 'initial'

            }
        }

    })
}
closeModal('.modal', true)
closeModal('.mobile-menu', true)


class PhoneInputFormatter {
    constructor(input) {
        this.input = input;
        this.initEvents();
    }

    getInputNumbersValue() {
        return this.input.value ? this.input.value.replace(/\D/g, "") : "";
    }

    onPhonePaste(e) {
        const inputNumbersValue = this.getInputNumbersValue();
        const pasted = e.clipboardData || window.clipboardData;
        if (pasted) {
            const pastedText = pasted.getData("Text");
            if (/\D/g.test(pastedText)) {
                this.input.value = inputNumbersValue;
            }
        }
    }

    onPhoneInput(e) {
        let inputNumbersValue = this.getInputNumbersValue(),
            selectionStart = this.input.selectionStart,
            formattedInputValue = "";

        if (!inputNumbersValue) {
            return (this.input.value = "");
        }

        if (this.input.value.length !== selectionStart) {
            if (e.data && /\D/g.test(e.data)) {
                this.input.value = inputNumbersValue;
            }
            return;
        }

        if (["7", "8", "9"].includes(inputNumbersValue[0])) {
            if (inputNumbersValue[0] === "9") inputNumbersValue = "7" + inputNumbersValue;
            const firstSymbols = inputNumbersValue[0] === "8" ? "8" : "+7";
            formattedInputValue = firstSymbols + " ";
            if (inputNumbersValue.length > 1) {
                formattedInputValue += "(" + inputNumbersValue.substring(1, 4);
            }
            if (inputNumbersValue.length >= 5) {
                formattedInputValue += ") " + inputNumbersValue.substring(4, 7);
            }
            if (inputNumbersValue.length >= 8) {
                formattedInputValue += "-" + inputNumbersValue.substring(7, 9);
            }
            if (inputNumbersValue.length >= 10) {
                formattedInputValue += "-" + inputNumbersValue.substring(9, 11);
            }
        } else {
            formattedInputValue = "+" + inputNumbersValue.substring(0, 16);
        }
        this.input.value = formattedInputValue;
    }

    onPhoneKeyDown(e) {
        const inputValue = this.input.value.replace(/\D/g, "");
        if (e.keyCode === 8 && inputValue.length === 1) {
            this.input.value = "";
        }
    }

    initEvents() {
        this.input.addEventListener("keydown", e => this.onPhoneKeyDown(e));
        this.input.addEventListener("input", e => this.onPhoneInput(e), false);
        this.input.addEventListener("paste", e => this.onPhonePaste(e), false);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('input[type="tel"]').forEach(input => {
        if (input) {
            new PhoneInputFormatter(input);
        }
    });
});

Fancybox.bind("[data-fancybox]", {
});

// ДЛЯ ОТОБРАЖЕНИЯ КАРТЫ
function initMap(mapElement) {
    let coordinates = mapElement.dataset.coor ? mapElement.dataset.coor.split(',').map(Number) : [55.740593, 37.665264];
    let hintContent = mapElement.dataset.hint;

    let myMap = new ymaps.Map(mapElement, {
        center: coordinates,
        zoom: 15,
        controls: []
    }, {
        searchControlProvider: 'yandex#search'
    });

    let myPlacemark = new ymaps.Placemark(
        coordinates,
        {
            hintContent: hintContent
        },
        {
            preset: 'islands#dotIcon',
            iconColor: '#891f7f'
        }
    );

    myMap.behaviors.disable('scrollZoom');
    myMap.controls.add('zoomControl');
    myMap.controls.add('rulerControl', {
        scaleLine: false
    });

    myMap.geoObjects.add(myPlacemark);
}

function initAdditionalMap(mapElement) {
    let coordinatesArray = mapElement.dataset.coors 
        ? mapElement.dataset.coors.split(';').map(coor => coor.split(',').map(Number))
        : [];
    
    if (coordinatesArray.length === 0) {
        console.error('No coordinates provided for map:', mapElement);
        return;
    }
    
    let myMap = new ymaps.Map(mapElement, {
        center: coordinatesArray[0],
        zoom: 12,
        controls: []
    }, {
        searchControlProvider: 'yandex#search'
    });
    
    coordinatesArray.forEach(coordinates => {
        let myPlacemark = new ymaps.Placemark(
            coordinates,
            {},
            {
                preset: 'islands#dotIcon',
                iconColor: '#891f7f'
            }
        );
        myMap.geoObjects.add(myPlacemark);
    });
    
    myMap.behaviors.disable('scrollZoom');
    myMap.controls.add('zoomControl');
    myMap.controls.add('rulerControl', { scaleLine: false });
}

document.addEventListener('DOMContentLoaded', function () {
    let additionalMapElements = document.querySelectorAll('.search-map');
    let observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                ymaps.ready(() => initAdditionalMap(entry.target));
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    additionalMapElements.forEach(mapElement => observer.observe(mapElement));
});

document.addEventListener('DOMContentLoaded', function () {
    let mapElements = document.querySelectorAll('.map');
    let observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                ymaps.ready(() => initMap(entry.target));
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    mapElements.forEach(mapElement => observer.observe(mapElement));
});


document.addEventListener('DOMContentLoaded', function () {
    const phoneBlock = document.querySelector('.header__phone');
    const current = phoneBlock.querySelector('.header__current a');
    const toggleImg = phoneBlock.querySelector('.header__current img');
    const dropdown = phoneBlock.querySelector('.header__dropdown');

    toggleImg.addEventListener('click', function (e) {
        e.stopPropagation();
        phoneBlock.classList.toggle('active');
    });

    dropdown.querySelectorAll('li a').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            current.textContent = this.textContent;
            current.setAttribute('href', this.getAttribute('href'));
            phoneBlock.classList.remove('active');
        });
    });

    document.addEventListener('click', function (e) {
        if (!phoneBlock.contains(e.target)) {
            phoneBlock.classList.remove('active');
        }
    });
})

document.addEventListener('DOMContentLoaded', function () {
    const scrollUpBtn = document.querySelector('.footer__up');
    scrollUpBtn.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
