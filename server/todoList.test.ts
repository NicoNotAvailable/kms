import { describe, test } from '@jest/globals';
import {
    ToDoEntry,
    changeTodo,
    deleteTodo,
    markDone,
    postCat,
    categoryList,
    todoList,
    Category,
    updateCat, deleteCat
} from './server';
import { Request, Response } from 'express';

let localTodoList:ToDoEntry[]= [];
let localCategoryList: Category[] = [];

// Example test class using Jest
describe('ToDoList', () => {
    // Example test case
    test('testCreateGame', () => {
        // Arrange
        const newEntry = new ToDoEntry("title", "description", 1);
        localTodoList.push(newEntry);
        expect(localTodoList.length).toBe(1);
    });

    //Annalena
    test('testUpdateToDo', () => {
        let newEntry = new ToDoEntry("changeThis", "DescriptionA", 1);
        localTodoList.push(newEntry);
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
            expect(localTodoList[0].description).toBe(newDescription);
        }, 1000);

    })

    //Annalena
    test('testDeleteTodo', () => {
        let newEntry = new ToDoEntry("deleteThis", "Description", 1);
        localTodoList.push(newEntry);
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
            expect(localTodoList.length).toBe(0);
        }, 1000)
    })

    //Nico
    test('testCreateCategory', () => {
        let name: string = "SwagCategory";

        const mockReq = {
            body: { name: name }
        } as unknown as Request;
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        postCat(mockReq, mockRes);
        setTimeout(() =>{
            expect(categoryList.length).toBe(1);
        }, 1000);
    })

    test('testMarkAsDone', () =>{
        let newEntry: ToDoEntry = new ToDoEntry("Mark this", "HEHHEHE im swag", 2);
        todoList.push(newEntry);
        let id: number = newEntry.id;

        const mockReq = {
            params: {id: id}
        } as unknown as Request;

        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        markDone(mockReq, mockRes);
        let markedEntry: number;
        for(let i: number = 0; i<todoList.length; i++){
            if (todoList[i].id == id){
                markedEntry = i;
            }
        }

        setTimeout(() =>{
            expect(todoList[markedEntry].status).toBe(true);
        }, 1000);
    })

    //Alex
    test('testUpdateCat', () => {
        let newEntry: Category = new Category("CategoryB");
        let id: number = newEntry.id;

        const mockReq =  {
            params: {id: id},
            body: {name: newEntry.name}
        } as unknown as Request;

        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        updateCat(mockReq, mockRes);

        setTimeout(() =>{
            expect(localCategoryList[0].name).toBe(newEntry.name);
        }, 1000);
    });

    test('testDeleteCategory', () => {
        let newEntry: Category = new Category("CategoryB");
        localCategoryList.push(newEntry);
        let id = newEntry.id.toString();

        const mockReq = {
            params: { id: id },
            body: { name: newEntry.name }
        } as unknown as Request;

        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        deleteCat(mockReq, mockRes);

        setTimeout(() => {
            expect(localCategoryList.length).toBe(0);
        }, 1000)
    })
});