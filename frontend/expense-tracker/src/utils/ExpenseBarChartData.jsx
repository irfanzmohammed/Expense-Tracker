export const ExpenseBarChartData=(data=[])=>{
    const chartData=data.map(
        (item)=>({
            category:item?.category,
            amount:item?.amount
        }));
        return chartData;         
}