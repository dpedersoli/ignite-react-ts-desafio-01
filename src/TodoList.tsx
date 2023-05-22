import React, { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      const newTodoItem: Todo = {
        id: todos.length + 1,
        text: newTodo,
        completed: false,
      };

      setTodos([...todos, newTodoItem]);
      setNewTodo('');
    }
  };

  const handleToggleComplete = (id: number) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (id: number) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
  };

  return (
    <div>
      <h2>Todo List</h2>
      <input
        type="text"
        value={newTodo}
        onChange={handleInputChange}
        placeholder="Enter a new todo"
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleComplete(todo.id)}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;


// import TodoList from './TodoList';

// <TodoList />

// In this code, we define the Todo interface to represent the structure of each to-do item. We use the useState hook to manage the state of our to-do list and the input field for adding new to-do items. The handleInputChange function updates the newTodo state as the user types in the input field. The handleAddTodo function adds a new to-do item to the list when the user clicks the "Add Todo" button.

// We also have the handleToggleComplete function to mark a to-do item as complete or incomplete when the user toggles the checkbox. The handleDeleteTodo function removes a to-do item from the list when the user clicks the "Delete" button.

// Finally, we render the list of to-do items using the map function on the todos state array. Each to-do item is displayed with a checkbox, the item text, and a delete button.

// To use this TodoList component, you can import and include it in your main App.tsx file or any other parent component as needed: