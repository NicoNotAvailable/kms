import express from 'express';
import { Server } from 'http';

const app: express.Express = express();

let server: Server;
const PORT = process.env.PORT ?? 8080;
if (process.env.TEST_MODE !== 'true') {
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

app.use('/', express.static(__dirname + '/../client'));
app.get('/', sendMainpage);
app.use(express.json());

app.get('/todo', getTodo);
app.post('/todo', postTodo);
app.delete('/todo/:id', (req, res) => deleteTodo(todoList, req, res));
app.put('/todo/:id', (req, res) => changeTodo(todoList, req, res));
app.patch('/todo/:id', (req, res) => markDone(todoList, req, res));

app.post('/cat', (req, res) => postCat(categoryList, req, res));
app.put('/cat/:id', (req, res) => updateCat(categoryList, req, res));
app.delete('/cat/:id', (req, res) => deleteCat(categoryList, req, res));

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

export class Category {
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

const todoList: ToDoEntry[] = [];
const categoryList: Category[] = [];
const todo1 = new ToDoEntry('Finish project', 'Complete the final report and submit it.', 2);
const todo2 = new ToDoEntry('Buy groceries', 'Get milk, eggs, bread, and vegetables.', 1);
const todo3 = new ToDoEntry('Go for a run', 'Run for at least 30 minutes.', 3);

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

  if (title === undefined || description === undefined || title.trim() == '' || description.trim() == '') {
    res.status(400);
    res.json({ message: 'Values are not defined' });
  } else {
    const newEntry = new ToDoEntry(title, description, priority);
    todoList.push(newEntry);
    res.status(201).json({ message: 'Task was created' });
  }
}

function getTodo(req: express.Request, res: express.Response) {
  console.log(todoList);
  res.status(200);
  res.json(todoList);
}

export function deleteTodo(todoList: ToDoEntry[], req: any, res: any): void {
  const todoIndex: number = Number(req.params.id);
  let deletedEntry: ToDoEntry | undefined;

  console.log('Test');
  for (let i: number = 0; i < todoList.length; i++) {
    if (todoList[i].id === todoIndex) {
      todoList.splice(i, 1);
      break;
    }
  }
  if (deletedEntry !== null) {
    res.status(200);
    res.json({ msg: 'User was deleted' });
  } else {
    res.status(404);
    res.json({ msg: 'Todo Entry not found!' });
  }
}

export function changeTodo(todoList: ToDoEntry[], req: any, res: any): void {
  const todoIndex: number = Number(req.params.id);
  const newTitle: string | undefined = req.body.title;
  const newDesc: string | undefined = req.body.description;
  const prio: number | undefined = Number(req.body.priority);

  let changedEntry: ToDoEntry;

  const hi: string = '123';
  console.log(hi);
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

export function markDone(todoList: ToDoEntry[], req: any, res: any): void {
  const todoIndex: number = Number(req.params.id);
  let changedEntry: ToDoEntry | undefined;

  for (const todo of todoList) {
    if (todo.id === todoIndex) {
      changedEntry = todo;
      break;
    }
  }
  if (changedEntry !== undefined) {
    changedEntry.status = !changedEntry.status;
    res.status(200).json({ msg: 'Todo has been marked', todo: changedEntry });
  } else {
    res.status(404).json({ msg: 'Todo not found' });
  }
}

export function postCat(categoryList: Category[], req: express.Request, res: express.Response): void {
  const name: string = req.body.name;

  if (name == undefined || name.trim().length == 0 || name === '') {
    res.status(400).json({ msg: 'Name cannot be empty' });
  } else {
    const newCategory: Category = new Category(name);
    categoryList.push(newCategory);
    res.status(201).json({ msg: 'Creating Category went WHOOOP WHOOP' });
  }
}

export function updateCat(categoryList: Category[], req: express.Request, res: express.Response) {
  const id: number = Number(req.params.id);
  const name: string = req.body.name;

  let changedEntry: Category;

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

export function deleteCat(categoryList: Category[], req: express.Request, res: express.Response) {
  const id: number = Number(req.params.id);
  let deletedEntry: Category[] | undefined;
  for (let i: number = 0; i < categoryList.length; i++) {
    if (categoryList[i].id === id) {
      categoryList.splice(i, 1);
      break;
    }
  }
  if (deletedEntry !== null) {
    res.status(200);
    res.json({ msg: 'Category was deleted' });
  } else {
    res.status(404);
    res.json({ msg: 'Category not found!' });
  }
}
