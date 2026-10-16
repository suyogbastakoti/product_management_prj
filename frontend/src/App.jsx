import {Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
    <div className="min-h-screen">

      {/* Navbar */}

      <Navbar/>

      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/create" element={<CreatePage/>} />
      </Routes>
    </div>
      
    </>
  );
};

export default App;
