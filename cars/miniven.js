// Добавляем обработчик события input
countryCode.addEventListener('input', limitInputLength);

// Элементы
const headerLink = document.querySelector(".header__info-link");
const headerLinkCheck = document.querySelector(".header__info-link-check");

// Функция для проверки заполненности обязательных полей
function areRequiredFieldsFilled() {
    const startDate = document.getElementById("start_date");
    const startTime = document.getElementById("start");
    const placeOfReceipt = document.querySelector(".header__info-selectValue7");
    const returnLocation = document.querySelector(".header__info-selectValue8");

    return {
        startDate: startDate.value.trim() !== "",
        startTime: startTime.value.trim() !== "",
        placeOfReceipt: placeOfReceipt?.value.trim() !== "",
        returnLocation: returnLocation?.value.trim() !== ""
    };
}

// Функция для обновления состояния кнопки и сообщения
function updateButtonState() {
    const fieldsStatus = areRequiredFieldsFilled();

    // Проверка только обязательных полей
    headerLink.disabled = !Object.values(fieldsStatus).every(status => status);
    headerLinkCheck.innerHTML = headerLink.disabled ? "Fill in all required fields" : "";
}

// Функция для добавления рамок вокруг обязательных полей
function highlightFields() {
    const fieldsStatus = areRequiredFieldsFilled();

    // Применение красной рамки для пустых обязательных полей
    document.getElementById("start_date").classList.toggle('error-border', !fieldsStatus.startDate);
    document.getElementById("start").classList.toggle('error-border', !fieldsStatus.startTime);
    document?.querySelector(".header__info-selectValue7")?.classList.toggle('error-border', !fieldsStatus.placeOfReceipt);
    document?.querySelector(".header__info-selectValue8")?.classList.toggle('error-border', !fieldsStatus.returnLocation);

    // Применение зеленой рамки для заполненных обязательных полей
    document.getElementById("start_date").classList.toggle('valid-border', fieldsStatus.startDate);
    document.getElementById("start").classList.toggle('valid-border', fieldsStatus.startTime);
    document?.querySelector(".header__info-selectValue7")?.classList.toggle('valid-border', fieldsStatus.placeOfReceipt);
    document?.querySelector(".header__info-selectValue8")?.classList.toggle('valid-border', fieldsStatus.returnLocation);

    // end_date и end не будут подсвечиваться
}

// Обработчик события на поля ввода и выпадающие списки
const inputs = [
    document.getElementById("start_date"),
    document.getElementById("start"),
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
    const fieldsStatus = areRequiredFieldsFilled();

    if (Object.values(fieldsStatus).every(status => status)) {
        document.getElementById("my-modal").classList.add("open");
    } else {
        headerLinkCheck.innerHTML = "Fill in all required fields";
        highlightFields(); // Подсвечиваем пустые поля красным бордером
    }
});
