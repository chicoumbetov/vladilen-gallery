const upBtn = document.querySelector('.up-button')
const downBtn = document.querySelector('.down-button')
const sideBar = document.querySelector('.sidebar')
const mainSlide = document.querySelector('.main-slide')

const slidesCount = mainSlide.querySelectorAll('div').length

sideBar.style.top = `-${(slidesCount - 1) * 100}vh`