const editLinks = document.querySelectorAll('td > a');

for (let editLink of editLinks) {

    editLink.addEventListener('click', event => {
        event.preventDefault();

        const tr = event.currentTarget.closest('tr');
        const form = document.querySelector('.user-form-container');

        // Get modified user fullname and initialize update fields
        const fullname = tr.querySelector('.user-container span').innerText;
        form.querySelector('input[name="name"]').value = fullname;

        // Get modified user email and initialize update fields
        const email = tr.querySelector('.user-container span').dataset.email;
        form.querySelector('input[name="email"]').value = email;

        // Get modified user checked dates and initialize update fields
        const checkboxes = document.querySelectorAll('table.poll tr input[type="checkbox"]');
        const icons = tr.querySelectorAll('.available, .unavailable');
        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = icons[i].classList.contains('available');
        }
    });
}