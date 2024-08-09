'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const globals_1 = require('@jest/globals');
const server_1 = require('./server');
const express = require('express');
const http_1 = require('http');
let server = http_1.Server;
let localTodoList = [];
let localCategoryList = [];
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
    server.close(() => {
      console.log('Test server closed');
      done();
    });
  }
});
// Example test class using Jest
(0, globals_1.describe)('ToDoList', () => {
  (0, globals_1.afterEach)(() => {
    localTodoList = [];
    localCategoryList = [];
  });
  // Example test case
  (0, globals_1.test)('testCreateLocalToDo', () => {
    // Arrange
    const newEntry = new server_1.ToDoEntry('title', 'description', 1);
    localTodoList.push(newEntry);
    expect(localTodoList.length).toBe(1);
  });
  //Chasan
  (0, globals_1.test)('testCreateToDo', () => {
    const newEntry = new server_1.ToDoEntry('testTitle', 'testDescr', 1);
    localTodoList.push(newEntry);
    const mockReq = {
      body: {
        title: newEntry.title,
        description: newEntry.description,
        status: newEntry.status,
        priority: newEntry.priority,
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    (0, server_1.postTodo)(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(201);
  });
  //Chasan
  (0, globals_1.test)('testCreateToDo-Fault-EmptyTitle', () => {
    const newEntry = new server_1.ToDoEntry('', 'testDescr', 1);
    localTodoList.push(newEntry);
    const mockReq = {
      body: {
        title: newEntry.title,
        description: newEntry.description,
        status: newEntry.status,
        priority: newEntry.priority,
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    (0, server_1.postTodo)(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(400);
  });
  //Chasan
  (0, globals_1.test)('testCreateToDo-Fault-MissingTitle', () => {
    const newEntry = new server_1.ToDoEntry('', 'testDescr', 1);
    localTodoList.push(newEntry);
    const mockReq = {
      body: {
        description: newEntry.description,
        status: newEntry.status,
        priority: newEntry.priority,
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    (0, server_1.postTodo)(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(400);
  });
  //Annalena
  (0, globals_1.test)('testUpdateToDo', () => {
    const newEntry = new server_1.ToDoEntry('changeThis', 'DescriptionA', 1);
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
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    (0, server_1.changeTodo)(localTodoList, mockReq, mockRes);
    expect(localTodoList[0].description).toBe(newDescription);
  });
  //Annalena
  (0, globals_1.test)('testDeleteTodo', () => {
    const newEntry = new server_1.ToDoEntry('deleteThis', 'Description', 1);
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
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    (0, server_1.deleteTodo)(localTodoList, mockReq, mockRes);
    expect(localTodoList.length).toBe(0);
  });
  //Nico
  (0, globals_1.test)('testCreateCategory', () => {
    const name = 'SwagCategory';
    const mockReq = {
      body: { name: name },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    (0, server_1.postCat)(localCategoryList, mockReq, mockRes);
    expect(localCategoryList.length).toBe(1);
  });
  (0, globals_1.test)('testMarkAsDone', () => {
    const newEntry = new server_1.ToDoEntry('Mark this', 'HEHHEHE im swag', 2);
    localTodoList.push(newEntry);
    const id = newEntry.id;
    const mockReq = {
      params: { id: id },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    (0, server_1.markDone)(localTodoList, mockReq, mockRes);
    let markedEntry = 0;
    for (let i = 0; i < localTodoList.length; i++) {
      if (localTodoList[i].id == id) {
        markedEntry = i;
      }
    }
    expect(localTodoList[markedEntry].status).toBe(true);
  });
  //Alex
  (0, globals_1.test)('testUpdateCat', () => {
    const newEntry = new server_1.Category('CategoryB');
    const id = newEntry.id;
    localCategoryList.push(newEntry);
    const mockReq = {
      params: { id: id },
      body: { name: newEntry.name },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    (0, server_1.updateCat)(localCategoryList, mockReq, mockRes);
    expect(localCategoryList[0].name).toBe(newEntry.name);
  });
  (0, globals_1.test)('testDeleteCategory', () => {
    const newEntry = new server_1.Category('CategoryB');
    localCategoryList.push(newEntry);
    const id = newEntry.id.toString();
    const mockReq = {
      params: { id: id },
      body: { name: newEntry.name },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    (0, server_1.deleteCat)(localCategoryList, mockReq, mockRes);
    expect(localCategoryList.length).toBe(0);
  });
});
