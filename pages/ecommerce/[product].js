import axios from "axios"
import { useRouter } from "next/router"

import keys from "../../api/config/keys"

export default function Product({product}) {
    const router = useRouter()
    const productID = router.query.product
    console.log(product)
    return (
        <>
            <h1>ProductID: {productID}</h1>
            <h1>{product.brand}</h1>
            <h1>{product.title}</h1>
        </>
    )
}

export async function getStaticPaths() {
    const res = await axios.get(keys.redirectDomain + '/api/products')
    const products = await res.data
  
    const paths = 
    products.map((product) => ({
      params: { product: product._id.toString() },
    }))
  
    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    const res = await axios.get(keys.redirectDomain + '/api/product/' + params.product)
    const product = await res.data
    return {
        props: {product},
        // revalidate: 10 // page re-renders in the server and updates the web page if there is new data
    }
}
