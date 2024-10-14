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

// Обработка изменения времени получения
document.getElementById("start").addEventListener("change", function () {
    var startInput = this.value.split(":");
    startInputHours = Number(startInput[0]) + 3; // Учитываем часовой пояс
    var startInputHours2 = Number(startInput[0]); // Учитываем часовой пояс



    // Получаем текущее время и дату
    var now = new Date();
    var currentDate = now.toISOString().split("T")[0]; // Текущая дата в формате YYYY-MM-DD
    var selectedDate = document.getElementById("start_date").value; // Получаем выбранную дату

    // Проверяем, что выбрана дата
    if (!selectedDate) {
        alert("Пожалуйста, выберите дату.");
        return;
    }

    // Получаем текущее время
    var currentHours = now.getHours();
    var currentMinutes = now.getMinutes();

    // Проверяем, выбрано ли время в прошлом
    // Если выбрана текущая дата, проверяем, что время не в прошлом
    if (startInputHours2 < currentHours ||
        (startInputHours2 === currentHours && Number(startInput[1]) < currentMinutes)) {
        alert("Select a time no earlier than current.");
        this.value = ""; // Сбрасываем значение
        return;
    } else {
        // Если дата в будущем, разрешаем любое время
        document.getElementById("end_date").disabled = false; // Активируем выбор даты возврата
        var startTime = document.getElementById("start").value;
        time = startTime
    }



    // Проверяем наличие всех необходимых значений и вызываем calculate
    checkAndCalculate();
});

// Обработка изменения времени возврата
document.getElementById("end").addEventListener("change", function () {
    var endInput = this.value.split(":");
    endInputHours = Number(endInput[0]);
    endTime = this.value;

    // Проверяем наличие всех необходимых значений и вызываем calculate
    checkAndCalculate();
});

// START DATE СТОИТ В ДРУГОМ JS ФАЙЛЕ 


// Функция для проверки наличия всех значений и запуска расчета
function checkAndCalculate() {
    var startDate = document.getElementById("start_date").value;
    var endDate = document.getElementById("end_date").value;
    var startTime = document.getElementById("start").value;
    var endTime = document.getElementById("end").value;

    if (startDate && endDate && startTime && endTime) {
        calculate();
    }
}

function setMinStartTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const minTime = `${hours}:${minutes}`;

    // Устанавливаем минимальное время для поля начала
    document.getElementById('start').setAttribute('min', minTime);
}

// Установка минимального времени при загрузке
window.onload = setMinStartTime;


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
        s = 15
        CommonPrice += prices
        CommonPrice += s2
        morePrice.innerHTML = CommonPrice += s
        CommonPrice -= s
        CommonPrice -= s2
        CommonPrice -= prices
    } else if (headerSelectValue7.value == 'airport2') {
        s = 30
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
        s2 = 15
        CommonPrice += prices
        CommonPrice += s
        morePrice.innerHTML = CommonPrice += s2
        CommonPrice -= s2
        CommonPrice -= s
        CommonPrice -= prices
    } else if (headerSelectValue8.value == 'airaport2') {
        s2 = 30
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

const formBtn = document.querySelector(".form__btn");
formBtn.addEventListener("click", function (event) {
    event.preventDefault(); // Предотвращаем отправку формы на сервер
    console.log("Форма не отправлена");
});

function sendMail() {
    // Получаем значения полей
    const name = document.querySelector("#name").value.trim();
    const countryCode = document.querySelector("#countryCode").value.trim();
    const phoneNumber = document.querySelector("#message").value.trim();
    const email = document.querySelector("#email").value.trim();

    // Проверка обязательных полей, кроме textarea
    if (name === '' || countryCode === '' || phoneNumber === '' || email === '') {
        alert("Please fill out all required fields.");
        return; // Прерываем выполнение функции, если поля не заполнены
    }

    // Проверка формата email (обязательно наличие точки и доменной части)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return; // Прерываем выполнение функции, если email некорректен
    }
    if (document.querySelector("#name").value !== '' && document.querySelector("#message").value !== '') {
        (function () {
            emailjs.init("ycbnej7QH72zg6TGT")
        })();

        if (checkbox?.classList == 'checkbox active') {
            var childrenSitting = "yes"
        } else {
            childrenSitting = "no"
        }

        var params = {
            name: document.querySelector("#name").value + ' ' + "Car make " + getTitle + ", Date and time of receiving the car: " + getcar + ' ' + time + ', Return date and time: ' + comeback + ' ' + endTime,
            message: countryCode + phoneNumber + ', Gmail client ' + getEmail + ', Do I need a car seat?: ' + childrenSitting + ', Pick up location: ' + getsCars + ', Car return location: ' + backCars + ', Number of passengers: ' + countPassanger + ", Total: " + morePrice?.innerHTML
        };

        console.log(params);


        // var serviceID = "service_ajn9ixc";
        // var templateID = "template_bge6w0q";

        // emailjs.send(serviceID, templateID, params)
        //     .then(res => {
        //         alert("Thank you. Application accepted. Our manager will contact you shortly.")
        //         document.getElementById("my-modal").classList.remove("open")
        //         document.querySelector("#name").value = ''
        //         document.querySelector("#message").value = ''
        //         document.querySelector("#message2").value = ''
        //         document.getElementById("email").value = ''
        //     })
        //     .catch();
    }
}


document.getElementById("name").disabled = false
document.getElementById("countryCode").disabled = false
document.getElementById("message").disabled = false
document.getElementById("email").disabled = false