import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import { getMoviesByCategory } from './services/apiService';

const App = () => {
    return (
        <ThemeProvider>
            <Router>
                <AppContent />
            </Router>
        </ThemeProvider>
    );
};

const AppContent = () => {
    const { isDarkMode } = useTheme();

    useEffect(() => {
        document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
    }, [isDarkMode]);

    return (
        <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            <Routes>
                <Route path="/" element={<MovieList fetchMoviesByCategory={getMoviesByCategory} />} />
                <Route path="/movie/:id" element={<MovieDetails />} />
            </Routes>
        </div>
    );
};

export default App;
