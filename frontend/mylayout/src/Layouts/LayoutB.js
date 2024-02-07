// Layout2.js
import React, { useState, useEffect, useContext } from "react";
import { showAmount, updateAmount } from "../Apis/api";
import MyContext from "../Apis/MyContext";
import '../styles/Layout2.css';
import logo from '../assets/images/logo.png'

const LayoutB = () => {
  const [formData, setFormData] = useState({});
  const [bitcoinPrice, setBitcoinPrice] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [loading, setLoading] = useState(true);

  const [newAmount, setNewAmount] = useState('');
  const [error, setError] = useState('');
  const { contextValue, updateValue } = useContext(MyContext);

  const fetchData = async () => {
    try {
      const responseData = await showAmount();
      const data = responseData.data; // Accessing the nested data object
      setFormData(data);
    } catch (error) {
      console.error('Error fetching form data:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData()
  }, [contextValue]);

  // get live bitcoin price
  useEffect(() => {
    const fetchBitcoinPrice = async () => {
      try {
        const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
        const data = await response.json();
        const price = parseFloat(data.bpi.USD.rate.replace(',', ''));
        setBitcoinPrice(price);
      } catch (error) {
        console.error('Error fetching Bitcoin price:', error);
      }
    };
    fetchBitcoinPrice();
  }, []);

  useEffect(() => {
    if (formData && bitcoinPrice) {
      const amount = formData.amount; // Accessing the amount value from formData.data
      if (amount !== undefined) {
        setTotalAmount((amount * bitcoinPrice).toFixed(2));
      }
    }
  }, [formData, bitcoinPrice]);



  // update operation
  const handleUpdate = async () => {
    try {
      if (newAmount.trim() === '') {
        setError('Amount cannot be empty');
        return;
      }
      let id = formData._id
      const response = await updateAmount(id, newAmount);
      if (response && response.message_type === "error") {
        setError(response.message);
      }
      else if (response && response.message_type === "success") {
        updateValue()
        setFormData({ ...formData, amount: newAmount }); // Update the amount in the local state
        setNewAmount('');
        setError('')
      }
      else{
        setError('Something went wrong')
      }
    } catch (error) {
      setError(error.message || 'Failed to update amount. Please try again.');
    }
  };

  // Prevent dragging when clicking the button
  const handleButtonMouseDown = (e) => {
    e.stopPropagation(); // Prevent drag event propagation
  };

  return (
    <div className="container">
      <div className="logogrid">
      <img height="60px" width="60px" src={logo}></img>
      <h2 className="amount">{formData.amount}</h2>
      </div>
      
      <input
        type="text"
        placeholder="Enter new amount"
        value={newAmount}
        onChange={(e) => setNewAmount(e.target.value)}
      />
      <button style={{marginTop:'8px'}} onClick={handleUpdate} onMouseDown={handleButtonMouseDown}>Update</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p className="bitcoin">Bitcoin Price: {bitcoinPrice ? `$${bitcoinPrice.toFixed(2)}` : 'Loading...'}</p>
          <p className="wallet">Your wallet: {totalAmount ? `$${totalAmount}` : 'Calculating...'}</p>
        </div>
      )}
    </div>
  );
};

export default LayoutB;
