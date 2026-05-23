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
            let nameContent = '';
            if (product.isEditing) {
                nameContent = `
                    <span class="item-name">
                        <input type="text" class="item-input-edit" value="${product.name}">
                    </span>`;
            } else {
                nameContent = `<span class="item-name">${product.name}</span>`;
            }
            const minusClass = product.amount === 1 ? "count-btn minus count-minus-1" : "count-btn minus";
            itemHtml = `
                <div class="item-container" data-id="${product.id}">
                    ${nameContent}
                    <div class="quantity-block">
                        <button class="${minusClass}" data-tooltip="Зменшити кількість">−</button>
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
                <span class="product-stat-item">
                    ${product.name} <span class="amount">${product.amount}</span>
                </span>
            `);
        }

        productsContainer.insertAdjacentHTML("beforeend", itemHtml);
    });
}

render();

function handleAddProduct() {
    const newProductName = searchInput.value.trim();

    if(newProductName) {
        products.push({
            id: Date.now(),
            name: newProductName,
            amount: 1,
            isBought: false,
            isEditing: false
        });
        searchInput.value = "";
        render();
    }
    searchInput.focus();
}
addProductBtn.addEventListener("click", handleAddProduct);
searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        handleAddProduct();
        render();
        return;
    }
});

productsContainer.addEventListener("click", (event) => {
    const itemContainer = event.target.closest(".item-container");
    if (!itemContainer) 
        return;
    
    const productId = Number(itemContainer.dataset.id);

    if (event.target.classList.contains("delete-btn")) {
        products = products.filter(product => product.id !== productId);
        render();
        return;
    }
    if (event.target.classList.contains("buy-btn")) {
        const product = products.find(p => p.id === productId);
        if (product) product.isBought = !product.isBought;
        render();
        return;
    }
    if (event.target.classList.contains("plus")) {
        const product = products.find(p => p.id === productId);
        if (product) product.amount++;
        render();
        return;
    }
    if (event.target.classList.contains("minus")) {
        const product = products.find(p => p.id === productId);
        if (product && product.amount > 1) product.amount--; 
        render();
        return;
    }
    if (event.target.classList.contains("item-name")) {
        const product = products.find(p => p.id === productId);
        if (product) {
            product.isEditing = true;
            render();
            const input = productsContainer.querySelector(`[data-id="${productId}"] .item-input-edit`);
            if (input) input.focus();
        }
    }
});

productsContainer.addEventListener("blur", (event) => {
    if (event.target.classList.contains("item-input-edit")) {
        const itemContainer = event.target.closest(".item-container");
        const productId = Number(itemContainer.dataset.id);
        const product = products.find(p => p.id === productId);
        
        if (product) {
            const newName = event.target.value.trim();
            if (newName) {
                product.name = newName;
            }
            product.isEditing = false; 
            render(); 
        }
    }
}, true);