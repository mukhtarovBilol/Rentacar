var innerNumber1 = 0;
var innerNumber2 = 0;
var innerNumber3 = 0;


document.addEventListener("DOMContentLoaded", () => {
    fetch('/price.json')
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
                    priceLabel.textContent = priceInfo.russiaDays;

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
document.getElementById("email")?.addEventListener("change", function () {
    getEmail = document.getElementById("email")?.value
})

// get title
var getTitle = ''
const cardTitle = document.querySelector(".card__title")
getTitle = cardTitle.innerText
// get title

// date

var startInputHours = 0
var time = "00" // for email
var endTime = "00" // for email
var endInputHours = 0

document.getElementById("start").addEventListener("change", function () {
    var startInput = document.getElementById("start").value.split(":")
    startInputHours = Number(startInput[0]) + 3
    time = startInput.join(":")
})

document.getElementById("end").addEventListener("change", function () {
    var endInput = document.getElementById("end").value.split(":")
    endInputHours = Number(endInput[0])
    endTime = endInput.join(":")
    calculate()
})

// Устанавливаем сегодняшнюю дату как минимальную для получения и возврата
var today = new Date().toISOString().split('T')[0];
document.getElementById("start_date").min = today;
document.getElementById("end_date").min = today;

function calculate() {
    var startDate = new Date(document.getElementById("start_date").value);
    var endDate = new Date(document.getElementById("end_date").value);

    // Количество дней аренды
    var differenceInTime = endDate.getTime() - startDate.getTime();
    var differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24)); // округляем вверх, чтобы учитывать день возврата

    if (startInputHours <= endInputHours) {
        differenceInDays++
        calculateRentalCost(differenceInDays)
    } else {
        calculateRentalCost(differenceInDays)
    }
}

// При изменении даты получения автоматически обновляем минимальную дату возврата и активируем элемент выбора даты возврата
document.getElementById("start_date").addEventListener("change", function () {
    var startDate = new Date(document.getElementById("start_date").value);
    var nextDay = new Date(startDate);
    nextDay.setDate(startDate.getDate() + 2);
    var minReturnDate = nextDay.toISOString().split('T')[0];
    document.getElementById("end_date").min = minReturnDate;
});

document.getElementById("start").addEventListener("change", function () {
    document.getElementById("end_date").disabled = false; // Активируем элемент выбора даты возврата
})

// При изменении даты возврата автоматически пересчитываем стоимость аренды
document.getElementById("end_date").addEventListener("change", function () {
    document.getElementById("end").disabled = false; // Активируем элемент выбора времени возврата
    headerLink.disabled = false
    headerLinkCheck.innerHTML = ""
});

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

// Добавляем обработчик события input
countryCode.addEventListener('input', limitInputLength);
// date

const headerLink = document.querySelector(".header__info-link");
const headerLinkCheck = document.querySelector(".header__info-link-check");

// Функция для проверки заполненности всех полей
function areAllFieldsFilled() {
    const startDate = document.getElementById("start_date");
    const startTime = document.getElementById("start");
    const endDate = document.getElementById("end_date");
    const endTime = document.getElementById("end");
    const placeOfReceipt = document.querySelector(".header__info-selectValue7");
    const returnLocation = document.querySelector(".header__info-selectValue8");

    return {
        startDate: startDate.value.trim() !== "",
        startTime: startTime.value.trim() !== "",
        endDate: endDate.value.trim() !== "",
        endTime: endTime.value.trim() !== "",
        placeOfReceipt: placeOfReceipt?.value.trim() !== "",
        returnLocation: returnLocation?.value.trim() !== ""
    };
}

// Функция для обновления состояния кнопки и сообщения
function updateButtonState() {
    const fieldsStatus = areAllFieldsFilled();

    // Обновление состояния кнопки и сообщения
    if (Object.values(fieldsStatus).every(status => status)) {
        headerLink.disabled = false;
        headerLinkCheck.innerHTML = "";
    } else {
        headerLink.disabled = true;
        headerLinkCheck.innerHTML = "Fill in all fields";
    }
}

// Функция для добавления рамок вокруг полей в зависимости от их состояния
function highlightFields() {
    const fieldsStatus = areAllFieldsFilled();

    // Применение красной рамки для пустых полей и черной рамки для заполненных полей
    document.getElementById("start_date").classList.toggle('error-border', !fieldsStatus.startDate);
    document.getElementById("start").classList.toggle('error-border', !fieldsStatus.startTime);
    document.getElementById("end_date").classList.toggle('error-border', !fieldsStatus.endDate);
    document.getElementById("end").classList.toggle('error-border', !fieldsStatus.endTime);
    document?.querySelector(".header__info-selectValue7")?.classList.toggle('error-border', !fieldsStatus.placeOfReceipt);
    document?.querySelector(".header__info-selectValue8")?.classList.toggle('error-border', !fieldsStatus.returnLocation);

    document.getElementById("start_date").classList.toggle('valid-border', fieldsStatus.startDate);
    document.getElementById("start").classList.toggle('valid-border', fieldsStatus.startTime);
    document.getElementById("end_date").classList.toggle('valid-border', fieldsStatus.endDate);
    document.getElementById("end").classList.toggle('valid-border', fieldsStatus.endTime);
    document?.querySelector(".header__info-selectValue7")?.classList.toggle('valid-border', fieldsStatus.placeOfReceipt);
    document?.querySelector(".header__info-selectValue8")?.classList.toggle('valid-border', fieldsStatus.returnLocation);
}

// Обработчик события на поля ввода и выпадающие списки
const inputs = [
    document.getElementById("start_date"),
    document.getElementById("start"),
    document.getElementById("end_date"),
    document.getElementById("end"),
    document.querySelector(".header__info-selectValue7"),
    document.querySelector(".header__info-selectValue8")
];

inputs.forEach(input => {
    input?.addEventListener('input', () => {
        updateButtonState();
        highlightFields();
    });
    input?.addEventListener('change', () => {
        updateButtonState();
        highlightFields(); // Для select
    });
});

// Обработчик события на кнопку
headerLink.addEventListener("click", function () {
    const fieldsStatus = areAllFieldsFilled();

    if (Object.values(fieldsStatus).every(status => status)) {
        document.getElementById("my-modal").classList.add("open");
    } else {
        headerLinkCheck.innerHTML = "Fill in all fields";
        highlightFields(); // Подсвечиваем пустые поля красным бордером
    }
});

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
    if (document.querySelector("#name").value !== '' && document.querySelector("#message").value !== '') {
        (function () {
            emailjs.init("ycbnej7QH72zg6TGT")
        })();

        if (checkbox?.classList == 'checkbox active') {
            var childrenSitting = "Да"
        } else {
            childrenSitting = "Нет"
        }

        var params = {
            name: document.querySelector("#name").value + ' ' + "Марка машины " + getTitle + ", Дата и время получение машины: " + getcar + ' ' + time + ', Дата и время возврата: ' + comeback + ' ' + endTime,
            message: countryCode.value + phoneNumber + ', Gmail клиента ' + getEmail + ', Нужно ли автокресло: ' + childrenSitting + ', Место получение машины: ' + getsCars + ', Место возврата авто: ' + backCars + ', Количество пассажиров: ' + countPassanger + ", Итого: " + morePrice?.innerHTML
        };

        console.log(params);


        var serviceID = "service_ajn9ixc";
        var templateID = "template_bge6w0q";

        emailjs.send(serviceID, templateID, params)
            .then(res => {
                alert("Спасибо. Заявление принято. Наш менеджер свяжется с вами в ближайшее время.")
                document.getElementById("my-modal").classList.remove("open")
                document.querySelector("#name").value = ''
                document.querySelector("#message").value = ''
                document.querySelector("#message2").value = ''
                document.getElementById("email").value = ''
            })
            .catch();
    }
}
