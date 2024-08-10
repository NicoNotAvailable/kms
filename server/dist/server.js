"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCat = exports.updateCat = exports.postCat = exports.markDone = exports.changeTodo = exports.deleteTodo = exports.postTodo = exports.Category = exports.ToDoEntry = void 0;
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
let server;
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 8080;
if (process.env.TEST_MODE !== 'true') {
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    server = app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
app.use('/', express_1.default.static(__dirname + '/../client'));
app.get('/', sendMainpage);
app.use(express_1.default.json());
app.get('/todo', getTodo);
app.post('/todo', postTodo);
app.delete('/todo/:id', (req, res) => deleteTodo(todoList, req, res));
app.put('/todo/:id', (req, res) => changeTodo(todoList, req, res));
app.patch('/todo/:id', (req, res) => markDone(todoList, req, res));
app.post('/cat', (req, res) => postCat(categoryList, req, res));
app.put('/cat/:id', (req, res) => updateCat(categoryList, req, res));
app.delete('/cat/:id', (req, res) => deleteCat(categoryList, req, res));
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
const todoList = [];
const categoryList = [];
const todo1 = new ToDoEntry('Finish project', 'Complete the final report and submit it.', 2);
const todo2 = new ToDoEntry('Buy groceries', 'Get milk, eggs, bread, and vegetables.', 1);
const todo3 = new ToDoEntry('Go for a run', 'Run for at least 30 minutes.', 3);
// Adding dummy data to todoList array
todoList.push(todo1, todo2, todo3);
function sendMainpage(req, res) {
    res.status(200);
    res.sendFile(`${__dirname}/client/index.html`);
}
function postTodo(req, res) {
    const title = req.body.title;
    const description = req.body.description;
    const priority = req.body.priority;
    if (title === undefined || description === undefined || title.trim() == '' || description.trim() == '') {
        res.status(400);
        res.json({ message: 'Values are not defined' });
    }
    else {
        const newEntry = new ToDoEntry(title, description, priority);
        todoList.push(newEntry);
        res.status(201).json({ message: 'Task was created' });
    }
}
exports.postTodo = postTodo;
function getTodo(req, res) {
    console.log(todoList);
    res.status(200);
    res.json(todoList);
}
function deleteTodo(todoList, req, res) {
    const todoIndex = Number(req.params.id);
    let deletedEntry;
    for (let i = 0; i < todoList.length; i++) {
        if (todoList[i].id === todoIndex) {
            todoList.splice(i, 1);
            res.status(200);
            res.json({ msg: 'User was deleted' });
            break;
        }
    }
    res.status(404);
    res.json({ msg: 'Todo Entry not found!' });
}
exports.deleteTodo = deleteTodo;
function changeTodo(todoList, req, res) {
    const todoIndex = Number(req.params.id);
    const newTitle = req.body.title;
    const newDesc = req.body.description;
    const prio = Number(req.body.priority);
    let changedEntry;
    for (const element of todoList) {
        if (element.id === todoIndex) {
            changedEntry = element;
            if (newTitle !== undefined) {
                changedEntry.title = newTitle;
            }
            if (newDesc !== undefined) {
                changedEntry.description = newDesc;
            }
            changedEntry.priority = prio;
            res.status(200);
            res.json({ msg: 'Task is changed successfully', todo: changedEntry });
            return;
        }
    }
    res.status(404);
    res.json({ msg: 'Todo Entry not found!' });
}
exports.changeTodo = changeTodo;
function markDone(todoList, req, res) {
    const todoIndex = Number(req.params.id);
    let changedEntry;
    for (const todo of todoList) {
        if (todo.id === todoIndex) {
            changedEntry = todo;
            break;
        }
    }
    if (changedEntry !== undefined) {
        changedEntry.status = !changedEntry.status;
        res.status(200).json({ msg: 'Todo has been marked', todo: changedEntry });
    }
    else {
        res.status(404).json({ msg: 'Todo not found' });
    }
}
exports.markDone = markDone;
function postCat(categoryList, req, res) {
    const name = req.body.name;
    if (name == undefined || name.trim().length == 0 || name === '') {
        res.status(400).json({ msg: 'Name cannot be empty' });
    }
    else {
        const newCategory = new Category(name);
        categoryList.push(newCategory);
        res.status(201).json({ msg: 'There was an error creating the category' });
    }
}
exports.postCat = postCat;
function updateCat(categoryList, req, res) {
    const id = Number(req.params.id);
    const name = req.body.name;
    let changedEntry;
    if (name == undefined || name.trim().length == 0 || name === '') {
        res.status(400).json({ msg: 'Name cannot be empty' });
        return;
    }
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
    const id = Number(req.params.id);
    let deletedEntry;
    for (let i = 0; i < categoryList.length; i++) {
        if (categoryList[i].id === id) {
            categoryList.splice(i, 1);
            res.status(200);
            res.json({ msg: 'Category was deleted' });
            break;
        }
    }
    res.status(404);
    res.json({ msg: 'Category not found!' });
}
exports.deleteCat = deleteCat;
