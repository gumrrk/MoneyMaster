function reloadPage() {
    const headerH1 = document.querySelector('.header_h1');

    headerH1.addEventListener('click', () => {
        location.reload();
    });
}
reloadPage()

function changeMode() {
    const body = document.body;
    if (body.classList.contains('dark-mode')) {
        document.documentElement.style.setProperty('--color-brand-1', '#6741d9');
        document.documentElement.style.setProperty('--color-brand-2', '#4c3299');
        document.documentElement.style.setProperty('--color-brand-3', '#f0ecfb');
        document.documentElement.style.setProperty('--color-grey-1', '#212529');
        document.documentElement.style.setProperty('--color-grey-2', '#495057');
        document.documentElement.style.setProperty('--color-grey-3', '#adb5bd');
        document.documentElement.style.setProperty('--color-grey-4', '#e9ecef');
        document.documentElement.style.setProperty('--color-grey-5', '#f1f3f5');
        document.documentElement.style.setProperty('--color-grey-1-opacity', 'rgba(0, 0, 0, 0.5)');
        document.documentElement.style.setProperty('--color-grey-1-fixed', '#212529');
        document.documentElement.style.setProperty('--color-grey-2-fixed', '#495057');
        document.documentElement.style.setProperty('--fixed-white', '#ffffff');
        document.documentElement.style.setProperty('--color-mode', '#ffffff');
        document.documentElement.style.setProperty('--color-green', '#F0FFF0');
        document.documentElement.style.setProperty('--color-red', '#FFCCCC')
        document.getElementById("dark-button").innerHTML = "🌙";
        body.classList.remove('dark-mode');
    } else {
        document.documentElement.style.setProperty('--color-brand-1', '#6741d9');
        document.documentElement.style.setProperty('--color-brand-2', '#4c3299');
        document.documentElement.style.setProperty('--color-brand-3', '#000000');
        document.documentElement.style.setProperty('--color-grey-1', '#f1f1f1');
        document.documentElement.style.setProperty('--color-grey-2', '#d1d1d1');
        document.documentElement.style.setProperty('--color-grey-3', '#a6a6a6');
        document.documentElement.style.setProperty('--color-grey-4', '#333333');
        document.documentElement.style.setProperty('--color-grey-5', '#1f1f1f');
        document.documentElement.style.setProperty('--color-grey-1-opacity', 'rgba(255, 255, 255, 0.5)');
        document.documentElement.style.setProperty('--color-grey-1-fixed', '#212529');
        document.documentElement.style.setProperty('--color-grey-2-fixed', '#495057');
        document.documentElement.style.setProperty('--fixed-white', '#ffffff');
        document.documentElement.style.setProperty('--color-mode', '#121212');
        document.documentElement.style.setProperty('--color-green', '#3b4e17');
        document.documentElement.style.setProperty('--color-red', '#5A0000')
        document.getElementById("dark-button").innerHTML = "☀️";
        body.classList.add('dark-mode');
    }
}

function addDarkButton() {
    const button = document.querySelector('#dark-button')
    button.addEventListener('click', changeMode)
}
addDarkButton()

function renderTransaction(id, value, type) {
    const ul = document.getElementById("financialOperations_ul");

    const li = document.createElement("li");
    li.classList.add("financialOperations_li");
    li.setAttribute("id", `transaction_${id}`);

    const div = document.createElement("div");
    div.classList.add("financialOperations_li_div");

    const p = document.createElement("p");
    const valueFormatted = new Intl.NumberFormat('pt-BR', { minimumIntegerDigits: 2, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
    p.innerHTML = `R$ <span>${valueFormatted}</span>`;

    const divDiv = document.createElement("div");
    divDiv.classList.add("financialOperations_li_div_div");

    const tipo = document.createElement("div");
    tipo.classList.add("transactionType");
    tipo.innerHTML = type;

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "transactionDelete");
    svg.setAttribute("width", "13");
    svg.setAttribute("height", "14");
    svg.setAttribute("viewBox", "0 0 13 14");
    svg.setAttribute("id", `transaction_delete_${id}`);
    svg.addEventListener("click", () => {
        removeTransaction(id);
        updateSumByFilter();
    });

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
        "d",
        "M12.5625 0.875H9.28125L9.00781 0.382812C8.89844 0.164062 8.67969 0 8.43359 0H5.28906C5.04297 0 4.82422 0.164062 4.71484 0.382812L4.46875 0.875H1.1875C0.941406 0.875 0.75 1.09375 0.75 1.3125V2.1875C0.75 2.43359 0.941406 2.625 1.1875 2.625H12.5625C12.7812 2.625 13 2.43359 13 2.1875V1.3125C13 1.09375 12.7812 0.875 12.5625 0.875ZM2.19922 12.7695C2.22656 13.4805 2.80078 14 3.51172 14H10.2109C10.9219 14 11.4961 13.4805 11.5234 12.7695L12.125 3.5H1.625L2.19922 12.7695Z"
    );
    path.setAttribute("fill", "#ADB5BD");

    svg.appendChild(path);
    divDiv.append(tipo, svg);
    div.append(p, divDiv);
    li.appendChild(div);
    ul.appendChild(li);
    hideEmpty();
}

function removeTransaction(id) {
    insertedValues = insertedValues.filter((transaction) => transaction.id !== id);

    const transactionElement = document.getElementById(`transaction_${id}`);
    transactionElement.parentNode.removeChild(transactionElement);
    hideEmpty();
}

function renderAllTransactions(filteredValues) {
    const ul = document.getElementById("financialOperations_ul");
    ul.innerHTML = "";
    filteredValues.forEach(item => {
        const typeString = item.type === 0 ? "Entrada" : "Saída";
        renderTransaction(item.id, item.value, typeString);
    });
}
renderAllTransactions(insertedValues)

function filterButtons() {
    const filterAllButton = document.getElementById("filterAll");
    const filterEntryButton = document.getElementById("filterEntry");
    const filterExitButton = document.getElementById("filterExit");

    filterAllButton.addEventListener("click", () => {
        renderAllTransactions(insertedValues);
    });

    filterEntryButton.addEventListener("click", () => {
        const filteredValues = insertedValues.filter(item => item.type === 0);
        renderAllTransactions(filteredValues);
    });

    filterExitButton.addEventListener("click", () => {
        const filteredValues = insertedValues.filter(item => item.type === 1);
        renderAllTransactions(filteredValues);
    });

    filterAll.addEventListener("change", () => {
        updateSumByFilter();
    });

    filterEntry.addEventListener("change", () => {
        updateSumByFilter();
    });

    filterExit.addEventListener("change", () => {
        updateSumByFilter();
    });
}
filterButtons()

function insertValues() {
    const insertButton = document.getElementById("insertValue");
    const input = document.getElementById("transactionValue_input")

    input.addEventListener("keydown", (event) => {
        if (event.keyCode === 69) {
            event.preventDefault();
        }
    });

    insertButton.addEventListener("click", () => {
        apllySumValues();
        const valueInput = document.getElementById("transactionValue_input").value;
        const selectedRadio = document.querySelector('input[name="valueType"]:checked');

        if ((valueInput && selectedRadio && (valueInput > 0) && (valueInput != 'isNaN'))) {
            const value = parseFloat(valueInput.replace(",", "."));
            const type = parseInt(selectedRadio.value);
            const id = insertedValues.length + 1
            insertedValues.push({ id, value, type });
            renderAllTransactions(insertedValues);
            console.log(insertedValues);
            input.value = '';
            const successDiv = document.createElement("div");
            successDiv.classList.add("successDiv");
            successDiv.innerHTML = "Adicionado com sucesso!";
            document.body.appendChild(successDiv);

            setTimeout(() => {
                successDiv.remove();
            }, 1300);
        } else {
            const errorDiv = document.createElement("div");
            errorDiv.classList.add("errorDiv");
            errorDiv.innerHTML = "Por favor, preencha os dados corretamente";
            document.body.appendChild(errorDiv);

            setTimeout(() => {
                errorDiv.remove();
            }, 1500);
        }
    });
}
insertValues()

function sumValues(type) {
    return insertedValues.reduce((accumulator, currentValue) => {
        if (currentValue.type === type) {
            return accumulator + currentValue.value;
        }
        return accumulator;
    }, 0);
}

function apllySumValues() {
    const filterAllButton = document.getElementById("filterAll");
    const filterEntryButton = document.getElementById("filterEntry");
    const filterExitButton = document.getElementById("filterExit");
    const sumElement = document.getElementById("sum");

    filterAllButton.addEventListener("click", () => {
        const sum = sumValues(0) - sumValues(1);
        const sumFormatted = new Intl.NumberFormat('pt-BR', { minimumIntegerDigits: 2, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(sum);
        sumElement.textContent = `R$ ${sumFormatted}`;
    });

    filterEntryButton.addEventListener("click", () => {
        const sum = sumValues(0);
        const sumFormatted = new Intl.NumberFormat('pt-BR', { minimumIntegerDigits: 2, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(sum);
        sumElement.textContent = `R$ ${sumFormatted}`;
    });

    filterExitButton.addEventListener("click", () => {
        const sum = sumValues(1);
        const sumFormatted = new Intl.NumberFormat('pt-BR', { minimumIntegerDigits: 2, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(sum);
        sumElement.textContent = `R$ ${sumFormatted}`;
    });
}
apllySumValues()

// Função que atualiza a soma conforme o filtro que está selecionado após adicionar ou remover uma transação
function updateSumByFilter() {
    const sumElement = document.getElementById("sum");
    const filterAll = document.getElementById("filterAll");
    const filterEntry = document.getElementById("filterEntry");

    const selectedFilter = filterAll.checked ? "all" : (filterEntry.checked ? "entry" : "exit");

    const totalEntry = insertedValues
        .filter((transaction) => transaction.type === 0)
        .reduce((acc, transaction) => acc + transaction.value, 0);

    const totalExit = insertedValues
        .filter((transaction) => transaction.type === 1)
        .reduce((acc, transaction) => acc + transaction.value, 0);

    if (selectedFilter === "all") {
        sum = totalEntry - totalExit;
        renderAllTransactions(insertedValues);
    } else if (selectedFilter === "entry") {
        sum = totalEntry;
        const filteredValues = insertedValues.filter(item => item.type === 0);
        renderAllTransactions(filteredValues);
    } else if (selectedFilter === "exit") {
        sum = totalExit;
        const filteredValues = insertedValues.filter(item => item.type === 1);
        renderAllTransactions(filteredValues);
    }

    const sumFormatted = new Intl.NumberFormat('pt-BR', { minimumIntegerDigits: 2, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(sum);
    sumElement.textContent = `R$ ${sumFormatted}`;
}

const insertValueButton = document.getElementById("insertValue");
insertValueButton.addEventListener("click", () => {
    updateSumByFilter();
});

function hideEmpty() {
    const transactionList = document.querySelector('#financialOperations_ul');
    const emptyTransactions = document.querySelector('.emptyTransactions');

    if (transactionList.children.length == 0) {
        emptyTransactions.style.display = 'flex';
    } else {
        emptyTransactions.style.display = 'none';
    }
}