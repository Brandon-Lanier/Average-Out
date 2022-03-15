import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function AddCoin() {

    // const [coinQty, setCoinQty] = useState('')
    // const [coinId, setCoinId] = useState('')
    // const [dollarAmount, setDollarAmount] = useState('');
    // const [value, setValue] = useState('')


    const history = useHistory();
    const dispatch = useDispatch();

    // Setting the input and dynamic dollar changing amounts
    const [quantity, setQuantity] = useState(0);
    const [dollarAmount, setDollarAmount] = useState(0)

    const coin = useSelector(store => store.details[0])

    const { coinid } = useParams();
   
    // On change of the input field, the state of quantity is updated and the total value is updated.
    const handleUpdate = (e) => {
        setQuantity(e.target.value);
        setDollarAmount(e.target.value * coin.current_price)
        console.log(quantity, dollarAmount);
    }

    // Sending the coin and quantity to a Saga to handle post to DB.
    const addCoin = () => {
        console.log(coin);
        if (confirm(`Add ${quantity} ${coin.name} for a current value of $${dollarAmount}?`)) {
            dispatch({type: 'ADD_COIN', payload: {coin: coin, quantity: quantity}})
            alert('Coin Added to portfolio');
            dispatch({type: 'CLEAR_DETAILS'})
            history.push('/market')
        }
    }

    
    return (
        <div>
            <h2>Add {coin.name} to your portfolio!</h2>
            <p>Amount to purchase</p>
            <input type='number' value={quantity} onChange={handleUpdate}/>
            <p>Market Value: ${(Number(dollarAmount.toFixed(2)))}</p>
            <button onClick={addCoin}>Add Coin</button>

        </div>

    )
}

export default AddCoin;