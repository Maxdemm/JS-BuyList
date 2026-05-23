let products = [
    {id: 1, name: "Помідори", amount: 2, isBought: true, isEditing: false},
    {id: 2, name: "Печиво", amount: 2, isBought: false, isEditing: false},
    {id: 3, name: "Сир", amount: 1, isBought: false, isEditing: false}
]

const productsContainer = document.getElementById("products-container");
const leftStatsContainer = document.getElementById("left-stats-container");
const boughtStatsContainer = document.getElementById("bought-stats-container");

const searchInput = document.querySelector(".search-input");
const addProductBtn = document.querySelector(".add-product-btn");

function render() {
    productsContainer.innerHTML = "";
    leftStatsContainer.innerHTML = "";
    boughtStatsContainer.innerHTML = "";

    products.forEach(product => {
        let itemHtml = '';

         if (product.isBought) {
            itemHtml = `
                <div class="item-container" data-id="${product.id}">
                    <span class="item-name" id="bought-name">${product.name}</span>
                    <div class="quantity-block">
                        <span class="count-number">${product.amount}</span>
                    </div>
                    <div class="item-actions">
                        <button class="buy-btn" data-tooltip="Позначити як не куплено">Не куплено</button>
                    </div>
                </div>
            `;
            boughtStatsContainer.insertAdjacentHTML('beforeend', `
                <span class="product-stat-item bought-badge">
                    ${product.name} <span class="amount">${product.amount}</span>
                </span>
            `);
        } else {
            itemHtml = `
                <div class="item-container" data-id="${product.id}">
                    <span class="item-name">${product.name}</span>
                    <div class="quantity-block">
                        <button class="count-btn minus" data-tooltip="Зменшити кількість">−</button>
                        <span class="count-number">${product.amount}</span>
                        <button class="count-btn plus" data-tooltip="Збільшити кількість">+</button>
                    </div>
                    <div class="item-actions">
                        <button class="buy-btn" data-tooltip="Позначити як куплено">Куплено</button>
                        <button class="delete-btn" data-tooltip="Видалити товар">×</button>
                    </div>
                </div>
            `;
            leftStatsContainer.insertAdjacentHTML('beforeend', `
                <span class="product-stat-item left-badge">
                    ${product.name} <span class="amount">${product.amount}</span>
                </span>
            `);
        }

        productsContainer.insertAdjacentHTML("beforeend", itemHtml);
    });

}

render();