var todos = [

]
let current = ''

const modal  = document.getElementById('modal') 
const todoInfo  = document.getElementById('todoInfo')
const closeModal  = document.getElementById('closeModal')


const displayTodos = function (){
   
    const ul = document.getElementById('todos')
    ul.innerHTML =''
   

todos.forEach(todo=>{


    let btns = `<span>
    <img src="img/correct.png" alt=""  id= C-${todo.id} class='cmpltBtn'>
    <img src="img/delete.png" alt=""  id= D-${todo.id}  class='dltBtn'>
</span>`
    let li = document.createElement('li')
    li.id=todo.id
    li.classList.add('todoItem')

    if(todo.completed){
        li.classList.add('completed')
        li.innerHTML = todo.title +   '<span class="completed">Completed<span/>'+ btns
    }else if(todo.dueDate){
        li.innerHTML = todo.title +  `<span class="completed">${todo.dueDate.toLocaleString()}<span/>'`+ btns
    }else{
        li.innerHTML = todo.title + btns
    }

    ul.appendChild(li)

})

}

const randomId = text =>{
let textArray = text.split('')
let num = t =>{ return Math.round(Math.random()) * t }
let id ;
if(textArray.length > 5){
    id = textArray[num(2)] + textArray[num(1)] + num(100) +textArray[num(1)] +(textArray.length + num(4))
}else{
    id = textArray[2] + textArray[1] + num(56) +textArray[0] +(textArray.length + num(45))
 
}

return id
}

const showTodoDetails = id =>{
    let x=   todos.findIndex(todo =>{
        return todo.id == id 
    })

    let todo = todos[x]
    todoInfo.title.value = todo.title
    document.getElementById('createdAt').innerHTML=todo.createdAt.toLocaleString()
    document.getElementById('completedAt').innerHTML= todo.completed ? todo.completedAt.toLocaleString(): ''
    todoInfo.description.value = todo.description
    todoInfo.completed.checked = todo.completed
    todoInfo.dueDate.value = todo.dueDate? todo.dueDate.toISOString().substring(0, 16): ''
                                      

current = todo

}

const addTodo = todo =>{
    let id = randomId(todo)
    let newTodo = {
        title: todo,
        description: '',
        completed:false,
        id,
        createdAt: new Date()
    }

    todos.push(newTodo)

    displayTodos()

}

const removeTodo= id =>{
 let tobedltd=   todos.findIndex(todo =>{
        return todo.id == id 
    })


 tobedltd >= 0 ?  todos.splice(tobedltd,1) : ''
 displayTodos()
}

const updateTodo = newTodo =>{
    let target=   todos.findIndex(todo =>{
        return todo.id == newTodo.id 
    })

    todos.splice(target,1,newTodo)


    showTodoDetails(newTodo.id)
    displayTodos()
}

const completeTodo = id =>{

    let target=   todos.findIndex(todo =>{
        return todo.id == id 
    })

    todos[target].completed = !todos[target].completed
    todos[target].dueDate = ''
    todos[target].completedAt = new Date()
    displayTodos()
console.log(todos[target])
}

displayTodos()


//eventlisteners 


const todoForm = document.getElementById('todo')
const todoList = document.getElementById('todos')
// const edtBtn = document.querySelector('.edtBtn')
// const cmpltBtn = document.querySelector('.cmpltBtn')


// seubmit todo

todoForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    if( todoForm.title.value  &&  todoForm.title.value != ' '){

        addTodo( todoForm.title.value)
    }
    todoForm.title.value = ''

})


todoList.addEventListener('click', (e)=>{
//delete todo

if(e.target.classList.contains('dltBtn')){

    let target = e.target.id.split('-')[1]

    removeTodo(target)

}else if(e.target.classList.contains('cmpltBtn')){
    let target = e.target.id.split('-')[1]

    completeTodo(target)
}else if(e.target.classList.contains('todoItem')){

    showTodoDetails(e.target.id)

    modal.classList.add('showModal')

}



})

closeModal.addEventListener('click', e=>{
    modal.classList.remove('showModal')
current = ''
})
todoInfo.addEventListener('submit', e =>{
    e.preventDefault()

    current.title = todoInfo.title.value
    current.description = todoInfo.description.value
    current.completed = todoInfo.completed.checked
    current.dueDate = new Date(todoInfo.dueDate.value)

    updateTodo(current)
    modal.classList.remove('showModal')
    current = ''
    
})