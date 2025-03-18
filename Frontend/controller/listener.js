import { Cadastro } from '../service/req_res.js';


const form = document.getElementById('char');

form.addEventListener('submit', (event) => {
    event.preventDefault();


    let elementStr = document.querySelector('input[name="vision"]:checked')?.value.split('#')[0];
    let weaponsStr = document.querySelector('input[name="weapon"]:checked')?.value.split('#')[0];

    let char = {
        name: document.getElementById('name').value,
        element: elementStr,
        weapon: weaponsStr,
        emotions: getCheckeds('emotions'),
        hobbies: getCheckeds('hobbies'),
        lore: document.getElementById('lore').value
    };

    Cadastro(char);
});


function getCheckeds(field) {
    return Array.from(document.querySelectorAll(`input[type="checkbox"][name="${field}"]:checked`))
        .map(checkbox => checkbox.value);
}
