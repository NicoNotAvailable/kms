"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const server_1 = require("./server");
const express = require('express');
let localTodoList = [];
let localCategoryList = [];
let server;
//const app = express();
//Chasan
beforeAll((done) => {
    process.env.PORT = '8081'; //Port 8081 for Tests
    const app = express();
    server = app.listen(process.env.PORT, () => {
        console.log(`Test server running on port ${process.env.PORT}`);
        done();
    });
});
afterAll((done) => {
    server.close(done);
});
// Example test class using Jest
(0, globals_1.describe)('ToDoList', () => {
    (0, globals_1.afterEach)(() => {
        localTodoList = [];
    });
    // Example test case
    (0, globals_1.test)('testCreateLocalToDo', () => {
        // Arrange
        const newEntry = new server_1.ToDoEntry("title", "description", 1);
        localTodoList.push(newEntry);
        expect(localTodoList.length).toBe(1);
    });
    //Chasan
    (0, globals_1.test)('testCreateToDo', () => {
        let newEntry = new server_1.ToDoEntry("testTitle", "testDescr", 1);
        localTodoList.push(newEntry);
        let id = newEntry.id.toString();
        const mockReq = {
            body: { title: newEntry.title, description: newEntry.description, status: newEntry.status, priority: newEntry.priority }
        };
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        (0, server_1.postTodo)(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(201);
    });
    //Chasan
    (0, globals_1.test)('testCreateToDo-Fault-EmptyTitle', () => {
        let newEntry = new server_1.ToDoEntry("", "testDescr", 1);
        localTodoList.push(newEntry);
        let id = newEntry.id.toString();
        const mockReq = {
            body: { title: newEntry.title, description: newEntry.description, status: newEntry.status, priority: newEntry.priority }
        };
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        (0, server_1.postTodo)(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(400);
    });
    //Chasan
    (0, globals_1.test)('testCreateToDo-Fault-MissingTitle', () => {
        let newEntry = new server_1.ToDoEntry("", "testDescr", 1);
        localTodoList.push(newEntry);
        let id = newEntry.id.toString();
        const mockReq = {
            body: { description: newEntry.description, status: newEntry.status, priority: newEntry.priority }
        };
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        (0, server_1.postTodo)(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(400);
    });
    //Annalena
    (0, globals_1.test)('testUpdateToDo', () => __awaiter(void 0, void 0, void 0, function* () {
        let newEntry = new server_1.ToDoEntry("changeThis", "DescriptionA", 1);
        localTodoList.push(newEntry);
        let newDescription = 'DescriptionB';
        let id = newEntry.id.toString();
        const mockReq = {
            params: { id: id },
            body: { title: newEntry.title, description: 'DescriptionB', status: newEntry.status, priority: newEntry.priority }
        };
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        yield (0, server_1.changeTodo)(localTodoList, mockReq, mockRes);
        expect(localTodoList[0].description).toBe(newDescription);
    }));
    //Annalena
    (0, globals_1.test)('testDeleteTodo', () => __awaiter(void 0, void 0, void 0, function* () {
        let newEntry = new server_1.ToDoEntry("deleteThis", "Description", 1);
        localTodoList.push(newEntry);
        let id = newEntry.id.toString();
        const mockReq = {
            params: { id: id },
            body: { title: newEntry.title, description: newEntry.description, status: newEntry.status, priority: newEntry.priority }
        };
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        yield (0, server_1.deleteTodo)(localTodoList, mockReq, mockRes);
        expect(localTodoList.length).toBe(0);
    }));
    //Chasan
    (0, globals_1.test)('testCreateAndUpdateToDo', () => {
        let newEntry = new server_1.ToDoEntry("", "testDescr", 1);
        localTodoList.push(newEntry);
        let id = newEntry.id.toString();
        const mockReq = {
            body: { description: newEntry.description, status: newEntry.status, priority: newEntry.priority }
        };
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        (0, server_1.postTodo)(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(400);
    });
    //Nico
    (0, globals_1.test)('testCreateCategory', () => {
        let name = "SwagCategory";
        const mockReq = {
            body: { name: name }
        };
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        (0, server_1.postCat)(mockReq, mockRes);
        setTimeout(() => {
            expect(server_1.categoryList.length).toBe(1);
        }, 1000);
    });
    (0, globals_1.test)('testMarkAsDone', () => __awaiter(void 0, void 0, void 0, function* () {
        let newEntry = new server_1.ToDoEntry("Mark this", "HEHHEHE im swag", 2);
        localTodoList.push(newEntry);
        let id = newEntry.id;
        const mockReq = {
            params: { id: id }
        };
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        yield (0, server_1.markDone)(localTodoList, mockReq, mockRes);
        let markedEntry = 0;
        for (let i = 0; i < localTodoList.length; i++) {
            if (localTodoList[i].id == id) {
                markedEntry = i;
            }
        }
        expect(localTodoList[markedEntry].status).toBe(true);
    }));
    //Alex
    (0, globals_1.test)('testUpdateCat', () => {
        let newEntry = new server_1.Category("CategoryB");
        let id = newEntry.id;
        const mockReq = {
            params: { id: id },
            body: { name: newEntry.name }
        };
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        (0, server_1.updateCat)(mockReq, mockRes);
        setTimeout(() => {
            expect(localCategoryList[0].name).toBe(newEntry.name);
        }, 1000);
    });
    (0, globals_1.test)('testDeleteCategory', () => {
        let newEntry = new server_1.Category("CategoryB");
        localCategoryList.push(newEntry);
        let id = newEntry.id.toString();
        const mockReq = {
            params: { id: id },
            body: { name: newEntry.name }
        };
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        (0, server_1.deleteCat)(mockReq, mockRes);
        setTimeout(() => {
            expect(localCategoryList.length).toBe(0);
        }, 1000);
    });
});
