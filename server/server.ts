import * as express from 'express';

const app: express.Express = express();
app.listen(8080);
app.use("/", express.static(__dirname + "/../client"));
app.get("/", sendMainpage);

app.post("/todo", postTask);
app.get("/todo", getTodo);
app.delete("/todo/:id", deleteTodo);
app.patch("/todo/:id", changeTodo);

export class ToDoEntry {
    id: number;
    title: string;
    description: string;
    status: boolean;
    priority: number;

    constructor(title: string, description: string, priority: number) {
        this.id = incrementedId;
        incrementedId++;
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.status = false;
    }
}

let incrementedId: number = 0;

let todoList: ToDoEntry[] = [];
let todo1 = new ToDoEntry('Finish project', 'Complete the final report and submit it.', 2);
let todo2 = new ToDoEntry('Buy groceries', 'Get milk, eggs, bread, and vegetables.', 1);
let todo3 = new ToDoEntry('Go for a run', 'Run for at least 30 minutes.', 3);

// Adding dummy data to todoList array
todoList.push(todo1, todo2, todo3);


function sendMainpage(req: express.Request, res: express.Response) {
    res.status(200);
    res.sendFile(`${__dirname}/client/index.html`);
}

function postTask(req: express.Request, res: express.Response) {
    const title: string = req.body.title;
    const description: string = req.body.description;
    const priority: number = req.body.priority;

    if (title === undefined || description === undefined || title.trim() == "" || description.trim() == "") {
        res.status(400);
        res.json({message: "Values are not defined"});
    } else {
        const newEntry = new ToDoEntry(title, description, priority);
        todoList.push(newEntry);
        res.status(201);
        res.json({message: "Task was created"});
    }
}

function getTodo(req: express.Request, res: express.Response) {
    console.log(todoList);
    res.json(todoList);
    res.sendStatus(200);
}

function deleteTodo(req: express.Request, res: express.Response): void {
    let todoIndex: number = Number(req.params.id);
    let deletedEntry: ToDoEntry[];
    for (let i: number = 0; i < todoList.length; i++) {
        if (todoList[i].id === todoIndex) {
            deletedEntry = todoList.splice(i, 1);
            break;
        }
    }
    if (deletedEntry !== null) {
        res.status(200);
    } else{
        res.status(404);
        res.json({msg: 'Todo Entry not found!'});
    }
}

function changeTodo(req: express.Request, res: express.Response): void {
    //todo
}