const sorting = document.querySelector('select');
const commentSorting = document.querySelector('select');
const sortingchoices = new Choices(sorting, {
    placeholder: false,
    itemSelectText: ''
});


// Trick to apply your custom classes to generated dropdown menu
let sortingClass = sorting.getAttribute('class');
window.onload= function () {
    sorting.parentElement.setAttribute('class', sortingClass);
}