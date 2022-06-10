import { useRouter } from "next/router"

import keys from "../../api/config/keys"

export default function Product(props) {
    // const router = useRouter()
    // const productID = router.query.product
    // console.log(product)
    return (
        <>
            <h1>ProductID: {props.product.id}</h1>
            <h1>{props.product.brand}</h1>
            <h1>{props.product.title}</h1>
        </>
    )
}

export async function getServerSideProps({ params }) {
    const res = await fetch(keys.redirectDomain + '/api/product/' + params.product)
    const product = await res.json()
    return {
        props: {product},
    }
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
