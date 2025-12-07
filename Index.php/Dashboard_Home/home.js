const topnav = document.querySelectorAll('.topnav')

topnav.forEach(link => {
    link.addEventListener('click', (event) => {


    event.preventDefault();
    location.reload();
    });
});