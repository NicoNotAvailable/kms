"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCat = exports.updateCat = exports.postCat = exports.markDone = exports.changeTodo = exports.deleteTodo = exports.postTodo = exports.categoryList = exports.todoList = exports.Category = exports.ToDoEntry = void 0;
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
app.use("/", express_1.default.static(__dirname + "/../client"));
app.get("/", sendMainpage);
app.use(express_1.default.json());
app.get("/todo", getTodo);
app.post("/todo", postTodo);
app.delete("/todo/:id", (req, res) => deleteTodo(exports.todoList, req, res));
app.put("/todo/:id", (req, res) => changeTodo(exports.todoList, req, res));
app.patch("/todo/:id", (req, res) => markDone(exports.todoList, req, res));
app.post("/cat", (req, res) => postCat(exports.categoryList, req, res));
app.put("/cat/:id", (req, res) => updateCat(exports.categoryList, req, res));
app.delete("/cat/:id", (req, res) => deleteCat(exports.categoryList, req, res));
class ToDoEntry {
    constructor(title, description, priority) {
        this.id = incrementedIdTodo;
        incrementedIdTodo++;
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.status = false;
    }
}
exports.ToDoEntry = ToDoEntry;
class Category {
    constructor(name) {
        this.id = incrementedIdCat;
        incrementedIdCat++;
        this.name = name;
        this.todos = [];
    }
}
exports.Category = Category;
let incrementedIdTodo = 0;
let incrementedIdCat = 0;
exports.todoList = [];
exports.categoryList = [];
let todo1 = new ToDoEntry('Finish project', 'Complete the final report and submit it.', 2);
let todo2 = new ToDoEntry('Buy groceries', 'Get milk, eggs, bread, and vegetables.', 1);
let todo3 = new ToDoEntry('Go for a run', 'Run for at least 30 minutes.', 3);
// Adding dummy data to todoList array
exports.todoList.push(todo1, todo2, todo3);
function sendMainpage(req, res) {
    res.status(200);
    res.sendFile(`${__dirname}/client/index.html`);
}
function postTodo(req, res) {
    const title = req.body.title;
    const description = req.body.description;
    const priority = req.body.priority;
    if (title === undefined || description === undefined || title.trim() == "" || description.trim() == "") {
        res.status(400);
        res.json({ message: "Values are not defined" });
    }
    else {
        const newEntry = new ToDoEntry(title, description, priority);
        exports.todoList.push(newEntry);
        res.status(201).json({ message: "Task was created" });
    }
}
exports.postTodo = postTodo;
function getTodo(req, res) {
    console.log(exports.todoList);
    res.status(200);
    res.json(exports.todoList);
}
function deleteTodo(todoList, req, res) {
    let todoIndex = Number(req.params.id);
    let deletedEntry;
    for (let i = 0; i < todoList.length; i++) {
        if (todoList[i].id === todoIndex) {
            todoList.splice(i, 1);
            break;
        }
    }
    if (deletedEntry !== null) {
        res.status(200);
        res.json({ msg: 'User was deleted' });
    }
    else {
        res.status(404);
        res.json({ msg: 'Todo Entry not found!' });
    }
}
exports.deleteTodo = deleteTodo;
function changeTodo(todoList, req, res) {
    let todoIndex = Number(req.params.id);
    let newTitle = req.body.title;
    let newDesc = req.body.description;
    let prio = Number(req.body.priority);
    let changedEntry;
    for (const element of todoList) {
        if (element.id === todoIndex) {
            changedEntry = element;
            changedEntry.title = newTitle;
            changedEntry.description = newDesc;
            changedEntry.priority = prio;
            res.status(200);
            res.json({ msg: 'Task is changed successfully', todo: changedEntry });
            console.log(changedEntry.description);
            return;
        }
    }
    res.status(404);
    res.json({ msg: 'Todo Entry not found!' });
}
exports.changeTodo = changeTodo;
function markDone(todoList, req, res) {
    let todoIndex = Number(req.params.id);
    let changedEntry;
    for (const todo of todoList) {
        if (todo.id === todoIndex) {
            changedEntry = todo;
        }
    }
    changedEntry.status = !changedEntry.status;
    res.status(200).json({ msg: 'Todo has been marked' });
}
exports.markDone = markDone;
function postCat(categoryList, req, res) {
    let name = req.body.name;
    if (name == undefined || name.trim().length == 0 || name === "") {
        res.status(400).json({ msg: "Name cannot be empty" });
    }
    else {
        const newCategory = new Category(name);
        categoryList.push(newCategory);
        res.status(201).json({ msg: 'Creating Category went WHOOOP WHOOP' });
    }
}
exports.postCat = postCat;
function updateCat(categoryList, req, res) {
    let id = Number(req.params.id);
    let name = req.body.name;
    let changedEntry;
    for (const element of categoryList) {
        if (element.id === id) {
            changedEntry = element;
            changedEntry.name = name;
            res.status(200);
            res.json({ msg: 'Category is changed successfully', todo: changedEntry });
            return;
        }
    }
    res.status(404);
    res.json({ msg: 'Category not found!' });
}
exports.updateCat = updateCat;
function deleteCat(categoryList, req, res) {
    let id = Number(req.params.id);
    let deletedEntry;
    for (let i = 0; i < categoryList.length; i++) {
        if (categoryList[i].id === id) {
            categoryList.splice(i, 1);
            break;
        }
    }
    if (deletedEntry !== null) {
        res.status(200);
        res.json({ msg: 'Category was deleted' });
    }
    else {
        res.status(404);
        res.json({ msg: 'Category not found!' });
    }
}
exports.deleteCat = deleteCat;
