import React, { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp, getDocs, query, orderBy } from 'firebase/firestore';
import { database } from '../firebaseConfig';
import '../styles/transHistory.scss';
import '../styles/viewCustomers.scss';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TransHistory = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  const data = collection(database, 'transactions');
  const [done, setDone] = useState([]);

  const getTransactions = async () => {
    try {
      const res = await getDocs(query(data, orderBy('timestamp', 'desc'))); // Sort by timestamp in descending order
      const transactions = res.docs.map((item) => {
        return { ...item.data(), id: item.id };
      });
      setDone(transactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const addTransaction = async (from, to, from_name, to_name, amount) => {
    try {
      const transactionsRef = collection(database, 'transactions');

      // Add a new transaction with the current server timestamp
      await addDoc(transactionsRef, {
        from: from,
        to: to,
        from_name: from_name,
        to_name: to_name,
        Amount_transfered: amount,
        timestamp: serverTimestamp(),
      });

      // Refresh the transaction history
      getTransactions();
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  return (
    <section className="transactions_cls">
      <div className="heading row justify_content_cntr" data-aos="fade-up" data-aos-delay="100">
        <h2>All Transactions' Information</h2>
      </div>

      <div className="tbl-cntr">
        <table data-aos="zoom-in" data-aos-delay="0">
          <thead>
            <tr>
              <th>Sender AccNo.</th>
              <th>Sender Name</th>
              <th>Receiver AccNo.</th>
              <th>Receiver Name</th>
              <th>Amount Transferred</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody data-aos="fade-up" data-aos-delay="100">
            {done.map((item, index) => (
              <tr key={index + 1} className="values">
                <td>{item.from}</td>
                <td>{item.from_name}</td>
                <td>{item.to}</td>
                <td>{item.to_name}</td>
                <td>₱{item.Amount_transfered}</td>
                <td>{item.timestamp ? new Date(item.timestamp.toDate()).toLocaleString() : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TransHistory;
