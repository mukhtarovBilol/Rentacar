document.addEventListener("DOMContentLoaded", function () {
    function loadContent(url, elementId) {
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                const element = document.getElementById(elementId);
                if (element) {
                    element.innerHTML = data;
                }
            })
            .catch(error => console.error(`Error loading ${elementId}:`, error));
    }

    // Загрузка навигации и футера
    Promise.all([
        loadContent('/azerbaijan/CommonNavAz.html', 'navbar'),
        loadContent('/azerbaijan/CommonFooterAz.html', 'footer')
    ])
        .then(() => {
            // Перезапускаем инициализацию событий после загрузки навигации и футера
            initNavEvents();
        })
        .catch(error => console.error('Error loading one or more components:', error));
});


// Функция для инициализации событий
function initNavEvents() {
    const icon = document.querySelectorAll(".question__card-icon");
    const answer = document.querySelectorAll(".question__answer");
    const carsItem = document.querySelectorAll(".cars__item");
    const tabsContentItem = document.querySelectorAll(".tabsContentItem");
    const navBurger = document.querySelector(".nav__burger");
    const navList = document.querySelector(".nav__list");
    const navListHelper = document.querySelector(".nav__list-helper");
    const navItem = document.querySelectorAll(".nav__item");

    if (navBurger) {
        navBurger.addEventListener("click", function () {
            navList.classList.toggle("active");
            navBurger.classList.toggle("active");
        });
    }

    if (navListHelper) {
        navListHelper.addEventListener("click", function () {
            navList.classList.remove("active");
            navBurger.classList.remove("active");
        });
    }

    navItem.forEach(item => {
        item.addEventListener("click", function () {
            navList.classList.remove("active");
            navBurger.classList.remove("active");
        });
    });

    icon.forEach((item, index) => {
        item.addEventListener("click", function () {
            answer[index].classList.toggle("active");
            item.textContent = item.textContent === '+' ? '-' : '+';
        });
    });

    carsItem.forEach((item, index) => {
        item.addEventListener("click", function () {
            carsItem.forEach((el, i) => {
                el.classList.remove("active");
                tabsContentItem[i].classList.remove("active");
            });
            item.classList.add("active");
            tabsContentItem[index].classList.add("active");
        });
    });
}