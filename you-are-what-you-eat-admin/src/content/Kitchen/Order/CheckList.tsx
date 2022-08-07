import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Switch from '@mui/material/Switch';
import { CurOrder, Dish } from '@/models/cur_order';
import { Card, CardHeader, Divider, CardContent } from '@mui/material';
import {
    LinearProgress,
    styled,
    FormControlLabel
} from '@mui/material';

import { curOrderApi } from '@/queries/cur_order';
import DishOrderTable from '@/content/Management/Transactions/DishOrderTable';





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
        return Math.round((i / curOrder.dish.length) * 100);
    }
    var finished = CountFinished();
    const check = (item) => {
        return item.status == "已完成";
    }
    return (
        <Card>
            <div>
                <FormControlLabel control={<Switch defaultChecked />} label="        开始处理" />
                <CardHeader title={curOrder.order_id} />
            </div>

            <Divider />
            <CardContent>
                <List
                    sx={{ width: '100%', maxWidth: 350, bgcolor: 'background.paper' }}
                >
                    {
                        curOrder.dish.map((item) =>
                            <ListItem divider>
                                <ListItemText id={item.dish_name} primary={item.dish_name + "    备注：xxxxxxxxx"} />

                                <Switch

                                    edge="end"
                                    onChange={() => {
                                        const conduct = async () => {
                                            return curOrderApi.updateDishStatus(
                                                {
                                                    dish_id: parseInt(item.dish_order_id),
                                                    dish_status: "已完成",
                                                    order_id: curOrder.order_id
                                                }
                                            );
                                        }

                                        conduct().then((value) => {

                                            alert("成功：" + value);

                                        }).catch((value) => {

                                            alert("失败：" + value);
                                        });

                                    }}
                                    checked={check(item)}
                                    inputProps={{
                                        'aria-labelledby': item.dish_name,
                                    }}
                                />

                            </ListItem>
                        )
                    }
                </List>
            </CardContent>
            <LinearProgressWrapper
                value={finished}
                color="primary"
                variant="determinate"
            />



        </Card>

    );
}