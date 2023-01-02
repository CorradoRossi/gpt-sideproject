import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  //process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  //process.env.STRIPE_PUBLISHABLE_KEY_TEST
  "pk_test_Zaa1jeoGF9VWbSQzmU1j9Fgj"
);

export default function App() {
  const [clientSecret, setClientSecret] = React.useState("");

  React.useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "flat",
    variables: {
      colorPrimary: "#344960",
      colorBackground: "#dedede",
      colorText: "#17171c",
    },
  };
  const options = {
    clientSecret,
    appearance,
  };
  console.log("options: ", options);
  console.log("clientSecret: ", clientSecret);
  console.log("appearance: ", appearance);

  return (
    <div className="App">
      <main>
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </main>
    </div>
  );
}