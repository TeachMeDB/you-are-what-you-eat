import { Card } from '@mui/material';
import { StockInfo } from '@/models/stock_info';



import StockInfoTable from './StockInfoTable'

function AllStockInfoes(stockinfo: StockInfo[]) {

    let arr = Object.values(stockinfo);
    console.log(arr[0].stockinfo);
    return (
        <Card>
            <StockInfoTable stockInfoes={arr[0].stockinfo} />
        </Card>
    );
}

export default AllStockInfoes;

