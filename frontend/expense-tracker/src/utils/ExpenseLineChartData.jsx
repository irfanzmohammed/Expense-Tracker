import moment from "moment"

export const ExpenseLineChartData=(data=[])=>{
  if (!Array.isArray(data)) return [];
   const sortedData=[...data].sort((a,b)=>new Date(a.date)-new Date(b.date))
   const chartData=sortedData.map((item)=>({
     month:moment(item?.date).format('DD MMM'),
     amount:item?.amount,
     category:item?.category
   }))
   return chartData
}