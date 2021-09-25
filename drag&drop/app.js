const item = document.querySelector('.item')

item.addEventListener('dragstart', dragStart)
item.addEventListener('dragend', dragEnd)

function dragStart(event) {
    // console.log('dragStart', event.target)
    event.target.classList.add('hold')
    setTimeout(() => { event.target.classList.add('hide')}, 0)
}

function dragEnd(event) {
    // console.log('dragEnd', event.target)   
    event.target.classList.remove('hold', 'hide')
    // or another way that give same result
    // event.target.className('item')
}