"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [posterUrl, setPosterUrl] = useState("");
  const [description, setDescription] = useState("");
  const [trailerUrl, setTrailerUrl] = useState("");
  const [genre, setGenre] = useState("");
  const [selectedTrailer, setSelectedTrailer] = useState(null);

  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Fetch movies
  const fetchMovies = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/movies");
      const data = await res.json();
      setMovies(data);
      setFilteredMovies(data);
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // Apply filters
  useEffect(() => {
    let temp = movies;
    if (search) {
      temp = temp.filter((m) =>
        m.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (selectedGenre) {
      temp = temp.filter(
        (m) => m.genre?.toLowerCase() === selectedGenre.toLowerCase()
      );
    }
    setFilteredMovies(temp);
  }, [search, selectedGenre, movies]);

  // Add new movie
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMovie = { title, posterUrl, description, trailerUrl, genre };

    try {
      const res = await fetch("http://localhost:8080/api/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMovie),
      });

      if (res.ok) {
        await fetchMovies();
        setShowForm(false);
        setTitle("");
        setPosterUrl("");
        setDescription("");
        setTrailerUrl("");
        setGenre("");
      }
    } catch (err) {
      console.error("Error adding movie:", err);
    }
  };

  // Ratings
  const handleRating = (id, rating) => {
    setMovies((prev) =>
      prev.map((m) => (m.id === id ? { ...m, rating } : m))
    );
  };

  return (
    <div
      className={`min-h-screen w-full transition duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white"
          : "bg-gradient-to-br from-gray-100 via-white to-gray-200 text-black"
      }`}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 p-6 shadow-lg bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 rounded-b-2xl text-white">
        <h1 className="text-4xl font-extrabold tracking-wide drop-shadow-lg">
          🎬 Movie Collection
        </h1>
        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="🔍 Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-lg shadow focus:outline-none text-black"
          />

          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="px-4 py-2 rounded-lg shadow text-black"
          >
            <option value="">All Genres</option>
            <option value="Action">Action</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Drama">Drama</option>
          </select>

          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:scale-105 transition-transform"
          >
            + Add Movie
          </button>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-gray-800 px-4 py-2 rounded-lg shadow hover:scale-105 transition-transform"
          >
            {darkMode ? "🌞 Light" : "🌙 Dark"}
          </button>
        </div>
      </div>

      {/* Movies Grid */}
      <motion.div
        layout
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-6"
      >
        {filteredMovies.map((movie) => (
          <motion.div
            key={movie.id}
            layout
            whileHover={{ scale: 1.05 }}
            className="rounded-xl shadow-xl overflow-hidden bg-white/20 dark:bg-gray-800/50 backdrop-blur-lg cursor-pointer hover:shadow-2xl transition"
            onClick={() => setSelectedTrailer(movie.trailerUrl)}
          >
            <motion.img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-full h-64 object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.4 }}
            />
            <div className="p-4 space-y-2">
              <h2 className="text-lg font-semibold truncate">{movie.title}</h2>
              <p className="text-sm italic">{movie.genre}</p>
              <p className="text-sm line-clamp-2">{movie.description}</p>

              {/* Ratings */}
              <div className="flex mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`cursor-pointer text-lg ${
                      movie.rating >= star ? "text-yellow-400" : "text-gray-400"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRating(movie.id, star);
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Add Movie Popup */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/70 z-50"
          >
            <motion.form
              onSubmit={handleSubmit}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="backdrop-blur-lg bg-white/30 p-6 rounded-2xl shadow-2xl w-96 space-y-4 border border-white/20"
            >
              <h2 className="text-2xl font-bold text-center">Add New Movie</h2>

              <input
                type="text"
                placeholder="Movie Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded-lg"
                required
              />

              <input
                type="text"
                placeholder="Poster URL"
                value={posterUrl}
                onChange={(e) => setPosterUrl(e.target.value)}
                className="w-full p-2 border rounded-lg"
                required
              />

              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded-lg"
                required
              />

              <input
                type="text"
                placeholder="YouTube Trailer URL"
                value={trailerUrl}
                onChange={(e) => setTrailerUrl(e.target.value)}
                className="w-full p-2 border rounded-lg"
                required
              />

              <input
                type="text"
                placeholder="Genre (Action, Drama, Sci-Fi)"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full p-2 border rounded-lg"
                required
              />

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-400 rounded-lg hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trailer Modal */}
      <AnimatePresence>
        {selectedTrailer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/90 z-50"
          >
            <motion.div
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.7 }}
              transition={{ duration: 0.3 }}
              className="rounded-xl shadow-lg w-[90%] md:w-[70%] h-[70%] relative bg-black overflow-hidden"
            >
              <button
                onClick={() => setSelectedTrailer(null)}
                className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 z-10"
              >
                ✕ Close
              </button>
              <iframe
                width="100%"
                height="100%"
                src={selectedTrailer.replace("watch?v=", "embed/")}
                title="Movie Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-xl"
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
