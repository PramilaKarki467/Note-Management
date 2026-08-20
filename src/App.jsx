import { useEffect, useState } from "react";
import "./App.css";

/* =========================================================
   NEW NOTE
========================================================= */

function NewNote({
  title,
  setTitle,
  content,
  setContent,
  addNote,
  setPage,
}) {
  const characterCount = content.length;

  return (
    <div>
      <div className="pageHeader">
        <div>
          <p className="label">CREATE</p>
          <h1>Create New Note</h1>
          <p>Write down your ideas, thoughts and important information.</p>
        </div>
      </div>

      <div className="editor">

        <label>Note Title</label>

        <input
          type="text"
          placeholder="Enter note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoComplete="off"
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "8px",
          }}
        >
          <label style={{ marginBottom: 0 }}>
            Note Content
          </label>

          <span
            style={{
              fontSize: "12px",
              color: "#94a3b8",
            }}
          >
            {characterCount} characters
          </span>
        </div>

        <textarea
          placeholder="Start writing your note here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          spellCheck="true"
        />

        <div
          style={{
            fontSize: "12px",
            color: "#94a3b8",
            marginTop: "-15px",
            marginBottom: "20px",
          }}
        >
          Your unfinished note is automatically saved as a draft.
        </div>

        <div className="editorActions">

          <button
            className="cancelButton"
            onClick={() => {
              setTitle("");
              setContent("");
              setPage("dashboard");
            }}
          >
            Cancel
          </button>

          <button
            className="saveButton"
            onClick={addNote}
          >
            💾 Save Note
          </button>

        </div>
      </div>
    </div>
  );
}


/* =========================================================
   NOTE CARD
========================================================= */

function NoteCard({
  note,
  startEdit,
  toggleFavorite,
  togglePin,
  deleteNote,
  editingId,
  editTitle,
  setEditTitle,
  editContent,
  setEditContent,
  saveEdit,
  setEditingId,
}) {
  return (
    <div className={`noteCard ${note.pinned ? "pinned" : ""}`}>

      {editingId === note.id ? (

        <>
          <input
            className="editInput"
            value={editTitle}
            onChange={(e) =>
              setEditTitle(e.target.value)
            }
          />

          <textarea
            className="editTextarea"
            value={editContent}
            onChange={(e) =>
              setEditContent(e.target.value)
            }
          />

          <div className="actionRow">

            <button onClick={saveEdit}>
              💾 Save
            </button>

            <button
              onClick={() => setEditingId(null)}
            >
              Cancel
            </button>

          </div>
        </>

      ) : (

        <>
          <div className="noteTop">

            <span>
              {note.pinned
                ? "📌 Pinned"
                : "📝 Note"}
            </span>

            <button
              className="starButton"
              onClick={() =>
                toggleFavorite(note.id)
              }
            >
              {note.favorite ? "⭐" : "☆"}
            </button>

          </div>

          <h3>{note.title}</h3>

          <p>{note.content}</p>

          <small>
            Created: {note.date}
          </small>

          <div className="actionRow">

            <button
              onClick={() =>
                startEdit(note)
              }
            >
              ✏️ Edit
            </button>

            <button
              onClick={() =>
                togglePin(note.id)
              }
            >
              📌{" "}
              {note.pinned
                ? "Unpin"
                : "Pin"}
            </button>

            <button
              className="deleteButton"
              onClick={() =>
                deleteNote(note.id)
              }
            >
              🗑️ Delete
            </button>

          </div>
        </>

      )}

    </div>
  );
}


/* =========================================================
   DASHBOARD
========================================================= */

function Dashboard({
  notes,
  setPage,
  toggleFavorite,
}) {
  const favoriteCount =
    notes.filter(
      (note) => note.favorite
    ).length;

  const pinnedCount =
    notes.filter(
      (note) => note.pinned
    ).length;

  return (
    <div>

      <div className="hero">

        <div>

          <div className="welcome">
            WELCOME TO NOTEFLOW
          </div>

          <h1>
            Capture your thoughts.
            <br />
            Organize your ideas.
          </h1>

          <p>
            A simple and beautiful place to write,
            organize and manage your notes.
          </p>

          <button
            className="heroButton"
            onClick={() =>
              setPage("new")
            }
          >
            + Create New Note
          </button>

        </div>

        <div className="heroIcon">
          📝
        </div>

      </div>


      <div className="stats">

        <div className="stat">

          <div className="statIcon">
            📝
          </div>

          <div>
            <h2>{notes.length}</h2>
            <p>Total Notes</p>
          </div>

        </div>


        <div className="stat">

          <div className="statIcon">
            ⭐
          </div>

          <div>
            <h2>{favoriteCount}</h2>
            <p>Favorites</p>
          </div>

        </div>


        <div className="stat">

          <div className="statIcon">
            📌
          </div>

          <div>
            <h2>{pinnedCount}</h2>
            <p>Pinned Notes</p>
          </div>

        </div>

      </div>


      <div className="sectionTitle">

        <h2>Recent Notes</h2>

        <button
          onClick={() =>
            setPage("notes")
          }
        >
          View All →
        </button>

      </div>


      {notes.length === 0 ? (

        <div className="empty">

          <div>📝</div>

          <h2>No notes yet</h2>

          <p>
            Create your first note to get started.
          </p>

        </div>

      ) : (

        <div className="notesGrid">

          {notes
            .slice(0, 3)
            .map((note) => (

              <div
                className={`noteCard ${
                  note.pinned
                    ? "pinned"
                    : ""
                }`}
                key={note.id}
              >

                <div className="noteTop">

                  <span>
                    {note.pinned
                      ? "📌 Pinned"
                      : "📝 Note"}
                  </span>

                  <button
                    className="starButton"
                    onClick={() =>
                      toggleFavorite(
                        note.id
                      )
                    }
                  >
                    {note.favorite
                      ? "⭐"
                      : "☆"}
                  </button>

                </div>

                <h3>{note.title}</h3>

                <p>{note.content}</p>

                <small>
                  Created: {note.date}
                </small>

              </div>

            ))}

        </div>

      )}

    </div>
  );
}


/* =========================================================
   NOTES PAGE
========================================================= */

function NotesPage({
  notes,
  search,
  setSearch,
  startEdit,
  toggleFavorite,
  togglePin,
  deleteNote,
  editingId,
  editTitle,
  setEditTitle,
  editContent,
  setEditContent,
  saveEdit,
  setEditingId,
}) {
  const filteredNotes =
    notes.filter((note) => {

      const text =
        `${note.title} ${note.content}`
          .toLowerCase();

      return text.includes(
        search.toLowerCase()
      );

    });

  return (
    <div>

      <div className="pageHeader">

        <div>

          <p className="label">
            YOUR NOTES
          </p>

          <h1>All Notes</h1>

          <p>
            Manage and organize all your notes.
          </p>

        </div>


        <div className="searchBox">

          🔍

          <input
            placeholder="Search notes..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

      </div>


      {filteredNotes.length === 0 ? (

        <div className="empty">

          <div>🔍</div>

          <h2>No notes found</h2>

          <p>
            Try another search.
          </p>

        </div>

      ) : (

        <div className="notesGrid">

          {filteredNotes.map(
            (note) => (

              <NoteCard
                key={note.id}
                note={note}
                startEdit={startEdit}
                toggleFavorite={
                  toggleFavorite
                }
                togglePin={togglePin}
                deleteNote={deleteNote}
                editingId={editingId}
                editTitle={editTitle}
                setEditTitle={
                  setEditTitle
                }
                editContent={editContent}
                setEditContent={
                  setEditContent
                }
                saveEdit={saveEdit}
                setEditingId={
                  setEditingId
                }
              />

            )
          )}

        </div>

      )}

    </div>
  );
}


/* =========================================================
   FAVORITES
========================================================= */

function Favorites({
  notes,
  toggleFavorite,
  startEdit,
  togglePin,
  deleteNote,
  editingId,
  editTitle,
  setEditTitle,
  editContent,
  setEditContent,
  saveEdit,
  setEditingId,
}) {
  const favorites =
    notes.filter(
      (note) => note.favorite
    );

  return (
    <div>

      <div className="pageHeader">

        <div>

          <p className="label">
            SAVED NOTES
          </p>

          <h1>Favorites</h1>

          <p>
            Your most important notes.
          </p>

        </div>

      </div>


      {favorites.length === 0 ? (

        <div className="empty">

          <div>⭐</div>

          <h2>
            No favorites yet
          </h2>

          <p>
            Favorite a note and it
            will appear here.
          </p>

        </div>

      ) : (

        <div className="notesGrid">

          {favorites.map(
            (note) => (

              <NoteCard
                key={note.id}
                note={note}
                startEdit={startEdit}
                toggleFavorite={
                  toggleFavorite
                }
                togglePin={togglePin}
                deleteNote={deleteNote}
                editingId={editingId}
                editTitle={editTitle}
                setEditTitle={
                  setEditTitle
                }
                editContent={editContent}
                setEditContent={
                  setEditContent
                }
                saveEdit={saveEdit}
                setEditingId={
                  setEditingId
                }
              />

            )
          )}

        </div>

      )}

    </div>
  );
}


/* =========================================================
   ABOUT
========================================================= */

function About() {
  return (
    <div className="about">

      <div className="aboutIcon">
        📝
      </div>

      <h1>
        About NoteFlow
      </h1>

      <p className="aboutText">
        NoteFlow is a simple and clean
        note-taking application designed
        to help you capture your thoughts,
        ideas and important information
        in one place.
      </p>


      <div className="features">

        <div>

          <span>📝</span>

          <h3>Create</h3>

          <p>
            Quickly create and save
            your notes.
          </p>

        </div>


        <div>

          <span>✏️</span>

          <h3>Edit</h3>

          <p>
            Update your notes whenever
            you need.
          </p>

        </div>


        <div>

          <span>⭐</span>

          <h3>Organize</h3>

          <p>
            Favorite and pin important
            notes.
          </p>

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   APP
========================================================= */

function App() {

  /* NOTES */

  const [notes, setNotes] =
    useState(() => {

      const savedNotes =
        localStorage.getItem(
          "myNotes"
        );

      return savedNotes
        ? JSON.parse(savedNotes)
        : [];

    });


  /* PAGE */

  const [page, setPage] =
    useState("dashboard");


  /* DARK MODE */

  const [darkMode, setDarkMode] =
    useState(false);


  /* NEW NOTE */

  const [title, setTitle] =
    useState(() => {

      return (
        localStorage.getItem(
          "noteDraftTitle"
        ) || ""
      );

    });


  const [content, setContent] =
    useState(() => {

      return (
        localStorage.getItem(
          "noteDraftContent"
        ) || ""
      );

    });


  /* SEARCH */

  const [search, setSearch] =
    useState("");


  /* EDIT */

  const [editingId, setEditingId] =
    useState(null);

  const [editTitle, setEditTitle] =
    useState("");

  const [editContent, setEditContent] =
    useState("");


  /* =======================================================
     DARK MODE
  ======================================================= */

  useEffect(() => {

    if (darkMode) {

      document.body.classList.add(
        "dark-body"
      );

      document.documentElement.classList.add(
        "dark-body"
      );

      document.body.classList.remove(
        "light-body"
      );

      document.documentElement.classList.remove(
        "light-body"
      );

    } else {

      document.body.classList.add(
        "light-body"
      );

      document.documentElement.classList.add(
        "light-body"
      );

      document.body.classList.remove(
        "dark-body"
      );

      document.documentElement.classList.remove(
        "dark-body"
      );

    }

  }, [darkMode]);


  /* =======================================================
     LOCAL STORAGE
  ======================================================= */

  useEffect(() => {

    localStorage.setItem(
      "myNotes",
      JSON.stringify(notes)
    );

  }, [notes]);


  /* =======================================================
     AUTO SAVE DRAFT
  ======================================================= */

  useEffect(() => {

    if (title.trim() !== "") {

      localStorage.setItem(
        "noteDraftTitle",
        title
      );

    } else {

      localStorage.removeItem(
        "noteDraftTitle"
      );

    }

  }, [title]);


  useEffect(() => {

    if (content !== "") {

      localStorage.setItem(
        "noteDraftContent",
        content
      );

    } else {

      localStorage.removeItem(
        "noteDraftContent"
      );

    }

  }, [content]);


  /* =======================================================
     ADD NOTE
  ======================================================= */

  const addNote = () => {

    if (
      title.trim() === "" ||
      content.trim() === ""
    ) {

      alert(
        "Please enter a title and content."
      );

      return;

    }


    const newNote = {

      id: Date.now(),

      title: title.trim(),

      content: content,

      favorite: false,

      pinned: false,

      date:
        new Date()
          .toLocaleDateString(),

    };


    setNotes(
      (previousNotes) => [
        newNote,
        ...previousNotes,
      ]
    );


    setTitle("");

    setContent("");


    localStorage.removeItem(
      "noteDraftTitle"
    );

    localStorage.removeItem(
      "noteDraftContent"
    );


    setPage("notes");

  };


  /* =======================================================
     DELETE
  ======================================================= */

  const deleteNote = (id) => {

    setNotes(
      (previousNotes) =>
        previousNotes.filter(
          (note) =>
            note.id !== id
        )
    );

  };


  /* =======================================================
     FAVORITE
  ======================================================= */

  const toggleFavorite = (id) => {

    setNotes(
      (previousNotes) =>
        previousNotes.map(
          (note) =>
            note.id === id
              ? {
                  ...note,
                  favorite:
                    !note.favorite,
                }
              : note
        )
    );

  };


  /* =======================================================
     PIN
  ======================================================= */

  const togglePin = (id) => {

    setNotes(
      (previousNotes) =>
        previousNotes.map(
          (note) =>
            note.id === id
              ? {
                  ...note,
                  pinned:
                    !note.pinned,
                }
              : note
        )
    );

  };


  /* =======================================================
     START EDIT
  ======================================================= */

  const startEdit = (note) => {

    setEditingId(note.id);

    setEditTitle(note.title);

    setEditContent(note.content);

  };


  /* =======================================================
     SAVE EDIT
  ======================================================= */

  const saveEdit = () => {

    setNotes(
      (previousNotes) =>
        previousNotes.map(
          (note) =>
            note.id === editingId
              ? {
                  ...note,
                  title:
                    editTitle,
                  content:
                    editContent,
                }
              : note
        )
    );


    setEditingId(null);

    setEditTitle("");

    setEditContent("");

  };


  /* =======================================================
     APP
  ======================================================= */

  return (

    <div
      className={
        darkMode
          ? "app dark"
          : "app"
      }
    >

      {/* NAVBAR */}

      <nav className="navbar">

        <button
          className="logo"
          onClick={() =>
            setPage("dashboard")
          }
        >
          📝 NoteFlow
        </button>


        <div className="navLinks">

          <button
            className={
              page === "dashboard"
                ? "active"
                : ""
            }
            onClick={() =>
              setPage("dashboard")
            }
          >
            🏠 Dashboard
          </button>


          <button
            className={
              page === "notes"
                ? "active"
                : ""
            }
            onClick={() =>
              setPage("notes")
            }
          >
            📝 Notes
          </button>


          <button
            className={
              page === "favorites"
                ? "active"
                : ""
            }
            onClick={() =>
              setPage("favorites")
            }
          >
            ⭐ Favorites
          </button>


          <button
            className={
              page === "about"
                ? "active"
                : ""
            }
            onClick={() =>
              setPage("about")
            }
          >
            ℹ️ About
          </button>

        </div>


        <div className="navActions">

          <button
            className="themeButton"
            onClick={() =>
              setDarkMode(
                (previous) =>
                  !previous
              )
            }
          >
            {darkMode
              ? "☀️"
              : "🌙"}
          </button>


          <button
            className="newButton"
            onClick={() =>
              setPage("new")
            }
          >
            + New Note
          </button>

        </div>

      </nav>


      {/* MAIN */}

      <main className="container">

        {page === "dashboard" && (

          <Dashboard
            notes={notes}
            setPage={setPage}
            toggleFavorite={
              toggleFavorite
            }
          />

        )}


        {page === "notes" && (

          <NotesPage
            notes={notes}
            search={search}
            setSearch={setSearch}
            startEdit={startEdit}
            toggleFavorite={
              toggleFavorite
            }
            togglePin={togglePin}
            deleteNote={deleteNote}
            editingId={editingId}
            editTitle={editTitle}
            setEditTitle={
              setEditTitle
            }
            editContent={editContent}
            setEditContent={
              setEditContent
            }
            saveEdit={saveEdit}
            setEditingId={
              setEditingId
            }
          />

        )}


        {page === "new" && (

          <NewNote
            title={title}
            setTitle={setTitle}
            content={content}
            setContent={setContent}
            addNote={addNote}
            setPage={setPage}
          />

        )}


        {page === "favorites" && (

          <Favorites
            notes={notes}
            toggleFavorite={
              toggleFavorite
            }
            startEdit={startEdit}
            togglePin={togglePin}
            deleteNote={deleteNote}
            editingId={editingId}
            editTitle={editTitle}
            setEditTitle={
              setEditTitle
            }
            editContent={editContent}
            setEditContent={
              setEditContent
            }
            saveEdit={saveEdit}
            setEditingId={
              setEditingId
            }
          />

        )}


        {page === "about" && (
          <About />
        )}

      </main>

    </div>

  );
}

export default App;