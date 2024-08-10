import { describe, test, afterEach } from '@jest/globals';
import {
  ToDoEntry,
  changeTodo,
  deleteTodo,
  markDone,
  postCat,
  Category,
  updateCat,
  deleteCat,
  postTodo,
} from './server';
const express = require('express');
import { Request, Response } from 'express';
import { Server } from 'http';

let server = Server;
let localTodoList: ToDoEntry[] = [];
let localCategoryList: Category[] = [];

//const app = express();

//Chasan
beforeAll((done) => {
  process.env.PORT = '8081'; // Port 8081 for Tests

  const app = express();

  server = app.listen(process.env.PORT, () => {
    console.log(`Test server running on port ${process.env.PORT}`);
    done();
  });
});

afterAll((done) => {
  if (server) {
    (server as any).close(() => {
      console.log('Test server closed');
      done();
    });
  }
});

// Example test class using Jest
describe('ToDoList', () => {
  afterEach(() => {
    localTodoList = [];
    localCategoryList = [];
  });

  // Example test case
  test('testCreateLocalToDo', () => {
    // Arrange
    const newEntry = new ToDoEntry('title', 'description', 1);
    localTodoList.push(newEntry);
    expect(localTodoList.length).toBe(1);
  });

  //Chasan
  test('testCreateToDo', () => {
    const newEntry = new ToDoEntry('testTitle', 'testDescr', 1);
    localTodoList.push(newEntry);

    const mockReq = {
      body: {
        title: newEntry.title,
        description: newEntry.description,
        status: newEntry.status,
        priority: newEntry.priority,
      },
    } as unknown as Request;

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    postTodo(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(201);
  });

  //Chasan
  test('testCreateToDo-Fault-EmptyTitle', () => {
    const newEntry = new ToDoEntry('', 'testDescr', 1);
    localTodoList.push(newEntry);

    const mockReq = {
      body: {
        title: newEntry.title,
        description: newEntry.description,
        status: newEntry.status,
        priority: newEntry.priority,
      },
    } as unknown as Request;

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    postTodo(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
  });

  //Chasan
  test('testCreateToDo-Fault-MissingTitle', () => {
    const newEntry = new ToDoEntry('', 'testDescr', 1);
    localTodoList.push(newEntry);

    const mockReq = {
      body: {
        description: newEntry.description,
        status: newEntry.status,
        priority: newEntry.priority,
      },
    } as unknown as Request;

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    postTodo(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
  });

  //Annalena
  test('testUpdateToDo', () => {
    const newEntry = new ToDoEntry('changeThis', 'DescriptionA', 1);
    localTodoList.push(newEntry);
    const newDescription = 'DescriptionB';
    const id = newEntry.id.toString();

    const mockReq = {
      params: { id: id },
      body: {
        title: newEntry.title,
        description: 'DescriptionB',
        status: newEntry.status,
        priority: newEntry.priority,
      },
    } as unknown as Request;

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    changeTodo(localTodoList, mockReq, mockRes);
    expect(localTodoList[0].description).toBe(newDescription);
  });

  //Annalena
  test('testDeleteTodo', () => {
    const newEntry = new ToDoEntry('deleteThis', 'Description', 1);
    localTodoList.push(newEntry);
    const id = newEntry.id.toString();

    const mockReq = {
      params: { id: id },
      body: {
        title: newEntry.title,
        description: newEntry.description,
        status: newEntry.status,
        priority: newEntry.priority,
      },
    } as unknown as Request;

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    deleteTodo(localTodoList, mockReq, mockRes);

    expect(localTodoList.length).toBe(0);
  });

  //Nico
  test('testCreateCategory', () => {
    const name: string = 'SwagCategory';

    const mockReq = {
      body: { name: name },
    } as unknown as Request;
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    postCat(localCategoryList, mockReq, mockRes);

    expect(localCategoryList.length).toBe(1);
  });

  test('testMarkAsDone', () => {
    const newEntry: ToDoEntry = new ToDoEntry('Mark this', 'HEHHEHE im swag', 2);
    localTodoList.push(newEntry);
    const id: number = newEntry.id;

    const mockReq = {
      params: { id: id },
    } as unknown as Request;

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    markDone(localTodoList, mockReq, mockRes);
    let markedEntry = 0;
    for (let i: number = 0; i < localTodoList.length; i++) {
      if (localTodoList[i].id == id) {
        markedEntry = i;
      }
    }

    expect(localTodoList[markedEntry].status).toBe(true);
  });

  //Alex
  test('testUpdateCat', () => {
    const newEntry: Category = new Category('CategoryB');
    const id: number = newEntry.id;
    localCategoryList.push(newEntry);

    const mockReq = {
      params: { id: id },
      body: { name: newEntry.name },
    } as unknown as Request;

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    updateCat(localCategoryList, mockReq, mockRes);

    expect(localCategoryList[0].name).toBe(newEntry.name);
  });

  test('testDeleteCategory', () => {
    const newEntry: Category = new Category('CategoryB');
    localCategoryList.push(newEntry);
    const id = newEntry.id.toString();

    const mockReq = {
      params: { id: id },
      body: { name: newEntry.name },
    } as unknown as Request;

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    deleteCat(localCategoryList, mockReq, mockRes);

    expect(localCategoryList.length).toBe(0);
  });

  // Tina
  test('testDeleteCategory-Fault-NotFound', () => {
    const newEntry: Category = new Category('CategoryB');
    const id = newEntry.id.toString();

    // Category doesnt get pushed into Category List
    const mockReq = {
      params: { id: id },
      body: { name: newEntry.name },
    } as unknown as Request;

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    deleteCat(localCategoryList, mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(404);
  });
});
