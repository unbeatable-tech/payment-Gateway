import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Stripechcekout from "react-stripe-checkout"

function App() {

  const[product,setProduct]=useState({
    name:"React from FB",
    price:10,
    productBy:"facebook"
  });
  const makePayment=token=>{
    const body={
      token,
      product
    }
    const headers={
      "Content-Type":"application/json"
    }
    return fetch(`http;//localhost:4000/payment`,{
      method:"POST",
      headers,
      body:JSON.stringify(body)
    }).then(response=>{
      console.warn("RESPONSE",response);
      const{status}=response;
      console.warn("STATUS",status);
    }).catch(err=>console.log(err))
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Stripechcekout
          stripeKey="pk_test_51LixN0SAfwuyfgLoCXwMyoLeOugUzoWK3pNy9ZqvQrLNfFeq13YRo9V7XxXl8ARQDiqNcznxmGo12uxRYw5I8gmO001alB1BnC"
          token={makePayment}
          name="by React"
          ammount={product.price*100}
        />
      </header>
    </div>
  );
}

export default App;
