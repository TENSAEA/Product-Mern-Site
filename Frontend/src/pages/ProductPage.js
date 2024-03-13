import React, { useEffect, useState } from "react";
import axiosInstance from "./axiosInstance";
import useLogout from "./LogOut";
import ProfilePage from "./ProfilePage";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [productForm, setProductForm] = useState({
    title: "",
    description: "",
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const logout = useLogout();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get(`/products`);
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 401) {
          logout();
        }
      }
    };

    fetchProducts();
  }, [logout]);

  const handleInputChange = (event) => {
    setProductForm({ ...productForm, [event.target.name]: event.target.value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (editingProduct) {
      await axiosInstance.put(`/products/${editingProduct._id}`, productForm);
    } else {
      await axiosInstance.post("/products", productForm);
    }
    const response = await axiosInstance.get("/products");
    setProducts(response.data);
    setProductForm({ title: "", description: "" });
    setEditingProduct(null);
  };

  const handleEditClick = (product) => {
    setProductForm(product);
    setEditingProduct(product);
  };

  const handleDeleteClick = async (productId) => {
    try {
      await axiosInstance.delete(`/products/${productId}`);
      // Fetch products again to update the list
      const response = await axiosInstance.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <h2>Products</h2>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="title"
            value={productForm.title}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="description"
            value={productForm.description}
            onChange={handleInputChange}
            required
          />
          <button type="submit">{editingProduct ? "Update" : "Create"}</button>
        </form>
      </div>

      <div>
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <button onClick={() => handleEditClick(product)}>Edit</button>
              <button onClick={() => handleDeleteClick(product._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ProfilePage />
      </div>
    </div>
  );
}

export default ProductPage;
