import { useState } from "react";
import NoteCard from "../components/NoteCard";

function Notes({
  notes,
  deleteNote,
  updateNote,
  toggleFavorite,
  togglePin,
}) {
  const [search, setSearch] = useState("");

  const filteredNotes = notes.filter((note) =>
    `${note.title} ${note.content}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div>

      <div className="page-header">

        <div>
          <p className="page-label">YOUR NOTES</p>

          <h1>All Notes</h1>

          <p>
            Manage and organize all your notes.
          </p>
        </div>

        <div className="search-box">
          🔍

          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

      </div>

      <div className="notes-grid">

        {filteredNotes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            deleteNote={deleteNote}
            updateNote={updateNote}
            toggleFavorite={toggleFavorite}
            togglePin={togglePin}
          />
        ))}

      </div>

      {filteredNotes.length === 0 && (
        <div className="empty-state">

          <div>📭</div>

          <h2>No notes found</h2>

          <p>
            Create a note or try another search.
          </p>

        </div>
      )}

    </div>
  );
}

export default Notes;