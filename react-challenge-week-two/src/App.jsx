import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useParams } from 'react-router-dom';
import './App.css';
import TaskList from './components/TaskList';
import TaskDetail from './components/TaskDetail';
import TaskForm from './components/TaskForm';

// --- Navbar Component --- //
const Navbar = () => {
  return (
    <nav>
      <ul className='nav-links'>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/counter">Count</Link></li>
        <li><Link to="/search">Movies</Link></li>
        <li><Link to="/tasks">Tasks</Link></li>
      </ul>
    </nav>
  );
};

// --- EASY Task: Counter App --- //
const Count = () => {
  const [count, setCount] = useState(0);

  const increase = () => setCount(count + 1);
  const decrease = () => setCount(count - 1);

  return (
    <div>
      <h1 className='count-title'>BK's Counter: {count}</h1>
      <button className='add' onClick={increase}>Add 1</button>
      <button className='subtract' onClick={decrease}>Subtract 1</button>
    </div>
  );
};

// --- MEDIUM Task: Movie API --- //
// --- MovieList Component --- //
const MovieList = ({ movies, error }) => {
  if (error) {
    return <div>{error}</div>; // Show the error message if any
  }



  return (
    <div>
      <h2>BK's Movie Search Results</h2>
      <ul className='movie-results'>
        {movies.map((movie) => (
          <li key={movie.imdbID}>
            <Link to={`/movie/${movie.imdbID}`}>
              {movie.Title} ({movie.Year})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

// --- MovieDetail Component ---
const MovieDetail = () => {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=a13a0966`);
      const data = await response.json();
      setMovie(data);
    };
    fetchMovieDetails();
  }, [imdbID]);

  if (!movie) return <div>Loading BK Movies shortly...</div>;

  return (
    <div>
      <h2>{movie.Title}</h2>
      <p>{movie.Plot}</p>
      <p><strong>Director:</strong> {movie.Director}</p>
      <p><strong>Actors:</strong> {movie.Actors}</p>
      <img src={movie.Poster} alt={movie.Title} />
    </div>
  );
};

// --- MovieSearch Component --- //
const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(''); // State to store error message

  const searchMovies = async (event) => {
    event.preventDefault();
    setError(''); // Clear previous error message

    if (!query) return;

    try {
      const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=a13a0966`);
      const data = await response.json();

      if (data.Response === 'True') {
        setMovies(data.Search); 
      } else {
        setMovies([]); 
        setError(data.Error); 
      }
    } catch (err) {
      setError('Something went wrong! Please try again later.'); 
      setMovies([]); 
    }
  };

  return (
    <div>
      <form onSubmit={searchMovies}>
        <input
          className='movie-input'
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie"
        />
        <button className="movie-btn" type="submit">Search Movies</button>
      </form>
      <MovieList movies={movies} error={error} />
    </div>
  );
};

// --- HARD Task: To-Do List App --- //

const App = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Mountain jog with BK' },
    { id: 2, name: 'Study with BK at 1PM' },
  ]);

  // Function to add a new task
  const addTask = (taskName) => {
    const newTask = { id: tasks.length + 1, name: taskName };
    setTasks([...tasks, newTask]);
  };

  // Function to update a task by ID
  const updateTask = (id, name) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, name } : task));
  };

  // Function to delete a task by ID
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<p className='home-title'>Welcome to BK React APP!</p>} />
        <Route path="/counter" element={<Count />} />
        <Route path="/search" element={<MovieSearch />} />
        <Route path="/movie/:imdbID" element={<MovieDetail />} />
        <Route path="/tasks" element={<TaskList tasks={tasks} onDelete={deleteTask} />} />
        <Route path="/task/:taskId" element={<TaskDetail tasks={tasks} onUpdate={updateTask} />} />
        <Route path="/task-form" element={<TaskForm onAdd={addTask} />} />
      </Routes>
    </Router>
  );
};

export default App;


