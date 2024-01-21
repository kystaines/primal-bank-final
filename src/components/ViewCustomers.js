import React, { useEffect, useState } from 'react';
import '../styles/viewCustomers.scss';
import { database } from '../firebaseConfig';
import { collection, getDocs, deleteDoc, doc, query, orderBy, onSnapshot } from 'firebase/firestore';
import AddCustomer from './AddCustomers';

import AOS from 'aos';
import 'aos/dist/aos.css';

const ViewCustomers = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  const [customersList, setCustomersList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [buttonText, setButtonText] = useState('Add Customer');
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false);

  useEffect(() => {
    const customersRef = collection(database, 'customers');
    const customersQuery = query(customersRef, orderBy('timestamp', 'desc'));

    // Create a real-time listener
    const unsubscribe = onSnapshot(customersQuery, (querySnapshot) => {
      const customersData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setCustomersList(customersData);
    });

    return () => {
      // Unsubscribe from the real-time listener when the component unmounts
      unsubscribe();
    };
  }, []);

  const toggleForm = () => {
    setShowForm(!showForm);
    setButtonText(showForm ? 'Add Primal Client' : 'Close');
  };

  const handleAddCustomer = async () => {
    // Show the add popup
    setShowAddPopup(true);

    // Automatically close the popup after 3 seconds
    setTimeout(() => {
      setShowAddPopup(false);
    }, 3000);
  };

  const handleDeleteCustomer = async (customerId) => {
    try {
      const customerDocRef = doc(database, 'customers', customerId);
      await deleteDoc(customerDocRef);

      // Show the delete popup
      setShowDeletePopup(true);

      // Automatically close the popup after 3 seconds
      setTimeout(() => {
        setShowDeletePopup(false);
      }, 3000);
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  return (
    <section className='customers_sec'>
      <div className='heading row justify_content_cntr' data-aos="fade-up" data-aos-delay="0">
        <h2>All Clients Account Information</h2>
      </div>

      <div className="btn_cntr">
        <button data-aos="fade-right" data-aos-delay="100" className='add_btn' onClick={toggleForm}>
          {buttonText}
        </button>
      </div>

      {showForm && (
        <div className='add-customer-popup'>
          <AddCustomer onAddCustomer={handleAddCustomer} />
        </div>
      )}

      {showDeletePopup && (
        <div className='delete-popup'>
          <p>✔️ Customer deleted successfully!</p>
        </div>
      )}

      {showAddPopup && (
        <div className='add-popup'>
          <p>✔️ Customer added successfully!</p>
        </div>
      )}

      <div className="tbl-cntr">
        {customersList.length > 0 ? (
          <table data-aos="zoom-in" data-aos-delay="0">
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Account Number</th>
                <th>Email ID</th>
                <th>Current Balance (Php)</th>
                <th>Time Added</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody data-aos="fade-up" data-aos-delay="100">
              {customersList.map((customer, index) => (
                <tr key={customer.id} className='values'>
                  <td>{index + 1}</td>
                  <td>{customer.cusName}</td>
                  <td>{customer.accNo}</td>
                  <td>{customer.emailiD}</td>
                  <td>₱{customer.currBal}</td>
                  <td>
                    {customer.timestamp ? new Date(customer.timestamp.toDate()).toLocaleString() : 'N/A'}
                  </td>
                  <td>
                    <button className='del_btn' onClick={() => handleDeleteCustomer(customer.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-customers-msg" data-aos="fade-up" data-aos-delay="100">
           ❗ No customers added yet.
          </p>
        )}
      </div>
    </section>
  );
};

export default ViewCustomers;
