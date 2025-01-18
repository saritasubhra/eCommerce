import { useState } from "react";
import axios from "../lib/axios";
import toast from "react-hot-toast";
import { useProduct } from "../contexts/ProductContext";

const initialState = {
  prodname: "",
  description: "",
  price: "",
  category: "",
  image: "",
};

function useCreateProductForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [newProduct, setNewProduct] = useState(initialState);
  const { setProducts } = useProduct();

  function handleFormData(e) {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.post("/products", newProduct);
      toast.success(res.data.message);
      setNewProduct(initialState);
      setProducts((prev) => [...prev, res.data.data]);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result });
      };

      reader.readAsDataURL(file); // base64
    }
  }
  return {
    newProduct,
    isLoading,
    handleFormData,
    handleSubmit,
    handleImageChange,
  };
}

export default useCreateProductForm;
