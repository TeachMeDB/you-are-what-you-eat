import React from 'react'
import { FC, ChangeEvent, useState } from 'react'
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
    Table,

    TablePagination,

    TableContainer,
    Box
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

const applyPagination = (
    curOrders: CurOrder[],
    page: number,
    limit: number
): CurOrder[] => {
    return curOrders.slice(page * limit, page * limit + limit);
};


interface CurOrderTableProps {
    lassName?: string;
    CurOrders: CurOrder[];
}


const CurOrderTable: FC<CurOrderTableProps> = ({ CurOrders }) => {
    const [page, setPage] = useState<number>(0);
    const [limit, setLimit] = useState<number>(6);


    const paginatedPromotions = applyPagination(CurOrders, page, limit);


    const handlePageChange = (_event: any, newPage: number): void => {
        setPage(newPage);

    };

    const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setLimit(parseInt(event.target.value));
    };
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
            <TableContainer>
                <Table>
                    <Grid container spacing={10}>
                        {paginatedPromotions.map((i) => {
                            return (

                                <Grid item xs={3}>
                                    <CheckList
                                        order_id={i.order_id}
                                        order_status={i.order_status}
                                        dish={i.dish}
                                    />
                                </Grid>
                            )
                        }
                        )
                        }
                    </Grid>
                </Table>
            </TableContainer>
            <Box p={2}>
                <TablePagination
                    component="div"
                    count={CurOrders.length}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleLimitChange}
                    page={page}
                    rowsPerPage={limit}
                    rowsPerPageOptions={[8, 16, 24]}
                />
            </Box>

        </Card >






    )
}

export default CurOrderTable;
