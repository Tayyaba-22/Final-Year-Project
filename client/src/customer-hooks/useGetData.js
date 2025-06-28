// src/customer-hooks/useGetData.js
import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useAuth } from "./useAuth"; // Adjust the path to your useAuth hook

const useGetData = (collectionName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth(); // Use the current user from the useAuth hook

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      const db = getFirestore();
      const colRef = collection(db, collectionName);

      try {
        const snapshot = await getDocs(colRef);
        const docs = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setData(docs);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [collectionName, currentUser]);

  return { data, loading };
};

export default useGetData;
