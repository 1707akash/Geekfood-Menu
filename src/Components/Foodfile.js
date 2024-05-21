import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Foodfile.css'

const Foodfile = () => {
    const[foodData, setFoodData] = useState([])
    const[filteredFood, setFilteredFood] = useState([])

    const fetchData = async()=>{
        const apiKey = '26fec1c686mshef65bb3b9cdf379p1ebed5jsn21d763a2af41';
        const response = await axios.get(
            'https://the-vegan-recipes-db.p.rapidapi.com/?limit=100',
            {
                headers:{
                    'X-RapidAPI-Key': apiKey,
                    'X-RapidAPI-Host': 'the-vegan-recipes-db.p.rapidapi.com'
                }
            }
        )
        const data = response.data;
        setFoodData(data)     
    }

    useEffect(()=>{
        fetchData()
    },[])

    const filterData=(title)=>{
        const filteredData = foodData.filter((item)=>{
            return (
                item.title.toLowerCase().includes(title.toLowerCase())
            )
        })
        setFilteredFood(filteredData)
    }

  return (
    <div className='foodFile'>
        <h1>Geekfood menu</h1>
        <label htmlFor="">What are you looking For ?</label>
        <input type="text" onChange={(e)=>{filterData(e.target.value)}} />
        <div className="foodDivs">
            {
                (filteredFood.length>0 ? filteredFood :foodData).map((elem,index)=>(
                    <div className='foodCard'>
                        <img src={elem.image} alt="" />
                        <h3>{elem.title}</h3>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Foodfile