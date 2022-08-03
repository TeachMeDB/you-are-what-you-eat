import CurOrderTable from "./CurOrderTable";
import CurOrderSummary from "./CurOrderSummary";
import { Grid } from '@mui/material';



export default function CurOrder(curorders) {
    let arr = Object.values(curorders);

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
