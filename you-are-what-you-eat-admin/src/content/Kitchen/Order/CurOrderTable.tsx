import React from 'react'
import { FC } from 'react'
import {
    Grid,
    Divider,
    FormControl,
    Card,
    Button,
    styled,
    InputAdornment,
    CardHeader,
    OutlinedInput,
} from '@mui/material'
import CheckList from './CheckList'
import { CurOrder } from '@/models/cur_order'
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';

const ButtonSearch = styled(Button)(
    ({ theme }) => `
      margin-right: -${theme.spacing(1)};
  `
);

const OutlinedInputWrapper = styled(OutlinedInput)(
    ({ theme }) => `
      background-color: ${theme.colors.alpha.white[100]};
  `
);

interface CurOrderTableProps {
    lassName?: string;
    CurOrders: CurOrder[];
}


const CurOrderTable: FC<CurOrderTableProps> = ({ CurOrders }) => {
    return (

        <Card>
            <CardHeader
                action={
                    <FormControl variant="outlined" fullWidth>
                        <OutlinedInputWrapper
                            type="text"
                            placeholder="订单编号"
                            endAdornment={
                                <InputAdornment position="end">
                                    <ButtonSearch variant="contained" size="small" >
                                        搜索
                                    </ButtonSearch>

                                </InputAdornment>
                            }
                            startAdornment={
                                <InputAdornment position="start">
                                    <SearchTwoToneIcon />
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                }
                title="实时订单列表"
            />
            <Divider />

            <Grid container spacing={10}>
                {
                    CurOrders.map((i) =>

                        <Grid item xs={4}>
                            <CheckList
                                OrderId={i.OrderId}
                                OrderStatus={i.OrderStatus}
                                Dish={i.Dish}
                            />
                        </Grid>

                    )
                }
            </Grid>
        </Card>






    )
}

export default CurOrderTable;
