const express = require(express);
const { response } = require('express');
const db = require('../db');
const utils = require('../utils');

const router = express.Router();

// Created table ToDoItem in database
//id(autoIncrement), assignedTo, Status, dueDate, priority , comments



// Get all Tasks
router.get('/api/tasks', (request, response) => {
    const statement = `
      SELECT assignedTo, status, dueDate, priority, comments
      FROM TodoItem
    `
    db.pool.query(statement, [request.user['id']], (error, items) => {
      response.send(utils.createResult(error, items))
    })
  })

// Create a new Task
  router.post('/api/task', (request, response) => {
    const { AssignedTo, status, dueDate, priority, comments} = request.body
  
    const statement = `
          INSERT INTO TodoItem (
              AssignedTo, status, dueDate, priority, comments
          ) VALUES (?, ?, ?, ?, ?)
        `
    db.pool.execute(
      statement,
      [AssignedTo, status, dueDate, priority, comments, request.user['id']],
      (error, result) => {
        response.send(utils.createResult(error, result))
      }
    )
  })


// Delete a Task
  router.delete('/api/task/:id', (request, response) => {
    const { id } = request.params
  
    const statement = `
      DELETE FROM TodoItem
      WHERE id = ?
    `
    db.pool.execute(statement, [id], (error, result) => {
      response.send(utils.createResult(error, result))
    })
  })
  


// Update a Task  
  router.patch('/api/task/:id', (request, response) => {
    const { id } = request.params;
    const { AssignedTo, status, dueDate, priority, comments} = request.body
  
    const statement = `
      UPDATE TodoItem
      SET assignedTo = ?, status = ?, dueDate = ?,priority = ?
      WHERE id = ?
    `
    db.pool.query(statement, [AssignedTo, status, dueDate, priority, comments, id ], (error, items) => {
      response.send(utils.createResult(error, items))
    })
  })
