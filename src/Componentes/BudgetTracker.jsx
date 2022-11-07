import React, {useState} from 'react';
import Graphic from './Graphic';

const BudgetTracker = ({amountToSpent}) => {

    const [available, setAvailable] = useState(amountToSpent);
    const [title, setTitle] = useState('');
    const [expenseAmount, setExpenseAmount] = useState(0);
    const [category, setCategory] = useState('savings');

    const [amountSpent, setAmountSpent] = useState(0);

    const [items, setItems] = useState([]);

    const [filtered, setFiltered] = useState([]);

    const handleSubmit = (e) => {
      e.preventDefault();

      console.log(typeof expenseAmount, typeof available);

      if(title.length == 0 || expenseAmount === 0) {
        //Category no se agrego ala validacion porque por default se agrega a ahorros, pero con titulo y el otro podemos validar
        window.alert("Datos no validos");
        return;
      }

      if(parseInt(expenseAmount) > parseInt(available)) {
        window.alert("No puede ser agregado porque es mas de lo que tienes disponible");
        return;
      } 

      setItems([...items, {title, expenseAmount, category}]);

      setAvailable(available - expenseAmount);
      setAmountSpent(parseInt(amountSpent) + parseInt(expenseAmount));

      setTitle('');
      setExpenseAmount(0);
      setCategory('');
    }

    const handleSelect = (value) => {
      let copyArr = [...items];

      let filteredArray = copyArr.filter(item => item.category === value);

      console.log(value, copyArr, filteredArray); 

      setFiltered(filteredArray);
    }

  return (
    <div className='bg-primar'>
        
        <h1 className='p-t pb-3 text-uppercase text-white fs-3'>Planificador de gastos</h1>
        <div className="busqueda">
            <div className="contenido d-flex justify-content-between">
        <Graphic amountToSpent={amountToSpent} amountSpent={amountSpent} />
            <div className="seleccion mgt-4">
            <button className='mb-2 button-r fw-bolder' type='button' onClick={() => window.location.reload()}>RESETEAR APP</button>
            <div className="alineacion">
            <p className='text-primary'><b>Presupuesto</b><span className='text-secondary'> ${amountToSpent}</span> </p>
            <p className='text-primary'><b>Disponible</b><span className='text-secondary'> ${available} </span></p>
            <p className='text-primary'><b>Gastado</b><span className='text-secondary'> ${amountSpent}</span> </p>
            </div>
            </div> 
            </div>
            
        </div>

        <div class="card busqueda hg mt-4">
       
          <div class="d-flex justify-content-between contenedor">
          <h3 className='text-secondary fs-d'>Filtrar Gastos</h3> 

            <select className="form-select contenedor-s " aria-label="Default select example" onChange={e => handleSelect(e.target.value)}>
                <option defaultChecked>--Todas las Categorías--</option>
                <option value="ahorro">AHORRO</option>
                <option value="comida">COMIDA</option>
                <option value="gastos varios">GASTOS VARIOS</option>
                <option value="ocio">OCIO</option>
                <option value="salud">SALUD</option>
                <option value="suscripciones">SUSCRIPCIONES</option>
            </select>

           
          </div>
          <button className='button-r2 mt-5 fw-bolder ms-l ' onClick={() => setFiltered([])}>RESET FILTRO</button>

        </div>
        <h3 className='mt-3 text-secondary fs-d mg-l'>Gastos</h3>
         <div>
            <ul className={`${items.length === 0 ? 'list-group mt-3 mb-5 ' : 'list-group mt-3 mb-5 filtros'}`}>
              {filtered.length === 0 ? items.map((exp, index) => (
                <li className="list-group-item alineacion fs-c text-secondary" key={index}>
               <div className='d-flex flex-column'><p className='text-uppercase fw-bold text-second'>{exp.category}</p><span className='d-flex'><p className='text-lowercase mr-1 w-50 text-secondary fw-bold'>{exp.title}</p><p className=' text-dark fw-bold'>${exp.expenseAmount}</p></span></div>
                </li>
          )) : filtered.map((exp, index) => (
            <li className="list-group-item alineacion fs-c text-secondary" key={index}> 
            <div className='d-flex flex-column'><p className='text-lowercase fw-bold text-second'>{exp.category}</p><span className='d-flex'><p className='text-lowercase mr-1 w-50 text-secondary fw-bold'>{exp.title}</p><p className=' text-dark fw-bold'>${exp.expenseAmount}</p></span></div>
            </li>
          ))}
        </ul>
        

        {items.length === 0 && (<p className='text-secondary'>No hay gastos aún</p>)}
        </div>
          
      <button type="button" className="btn btn-primary px ml-s" data-bs-toggle="modal" data-bs-target="#exampleModal">
       <p>+</p>
      </button>

  

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Nuevo Gasto</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="expense" className="form-label">Nombre gasto</label>
                  <input type="text" onChange={e => setTitle(e.target.value)} value={title} className="form-control" id="expense" />
                </div>

                <div className="mb-3">
                  <label htmlFor="expenseAmount" className="form-label">Cantidad</label>
                  <input type="number" onChange={e => setExpenseAmount(e.target.value)} value={expenseAmount} className="form-control" id="expenseAmount" />
                </div>

                <div className="mb-3"> 
                <select className="form-select contenedor-s " aria-label="Default select example" onChange={e => setCategory(e.target.value)} value={category}>
                <option defaultChecked>--Todas las Categorías--</option>
                <option value="ahorro">AHORRO</option>
                <option value="comida">COMIDA</option>
                <option value="gastos varios">GASTOS VARIOS</option>
                <option value="ocio">OCIO</option>
                <option value="salud">SALUD</option>
                <option value="suscripciones">SUSCRIPCIONES</option>
            </select>

                </div>

                <button type="submit" className="btn btn-primary">Guardar</button>

              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BudgetTracker