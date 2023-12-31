import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';

const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <Router>
                    <AppContent />
                </Router>
            </ThemeProvider>
        </QueryClientProvider>
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
                <Route path="/" element={<MovieList />} />
                <Route path="/movie/:id" element={<MovieDetails />} />
            </Routes>
        </div>
    );
};

export default App;
