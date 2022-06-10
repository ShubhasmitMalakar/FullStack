import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";

import keys from "../../api/config/keys";

export default function Product(props) {
  const [open, setOpen] = useState(false);
  // const router = useRouter()
  // const productID = router.query.product
  // console.log(product)

  const handleClose = () => {
    setOpen(false);
  };

  const addToCart = async (id) => {
    const response = await axios.get(`/api/cart/add/${id}`);
    console.log(response);
    if (response.status === 200) {
      setOpen(true);
    }
  };

  return (
    <>
      <Link href="/ecommerce/cart">GO TO CART</Link>

      <h1>ProductID: {props.product.id}</h1>
      <h1>{props.product.brand}</h1>
      <h1>{props.product.title}</h1>
      <Button onClick={() => addToCart(props.product._id)}>ADD TO CART</Button>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Added to cart"
      />
    </>
  );
}

export async function getServerSideProps({ params }) {
  const res = await fetch(
    keys.redirectDomain + "/api/product/" + params.product
  );
  const product = await res.json();
  return {
    props: { product },
  };
}

// export async function getStaticPaths() {
//     const res = await fetch(keys.redirectDomain + '/api/products')
//     const products = await res.body

//     const paths =
//     products.map((product) => ({
//       params: { product: product._id.toString() },
//     }))

//     return { paths, fallback: false }
// }

// export async function getStaticProps({ params }) {
//     const res = await fetch(keys.redirectDomain + '/api/product/' + params.product)
//     const product = await res.body
//     return {
//         props: {product},
//         // revalidate: 10 // page re-renders in the server and updates the web page if there is new data
//     }
// }
