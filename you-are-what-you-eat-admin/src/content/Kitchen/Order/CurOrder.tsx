import CurOrderTable from "./CurOrderTable";
import CurOrderSummary from "./CurOrderSummary";
import { Grid } from '@mui/material';
import {
    CurOrder
} from '@/models/cur_order'


export default function CurOrder(curorders: CurOrder) {
    let arr = Object.values(curorders);
    console.log(arr[0].curorder);
    return (

        <>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                spacing={4}
            >
                <Grid item xs={12}>
                    <CurOrderSummary />
                </Grid>
                <Grid item xs={12}>
                    <CurOrderTable CurOrders={arr[0].curorder} />
                </Grid>
            </Grid>
        </>


    )
}
