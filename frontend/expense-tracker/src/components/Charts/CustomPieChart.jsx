import React from 'react'
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts"
import CustomTooltip from './CustomTooltip'
import CustomLegend from './CustomLegend'
const CustomPieChart = (
  {  data,
    label,
    totalAmount,
    color,
    showTextAnchor
}
) => {
 
if (!data || data.length === 0 || data.every(d => d.amount === 0)) {
  return <p className="text-white text-center">No data to display</p>;
}

  return (
   <ResponsiveContainer width="100%"  height={380}>
  <PieChart >
    <Pie
    data={data}
    dataKey="amount"
    nameKey="name"
    cx="50%"
    cy="50%"
    outerRadius={130}
    innerRadius={100}
    labelLine={false}
    
    >
    {
      data.map((entry,index )=>(
        <Cell key={`Cell-${index}`} fill={color[index%color.length]} stroke="none"/>
      ))
    }
    </Pie>
    <Tooltip content={<CustomTooltip/>}/>
    <Legend content={<CustomLegend/>}/>
  {showTextAnchor&&(
   <g>
   <text
   x="50%"
   y="50%"
   dy={-25}
   textAnchor='middle'
   fill='#9ca3af'
   fontSize="14px">
    {label}
   </text>

   <text
   x="50%"
   y="50%"
   dy={8}
   textAnchor='middle'
   fill="#ffffff"
   fontSize="24px"
   fontWeight="semi-bold">
    {totalAmount}
   </text>
   </g>
  )}
  </PieChart>
   </ResponsiveContainer>
  )
}

export default CustomPieChart