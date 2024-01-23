import styles from './styles.css'

let items = [];

const nameInput = document.getElementById('itemName');
const priceInput = document.getElementById('itemPrice');
const dateTimeInput = document.getElementById('itemDateTime');

export function openModal() {
    document.getElementById('modal').style.display = 'block';
}

export function closeModal() {
    document.getElementById('modal').style.display = 'none';
    clearErrors(nameInput);
    clearErrors(priceInput);
    clearErrors(dateTimeInput);
    clearForm();
}

export function clearForm() {
    document.getElementById('addItemForm').reset();
}

export function addItem() {

    clearErrors(nameInput);
    clearErrors(priceInput);
    clearErrors(dateTimeInput);

    const name = nameInput.value.trim();
    const price = priceInput.value.trim();
    const dateTime = dateTimeInput.value.trim();

    const errors = validateForm(name, price, dateTime);

    if (errors.length > 0) {
        errors.forEach(error => {
            if (error.includes('Name')) {
                nameInput.classList.add('error-input');
                displayError(nameInput, error);
            }
            if (error.includes('price')) {
                priceInput.classList.add('error-input');
                displayError(priceInput, error);
            }
            if (error.includes('date and time')) {
                dateTimeInput.classList.add('error-input');
                displayError(dateTimeInput, error);
            }
        });
    } else {
        const newItem = { name, price, dateTime };
        items.push(newItem);
        items.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
        displayItems();
        closeModal();
    }
}

export function displayError(input, error) {
    const errorMessageDiv = document.createElement('div');
    errorMessageDiv.classList.add('error-message');
    errorMessageDiv.textContent = error;

    input.insertAdjacentElement('afterend', errorMessageDiv);
}

export function clearErrors(input) {
    input.classList.remove('error-input');
    const previousError = input.nextElementSibling;
    if (previousError && previousError.classList.contains('error-message')) {
        previousError.remove();
    }
}

export function validateForm(name, price, dateTime) {
    const errors = [];

    if (name === '') {
        errors.push('Name is required.');
    }

    if (!/^\d+(\.\d{1,2})?$/.test(price)) {
        errors.push('Invalid price format.');
    }

    if (!/^\d{2}\.\d{2}\.\d{4} \d{2}:\d{2}:\d{2}$/.test(dateTime)) {
        errors.push('Invalid date and time format.');
    }

    return errors;
}


export function displayItems() {
    const tableBody = document.getElementById('itemTableBody');
    tableBody.innerHTML = '';

    items.forEach((item, index) => {
        const row = tableBody.insertRow();

        const cellNumber = row.insertCell(0);
        const cellName = row.insertCell(1);
        const cellPrice = row.insertCell(2);
        const cellDateTime = row.insertCell(3);
        
        cellNumber.textContent = index + 1;
        cellName.textContent = item.name;
        cellPrice.textContent = item.price;
        cellDateTime.textContent = item.dateTime;
    });
}
