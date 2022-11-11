import { Todo } from "../classes";
import { todoList } from "../index";  


//-------------------- REFERENCIAS --------------------//


const divTodoList = document.querySelector( '.todo-list' );
const txtInput = document.querySelector( '.new-todo' );
const btnDelete = document.querySelector( '.clear-completed' );
const ulFilters = document.querySelector( '.filters' );
const anchorFilters = querySelectorAll('.filter')

export const todoHtml = ( todo ) => {
    const htmlTodo = `
    <li class="${ ( todo.completed ) ? 'completed' : '' }" data-id="abc">
		<div class="view">
			<input class="toggle" type="checkbox" ${ ( todo.completed ) ? 'checked' : '' }>
			<label>${todo.task}</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
	</li>`


    const div = document.createElement( 'div' );
    div.innerHTML = htmlTodo;

    divTodoList.append( div.firstElementChild );

    return div; 
}
    
    //-------------------- EVENTOS --------------------//

    txtInput.addEventListener( 'keyup', ( event ) => {
        
       if( event.keyCode === 13 && txtInput.value.length > 0 ){
        const nuevoTodo = new Todo( txtInput.value )
        todoList.newTodo( nuevoTodo )
        console.log( todoList )

        todoHtml( nuevoTodo )

        txtInput.value = ''
       }


    });

    divTodoList.addEventListener( 'click', ( event ) => {
        const elementName = event.target.localName;
        const todoElement = event.target.parentElement.parentElement;
        const todoId = todoElement.getAttribute( 'data-id' );

        if( elementName.includes( 'input' ) ) {
            todoList.toggleTodo( todoId );
            todoElement.classList.toggle( 'completed' )

        }else if( elementName.includes( 'button' ) ){
            todoList.deleteTodo( todoId );
            divTodoList.removeChild( todoElement )
        }

    } )

    btnDelete.addEventListener( 'click', () => {

        todoList.deleteCompleted();

        for( let i = divTodoList.children.length - 1; i >= 0; i-- ) {
            const element = divTodoList.children[i];

            if( element.classList.contains( 'completed' )) {
                divTodoList.removeChild( element );
            }
        }
    });

    ulFilters.addEventListener( 'click', (event) => {

        const filter = event.target.text;
        if( !filter ) return ;

        anchorFilters.forEach(element => element.classList.remove( 'selected' ));
        event.target.classList.add( 'selected' )

        for( const element of divTodoList.children ){
            element.classList.remove( 'hidden' );
            const completed = element.classList.contains( 'completed' );

            switch (filter) {
                case 'Pendings':
                    if(completed){
                        element.classList.add( 'hidden' )
                    }                    
                    break;

                    case 'Completed':
                    if(!completed){
                        element.classList.add( 'hidden' )
                    }                    
                    break;
            }
        }
    })