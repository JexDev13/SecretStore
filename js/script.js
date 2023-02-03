var slider = document.querySelector('.slider');
var images = slider.querySelectorAll('img');
var description = document.querySelector('.description');
var activeIndex = 0;
var timeout = setInterval(function () {
    images[activeIndex].classList.remove('active');
    description.textContent = images[activeIndex].dataset.description;
    activeIndex++;
    if (activeIndex >= images.length) {
        activeIndex = 0;
    }
    images[activeIndex].classList.add('active');
    description.textContent = images[activeIndex].dataset.description;
}, 10000);

document.getElementById('prev').addEventListener('click', function () {
    clearInterval(timeout);
    images[activeIndex].classList.remove('active');
    activeIndex--;
    if (activeIndex < 0) {
        activeIndex = images.length - 1;
    }
    images[activeIndex].classList.add('active');
    description.textContent = images[activeIndex].dataset.description;
});

document.getElementById('next').addEventListener('click', function () {
    clearInterval(timeout);
    images[activeIndex].classList.remove('active');
    activeIndex++;
    if (activeIndex >= images.length) {
        activeIndex = 0;
    }
    images[activeIndex].classList.add('active');
    description.textContent = images[activeIndex].dataset.description;
});