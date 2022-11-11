
import { Todo, TodoList } from './classes'; 
import { todoHtml } from './js/componentes';

import './styles.css';



export const todoList = new TodoList()

todoList.todos.forEach( todo => todoHtml( todo ) )