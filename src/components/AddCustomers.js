import React, { useState } from 'react';
import '../styles/addcustomers.scss';
import { database } from '../firebaseConfig';
import { collection, addDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore';

// Function to generate a unique alphanumeric account number (e.g., "WS2445")
function generateUniqueCode() {
  const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const digits = '0123456789';
  
  // Generate a random 2-character alphabet
  const firstTwoChars = alphabets.charAt(Math.floor(Math.random() * alphabets.length)) +
                       alphabets.charAt(Math.floor(Math.random() * alphabets.length));
  
  // Generate a random 4-digit number
  const lastFourDigits = Math.floor(1000 + Math.random() * 9000);

  return firstTwoChars + lastFourDigits.toString();
}

const AddCustomer = ({ onAddCustomer }) => {
  const [newCustomer, setNewCustomer] = useState({
    cusName: '',
    emailiD: '',
    currBal: 0, // Initialize currBal as a number
  });
  const [formError, setFormError] = useState('');
  const [generatedAccountNo, setGeneratedAccountNo] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Check if the input field is 'currBal' and convert its value to a number
    if (name === 'currBal') {
      setNewCustomer((prevCustomer) => ({ ...prevCustomer, [name]: parseFloat(value) }));
    } else {
      setNewCustomer((prevCustomer) => ({ ...prevCustomer, [name]: value }));
    }
  };

  const addCustomer = async () => {
    if (!isFormValid()) {
      return;
    }

    try {
      const customersRef = collection(database, 'customers');
      
      // Check if the email is already present in the database
      const emailQuery = query(customersRef, where('emailiD', '==', newCustomer.emailiD));
      const emailQuerySnapshot = await getDocs(emailQuery);
      
      if (emailQuerySnapshot.size > 0) {
        setFormError('❗ Email already exists.');
        return;
      }

      // Generate a unique alphanumeric account number
      const accNo = generateUniqueCode();

      // Get the server timestamp
      const timestamp = serverTimestamp();

      // Add the new customer to the database with the timestamp
      await addDoc(customersRef, { ...newCustomer, accNo, timestamp });

      // Show the generated account number in a popup
      setGeneratedAccountNo(accNo);

      // Clear the new customer input fields
      setNewCustomer({
        cusName: '',
        emailiD: '',
        currBal: 0,
      });

      // Callback function to notify the parent component
      if (typeof onAddCustomer === 'function') {
        onAddCustomer();
      }

      // Automatically hide the popup after 2 seconds
      setTimeout(() => {
        setGeneratedAccountNo('');
      }, 2000);
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };

  const isFormValid = () => {
    if (
      newCustomer.cusName.trim() === '' ||
      newCustomer.emailiD.trim() === '' ||
      newCustomer.currBal === 0
    ) {
      setFormError('❗ Please fill in all fields.');
      return false;
    }

    if (!/^[A-Za-z\s]+$/.test(newCustomer.cusName)) {
      setFormError('❗ Name should contain only letters and spaces.');
      return false;
    }

    if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(newCustomer.emailiD)) {
      setFormError('❗ Please enter a valid Email ID.');
      return false;
    }

    setFormError('');
    return true;
  };

  return (
    <section className='addCustomer_cls'>
      <div className='new-customer-form'>
        <h3>New Customer Details</h3>
        <label htmlFor='cusName'>Full Name:</label>
        <input
          type='text'
          name='cusName'
          value={newCustomer.cusName}
          onChange={handleInputChange}
          placeholder='Mark Z. Martin'
        />
        <label htmlFor='emailiD'>Email ID:</label>
        <input
          type='text'
          name='emailiD'
          value={newCustomer.emailiD}
          onChange={handleInputChange}
          placeholder='sample@gmail.com'
        />
        <label htmlFor='currBal'>Add Balance (Php):</label>
        <input
          type='number'
          name='currBal'
          value={newCustomer.currBal}
          onChange={handleInputChange}
        />
        <button onClick={addCustomer}>Add Customer</button>
        {formError && <p className='error'>{formError}</p>}
      </div>
      {generatedAccountNo && (
        <div className='popup acc-gntr'>
          <p> 🆕Generated Account Number: {generatedAccountNo}</p>
        </div>
      )}
    </section>
  );
};

export default AddCustomer;
