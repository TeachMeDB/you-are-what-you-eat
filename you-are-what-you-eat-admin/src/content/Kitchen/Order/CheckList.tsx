import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Switch from '@mui/material/Switch';

import { CurOrder, Dish } from '@/models/cur_order';
import { Card, CardHeader, Divider, CardContent, Box } from '@mui/material';
import {

    LinearProgress,
    styled,
    FormControlLabel,
    Grid
} from '@mui/material';
import Button from '@mui/material/Button';

import { curOrderApi } from '@/queries/cur_order';
import DishOrderTable from '@/content/Management/Transactions/DishOrderTable';
import { DishStatusUpload, OrderStatusUpload } from "@/models/cur_order";

import { FC, ChangeEvent, useState, useEffect, useCallback } from 'react'



let s: DishStatusUpload = {
    dish_order_id: "",
    dish_status: ""
}
let b: OrderStatusUpload = {
    order_id: "",
    order_status: ""
}

const label = { inputProps: { 'aria-label': 'Switch demo' } };


const LinearProgressWrapper = styled(LinearProgress)(
    ({ theme }) => `
          flex-grow: 1;
          height: 10px;
          margin: ${theme.spacing(1, 2, 2)};
          
          &.MuiLinearProgress-root {
            background-color: ${theme.colors.alpha.black[10]};
          }
          
          .MuiLinearProgress-bar {
            border-radius: ${theme.general.borderRadiusXl};
          }
  `
);

export default function CheckList(curOrder: CurOrder) {




    const CountFinished = () => {
        var i = 0;
        curOrder.dish.map((item) => {
            if (item.status == "已完成")
                i++;
        })
        return i;
    }
    let f = CountFinished();

    const [deal, setDeal] = useState<string>(curOrder.order_status);

    const [finished, setFinished] = useState<number>(f);

    let c: boolean[] = [];
    curOrder.dish.map(() => {
        c.push(false);
    })

    const [checked, setChecked] = useState<boolean[]>(c);



    const check = (item) => {
        return item.status == "已完成";
    }
    const countUnFinished = (curOrder: CurOrder) => {
        let i = 0;
        curOrder.dish.map((item) => {
            if (item.status != "已完成") {
                i++
            }
        })
        return i;

    }
    if (deal != "待处理")
        return (
            <Card >
                <div>

                    <CardHeader title={"订单号: " + curOrder.order_id} />
                </div>

                <Divider />
                <CardContent>
                    <List
                        sx={{ width: '100%', maxWidth: 350, bgcolor: 'background.paper' }}
                    >
                        {

                            curOrder.dish.map((item, index) => {

                                return (
                                    <ListItem divider>
                                        <ListItemText id={item.dish_name} primary={item.dish_name + "----备注:" + item.remark} />
                                        <Switch
                                            defaultChecked={check(item)}
                                            disabled={checked[index]}
                                            {...label}
                                            inputProps={{
                                                'aria-labelledby': item.dish_name,
                                            }}
                                            onChange={() => {
                                                let a: boolean[] = [];
                                                a = checked;
                                                a[index] = true;
                                                setChecked(a);
                                                const conduct1 = async () => {
                                                    s.dish_order_id = item.dish_order_id;
                                                    s.dish_status = "已完成"
                                                    return curOrderApi.updateDishStatus(
                                                        s
                                                    );
                                                }
                                                const conduct2 = async () => {
                                                    b.order_id = curOrder.order_id;
                                                    b.order_status = "已完成"
                                                    return curOrderApi.updateOrderStatus(
                                                        b
                                                    );
                                                }
                                                setFinished(finished + 1);
                                                console.log("finished");
                                                console.log(finished / curOrder.dish.length);
                                                conduct1().then((value) => {
                                                    ;
                                                }).catch((value) => {

                                                    alert("失败：" + value);
                                                });
                                                console.log("完成没？");
                                                console.log(countUnFinished(curOrder));
                                                if (finished + 1 == curOrder.dish.length) {
                                                    if (curOrder.order_status == "已支付") {
                                                        alert("该订单已完成");
                                                        window.location.reload();

                                                    }
                                                    else {
                                                        conduct2().then((value) => {

                                                            alert("该订单已完成：" + value);
                                                            window.location.reload();

                                                        }).catch((value) => {

                                                            alert("失败：" + value);
                                                        });
                                                    }

                                                }

                                            }} />

                                    </ListItem>
                                )
                            }

                            )
                        }
                    </List>
                </CardContent>
                <LinearProgressWrapper
                    value={Math.round((finished / curOrder.dish.length) * 100)}
                    color="primary"
                    variant="determinate"
                />
            </Card>

        );
    else {
        return (
            <Card >
                <div>

                    <CardHeader title={"订单号：" + curOrder.order_id} />
                </div>
                <Box p={2} >
                    <Grid container spacing={2}>
                        <Grid xs={4.5}>
                            <Button></Button>
                        </Grid>
                        <Grid xs={6}>

                            <Button

                                size="large"
                                variant="contained"
                                color="success"
                                onClick={() => {

                                    const conduct3 = async () => {
                                        b.order_id = curOrder.order_id;
                                        b.order_status = "制作中"

                                        return curOrderApi.updateOrderStatus(
                                            b
                                        );
                                    }


                                    conduct3().then((value) => {
                                        setDeal("制作中");




                                    }).catch((value) => {

                                        alert("失败：" + value);
                                    });


                                }}>
                                开始制作
                            </Button>
                        </Grid>

                    </Grid>

                </Box>

            </Card >


        )
    }

}

