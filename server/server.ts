import * as express from 'express';

const app: express.Express = express();
app.listen(8080);
app.use("/", express.static(__dirname + "/../client"));
app.get("/", sendMainpage);

app.post("/todo")
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



function sendMainpage(req: express.Request, res: express.Response) {
    res.status(200);
    res.sendFile(`${__dirname}/client/index.html`);
}
