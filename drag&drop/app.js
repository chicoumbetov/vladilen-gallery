const item = document.querySelector('.item')
const placeholders = document.querySelectorAll('.placeholder')

item.addEventListener('dragstart', dragStart)
item.addEventListener('dragend', dragEnd)

for (const placeholder of placeholders) {
    placeholder.addEventListener('dragover', dragover)
    placeholder.addEventListener('dragenter', dragenter)
    placeholder.addEventListener('dragleave', dragleave)
    placeholder.addEventListener('drop', drop)
}

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

function dragover(event) {
    console.log('dragover') 
}

function dragenter(event) {
    console.log('dragenter')
    event.target.classList.add('hovered') 
}

function dragleave(event) {
    console.log('dragleave')
    event.target.classList.remove('hovered')  
}
function drop(event) {
    console.log('drop') 
}