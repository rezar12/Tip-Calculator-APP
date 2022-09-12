import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import logo from "./asset/icon/logo.svg";
import dollar from "./asset/icon/icon-dollar.svg";
import person from "./asset/icon/icon-person.svg";

function App() {
  const [amount,setAmount] = useState(0.0);
  const [total,setTotal] = useState(0.0);
  

  const bill = useRef(null);
  const NbPerson = useRef(null);
  const customPercent = useRef(null);
  const Btnreset = useRef(null);
  const [percent,setPercent] = useState(0);
  const [error,setError] = useState("");
  const [borderError,setBorderError] = useState(true);

  function getValue() {
    if(Number(NbPerson.current.value) !== 0 || NbPerson.current.value ===''){
      setError('');
      setBorderError(true);
    }
    else{
      setError("Can't be zero");
      setBorderError(false);
    }
  }

  function getPercent(value){
    setPercent(value);
  }

 
  useEffect(()=>{
    if((Number(bill.current.value)!==0 || bill.current.value === '') && percent !==0 && (Number(NbPerson.current.value)!==0 || NbPerson.current.value === '')  ){
      let calAmount = ((Number(bill.current.value)* percent)/100)/NbPerson.current.value;
      let calTotal = calAmount + (Number(bill.current.value)/NbPerson.current.value);
      setAmount(calAmount);
      setTotal(calTotal);
    }
    else{
      setTotal(0.0);
      setAmount(0.0);
    }
  
  },[setAmount,setTotal,percent])

  function Reset() {
    setAmount(0.0);
    setTotal(0.0);
    bill.current.value = "";
    NbPerson.current.value = "";
    
  }

  



  return (
    <section className="container">
      <div className="logo">
        <img src={logo} alt="logoimage" />
      </div>
      <div className="main">
        <section className="left">
          <div className="content--Bill">
            <p>Bill</p>
            <div className="input">
              <img src={dollar} alt="" />
              <input  ref={bill} type="text" name="text-bill" id="bill" placeholder="0" autoComplete="off" />
            </div>
          </div>
          <div className="content">
            <p>Select Tip %</p>
            <ul>
              <li>
                <p className="select" onClick={()=>getPercent(5)}>5%</p>
              </li>
              <li>
                <p className="select" onClick={()=>getPercent(10)}>10%</p>
              </li>
              <li>
                <p className="select" onClick={()=>getPercent(15)}>15%</p>
              </li>
              <li>
                <p className="select" onClick={()=>getPercent(25)}>25%</p>
              </li>
              <li>
                <p className="select" onClick={()=>getPercent(50)}>50%</p>
              </li>
              <li>
                <input ref={customPercent}  type="text" placeholder="Custom" onChange={e => getPercent(Number(e.target.value))} />
              </li>
            </ul>
          </div>
          <div className="content--person">
            <div className="text--person">
              <p>Number of People</p>
              <span className="error">{ error }</span>
            </div>
            <div className="input">
              <img src={person} alt="" />
              <input ref={NbPerson} autoComplete="off" type="text" name="Person" id="Person" onChange={getValue} placeholder="0" className={borderError ? "border--noerror":"border--error"} />
            </div>
          </div>
        </section>
        <section className="rigth">
          <div className="result">
            <div className="horizontal">
              <p className="text">
                Tip Amount <br />
                <span>/ person</span>
              </p>
              <h2 className="result--amount">
                <span>$</span>
                {Math.round(parseFloat(amount) * 100) / 100}
              </h2>
            </div>
            <div className="horizontal">
              <p className="text">
                Total <br />
                <span>/ person</span>
              </p>
              <h2 className="result--amount">
                <span>$</span>
                {total.toFixed(2)}
              </h2>
            </div>
          </div>
          <button type="reset" ref={Btnreset} onClick={Reset}>
            <strong> RESET</strong>
          </button>
        </section>
      </div>
    </section>
  );
}

export default App;
