import React, {useEffect, useState} from 'react';
import '../graphic.css';

const Graphic = (props) => {

    const [per, setPer] = useState(0);

    useEffect(() => {
        calculateBorder(props.amountToSpent, props.amountSpent);
    }, [props]);


    const calculateBorder = (amountToSpent, amountSpent) => {
        let result = (parseInt(amountSpent) / parseInt(amountToSpent)) * 100;

        setPer(result);
    }

  return (
    <div class="circle-one mt-5"><p className='mgt-4 text-primary'>{Math.floor(per)}% gastado</p></div>
  )
}

export default Graphic