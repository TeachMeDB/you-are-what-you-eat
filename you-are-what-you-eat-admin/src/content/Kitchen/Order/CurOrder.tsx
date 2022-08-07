import CurOrderTable from "./CurOrderTable";
import CurOrderSummary from "./CurOrderSummary";
import { Grid } from '@mui/material';
import { CurOrder } from "@/models/cur_order";


export default function CurOrders() {

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
                    <CurOrderTable />
                </Grid>
            </Grid>
        </>


    )
}
