import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name:"",
    price:"",
    image:"",
  });

  const handleChange=(e)=>{
    const {name, value}= e.target;

    setFormData((prev)=>({
      ...prev, 
      [name]: value,
    }));
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/products",{
        method: "POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
        }),
      });

      const data = await res.json();
      if(!res.ok){
        throw new Error(data.message || "Failed to create product");
      }
      alert("Product created successfully!");

      navigate("/");

    } catch (error) {
      console.error("Error Creating product:",error);
      alert(error.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">
        Create New Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      > 
        <input 
          type="text"
          name="name"
          placeholder="Product name"
          className="input input-bordered w-full"
          value={formData.name}
          onChange={handleChange}
          required 
        />

        <input 
          type="number"
          name="price"
          placeholder="Product Price"
          className="input input-bordered w-full"
          value={formData.price}
          onChange={handleChange}
          min="0"
          step="0.01"
          required
        />

        <input 
          type="url"
          name="image"
          placeholder="Product image URL"
          className="input input-bordered w-full"
          value={formData.image}
          onChange={handleChange}
          required 
        />

        <button
          type="submit"
          className="btn btn-ghost bg-green-500 hover:bg-green-600"
        >
          Create Product
        </button>

        <button
          type="button"
          onClick={()=>navigate("/")}
          className="btn btn-ghost bg-red-500 hover:bg-red-600"
        >
          Cancel
        </button>
      </form>
      
    </div>
  );
};

export default CreatePage;
