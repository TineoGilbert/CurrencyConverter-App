const buttonAdd = document.querySelector('#bAdd') as HTMLButtonElement;
const inputTitle = document.querySelector('#title') as HTMLInputElement;
const inputCost = document.querySelector('#cost') as HTMLInputElement;
const inputCurrency = document.querySelector('#currency') as HTMLInputElement;

const expen = new Expenses('USD');

render();

buttonAdd!.addEventListener('click', e =>{
    if(inputTitle!.value != '' && inputCost!.value != '' && !isNaN(parseFloat(inputCost!.value))){
        const title = inputTitle!.value;
        const cost:number = parseFloat(inputCost!.value);
        const currency:Currency = <Currency>(inputCurrency!.value);

        expen.add({title:title, cost:{number:cost, currency: currency}});

        render();

    }else{
        alert('Completa Bien los Datos!');
    }
});

function render(){
    let html = '';
    expen.getItems().forEach(item =>{
        const {id, title, cost} = item;

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

    $$('.bDelete').forEach(bDelete =>{
        bDelete.addEventListener('click', e =>{
            const id = (e.target as HTMLButtonElement).getAttribute('data-id');

            expen.remove(parseInt(id!))

            render();
        });
    });
}

function $(selector:string): HTMLElement{
    return document.querySelector(selector) as HTMLElement;
}

function $$(selector:string):NodeListOf<HTMLElement>{
    return document.querySelectorAll(selector) as NodeListOf<HTMLElement>;
}