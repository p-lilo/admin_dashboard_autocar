import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import Login from './pages/login';

function App() {
  return (
    
   
    <Routes>

    <Route path="/" element={< Login />} />
    <Route path="/dashboard" element={< Dashboard />} />
    </Routes>
 
  );
}

export default App;
