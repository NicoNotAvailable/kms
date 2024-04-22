import * as express from 'express';

const app: express.Express = express();
app.listen(8080);
app.use("/", express.static(__dirname + "/../client"));
app.get("/", sendMainpage);

app.post("/todo", postTask)
app.get("/todo")
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
    app.get('/todo', (req, res) => {
        res.json(todoList);
    });
}