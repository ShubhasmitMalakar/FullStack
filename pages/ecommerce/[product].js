import { useRouter } from "next/router"

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
    const res = await fetch('http://localhost:3000/api/products')
    const products = await res.json()
  
    const paths = 
    products.map((product) => ({
      params: { product: product._id.toString() },
    }))
  
    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    const res = await fetch('http://localhost:3000/api/product/' + params.product)
    const product = await res.json()
    return {
        props: {product},
        // revalidate: 10 // page re-renders in the server and updates the web page if there is new data
    }
}
