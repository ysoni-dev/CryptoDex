import React, { useState, useContext } from "react";
import { addAmount } from "../Apis/api";
import MyContext from "../Apis/MyContext";
import "../styles/Layout1.css";

const LayoutA = () => {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(null);
  const [id, setId] = useState(null);
  const { contextValue, updateValue } = useContext(MyContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addAmount(amount);
      if (response.message_type === "error") {
        setError(response.message);
      }

      if (response.message_type === "success") {
          updateValue()
    
          setError(null); // Clear any previous errors
          setId(response._id); // response object returns the ID
          setAmount("");
            
      }

    } catch (error) {
      setError(error.message); // Set error message received from API
    }
  };

  // Prevent dragging when clicking the button
  const handleButtonMouseDown = (e) => {
    e.stopPropagation(); // Prevent drag event propagation
  };


  return (
    <div className="container">
      <h2>Enter BitCoins</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="From 1 to 10."
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit" onMouseDown={handleButtonMouseDown}>Insert</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default LayoutA;
   