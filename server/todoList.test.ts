import { describe, test } from '@jest/globals';
import {ToDoEntry, changeTodo, deleteTodo} from './server';
import { Request, Response } from 'express';

let todoList= [];

// Example test class using Jest
describe('ToDoList', () => {
    // Example test case
    test('testCreateGame', () => {
        // Arrange
        const newEntry = new ToDoEntry("title", "description", 1);
        todoList.push(newEntry);
        expect(todoList.length).toBe(1);
    });

    //Annalena
    test('testUpdateToDo', () => {
        let newEntry = new ToDoEntry("changeThis", "DescriptionA", 1);
        todoList.push(newEntry);
        let newDescription = 'DescriptionB';
        let id = newEntry.id.toString();

        const mockReq = {
            params: { id: id },
            body: { title: newEntry.title, description: 'DescriptionB', status: newEntry.status, priority: newEntry.priority }
        } as unknown as Request;

        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        changeTodo(mockReq, mockRes);

        setTimeout(() => {
            expect(todoList[0].description).toBe(newDescription);
        }, 1000);

    })

    //Annalena
    test('testDeleteTodo', () => {
        let newEntry = new ToDoEntry("deleteThis", "Description", 1);
        todoList.push(newEntry);
        let id = newEntry.id.toString();

        const mockReq = {
            params: { id: id },
            body: { title: newEntry.title, description: newEntry.description, status: newEntry.status, priority: newEntry.priority }
        } as unknown as Request;

        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        deleteTodo(mockReq, mockRes);

        setTimeout(() => {
            expect(todoList.length).toBe(0);
        }, 1000)
    })
});