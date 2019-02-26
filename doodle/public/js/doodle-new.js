const formDate = document.getElementById('form-dates');
const listeDates = document.getElementById('liste-dates');
const btnValid = document.getElementById('btn-valid');
const inputTitle = document.getElementById('title');
let doodleDates = [];

formDate.addEventListener('submit', event => {

    event.preventDefault();

    const data = new FormData(formDate);
    const date = new Date(data.get('date'));
    doodleDates.push(date);
    const li = document.createElement('li');
    li.innerText = date.toLocaleDateString();
    listeDates.appendChild(li);
});

btnValid.addEventListener('click', event => {

    event.preventDefault();

    const data = {
        title: inputTitle.value,
        dates: doodleDates,
    };

    fetch('/doodle-new', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(doodle => window.location.replace('/doodle/' + doodle._id));

});