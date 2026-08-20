import { Link } from "react-router-dom";

function Dashboard({ notes }) {
  const favoriteCount = notes.filter(
    (note) => note.favorite
  ).length;

  const pinnedCount = notes.filter(
    (note) => note.pinned
  ).length;

  return (
    <div>

      <section className="hero">

        <div>
          <p className="welcome">
            Welcome back 👋
          </p>

          <h1>
            Organize your thoughts.
            <br />
            One note at a time.
          </h1>

          <p>
            Create, manage and organize your notes
            easily with NoteFlow.
          </p>

          <Link to="/add" className="hero-button">
            + Create New Note
          </Link>
        </div>

        <div className="hero-icon">
          📝
        </div>

      </section>

      <section className="stats">

        <div className="stat-card">
          <span>📝</span>

          <div>
            <h2>{notes.length}</h2>
            <p>Total Notes</p>
          </div>
        </div>

        <div className="stat-card">
          <span>⭐</span>

          <div>
            <h2>{favoriteCount}</h2>
            <p>Favorites</p>
          </div>
        </div>

        <div className="stat-card">
          <span>📌</span>

          <div>
            <h2>{pinnedCount}</h2>
            <p>Pinned Notes</p>
          </div>
        </div>

      </section>

      <section className="recent">

        <div className="section-heading">
          <h2>Recent Notes</h2>

          <Link to="/notes">
            View All →
          </Link>
        </div>

        <div className="recent-grid">

          {notes.slice(0, 3).map((note) => (

            <div
              className="recent-card"
              key={note.id}
            >

              <span>
                {note.favorite ? "⭐" : "📝"}
              </span>

              <h3>{note.title}</h3>

              <p>{note.content}</p>

              <small>{note.date}</small>

            </div>

          ))}

          {notes.length === 0 && (
            <div className="empty-dashboard">

              <div>📭</div>

              <h3>No notes yet</h3>

              <p>
                Create your first note to get started.
              </p>

            </div>
          )}

        </div>

      </section>

    </div>
  );
}

export default Dashboard;