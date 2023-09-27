import { useEffect, useState } from "react";
import { baseUrl } from "../helper/baseUrl";

const useLoggedUser = () => {
  const [user, setUser] = useState();
  const id = localStorage.getItem("id");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getLoggedUser = async () => {
      setLoading(true);
      if (id) {
        fetch(`${baseUrl}/students/${id}`)
          .then((r) => r.json())
          .then((data) => {
            setUser(data);
            setLoading(false);
          })
          .catch((e) => {
            setError(true);
            setLoading(false);
          });
      } else {
        setUser(false);
        setError(true);
        setLoading(false);
      }
    };
    getLoggedUser();
  }, [id]);

  return {
    loggedUser: user,
    isLoading: loading,
    isError: error,
  };
};

export default useLoggedUser;
