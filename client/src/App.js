import logo from './logo.svg';
import './App.css';
import Start from './components/Start';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/" exact element={<Start/>} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
