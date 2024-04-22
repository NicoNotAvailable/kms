import * as express from 'express';

const app: express.Express = express();
app.listen(8080);
app.use("/", express.static(__dirname + "/../client"));
app.get("/", sendMainpage);

app.post("/todo")
app.get("/todo")
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


function sendMainpage(req: express.Request, res: express.Response) {
    res.status(200);
    res.sendFile(`${__dirname}/client/index.html`);
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

}