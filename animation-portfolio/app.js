const controller = new ScrollMagic.Controller()
const slides = document.querySelectorAll('.slide')
const header = document.querySelector('.header')

slides.forEach((slide) => {
    const revealImg = slide.querySelector('.slide-img-reveal')
    const img = slide.querySelector('img')
    const revealText = slide.querySelector('.slide-text-reveal')

    // gsap.to(revealImg, 1, { x: '100%', scale: 0.5})
    // https://greensock.com/docs/v2/Easing
    const options = { defaults: { duration: 1, ease: 'power2.inOut' } }
    const timeline = gsap.timeline(options)

    timeline.fromTo(revealImg, {x: '0%', scale: 2}, {x: '100%', scale: 1})
    timeline.fromTo(img, { scale: 2 }, { scale: 1 }, '-=1')

    timeline.fromTo(revealText, { x: '0%' }, { x: '-100%' }, '-=0.5')
    timeline.fromTo(header, { opacity: 0 }, { opacity: 1 })
})