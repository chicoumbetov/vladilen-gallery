const item = document.querySelector('.item')
const placeholders = document.querySelectorAll('.placeholder')

item.addEventListener('dragstart', dragStart)
item.addEventListener('dragend', dragEnd)

for (const placeholder of placeholders) {
    placeholder.addEventListener('dragover', dragOver)
    placeholder.addEventListener('dragenter', dragEnter)
    placeholder.addEventListener('dragleave', dragLeave)
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

function dragOver(event) {
    // console.log('dragover') 
    event.preventDefault()
}

function dragEnter(event) {
    // console.log('dragenter')
    event.target.classList.add('hovered') 
}

function dragLeave(event) {
    // console.log('dragleave')
    event.target.classList.remove('hovered')  
}
function drop(event) {
    console.log('drop') 
    event.target.classList.remove('hovered') 
    event.target.append(item)  // put item inside placeholder
}