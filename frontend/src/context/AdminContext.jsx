import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(localStorage.getItem("aToken") || "");
  const [reviews, setReviews] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllReviews = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/reviews`, {
        headers: { aToken },
      });

      if (res.data.success) {
        setReviews(res.data.reviews);
      } else {
        toast.error(res.data.message || "Failed to fetch reviews");
      }
    } catch (error) {
      toast.error("Error fetching reviews");
    }
  };

  const value = {
    aToken,
    setAToken,
    backendUrl,
    reviews,
    getAllReviews,
    setReviews,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
