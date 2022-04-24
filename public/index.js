"use strict";
const buttonAdd = document.querySelector('#bAdd');
const inputTitle = document.querySelector('#title');
const inputCost = document.querySelector('#cost');
const inputCurrency = document.querySelector('#currency');
const expen = new Expenses('USD');
render();
buttonAdd.addEventListener('click', e => {
    if (inputTitle.value != '' && inputCost.value != '' && !isNaN(parseFloat(inputCost.value))) {
        const title = inputTitle.value;
        const cost = parseFloat(inputCost.value);
        const currency = (inputCurrency.value);
        expen.add({ title: title, cost: { number: cost, currency: currency } });
        render();
    }
    else {
        alert('Completa Bien los Datos!');
    }
});
function render() {
    let html = '';
    expen.getItems().forEach(item => {
        const { id, title, cost } = item;
        html += `
          <div class="item">
             <div><span class="currency"><b>${cost.currency}</span> </b> <b>${cost.number} </b></div>
             <div>${title}</div>
             <div><button class="bDelete btn btn-danger" data-id="${id}">Delete</button></div>
          </div>
        `;
    });
    $('#items').innerHTML = html;
    $('#display').textContent = expen.getTota();
    $$('.bDelete').forEach(bDelete => {
        bDelete.addEventListener('click', e => {
            const id = e.target.getAttribute('data-id');
            expen.remove(parseInt(id));
            render();
        });
    });
}
function $(selector) {
    return document.querySelector(selector);
}
function $$(selector) {
    return document.querySelectorAll(selector);
}
