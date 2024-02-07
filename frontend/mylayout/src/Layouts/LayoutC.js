import React, { useState, useEffect, useContext } from "react";
import { countApi } from "../Apis/api";
import   '../styles/Layout3.css';
import MyContext from "../Apis/MyContext";

const LayoutC = () => {
  const [counts, setCounts] = useState({ addCount: 0, updateCount: 0 });
  const [error, setError] = useState('');
  const { contextValue, updateValue } = useContext(MyContext);

  const fetchCounts = async () => {
    try {
      const response = await countApi();
      setCounts(response);
      setError('');
    } catch (error) {
      setError('Failed to fetch counts. Please try again.');
    }
  };

  useEffect(() => {
    fetchCounts();
  }, [contextValue]);

  return (
    <div className="containerC">
      
      <p>ADD API HITS: {counts.addCount}</p>
      <p>UPDATE API HITS: {counts.updateCount}</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default LayoutC;
