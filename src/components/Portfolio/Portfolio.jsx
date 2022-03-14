import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import PieChart from "../PieChart/PieChart.jsx"
import { useHistory } from "react-router-dom";


function Portfolio() {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch({type: 'FETCH_MARKET'})
      dispatch({type: 'GET_ASSETS'})
    }, []);

    const history = useHistory()
    const assets = useSelector(store => store.assets)

    const goMarket = () => {
        history.push('/market')
    }

    return (
        <div>
           
           
        </div>

    )
}

export default Portfolio;