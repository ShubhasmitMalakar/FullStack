export default function Product(props) {
    const newData = props.items
    return (
        <>
            {
                newData.length !=0 ? newData.products.map((item, i) => (
                    <div key={i}>
                        <p>{item.title}</p>
                        <p>{item.price}</p>
                        <p>{item.description}</p><br />
                    </div>
                )) : null
            }
        </>
    )
}