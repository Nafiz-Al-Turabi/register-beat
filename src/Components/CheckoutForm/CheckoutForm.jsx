// import React, { useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   Elements,
//   CardNumberElement,
//   CardExpiryElement,
//   CardCvcElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";


// const PaymentForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");

//   const elementStyles = {
//     style: {
//       base: {
//         fontSize: "16px",
//         color: "#fff", // Adjusted for better visibility
//         "::placeholder": {
//           color: "#888",
//         },
//       },
//       invalid: {
//         color: "#fa755a",
//       },
//     },
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Form submitted");
//     if (!stripe || !elements) {
//       console.log("Stripe.js has not loaded yet.");
//       return;
//     }

//     const cardNumber = elements.getElement(CardNumberElement);

//     const { paymentMethod, error } = await stripe.createPaymentMethod({
//       type: "card",
//       card: cardNumber,
//       billing_details: {
//         email,
//       },
//     });

//     if (error) {
//       console.error("[Stripe Error]", error);
//     console.log(`Payment method creation failed: ${error.message}`);
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:1010/api/payments/create-customer", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, paymentMethodId: paymentMethod.id }),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         console.log(`Customer created successfully! Customer ID: ${result.customerId}`);
//       } else {
//         console.log(`Backend error: ${result.error}`);
//       }
//     } catch (err) {
//       console.error("Backend error:", err);
//       console.log("Failed to create customer.");
//     }
//   };

//   return (
    
//       <form
//         onSubmit={handleSubmit}
//         style={{
//           maxWidth: "400px",
//           margin: "auto",
//           backgroundColor: "#000",
//           padding: "20px",
//           borderRadius: "8px",
//           color: "#fff",
//         }}
//       >
//         <h3>Stripe Payment Form</h3>
//         <input
//           type="email"
//           placeholder="Enter your email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           style={{
//             marginBottom: "10px",
//             width: "100%",
//             padding: "8px",
//             border: "1px solid #ccc",
//             borderRadius: "4px",
//             backgroundColor: "#fff",
//             color: "#000",
//           }}
//         />
//         <div style={{ marginBottom: "10px" }}>
//           <label>Card Number</label>
//           <CardNumberElement options={elementStyles} />
//         </div>
//         <div style={{ marginBottom: "10px" }}>
//           <label>Expiry Date</label>
//           <CardExpiryElement options={elementStyles} />
//         </div>
//         <div style={{ marginBottom: "10px" }}>
//           <label>CVC</label>
//           <CardCvcElement options={elementStyles} />
//         </div>
//         <button
//           type="submit"
//           disabled={!stripe}
//           style={{
//             backgroundColor: "#6772e5",
//             color: "#fff",
//             padding: "10px 20px",
//             border: "none",
//             borderRadius: "4px",
//             cursor: "pointer",
//           }}
//         >
//           Submit
//         </button>
//         {message && <p style={{ marginTop: "10px" }}>{message}</p>}
//       </form>
    
//   );
// };

// export default PaymentForm;





import React, { useContext, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { AuthContext } from '../../Provider/AuthProvider';

const CheckoutForm = ({ priceId }) => {
  const [email, setEmail] = useState('');
  const [paymentMethodId, setPaymentMethodId] = useState(null);
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    // Create customer and handle payment method
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    setPaymentMethodId(paymentMethod.id);

    // Call backend to create customer
    const response = await axios.post(`http://localhost:3001/api/payments/create-customer/${user._id}`, {
      email,
      paymentMethodId: paymentMethod.id,
    });

    const customerId = response.data.customerId;

    // Now, create the subscription
    const subscriptionResponse = await axios.post(`http://localhost:3001/api/payments/create-subscription/${user._id}`, {
      customerId,
      priceId,
    });

    if (subscriptionResponse.status === 200) {
      alert('Subscription created successfully!');
    }

    setLoading(false);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      style={{
        maxWidth: "400px",
        margin: "auto",
        backgroundColor: "#2c3e50", // Dark background color
        padding: "20px",
        borderRadius: "8px",
        color: "#ecf0f1", // Light text color for contrast
      }}
    >
      <h3 style={{ textAlign: "center", color: "#ecf0f1" }}>Subscribe Now</h3>
      
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{
          marginBottom: "15px",
          width: "100%",
          padding: "12px",
          border: "1px solid #bdc3c7", // Lighter border
          borderRadius: "4px",
          backgroundColor: "#34495e", // Darker input background
          color: "#fff", // White text for contrast
          fontSize: "14px",
        }}
      />
      
      <div style={{ marginBottom: "20px" }}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#ecf0f1", // Light text for the card inputs
                "::placeholder": {
                  color: "#bdc3c7", // Lighter placeholder text
                },
              },
              invalid: {
                color: "#e74c3c", // Red for invalid inputs
              },
            },
          }}
        />
      </div>
      
      <button 
        type="submit" 
        disabled={loading} 
        style={{
          width: "100%",
          backgroundColor: "#3498db", // Button color
          color: "#fff",
          padding: "14px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        {loading ? 'Processing...' : 'Subscribe'}
      </button>
    </form>
  );
};

export default CheckoutForm;
