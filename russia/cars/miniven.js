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
        headerLinkCheck.innerHTML = "Заполните все обязательные поля";
        highlightFields(); // Подсвечиваем пустые поля красным бордером
    }
});

// Обработка изменения даты получения
document.getElementById("start_date").addEventListener("input", function () {
    var selectedStartDate = new Date(this.value);
    var today = new Date();
    document.getElementById("start").disabled = false; // Активируем выбор времени получения
    today.setHours(0, 0, 0, 0); // Убираем время для сравнения

    // Если дата начала меньше сегодняшней даты
    if (selectedStartDate < today) {
        alert("You cannot select a past date.");
        this.value = min.toISOString().split('T')[0];
        document.getElementById("end_date").value = ""; // Очищаем поле возврата
        return openDatePicker(this); // Открываем выбор даты
    }

    // Устанавливаем минимально допустимую дату возврата (на 2 дня позже)
    var minimumReturnDate = new Date(selectedStartDate);
    minimumReturnDate.setDate(minimumReturnDate.getDate() + 1);
    
    // Обновляем минимальную дату возврата
    document.getElementById("end_date").min = minimumReturnDate.toISOString().split('T')[0];

    // Если дата возврата уже установлена и она меньше минимально допустимой, то обновляем её
    var endDateInput = document.getElementById("end_date");
    var selectedEndDate = new Date(endDateInput.value);

    if (selectedEndDate < minimumReturnDate) {
        endDateInput.value = minimumReturnDate.toISOString().split('T')[0]; // Устанавливаем новую дату возврата
    }

    // Проверяем наличие всех необходимых значений и вызываем calculate
    checkAndCalculate();
});

// Обработка изменения даты возврата
document.getElementById("end_date").addEventListener("input", function () {
    var selectedStartDate = new Date(document.getElementById("start_date").value);
    selectedStartDate.setHours(0, 0, 0, 0);
    document.getElementById("end").disabled = false; // Активируем выбор времени возврата
    
    // Минимальная дата возврата должна быть на 2 дня позже даты получения
    var minimumReturnDate = new Date(selectedStartDate);
    minimumReturnDate.setDate(minimumReturnDate.getDate() + 1);
    var min = new Date(selectedStartDate);
    min.setDate(min.getDate() + 3);
    
    // Проверяем, если пользователь ввел неправильную дату возврата
    var selectedEndDate = new Date(this.value);
    if (selectedEndDate < minimumReturnDate) {
        alert("Дата возврата должна быть не позднее 1 дней после даты получения..");
        // Устанавливаем правильную дату возврата (на 2 дня позже даты получения)
        this.value = min.toISOString().split('T')[0];
    }

    // Проверяем наличие всех необходимых значений и вызываем calculate
    checkAndCalculate();
});

document.getElementById("number").disabled = false
document.getElementById("name").disabled = false
document.getElementById("countryCode").disabled = false
document.getElementById("message").disabled = false
document.getElementById("email").disabled = false
