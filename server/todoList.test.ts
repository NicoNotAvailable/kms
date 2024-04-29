import { describe, test } from '@jest/globals';
import {ToDoEntry} from './server';

let todoList= [];

// Example test class using Jest
describe('ToDoList', () => {
    // Example test case
    test('testCreateGame', () => {
        // Arrange
        const newEntry = new ToDoEntry("title", "description", 1);
        todoList.push(newEntry);
    });


});