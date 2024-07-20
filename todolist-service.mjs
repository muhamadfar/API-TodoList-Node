export class TodolistService {
    Todolist = ["muhamad", "fariz", "qiyansyah"];

    getJsonTodoList(){
        return JSON.stringify({
            code: 200,
            status: "oke",
            data: this.Todolist.map((value, index) => {
                return {
                    id: index,
                    todo: value
                }
            })
        })
    }
    getTodolist(request, response){
        response.write(this.getJsonTodoList());
        response.end();
    }

    createTodo(request, response){
        request.addListener("data", (data) => {
            const body = JSON.parse(data.toString());
            this.Todolist.push(body.todo);

            response.write(this.getJsonTodoList());
            response.end();
        })
    }

    updateTodo(request, response){
        request.addListener("data", (data) => {
            const body = JSON.parse(data.toString());
            if (this.Todolist[body.id]){
                this.Todolist[body.id] = body.todo;
            }

            response.write(this.getJsonTodoList());
            response.end();
        })
    }

    deleteTodo(request, response){
        request.addListener("data", (data) => {
            const body = JSON.parse(data.toString());
            if (this.Todolist[body.id]){
                // delete this.Todolist[body.id]; MENJADI NULL
                this.Todolist.splice(body.id, 1);
            }

            response.write(this.getJsonTodoList());
            response.end();
        })
    }
}