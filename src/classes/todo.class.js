

export class Todo {

    constructor( task ) {
        this.task = task;
        this.id =  new Date().getDate();
        this.completed = false;
        this.created = new Date(); 
    }
}