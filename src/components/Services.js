import React from 'react';
import 'aos/dist/aos.css';
import customerImg from '../images/customer_image.png';
import history from '../images/transaction_history.png';
import transferImg from '../images/transfer_money.png';
import '../styles/services.scss';


const servicesData = [
  {
    image: customerImg,
    title: 'View and Add Accounts',
    desc: 'List of Accounts',
    link: '/allCustomers',
    btn: 'View Accounts',
  },
  {
    image: transferImg,
    title: 'Transfer Money',
    desc: 'Transfer money in no time',
    link: '/moneyTransfer',
    btn: 'Transfer Money',
  },
  {
    image: history,
    title: 'View Transactions',
    desc: 'Display Transactions',
    link: '/transactions',
    btn: 'Transaction History',
  },
];

const Services = () => {
  return (
    <div className="services_cls section_padding">

      <h1 className="main-title heading">Primal Services
      </h1>
      <h3>Primal Bank Offers the following operations.</h3>
      <div className="services-box">


        {servicesData.map((service, index) =>
        (
          <div key={index} data-aos="zoom-in-right" data-aos-delay="0" className="card">

            <img src={service.image} alt={`${service.title} img`} />

            <div className="service-name">{service.title}</div>
            <div className="service-desc">{service.desc}</div>

            <a href={service.link}>
              <button>{service.btn}</button>
            </a>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
