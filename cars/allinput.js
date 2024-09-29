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