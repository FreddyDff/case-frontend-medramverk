import { useState } from 'react'
import './App.css'

function ProductCard(props) {
  console.log(props);
  const product = props.product;
  return (
    <div className='product-card'>
      <img src={product.imgUrl} alt={product.title} />
      <p>product {product.title}</p>
      <p>price {product.price} SEK</p>
      <p>description {product.description}</p>
    </div>
  )
}

function App() {

const products = [
  {title: 'Catch me if you can', imgUrl: "https://placehold.co/200x100", price: 150, description: 'drama, thriller, romans'},
  {title: 'Gladiator', imgUrl: "https://placehold.co/200x100", price: 160, description: 'drama, action, romans'},
  {title: 'Starwars', imgUrl: "https://placehold.co/200x100", price: 170, description: 'action, sci-fi, fantasy'}
]
  return (
    <>
      <h1>Hej!</h1>
     {/* <ProductCard product={product}/>
     <ProductCard product={product2}/>
     <ProductCard product={product3}/> */}

     {products.map( product => <ProductCard product={product} />) }
    </>
  )
}

export default App
