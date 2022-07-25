import { Card } from '@mui/material';
import { StockInfo } from '@/models/stock_info';



import StockInfoTable from './StockInfoTable'

function AllStockInfoes() {
    const stockInfoes: StockInfo[] = [
        {
            id: "001",
            IngName: "包菜",
            Date: "20220723",
            amount: 100,
            surplus: 100
        },
        {
            id: "002",
            IngName: "西葫芦",
            Date: "20220723",
            amount: 100,
            surplus: 0
        },
        {
            id: "002",
            IngName: "西葫芦",
            Date: "20220723",
            amount: 100,
            surplus: 0
        },
        {
            id: "002",
            IngName: "西葫芦",
            Date: "20220723",
            amount: 100,
            surplus: 0
        },
        {
            id: "002",
            IngName: "西葫芦",
            Date: "20220723",
            amount: 100,
            surplus: 0
        },
        {
            id: "002",
            IngName: "西葫芦",
            Date: "20220723",
            amount: 100,
            surplus: 0
        },
        {
            id: "007",
            IngName: "西葫芦",
            Date: "20220723",
            amount: 100,
            surplus: 0
        },

    ];

    return (
        <Card>
            <StockInfoTable stockInfoes={stockInfoes} />
        </Card>
    );
}

export default AllStockInfoes;
