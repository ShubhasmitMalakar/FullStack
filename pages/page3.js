import axios from 'axios'
import { useState, useEffect } from 'react'

import Product from '../src/components/Product'

export default function Page3(props) {
    const data = props.data

    // const [data, setData] = useState([])
    // const [data2, setData2] = useState([])

    // async function getData() {
    //     const res = await axios.get('https://dummyjson.com/products')
    //     // console.log(res.data)
    //     data2.length != 0 ? setData(res.data) : null
    // }

    // async function getData2() {
    //     const res = await axios.get('https://dummyjson.com/comments')
    //     // console.log(res.data)
    //     setData2(res.data)
    // }

    // useEffect(() => {
    //     getData()
    // }, [data2])

    // useEffect(() => {
    //     getData2()
    // }, [])

    return (
        <>
            <h1>Page 3</h1>
            {/* <button onClick={() => getData()} className="primary-button">
                Click here
            </button> */}

            <Product items={data} />

            {/* {
                data.length !=0 ? data.products.map((item, i) => (
                    <div key={i}>
                        <p>{item.title}</p>
                        <p>{item.price}</p>
                        <p>{item.description}</p><br />
                    </div>
                )) : null
            } */}
        </>
    )
}

// dynamically get data from the server
// export async function getServerSideProps() {
//     const res = await axios.get('http://localhost:3000/api/products')
//     return {
//         props: {data: res.data},
//     }
// }

// build time
export async function getStaticProps() {
console.log("1")
    const res = await axios.get('http://localhost:3000/api/products')
console.log("2")
 
    return {
        props: {
            data: res.data
        },
        revalidate: 10 // page re-renders in the server and updates the web page if there is new data
    }
}