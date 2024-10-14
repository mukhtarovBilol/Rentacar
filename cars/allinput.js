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

// Обработка изменения даты получения
document.getElementById("start_date").addEventListener("input", function () {
    var selectedStartDate = new Date(this.value);
    var today = new Date();
    var now = new Date();
    var currentDate = now.toISOString().split("T")[0]; // Текущая дата в формате YYYY-MM-DD
    var selectedDate = document.getElementById("start_date").value; // Получаем выбранную дату
    
    document.getElementById("start").disabled = false; // Активируем выбор времени получения
    today.setHours(0, 0, 0, 0); // Убираем время для сравнения

    // Если дата начала меньше сегодняшней даты
    if (selectedDate < currentDate) {
        alert("You cannot select a past date.");
        this.value = ""
        document.getElementById("end_date").value = ""; // Очищаем поле возврата
    }

    // Устанавливаем минимально допустимую дату возврата (на 2 дня позже)
    var minimumReturnDate = new Date(selectedStartDate);
    minimumReturnDate.setDate(minimumReturnDate.getDate() + 2);
    
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
    minimumReturnDate.setDate(minimumReturnDate.getDate() + 2);
    var min = new Date(selectedStartDate);
    min.setDate(min.getDate() + 3);
    
    // Проверяем, если пользователь ввел неправильную дату возврата
    var selectedEndDate = new Date(this.value);
    if (selectedEndDate < minimumReturnDate) {
        alert("The return date must be at least 2 days after the date of receipt.");
        // Устанавливаем правильную дату возврата (на 2 дня позже даты получения)
        this.value = min.toISOString().split('T')[0];
    }

    // Проверяем наличие всех необходимых значений и вызываем calculate
    checkAndCalculate();
});
