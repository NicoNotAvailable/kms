import * as express from 'express';

const app: express.Express = express();
app.listen(8080);
app.use("/", express.static(__dirname + "/../client"));
app.get("/", sendMainpage);

app.post("/todo", postTask)
app.get("/todo", getTodo)
app.delete("/todo/:id")

export class ToDoEntry {
    title: string;
    description: string;
    status: boolean;
    priority: number;

    constructor(title: string, description: string, priority: number) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.status = false;
    }
}

let todoList: ToDoEntry[] = [];
let todo1 = new ToDoEntry('Finish project', 'Complete the final report and submit it.', 2);
let todo2 = new ToDoEntry('Buy groceries', 'Get milk, eggs, bread, and vegetables.', 1);
let todo3 = new ToDoEntry('Go for a run', 'Run for at least 30 minutes.', 3);

// Adding dummy data to todoList array
todoList.push(todo1, todo2, todo3);

/* Task posten */
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
        res.status(200);
        res.json({message: "Task was created"});
    }
}


function sendMainpage(req: express.Request, res: express.Response) {
    res.status(200);
    res.sendFile(`${__dirname}/client/index.html`);
}


function getTodo(req: express.Request, res: express.Response) {
    console.log(todoList);
    res.json(todoList);
    res.sendStatus(200);
}