const formDate = document.getElementById('form-dates');
const listeDates = document.getElementById('liste-dates');

formDate.addEventListener('submit', event => {

    event.preventDefault();

    const data = new FormData(formDate);
    const date = new Date(data.get('date'));

    const li = document.createElement('li');
    li.innerText = date.toLocaleDateString();
    listeDates.appendChild(li);
});