async function fetchCarPrices() {
    try {
        const response = await fetch('/price.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch car prices:', error);
    }
}

// Функция для рендеринга цен для каждой модели
function renderCarPrices(data, modelName, container) {
    const cleanedModel = modelName.replace(/^Rent\s+/i, '').trim();
    

    container.innerHTML = ''; // Очищаем контейнер

    const modelData = data[cleanedModel];

    if (modelData) {
        const carPriceContainer = document.createElement('div');
        carPriceContainer.className = 'cars__card-price';

        modelData.forEach(priceInfo => {
            const priceDiv = document.createElement('div');
            priceDiv.className = 'cars__card-standart';

            const priceLabel = document.createElement('span');
            priceLabel.className = 'cars__card-standartSpan';
            priceLabel.textContent = priceInfo.russiaDays;

            const priceAmount = document.createElement('p');
            priceAmount.textContent = `${priceInfo.price} ${priceInfo.currency}`;

            priceDiv.appendChild(priceLabel);
            priceDiv.appendChild(priceAmount);

            carPriceContainer.appendChild(priceDiv);
        });

        container.appendChild(carPriceContainer);
    } else {
        const noDataMessage = document.createElement('p');
        noDataMessage.textContent = 'No data available for this car model.';
        container.appendChild(noDataMessage);
    }
}

// Основная функция для обработки карточек автомобилей
async function updateCarPrices() {
    const data = await fetchCarPrices();

    if (!data) return;

    document.querySelectorAll('.cars__card').forEach(card => {
        const modelName = card.querySelector('.cars__card-title').textContent.trim();
        const container = card.querySelector('.cars__card-prices');

        if (container) {
            renderCarPrices(data, modelName, container);
        }
    });
}

// Вызываем основную функцию при загрузке страницы
document.addEventListener('DOMContentLoaded', updateCarPrices);