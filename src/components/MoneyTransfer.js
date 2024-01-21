import React, { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp, getDocs, doc, updateDoc } from 'firebase/firestore';
import { database } from '../firebaseConfig';
import '../styles/moneyTransfer.scss';
import AOS from 'aos';
import 'aos/dist/aos.css';

const MoneyTransfer = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  const data = collection(database, 'customers');
  const transactions = collection(database, 'transactions');

  const [done, setDone] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const getCustomers = async () => {
    const res = await getDocs(data);
    const done = res.docs.map((item) => {
      return { ...item.data(), id: item.id };
    });
    setDone(done);
  };

  getCustomers();

  const getAccountBalance = (accNo, arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].accNo === accNo) {
        return arr[i].currBal;
      }
    }
  };

  const showPopupWithDuration = (message, duration) => {
    setPopupMessage(message);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, duration);
  };

  const transferFunds = async (e) => {
    e.preventDefault();

    var select1 = document.getElementById('accounts1');
    var value1 = select1.options[select1.selectedIndex].value;

    var select2 = document.getElementById('accounts2');
    var value2 = select2.options[select2.selectedIndex].value;

    let amount = document.getElementById('amt').value;

    if (value1 === value2) {
      showPopupWithDuration('❌ Transaction cannot be done between the same accounts!', 2000);
      return;
    } else {
      if (getAccountBalance(value1, done) < amount) {
        showPopupWithDuration('❌ Insufficient balance', 2000);
        return;
      }

      let account1 = done.find((item) => item.accNo === value1);
      let account2 = done.find((item) => item.accNo === value2);

      let balanceOfAccount1 = account1.currBal - amount;
      let balanceOfAccount2 = account2.currBal + Number(amount);

      let docToUpdate1 = doc(database, 'customers', account1.id);
      let docToUpdate2 = doc(database, 'customers', account2.id);

      updateDoc(docToUpdate1, {
        currBal: balanceOfAccount1,
      });

      updateDoc(docToUpdate2, {
        currBal: balanceOfAccount2,
      })
        .then(async () => {
          // Record the successful transaction with a timestamp
          await addDoc(transactions, {
            from: account1.accNo,
            from_name:account1.cusName,
            to: account2.accNo,
            to_name:account2.cusName,
            Amount_transfered: amount,
            timestamp: serverTimestamp(), // Server timestamp for the time of the transaction
          });

          showPopupWithDuration('✅ Transaction Successfully', 2000);
        })
        .catch((err) => {
          showPopupWithDuration('❌ Technical Error! Try Again', 2000);
          console.log('ERRR' + err);
        });
    }
  };

  return (
    <section className="transfer_sec">
      <div className="container">
        <div className="transfer_box" data-aos="fade-up" data-aos-delay="100">
          <form onSubmit={transferFunds}>
            <h2 className='heading'>Transfer Money</h2>
            
            <select name="accounts" id="accounts1" placeholder="Debited from">
              <option value="">Debit from</option>
              {done.map((item, i) => (
                <option key={i} value={item.accNo}>
                  {item.cusName} ({item.accNo}) (Available Balance ₱{item.currBal})
                </option>
              ))}
            </select>

            <select name="accounts" id="accounts2" placeholder="Credited to">
              <option value="">Credit to</option>

              {done.map((item, i) => (
                <option key={i} value={item.accNo}>
                  {item.cusName} ({item.accNo}) (Available Balance ₱{item.currBal})
                </option>
              ))}
            </select>

            <input type="number" id="amt" className="amount" placeholder="Enter Amount (Php)" required />
            <input type="submit" className="submitBtn" value="Submit" />
          </form>
        </div>
      </div>
      {showPopup && (
        <div className="popup">
          <p className="success">{popupMessage}</p>
        </div>
      )}
    </section>
  );
};

export default MoneyTransfer;
