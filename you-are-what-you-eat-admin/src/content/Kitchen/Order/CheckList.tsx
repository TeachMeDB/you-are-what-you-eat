import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Switch from '@mui/material/Switch';
import { CurOrder } from '@/models/cur_order';
import { Card, CardHeader, Divider, CardContent } from '@mui/material';
import { LinearProgress, styled } from '@mui/material';

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
  const [checked, setChecked] = React.useState(['']);

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <Card>
      <CardHeader title={curOrder.OrderId} />
      <Divider />
      <CardContent>
        <List
          sx={{ width: '100%', maxWidth: 350, bgcolor: 'background.paper' }}
        >
          {curOrder.Dish.map((item) => (
            <ListItem>
              <ListItemText id={item.DishName} primary={item.DishName} />
              <Switch
                edge="end"
                onChange={handleToggle(item.DishName)}
                checked={checked.indexOf(item.DishName) !== -1}
                inputProps={{
                  'aria-labelledby': item.DishName
                }}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
      <LinearProgressWrapper value={25} color="primary" variant="determinate" />
    </Card>
  );
}
