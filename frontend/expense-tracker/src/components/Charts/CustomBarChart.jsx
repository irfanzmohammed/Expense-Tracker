import React from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell
} from "recharts"
const CustomBarChart = ({data}) => {

   const getBarColor=(index)=>{
    return index % 2 === 0 ? "#60A5FA" : "#38BDF8"; 
   }

   const CustomTooltip = ({active,payload}) => {
   if (active && payload && payload.length) {
    return (
        <div className='bg-gray-900 shadow-none outline-none rounded-lg p-2  border-none'>
            <p className='text-xs  text-white font-semibold mb-1 '>{payload[0].payload.category}</p>
            <p className='text-sm text-gray-300'>
                Amount:<span className='text-sm text-white font-medium'>${payload[0].value}</span>
            </p>
        </div>
      )
  }
  return null
  }

  return (
    <div className='bg-gray-900 mt-6'>
    <ResponsiveContainer width='100%' height={300}>
    <BarChart data={data}>
    <CartesianGrid stroke='none'/>
    <XAxis dataKey="month" tick={{fontSize:12, fill:"#aaa"}} stroke='none'/>
    <YAxis  tick={{fontSize:12, fill:"#aaa"}} stroke='none'/>
    <Tooltip content={CustomTooltip}/>
    <Bar
    dataKey="amount"
   
    radius={[10,10,0,0]}
    activeBar={false} 
    >
   
    
    {data.map((entry,index)=>(
     <Cell key={index} fill={getBarColor(index)}/>
    ))}

    </Bar>
    </BarChart>
    </ResponsiveContainer>
    </div>
  )
}

export default CustomBarChart