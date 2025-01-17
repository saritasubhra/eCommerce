import { useState } from "react";
import toast from "react-hot-toast";
import axios from "../lib/axios";

function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleFormData(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    Login();
  }

  async function Login() {
    const { email, password } = formData;

    if (!email || !password) {
      toast.error("Please fill in all he fields!");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post("/auth/login", formData);
      toast.success(res.data.message);
      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }
  return { handleFormData, handleSubmit, formData, isLoading };
}

export default useLogin;
