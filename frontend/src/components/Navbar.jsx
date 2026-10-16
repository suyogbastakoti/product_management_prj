
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();

  return (
    <div className="bg-base-300 navbar p-4">

      {/* Logo */}
      <div className="flex-1">
        <Link to="/">
          <h1 className="font-bold text-2xl text-primary">
            Product
          </h1>
        </Link>
        
      </div>

      {/* Toggle theme and create btn */}
      <div className="flex items-center gap-3">
        <button 
          className="font-semibold text-xl"
        >
          Dark
        </button>

        <button 
          onClick={()=> navigate("/create")}
          className="btn btn-primary shadow-sm transition"
        >
          + Add Product
        </button>
      </div>
    </div>
  );
};

export default Navbar;
