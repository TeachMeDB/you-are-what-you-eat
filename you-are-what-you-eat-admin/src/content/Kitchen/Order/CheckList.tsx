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
} from '@mui/material';


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



    const handleToggle = (item: Dish) => () => {
        console.log(item.status);
        item.status = "已完成";
        console.log(item.status);

    };
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
            <CardHeader title={curOrder.order_id} />
            <Divider />
            <CardContent>
                <List
                    sx={{ width: '100%', maxWidth: 350, bgcolor: 'background.paper' }}
                >
                    {
                        curOrder.dish.map((item) =>
                            <ListItem divider>
                                <ListItemText id={item.dish_name} primary={item.dish_name} />

                                <Switch

                                    edge="end"
                                    onChange={handleToggle(item)}
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