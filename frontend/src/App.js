import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Login, Register } from "./Pages";
import { Header } from "./components";

const App = () => {
  return (
    <div className="container">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
