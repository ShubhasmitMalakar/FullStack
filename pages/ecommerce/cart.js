import axios from "axios";
import Script from "next/script";
import { useState, useEffect } from "react";
import Cart from "../../src/components/Cart";

import { Button } from "@mui/material";

import keys from "../../api/config/dev";

export default function CartPage(props) {
  const data = props.data;
  console.log(data);

  const orderOnline = async () => {
    const res = await axios.get("/api/add/order");
    console.log("==== ORDER NOW ====");
    console.log(res);

    if (res.status == 200) {
      var options = {
        key: keys.razorPayApiKey, //  the Key ID generated from the Dashboard
        amount: res.data.totalPrice.toFixed(2) * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Ecommerce",
        description: "Buy Merch",
        image: "https://www.trusnetix.com/images/logo.svg",
        order_id: res.data.orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: async function (response) {
          const res = await axios.post("/api/order/paymentComplete", {
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature,
          });
          if (res.data === "PAYMENT_COMPLETE") {
            setLoading(false);
            router.push("/ordersuccess");
            dispatch(fetchCartQuantity(props.store_name));
          }
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        notes: {
          address: "",
        },
        theme: {
          color: "#3399cc",
        },
      };
      var rzp1 = new Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
      rzp1.open();
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <center>
        <h3>eCommerce Web App | CART</h3>
      </center>

      <Cart items={data.products} />

      <center>
        <Button onClick={() => orderOnline()}> BUY NOW </Button>
      </center>
    </>
  );
}

// dynamically get data from the server
export async function getServerSideProps() {
  const res = await axios.get(keys.redirectDomain + "/api/carts");
  return {
    props: { data: res.data },
  };
}
