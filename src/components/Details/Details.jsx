import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import LineChart from '../LineChart/LineChart';
import './Details.css'


function Details() {

    const { coinid } = useParams();

    useEffect(() => {
        dispatch({ type: 'GET_DETAILS', payload: coinid });
        dispatch({type: 'GET_ASSET_DETAILs', payload: coinid})
    }, [])

    const dispatch = useDispatch();

    const history = useHistory();
    const [loading, setLoading] = useState(true);

    const coinDetails = useSelector(store => store.details[0]);
    const chartData = useSelector(store => store.charts)
    console.log(chartData);

   

    return (
        <>
            <div className="details-container">
                {<img src={coinDetails?.image} width="60px" height="60px"/>}
                <LineChart
                    coinid={coinid}
                />
            
            
                {coinDetails?.name}
                <br></br>
                ${coinDetails?.current_price}
                <br></br>
                {coinDetails?.price_change_percentage_24h.toFixed(2)}%
                
                
                <br></br>
                <br></br>
                {/* Below Works but want to try updating pricing dynamically */}
                {/* <input type="number" value={coinQty} onChange={(e) => setCoinQty(e.target.value)} /> */}
                {/* <input type="text" value={coinQty} onChange={handleUpdate} /> */}
                {/* <button onClick={addCoin}>Add To Portfolio</button> */}
            </div>

        </>

    )
}

export default Details;