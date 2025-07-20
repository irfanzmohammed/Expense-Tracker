import moment from 'moment'

export const IncomeBarchartData=(data=[])=>{
  const sortedData=[...data].sort((a,b)=>new Date(a.date)-new Date(b.date))

  const chartData=sortedData.map((item)=>({
   month:moment(item?.date).format('DD MMM YYYY'),
   amount:item?.amount,
   category:item?.category
  }));
  return chartData
}