import { useEffect, useState } from "react";
import { baseUrl } from "../helper/baseUrl";

const useLoggedUser = () => {
  const [user, setUser] = useState();
  const id = localStorage.getItem("id");

  useEffect(() => {
    const getLoggedUser = async () => {
      if (id) {
        const response = await fetch(`${baseUrl}/students/${id}`);
        const data = await response.json();
        setUser(data);
      }
    };
    getLoggedUser();
  }, [id]);

  return user;
};

export default useLoggedUser;
