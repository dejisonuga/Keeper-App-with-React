import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import initialNotes from "../notes";

function App() {
  const [notes, setNotes] = useState(initialNotes);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [formError, setFormError] = useState("");

  function handleInputChange(event) {
    const { name, value } = event.target;
    setNewNote((currentNote) => ({ ...currentNote, [name]: value }));
    setFormError("");
  }

  function handleAdd(event) {
    event.preventDefault();

    const title = newNote.title.trim();
    const content = newNote.content.trim();

    if (!title || !content) {
      setFormError("Enter both a title and note content.");
      return;
    }

    const nextKey =
      notes.reduce((highestKey, note) => Math.max(highestKey, note.key), 0) +
      1;

    setNotes((currentNotes) => [
      { key: nextKey, title, content },
      ...currentNotes,
    ]);
    setNewNote({ title: "", content: "" });
    setFormError("");
  }

  function handleUpdate(noteKey, content) {
    setNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.key === noteKey ? { ...note, content } : note,
      ),
    );
  }

  function handleDelete(noteKey) {
    setNotes((currentNotes) =>
      currentNotes.filter((note) => note.key !== noteKey),
    );
  }

  return (
    <div>
      <Header />
      <form className="create-note" onSubmit={handleAdd}>
        <h2>Write your secrets</h2>
        <input
          aria-label="Note title"
          name="title"
          type="text"
          placeholder="Title"
          value={newNote.title}
          onChange={handleInputChange}
          maxLength={100}
          required
        />
        <textarea
          aria-label="Note content"
          name="content"
          placeholder="Write your note..."
          value={newNote.content}
          onChange={handleInputChange}
          rows={4}
          required
        />
        {formError && (
          <p className="form-error" role="alert">
            {formError}
          </p>
        )}
        <button type="submit">Add note</button>
      </form>
      {notes.map((noteItem) => (
        <Note
          key={noteItem.key}
          title={noteItem.title}
          content={noteItem.content}
          onUpdate={(content) => handleUpdate(noteItem.key, content)}
          onDelete={() => handleDelete(noteItem.key)}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
