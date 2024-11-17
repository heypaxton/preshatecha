
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import notesData from "./notes.json";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleNotes, setVisibleNotes] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const NOTES_PER_LOAD = 5; // Number of notes to load per batch

  useEffect(() => {
    // Initialize with the first batch of notes
    setVisibleNotes(notesData.slice(0, NOTES_PER_LOAD));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleLoadMore = () => {
    const currentLength = visibleNotes.length;
    const nextBatch = notesData.slice(
      currentLength,
      currentLength + NOTES_PER_LOAD
    );
    setVisibleNotes((prevNotes) => [...prevNotes, ...nextBatch]);

    if (currentLength + nextBatch.length >= notesData.length) {
      setHasMore(false); // No more notes to load
    }
  };

  // Filter notes based on the search term
  const filteredNotes = visibleNotes.filter((note) =>
    note.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.date.includes(searchTerm)
  );

  return (
    <div className="app-container">
      <header className="header">Preshatecha</header>
      <div className="container mb-4">
        <input
          type="text"
          className="form-control search-bar"
          placeholder="Search by content or date (MM/DD/YYYY)"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="container">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className="col-12 mb-4 d-flex justify-content-center"
          >
            <div className="card note-card">
              <div className="card-body">
                <p className="card-text">{note.text}</p>
                <p className="card-date">{note.date}</p>
              </div>
            </div>
          </div>
        ))}
        {hasMore && (
          <div className="text-center">
            <button className="btn btn-primary mt-4" onClick={handleLoadMore}>
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
