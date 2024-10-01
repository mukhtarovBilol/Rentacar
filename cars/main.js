var innerNumber1 = 0;
var innerNumber2 = 0;
var innerNumber3 = 0;


document.addEventListener("DOMContentLoaded", () => {
    fetch('../price.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network error');
            }
            return response.json();
        })
        .then(data => {
            const model = getModelFromTitle();
            if (model) {
                renderCarPrices(data, model);
            } else {
                console.error('Model not found in header');
            }
        })
        .catch(error => console.error('Error loading JSON file:', error));
});

function getModelFromTitle() {
    const titleElement = document.querySelector('.card__title');
    if (titleElement) {
        // Получаем текст заголовка и заменяем множественные пробелы на один
        const titleText = titleElement.textContent.trim().replace(/\s+/g, ' ');
        const modelText = titleText.replace(/^Rent\s+/, '');

        return modelText || null;
    }
    return null;
}


function renderCarPrices(data, model) {
    console.log(model);

    const container = document?.getElementById('car-prices');
    container.innerHTML = '';

    let found = false;


    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            if (key === model) {

                const prices = data[key];
                found = true;

                const carSection = document.createElement('div');
                carSection.className = 'car-section';

                prices.forEach((priceInfo, index) => {
                    const priceDiv = document.createElement('div');
                    priceDiv.className = 'price__info';

                    const priceLabel = document.createElement('p');
                    priceLabel.className = 'price__txt';
                    priceLabel.textContent = priceInfo.day;

                    const priceAmountWrapper = document.createElement('div');
                    priceAmountWrapper.className = 'price__all-helper';

                    const priceAmount = document.createElement('p');
                    priceAmount.className = `price__subtitle number${index + 1}`;
                    priceAmount.textContent = priceInfo.price;

                    const currency = document.createElement('span');
                    currency.textContent = priceInfo.currency;

                    priceAmountWrapper.appendChild(priceAmount);
                    priceAmountWrapper.appendChild(currency);

                    priceDiv.appendChild(priceLabel);
                    priceDiv.appendChild(priceAmountWrapper);
                    carSection.appendChild(priceDiv);
                });

                container.appendChild(carSection);
                updateInnerNumbers();
                break; // Прерываем цикл после нахождения нужной модели
            }
        }
    }

    if (!found) {
        const noDataMessage = document.createElement('p');
        noDataMessage.textContent = ' No data available for this car model.';
        container.appendChild(noDataMessage);
    }
}

function updateInnerNumbers() {
    const number1Element = document.querySelector('.number1');
    const number2Element = document.querySelector('.number2');
    const number3Element = document.querySelector('.number3');

    if (number1Element) {
        innerNumber1 = parseFloat(number1Element.textContent) || 0;
    }
    if (number2Element) {
        innerNumber2 = parseFloat(number2Element.textContent) || 0;
    }
    if (number3Element) {
        innerNumber3 = parseFloat(number3Element.textContent) || 0;
    }
}

var swiper = new Swiper(".mySwiper", {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
});
var swiper2 = new Swiper(".mySwiper2", {
    spaceBetween: 10,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    thumbs: {
        swiper: swiper,
    },
});

// check
const checkbox = document.querySelector(".checkbox");
const checkbox2 = document.querySelector(".checkbox2")
const morePrice = document.querySelector(".more__price");
const moreInfoPrice = document.querySelector(".more__info-price")
const sit = document.querySelector(".sit");
const animals = document.querySelector(".animals");
const drive = document.querySelector(".drive");
const returned = document.querySelector(".return")
const button = document.querySelector(".button")
const headerSelectValue7 = document.querySelector(".header__info-selectValue7");
const headerSelectValue8 = document.querySelector(".header__info-selectValue8");
const getcars = document.querySelectorAll(".getcars");
const getcars2 = document.querySelectorAll(".getcars2");
const number1 = document.querySelector(".number1")
const number2 = document.querySelector(".number2")
const number3 = document.querySelector(".number3")
let CommonPrice = Number(morePrice?.innerHTML)
let allPrice = Number(morePrice?.innerHTML)
var s = 0 //это место получение офис и т.д(1)
var s2 = 0 // это место получение офис и т.д(2)
const headerInfoInput = document.querySelector(".header__info-input");
const headerInfoInput2 = document.querySelector(".header__info-input2")
const headerInfoDataSelect = document.querySelector(".header__info-date-select");
const select2 = document.querySelector(".select2");
const select3 = document.querySelector(".select3");
const select4 = document.querySelector(".select4");
const headerInfoSelect = document.querySelector(".header__info-selectValue9");

// count passanger
var countPassanger = '0'
headerInfoSelect?.addEventListener("input", function () {
    // console.log(headerInfoSelect.value);
    countPassanger = headerInfoSelect.value
})
// count passanger

// дата получения
var getcar = ""
headerInfoInput.addEventListener("change", function () {
    // console.log(headerInfoInput.value);
    getcar = headerInfoInput.value
})

// дата получения

// дата возврата
var comeback = '00'
headerInfoInput2.addEventListener("change", function () {
    // console.log(headerInfoInput2.value);
    comeback = headerInfoInput2.value
})

var getEmail = "" // for email
// get email
document.getElementById("email").addEventListener("change", function () {
    getEmail = document.getElementById("email").value
})

// get title
var getTitle = ''
const cardTitle = document.querySelector(".card__title")
getTitle = cardTitle.innerText
// get title

// date

// Инициализация переменных
var startInputHours = 0;
var endInputHours = 0;
var time = "00"; // для email
var endTime = "00"; // для email

// Устанавливаем сегодняшнюю дату как минимальную для получения и возврата
var today = new Date().toISOString().split('T')[0];
document.getElementById("start_date").min = today;
document.getElementById("end_date").min = today;

// Делаем все поля отключенными, кроме первого
document.querySelectorAll("input").forEach(input => {
    if (input.id !== "start_date") {
        input.disabled = true;
    }
});

var startInputHours = 0;
var endInputHours = 0;

function calculate() {
    var startDate = new Date(document.getElementById("start_date").value);
    var endDate = new Date(document.getElementById("end_date").value);

    // Количество дней аренды
    var differenceInTime = endDate.getTime() - startDate.getTime();
    var differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24)); // округляем вверх

    // Учитываем, если время начала меньше времени окончания
    if (startInputHours <= endInputHours) {
        differenceInDays++;
    }

    // Здесь должна быть ваша логика для расчета стоимости аренды
    calculateRentalCost(differenceInDays);
}

function checkButtonState() {
    var startDate = document.getElementById("start_date").value;
    var endDate = document.getElementById("end_date").value;
    var startTime = document.getElementById("start").value;
    var endTime = document.getElementById("end").value;

    var isButtonEnabled = startDate && endDate && startTime && endTime;

    // Проверяем, что даты не в прошлом и дата окончания больше даты начала
    if (isButtonEnabled) {
        var today = new Date().setHours(0, 0, 0, 0);
        var selectedStartDate = new Date(startDate).setHours(0, 0, 0, 0);
        var selectedEndDate = new Date(endDate).setHours(0, 0, 0, 0);
        
        // Условие проверки
        if (selectedStartDate < today || selectedEndDate < today || selectedEndDate <= selectedStartDate) {
            isButtonEnabled = false;
        }
    }

    var submitButton = document.getElementById("submitButton");
    if (submitButton) {
        submitButton.disabled = !isButtonEnabled;
    }
}

function enableNextField(currentField) {
    if (currentField.nextElementSibling) {
        currentField.nextElementSibling.disabled = false; // Активируем следующее поле
        currentField.nextElementSibling.focus();
    }
}

document.getElementById("start").addEventListener("change", function () {
    var startInput = this.value.split(":");
    startInputHours = Number(startInput[0]) + 3; // Учитываем часовой пояс

    document.getElementById("end_date").disabled = false; // Активируем выбор даты возврата
    enableNextField(this); // Активируем следующее поле
    checkButtonState();
});

document.getElementById("end").addEventListener("change", function () {
    var endInput = this.value.split(":");
    endInputHours = Number(endInput[0]);
    endTime = this.value;

    calculate();
    checkButtonState();
});

document.getElementById("start_date").addEventListener("input", function () {
    var selectedStartDate = new Date(this.value);
    var today = new Date();
    today.setHours(0, 0, 0, 0); // Убираем время для сравнения

    if (selectedStartDate < today) {
        alert("Вы не можете выбрать прошедшую дату.");
        this.value = today.toISOString().split('T')[0];
        return;
    }

    // Устанавливаем минимально допустимую дату возврата (на 2 дня позже)
    var minimumReturnDate = new Date(selectedStartDate);
    minimumReturnDate.setDate(minimumReturnDate.getDate() + 2);
    document.getElementById("end_date").min = minimumReturnDate.toISOString().split('T')[0];

    resetEndDateIfInvalid(minimumReturnDate);
    checkButtonState();
    setTimeout(() => openDatePicker(this), 0);
});

document.getElementById("end_date").addEventListener("input", function () {
    var selectedEndDate = new Date(this.value);
    var selectedStartDate = new Date(document.getElementById("start_date").value);
    selectedStartDate.setHours(0, 0, 0, 0);

    var minimumReturnDate = new Date(selectedStartDate);
    minimumReturnDate.setDate(minimumReturnDate.getDate() + 2);

    if (selectedEndDate < minimumReturnDate) {
        alert("Дата возврата должна быть минимум на 2 дня позже даты получения.");
        this.value = minimumReturnDate.toISOString().split('T')[0]; // Устанавливаем минимально допустимую дату
    }

    calculate();
    checkButtonState();
});

function resetEndDateIfInvalid(minimumReturnDate) {
    var currentEndDate = new Date(document.getElementById("end_date").value);
    if (currentEndDate < minimumReturnDate) {
        document.getElementById("end_date").value = minimumReturnDate.toISOString().split('T')[0];
    }
}

function openDatePicker(element) {
    if (typeof element.showPicker === 'function') {
        element.showPicker();
    } else {
        element.focus();
        element.click();
    }
}

document.getElementById("start_date").addEventListener("input", checkButtonState);
document.getElementById("end_date").addEventListener("input", checkButtonState);

var prices = 0;

function calculateRentalCost(days) {
    if (days >= 2 && days <= 7) {
        // console.log(days);
        prices = innerNumber1 * days
        CommonPrice += s
        CommonPrice += s2
        if (morePrice) {
            morePrice.innerHTML = CommonPrice += prices;
        }
        CommonPrice -= s
        CommonPrice -= s2
        CommonPrice -= prices
    } else if (days >= 8 && days <= 20) {
        // console.log(days);
        CommonPrice += s2
        CommonPrice += s
        prices = innerNumber2 * days
        if (morePrice) {
            morePrice.innerHTML = CommonPrice += prices;
        }
        CommonPrice -= s2
        CommonPrice -= s
        CommonPrice -= prices
    } else {
        // console.log(days);
        CommonPrice += s2
        CommonPrice += s
        prices = innerNumber3 * days
        if (morePrice) {
            morePrice.innerHTML = CommonPrice += prices;
        }
        CommonPrice -= s
        CommonPrice -= s2
        CommonPrice -= prices
    }
}

// date

var getsCars = "Офис"
headerSelectValue7?.addEventListener("change", function () {
    getsCars = headerSelectValue7.value
    if (headerSelectValue7.value == 'otel') {
        s = 10
        CommonPrice += prices
        CommonPrice += s2
        morePrice.innerHTML = CommonPrice += s
        CommonPrice -= s
        CommonPrice -= s2
        CommonPrice -= prices
    } else if (headerSelectValue7.value == 'airport2') {
        s = 25
        CommonPrice += prices
        CommonPrice += s2
        morePrice.innerHTML = CommonPrice += s
        CommonPrice -= s
        CommonPrice -= s2
        CommonPrice -= prices
    } else {
        s = 0
        CommonPrice += prices
        CommonPrice += s2
        morePrice.innerHTML = CommonPrice -= s
        CommonPrice -= prices
        CommonPrice -= s2
    }
})


var backCars = 'Офис'
headerSelectValue8?.addEventListener("change", function () {
    backCars = headerSelectValue8.value
    if (headerSelectValue8.value == 'otel') {
        s2 = 10
        CommonPrice += prices
        CommonPrice += s
        morePrice.innerHTML = CommonPrice += s2
        CommonPrice -= s2
        CommonPrice -= s
        CommonPrice -= prices
    } else if (headerSelectValue8.value == 'airaport2') {
        s2 = 25
        CommonPrice += prices
        CommonPrice += s
        morePrice.innerHTML = CommonPrice += s2
        CommonPrice -= s2
        CommonPrice -= s
        CommonPrice -= prices
    } else {
        s2 = 0
        CommonPrice += prices
        CommonPrice += s
        morePrice.innerHTML = CommonPrice -= s2
        CommonPrice -= prices
        CommonPrice -= s
    }
})

checkbox?.addEventListener("click", function () {
    checkbox.classList.toggle("active")
    if (checkbox?.classList == 'checkbox active') {
        let price = Number(moreInfoPrice.innerHTML)
        CommonPrice += s
        CommonPrice += prices
        CommonPrice += s2
        morePrice.innerHTML = CommonPrice += price
        CommonPrice -= s
        CommonPrice -= s2
        CommonPrice -= prices
        allPrice = CommonPrice
    } else {
        CommonPrice += s
        CommonPrice += s2
        CommonPrice += prices
        let price = Number(moreInfoPrice.innerHTML)
        morePrice.innerHTML = CommonPrice -= price
        CommonPrice -= s
        CommonPrice -= s2
        CommonPrice -= prices
        allPrice = CommonPrice
    }
})

// check

// countryCode

const countryCode = document.querySelector("#countryCode")


// Функция для автоматического добавления знаков "-" в номере телефона
const formNumber = document.querySelector(".form__number")
var phoneNumber = 0
formNumber.addEventListener("input", function () {
    phoneNumber = this.value;
    // Удаляем все символы, кроме цифр
    phoneNumber = phoneNumber.replace(/\D/g, '');
    // Ограничиваем длину номера до 10 символов (XXXXXXXXXX)
    phoneNumber = phoneNumber.substring(0, 11);
    // Форматируем номер в требуемый вид (XX) XXX-XX-XX
    if (phoneNumber.length > 2) {
        phoneNumber = '(' + phoneNumber.substring(0, 2) + ') ' + phoneNumber.substring(2);
    }
    if (phoneNumber.length > 14) {
        phoneNumber = phoneNumber.substring(0, 14) + '-' + phoneNumber.substring(14);
    }
    if (phoneNumber.length > 8) {
        phoneNumber = phoneNumber.substring(0, 8) + '-' + phoneNumber.substring(8);
    }
    this.value = phoneNumber;
});

// Получаем элемент инпута

// Функция для ограничения длины ввода
function limitInputLength(event) {
    const input = event.target;

    // Получаем текущее значение инпута
    const value = input.value;

    // Если длина значения превышает 4 символа, обрезаем лишние символы
    if (value.length > 4) {
        input.value = value.slice(0, 4);
    }
}

// Закрытие модального окна
document.getElementById("close-my-modal-btn").addEventListener("click", function () {
    document.getElementById("my-modal").classList.remove("open");
});

// Закрытие модального окна при нажатии на Esc
window.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        document.getElementById("my-modal").classList.remove("open");
    }
});

// Закрытие модального окна при клике вне его
document.querySelector("#my-modal .modal__box").addEventListener('click', event => {
    event._isClickWithInModal = true;
});
document.getElementById("my-modal").addEventListener('click', event => {
    if (event._isClickWithInModal) return;
    event.currentTarget.classList.remove('open');
});

document.getElementById("myForm")?.addEventListener("submit", function(event) {
    event.preventDefault(); // Предотвращаем стандартное поведение формы
    sendMail(); // Вызываем функцию отправки
});

function sendMail() {
    // Получаем значения полей
    const name = document.querySelector("#name").value.trim();
    const countryCode = document.querySelector("#countryCode").value.trim();
    const phoneNumber = document.querySelector("#message").value.trim();
    const email = document.querySelector("#email").value.trim();

    // Проверка обязательных полей, кроме textarea
    if (name === '' || countryCode === '' || phoneNumber === '' || email === '') {
        alert("Пожалуйста, заполните все обязательные поля.");
        return; // Прерываем выполнение функции, если поля не заполнены
    }

    // Проверка формата email (обязательно наличие точки и доменной части)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Пожалуйста, введите корректный адрес электронной почты.");
        return; // Прерываем выполнение функции, если email некорректен
    }

    // Проверка формата телефонного номера (пример для формата +994 (XX) XXX-XX-XX)
    const phonePattern = /^\+\d{3}\s*\(\d{2}\)\s*\d{3}-\d{2}-\d{2}$/;
    if (!phonePattern.test(countryCode + phoneNumber)) {
        alert("Пожалуйста, введите корректный номер телефона в формате: +994 (XX) XXX-XX-XX");
        return; // Прерываем выполнение функции, если номер телефона некорректен
    }

    (function () {
        emailjs.init("ycbnej7QH72zg6TGT");
    })();

    var childrenSitting = (checkbox?.classList.contains('active')) ? "yes" : "no";

    var params = {
        name: name + ' ' + "Car make " + getTitle + ", Date and time of receiving the car: " + getcar + ' ' + time + ', Return date and time: ' + comeback + ' ' + endTime,
        message: countryCode + phoneNumber + ', Gmail client ' + email + ', Do I need a car seat?: ' + childrenSitting + ', Pick up location: ' + getsCars + ', Car return location: ' + backCars + ', Number of passengers: ' + countPassanger + ", Total: " + morePrice?.innerHTML
    };

    console.log(params);

    var serviceID = "service_ajn9ixc"; // Укажите ваш ID сервиса
    var templateID = "template_bge6w0q"; // Укажите ваш ID шаблона

    emailjs.send(serviceID, templateID, params)
        .then(res => {
            alert("Спасибо. Заявка принята. Наш менеджер свяжется с вами в ближайшее время.");
            document.getElementById("myForm").reset(); // Сброс формы после успешной отправки
            document.getElementById("my-modal").classList.remove("open"); // Закрыть модальное окно
        })
        .catch(error => {
            console.error("Ошибка отправки:", error);
            alert("Что-то пошло не так. Попробуйте снова.");
        });
}
