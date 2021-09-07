const draggableList = document.getElementById('draggable-list')
const checkBtn = document.getElementById('check-btn')

const richestPeople = [
    'Person 1',
    'Person 2',
    'Person 3',
    'Person 4',
    'Person 5',
    'Person 6',
    'Person 7',
    'Person 8',
    'Person 9',
    'Person 10',
]

// store list items
const listItems = []
let dragStartIndex = 0

createList()

// create list in dom
function createList() {
    [...richestPeople]
    .map(a => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(i => i.value)
    .forEach((person, index) => {
        const listItem = document.createElement('li')
        
        listItem.setAttribute('data-index', index)
        listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
            <p class="person">${person}</p>
            <i class="fas fa-grip-lines"></i>
        </div>
        `
        listItems.push(listItem)
        draggableList.appendChild(listItem)
    })

    addEventListners()
}

function checkOrder() {
    listItems.forEach((listItem, index) => {
        const personName = listItem.querySelector('.draggable').innerText.trim()
        
        if (personName === richestPeople[index]) {
            listItem.classList.remove('wrong')
            listItem.classList.add('right')
        } else {
            listItem.classList.remove('right')
            listItem.classList.add('wrong')
        }
    })
}

function swapItems(fromIndex, toIndex) {
    const item1 = listItems[fromIndex].querySelector('.draggable')
    const item2 = listItems[toIndex].querySelector('.draggable')
    
    listItems[fromIndex].appendChild(item2)
    listItems[toIndex].appendChild(item1)
}

function dragStart() {
    // console.log('drag start')
    dragStartIndex = +this.closest('li').getAttribute('data-index')
    // console.log(dragStartIndex)
}

function dragOver(e) {
    // console.log('drag over')
    e.preventDefault()
    this.classList.add('over')
}

function dragDrop() {
    // console.log('drag drop')
    const dragEndIndex = +this.closest('li').getAttribute('data-index')
    swapItems(dragStartIndex, dragEndIndex)
    this.classList.remove('over')
}

function dragEnter() {
    // console.log('drag enter')
    this.classList.add('over')
}

function dragLeave() {
    // console.log('drag leave')
    this.classList.remove('over')
}

function addEventListners() {
    const draggables = document.querySelectorAll('.draggable')
    const dragListItems = document.querySelectorAll('.draggable-list li')

    draggables.forEach(d => {
        d.addEventListener('dragstart', dragStart)
    })

    dragListItems.forEach(i => {
        i.addEventListener('dragover', dragOver)
        i.addEventListener('drop', dragDrop)
        i.addEventListener('dragenter', dragEnter)
        i.addEventListener('dragleave', dragLeave)
    })

    checkBtn.addEventListener('click', checkOrder)
}
