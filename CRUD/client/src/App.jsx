import React, { useEffect, useState } from 'react'
import axios from 'axios'

const API = process.env.REACT_APP_API_URL || 'http://localhost:4000/api'

export default function App() {
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [editing, setEditing] = useState(null)

  const fetchNotes = async () => {
    const res = await axios.get(`${API}/notes`)
    setNotes(res.data)
  }

  useEffect(() => { fetchNotes() }, [])

  const createNote = async () => {
    if (!title) return alert('Title required')
    const res = await axios.post(`${API}/notes`, { title, content })
    setNotes(prev => [...prev, res.data])
    setTitle(''); setContent('')
  }

  const startEdit = (note) => {
    setEditing(note); setTitle(note.title); setContent(note.content)
  }

  const saveEdit = async () => {
    if (!editing) return
    const res = await axios.put(`${API}/notes/${editing.id}`, { title, content })
    setNotes(prev => prev.map(n => n.id === res.data.id ? res.data : n))
    setEditing(null); setTitle(''); setContent('')
  }

  const deleteNote = async (id) => {
    await axios.delete(`${API}/notes/${id}`)
    setNotes(prev => prev.filter(n => n.id !== id))
  }

  return (
    <div className="container">
      <h1>Notes CRUD</h1>

      <div className="form">
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <textarea placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
        {editing ? (
          <div>
            <button onClick={saveEdit}>Save</button>
            <button onClick={() => { setEditing(null); setTitle(''); setContent('') }}>Cancel</button>
          </div>
        ) : (
          <button onClick={createNote}>Create</button>
        )}
      </div>

      <ul className="notes">
        {notes.map(n => (
          <li key={n.id}>
            <div className="note-header">
              <strong>{n.title}</strong>
              <div>
                <button onClick={() => startEdit(n)}>Edit</button>
                <button onClick={() => deleteNote(n.id)}>Delete</button>
              </div>
            </div>
            <p>{n.content}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
