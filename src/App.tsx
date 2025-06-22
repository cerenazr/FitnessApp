import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import AuthSidebar from './components/AuthSidebar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { AuthProvider } from './context/AuthContext';

import Home from './pages/Home';
import Progress from './pages/Progress';
import Workout from './pages/Workout';
import Recipes from './pages/Recipes';
import About from './pages/About';
import Signup from './pages/Signup';
import Login from './pages/Login';
import SideLinks from './components/SideLinks';
import { WorkoutProvider } from './contexts/WorkoutContext'; // <-- Bunu ekle

const AppContent = () => {
  const location = useLocation();
  const isAuthPage =
    location.pathname.toLowerCase() === '/login' ||
    location.pathname.toLowerCase() === '/signup';

  return (
    <>
      <Navbar />
      <div className="flex pt-20 px-4 gap-8">
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Progress" element={<Progress />} />
            <Route path="/Workout" element={<Workout />} />
            <Route path="/Recipes" element={<Recipes />} />
            <Route path="/About" element={<About />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Login" element={<Login />} />
          </Routes>
        </div>
        <SideLinks />
        <div>
          {isAuthPage ? <AuthSidebar /> : <Sidebar />}
        </div>
      </div>
      <Footer />
      <ScrollToTop />
    </>
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <WorkoutProvider>
        <AppContent />
      </WorkoutProvider>
    </Router>
  </AuthProvider>
);

export default App;