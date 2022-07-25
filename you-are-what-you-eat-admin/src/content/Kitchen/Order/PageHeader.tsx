import { Typography, Grid } from '@mui/material';

import * as React from 'react';

function PageHeader() {



    return (
        <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
                <Typography variant="h3" component="h3" gutterBottom>
                    当前订单信息
                </Typography>
                <Typography variant="subtitle2">
                    查看并处理当前订单
                </Typography>
            </Grid>
        </Grid>
    );
}

export default PageHeader;
