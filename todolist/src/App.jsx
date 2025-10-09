import React, { useState, useEffect } from 'react'

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={"todo-item " + (todo.completed ? 'completed' : '')}>
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span className="text">{todo.text}</span>
      </label>
      <button className="delete" onClick={() => onDelete(todo.id)} aria-label={`Delete ${todo.text}`}>
        ×
      </button>
    </li>
  )
}

export default function App() {
  const [todos, setTodos] = useState(() => {
    try {
      const raw = localStorage.getItem('todos')
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })
  const [text, setText] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos))
    } catch {}
  }, [todos])

  function addTodo(e) {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    setTodos(prev => [
      ...prev,
      { id: Date.now().toString(), text: trimmed, completed: false }
    ])
    setText('')
  }

  function toggleTodo(id) {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  function deleteTodo(id) {
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  function clearCompleted() {
    setTodos(prev => prev.filter(t => !t.completed))
  }

  return (
    <div className="app">
      <h1>To-do List</h1>

      <form onSubmit={addTodo} className="add-form">
        <input
          aria-label="New todo"
          placeholder="Add a new task"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul className="todo-list">
        {todos.length === 0 && <li className="empty">No tasks yet</li>}
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} onDelete={deleteTodo} />
        ))}
      </ul>

      <div className="footer">
        <span>{todos.filter(t => !t.completed).length} items left</span>
        <div>
          <button onClick={() => setTodos([])}>Clear all</button>
          <button onClick={clearCompleted}>Clear completed</button>
        </div>
      </div>
    </div>
  )
}
