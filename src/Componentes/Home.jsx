import React, {useState} from 'react';
import BudgetTracker from './BudgetTracker';

const Home = () => {

    const[amount, setAmount] = useState(0); 
    const [show, setShow] = useState(false);

    const handleSubmit = () => {
        if(amount > 0) {
            setShow(true);
        }
    }

  return (
    <div>
        {show === false ? (
            <div className='bg-primar '>
                <h1 className='p-t pb-3 text-uppercase text-white fs-3'>Planificador de gastos</h1>
               <div className="busqueda d-flex flex-column w-30">
                <label className='mgt-4 text-primary fs-5' htmlFor="">Definir presupuesto</label>
                 <input className='mt-2 mb-3 mx-auto w-75 input-p' type="number" onChange={e => setAmount(e.target.value)} value={amount} />
                 <button className='w-75 mx-auto button-p text-white fs-e' type='button' onClick={() => handleSubmit()}>AÑADIR</button>
                </div>
            </div>
            
            
        ) : (
            <BudgetTracker amountToSpent={amount} />
        )}
    </div>
  )
}

export default Home
