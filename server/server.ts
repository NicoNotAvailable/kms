import express from 'express';

const app: express.Express = express();
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.use("/", express.static(__dirname + "/../client"));
app.get("/", sendMainpage);
app.use(express.json());

app.get("/todo", getTodo);
app.post("/todo", postTodo);
app.delete("/todo/:id", deleteTodo);
app.put("/todo/:id", changeTodo);
app.patch("/todo/:id", markDone);

app.post("/cat", postCat);
app.put("/cat/:id", updateCat);
app.delete("/cat/:id", deleteCat);

export class ToDoEntry {
    id: number;
    title: string;
    description: string;
    status: boolean;
    priority: number;

    constructor(title: string, description: string, priority: number) {
        this.id = incrementedIdTodo;
        incrementedIdTodo++;
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.status = false;
    }
}

export class Category{
    id: number;
    name: string;
    todos: ToDoEntry[];

    constructor(name: string) {
        this.id = incrementedIdCat;
        incrementedIdCat++;
        this.name = name;
        this.todos = [];
    }
}

let incrementedIdTodo: number = 0;
let incrementedIdCat: number = 0;

export let todoList: ToDoEntry[] = [];
export let categoryList: Category[] = [];
let todo1 = new ToDoEntry('Finish project', 'Complete the final report and submit it.', 2);
let todo2 = new ToDoEntry('Buy groceries', 'Get milk, eggs, bread, and vegetables.', 1);
let todo3 = new ToDoEntry('Go for a run', 'Run for at least 30 minutes.', 3);

// Adding dummy data to todoList array
todoList.push(todo1, todo2, todo3);


function sendMainpage(req: express.Request, res: express.Response) {
    res.status(200);
    res.sendFile(`${__dirname}/client/index.html`);
}

export function postTodo(req: express.Request, res: express.Response) {
    const title: string = req.body.title;
    const description: string = req.body.description;
    const priority: number = req.body.priority;

    if (title === undefined || description === undefined || title.trim() == "" || description.trim() == "") {
        res.status(400);
        res.json({message: "Values are not defined"});
    } else {
        const newEntry = new ToDoEntry(title, description, priority);
        todoList.push(newEntry);
        res.status(201).json({message: "Task was created"});
    }
}

function getTodo(req: express.Request, res: express.Response) {
    console.log(todoList);
    res.status(200);
    res.json(todoList);
}


export function deleteTodo(req: express.Request, res: express.Response): void {
    let todoIndex: number = Number(req.params.id);
    let deletedEntry: ToDoEntry[];
    for (let i: number = 0; i < todoList.length; i++) {
        if (todoList[i].id === todoIndex) {
            todoList.splice(i, 1);
            break;
        }
    }
    if (deletedEntry !== null) {
        res.status(200);
        res.json({msg: 'User was deleted'});
    } else {
        res.status(404);
        res.json({msg: 'Todo Entry not found!'});
    }
}

export function changeTodo(req: express.Request, res: express.Response): void {
    let todoIndex: number = Number(req.params.id);
    let newTitle: string | undefined = req.body.title;
    let newDesc: string | undefined = req.body.description;
    let prio: number | undefined = Number(req.body.priority);

    let changedEntry: ToDoEntry;

    for (const element of todoList) {
        if (element.id === todoIndex) {
            changedEntry = element;
            changedEntry.title = newTitle;
            changedEntry.description = newDesc;
            changedEntry.priority = prio;
            res.status(200);
            res.json({msg: 'Task is changed successfully', todo: changedEntry});
            console.log(changedEntry.description);
            return;
        }
    }

    res.status(404);
    res.json({ msg: 'Todo Entry not found!' });
}

export function markDone(req: express.Request, res: express.Response): void {
    let todoIndex: number = Number(req.params.id);
    let changedEntry: ToDoEntry;

    for (const todo of todoList){
        if(todo.id === todoIndex){
            changedEntry = todo;
        }
    }
    changedEntry.status = !changedEntry.status;
    res.status(200).json({msg:'Todo has been marked'});
}

export function postCat(req: express.Request, res: express.Response): void {
    let name: string = req.body.name;

    if (name == undefined || name.trim().length == 0 || name === ""){
        res.status(400).json({msg: "Name cannot be empty"});
    } else{
        const newCategory: Category = new Category(name);
        categoryList.push(newCategory);
        res.status(201).json({msg: 'Creating Category went WHOOOP WHOOP'});
    }
}

export function updateCat(req: express.Request, res: express.Response) {
    let id: number = Number(req.params.id);
    let name: string = req.body.name

    let changedEntry: Category;

    for (const element of categoryList) {
        if (element.id === id) {
            changedEntry = element;
            changedEntry.name = name;
            res.status(200);
            res.json({msg: 'Category is changed successfully', todo: changedEntry});
            return;
        }
    }
    res.status(404);
    res.json({ msg: 'Category not found!' });
}

export function deleteCat(req: express.Request, res: express.Response) {
    let id: number = Number(req.params.id);
    let deletedEntry: Category[];
    for (let i: number = 0; i < categoryList.length; i++) {
        if (categoryList[i].id === id) {
            categoryList.splice(i, 1);
            break;
        }
    }
    if (deletedEntry !== null) {
        res.status(200);
        res.json({msg: 'Category was deleted'});
    } else {
        res.status(404);
        res.json({msg: 'Category not found!'});
    }
}