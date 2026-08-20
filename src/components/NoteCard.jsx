import { useState } from "react";

function NoteCard({
  note,
  deleteNote,
  updateNote,
  toggleFavorite,
  togglePin,
}) {
  const [editing, setEditing] = useState(false);

  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const saveEdit = () => {
    updateNote(note.id, title, content);
    setEditing(false);
  };

  return (
    <div className={`note-card ${note.pinned ? "pinned" : ""}`}>

      <div className="note-top">

        <span>
          {note.pinned ? "📌" : "📝"}
        </span>

        <button
          className="favorite-button"
          onClick={() => toggleFavorite(note.id)}
        >
          {note.favorite ? "⭐" : "☆"}
        </button>

      </div>

      {editing ? (
        <>
          <input
            className="edit-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="edit-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button
            className="save-button"
            onClick={saveEdit}
          >
            Save Changes
          </button>
        </>
      ) : (
        <>
          <h3>{note.title}</h3>

          <p>{note.content}</p>

          <small>{note.date}</small>

          <div className="note-actions">

            <button onClick={() => setEditing(true)}>
              ✏️ Edit
            </button>

            <button onClick={() => togglePin(note.id)}>
              📌 Pin
            </button>

            <button
              className="delete-button"
              onClick={() => deleteNote(note.id)}
            >
              🗑️ Delete
            </button>

          </div>
        </>
      )}

    </div>
  );
}

export default NoteCard;