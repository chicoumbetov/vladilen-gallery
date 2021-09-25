const slides = document.querySelectorAll()

for (const slide of slides) {
    slide.addEventListener('click', () => {
        slide.classList.add('active')
    })
}
