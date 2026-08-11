const container = document.querySelector('.container-light');
const card = document.querySelector('.card-light');
const btnTema = document.querySelector('.btnTema-light');

btnTema.addEventListener('click', function() {

    container.classList.toggle('container-darkmode');
    card.classList.toggle('card-darkmode');
    btnTema.classList.toggle('btnTema-darkmode');
    container.classList.toggle('container-light');
    card.classList.toggle('card-light');
    btnTema.classList.toggle('btnTema-light');
    
    if (btnTema.classList.contains('btnTema-light')) {

        btnTema.textContent = 'Ativar modo escuro';

    } else {

        btnTema.textContent = 'Ativar modo claro';

    }
});