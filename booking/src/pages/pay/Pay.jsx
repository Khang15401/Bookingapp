// import React, { useEffect, useState } from 'react'
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import "./pay.css";
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import newRequest from '../../untils/newRequest';
// import CheckoutForm from '../../components/checkoutForm/CheckoutForm';

// const stripePromise = loadStripe("pk_test_51Lvgo4BDEUUaPxsJdF21QbSv6LrhZuGnaCTVGniM4Cw7qnBi6RKFRjrTPjzrbWhiDKm1YfTzLwc8UCASYs5rXVVP003U7KyKtd");

// const Pay = () => {
//     const [clientSecret, setClientSecret] = useState("");
    
//     const {hotelId} = useParams()
//     useEffect(() => {
//         const makeRequest = async () => {
//             try {
//                 const res = newRequest.post(`/orders/create-payment-intent/${hotelId}`);
                
//                 setClientSecret(res.data.clientSecret);
//             } catch (error) {
//             }
//         };
//         makeRequest();
//     },[]);

//     const appearance = {
//         theme: 'stripe',
//       };
//       const options = {
//         clientSecret,
//         appearance,
//       };
  
//     return <div>
//         {clientSecret && (
//         <Elements options={options} stripe={stripePromise}>
//           <CheckoutForm />
//         </Elements>
//       )}
//     </div>;
// }

// export default Pay
