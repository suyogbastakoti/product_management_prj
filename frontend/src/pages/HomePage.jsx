import { useEffect, useState } from "react";


const HomePage = () => {

    const [products, setProducts] = useState([]);

    //editing states
    //stores the ID of the product you're currently editing. 
    // null means you're not editing anything.
    const [editingId, setEditingId] = useState(null);
    
    //stores the updated name, price, and image URL.
    const [editForm, setEditForm] = useState({
        name: "",
        price: "",
        image: "",
    });

    const handleEdit = (product)=>{
        setEditingId(product._id);

        setEditForm({
            name: product.name,
            price: product.price,
            image: product.image,
        });
    };

    const handleUpdate = async(id)=>{
        try {
            const res = await fetch(`http://localhost:5000/api/products/${id}`,{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...editForm,
                    price: Number(editForm.price),
                }),
            });

            if(!res.ok){
                throw new Error("Failed to update product");
            }

            setProducts((prevProducts)=>
            prevProducts.map((product)=>product._id === id ? 
                {
                    ...product, 
                    ...editForm, 
                    price: Number(editForm.price)}
                    :
                     product
                ));
            setEditingId(null);
            alert("Product updated successfully!");

        } catch (error) {
            console.error(error);
            alert("Failed to update product.");
        }
    }

    useEffect(()=>{
        const fetchProducts = async()=>{
            try {
                const res = await fetch("http://localhost:5000/api/products")

                if(!res.ok){
                    throw new Error("Failed to fetch products!");
                }

                const data = await res.json();

                setProducts(data.data);
                console.log(data.data);

            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }
        fetchProducts();
    },[]);

    const deleteProduct = async(_id)=>{
        try {
            const res = await fetch(`http://localhost:5000/api/products/${_id}`,{
                method: "DELETE",
            });
            
            if(!res.ok){
                throw new Error("Failed to delete product");
            }

            setProducts((products)=>products.filter((product)=>product._id !== _id));
            
            alert("Message deleted successfully!");

        } catch (error) {
            console.error("Failed to delete product!", error.message);
        }
    }

    
  return (
    <div className='p-16'>
        {/* product heading */}
        <div className='flex flex-col space-y-3'>
            <h1 className='text-2xl font-bold'>
                Product Management
            </h1>

            <p className='text-xl text-gray-400'>
                Manage and organize your products in one place.
            </p>
        </div>

        {/* Product Stats */}
        <div className='grid grid-cols-1 sm:grid-cols-3 card card-border mt-10'>
            <div className='flex flex-col items-center'>
                <h1 className='card-title'>
                    Total Products
                </h1>

                <p className='text-2xl font-semibold'>
                    {products.length}
                </p>
            </div>

            <div className='flex flex-col items-center'>
                <h1 className='card-title'>
                    Total Value
                </h1>
                <p className='text-2xl font-semibold'>
                    ${(products.reduce((total, product)=> total + product.price, 0).toFixed(2))}
                </p>
            </div>


            <div className='flex flex-col items-center'>
                <h1 className='card-title'>
                    Average Price
                </h1>

                <p className='text-2xl font-semibold'>
                    {(
                        products.length
                            ? products.reduce((total, product) => total + Number(product.price), 0) / products.length
                            : 0
                    ).toFixed(2)
                    }
                </p>
            </div>
        </div>

        <div className='text-2xl font-bold mb-10'>
             <h1>
                Your Products
            </h1>

            <p className='font-light text-xl mt-5'>
                Browse and manage your inventory
            </p>
        </div>

        {products.length === 0 && 
                <p className="text-center">No Products created yet. Create products to list them here.</p>
        }

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {products.map((product)=>(
                <div
                    key={product._id} 
                    className='bg-base-100 shadow-sm border border-base-300 hover:shadow-lg transition-shadow'
                >
                    <figure className="h-52 bg-base-200">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </figure>

                    {editingId === product._id ? (
                        <div>
                            <input 
                                type="text"
                                name="name"
                                placeholder="Product name"
                                className="input input-bordered w-full"
                                value={editForm.name}
                                onChange={(e)=>
                                    setEditForm({
                                        ...editForm, 
                                        name: e.target.value,
                                    })
                                } 
                            />

                             <input
                                type="number"
                                name="price"
                                placeholder="Price"
                                min="0"
                                step="0.01"
                                className="input input-bordered w-full"
                                value={editForm.price}
                                onChange={(e) =>
                                    setEditForm({
                                        ...editForm,
                                        price: e.target.value,
                                    })
                                }
                            />

                            <input
                                type="url"
                                name="image"
                                placeholder="Image URL"
                                className="input input-bordered w-full"
                                value={editForm.image}
                                onChange={(e) =>
                                    setEditForm({
                                        ...editForm,
                                        image: e.target.value,
                                    })
                                }
                            />
                        </div>
                    ):(
                      <>
                        <h1 className='card-title'>{product.name}</h1>
                        <p>{product.price}</p>
                      </>  
                    )}

                    {editingId === product._id ? (
                        <div className="flex gap-2">
                            <button
                                className="btn btn-success btn-sm"
                                onClick={()=>handleUpdate(product._id)}
                            >
                                Save Changes
                            </button>

                            <button
                                className="btn btn-ghost btn-sm"
                                onClick={()=>setEditingId(null)}
                            >
                                Cancel
                            </button>
                        </div>
                    ):(
                        <div className="card-actions justify-end mt-4">
                        <button 
                            onClick={()=>handleEdit(product)}
                            className="btn btn-outline btn-sm">
                            Edit
                        </button>

                        <button 
                            onClick={()=>deleteProduct(product._id)}
                            className="btn btn-error btn-sm"
                        >
                            Delete
                        </button>
                    </div>
                    )}
                </div>
            ))}
        </div>
      
    </div>
  );
};

export default HomePage;
