import { useState } from "react";
import toast from "react-hot-toast";
import axios from "../lib/axios";

function useSignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  function handleFormData(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    SignUp();
  }

  async function SignUp() {
    const { fullname, email, password, passwordConfirm } = formData;

    if (!fullname || !email || !password || !passwordConfirm) {
      toast.error("Please fill in all he fields!");
      return;
    }
    if (password !== passwordConfirm) {
      toast.error("Passwords do not match!");
      return;
    }
    if (password.length < 4) {
      toast.error("Password must be atleast of 4 characters!");
      return;
    }
    setIsLoading(true);
    try {
      const res = await axios.post("/auth/signup", formData);
      toast.success(res.data.message);
      setFormData({
        fullname: "",
        email: "",
        password: "",
        passwordConfirm: "",
      });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }
  return { handleFormData, handleSubmit, formData, isLoading };
}

export default useSignUp;
