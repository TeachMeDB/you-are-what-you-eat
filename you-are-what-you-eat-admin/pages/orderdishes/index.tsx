import SidebarLayout from '@/layouts/SidebarLayout';

import { Grid,Box,Stack } from '@mui/material';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
interface DishProps{
    dishname:string;
    description:string;
}

const InitialDish=():Array<DishProps>=>{
return [
    {
        dishname:"清炒土豆丝",
        description:"简单的做法，极致的美味"
    },
    {
        dishname:"番茄炒蛋",
        description:"有点甜"
    },
    {
        dishname:"炒洋葱",
        description:"那是相当难吃"
    },
    {
        dishname:"歪比巴卜",
        description:"僵尸吃掉了你的脑子！"
    },
    {
        dishname:"歪比巴卜",
        description:"僵尸吃掉了你的脑子！"
    },
    {
        dishname:"歪比巴卜",
        description:"僵尸吃掉了你的脑子！"
    }
]
}

function Dishpanel(dishes:Array<DishProps>){

dishes=InitialDish();

  return (
<Box sx={{minWidth:100}}>
 <Grid container spacing={1}> 
    {
        dishes.map((dish:DishProps)=>{
        return (
      <Grid item xs={4} >
        <Card sx={{ minWidth:320 }} >
      <CardMedia
        component="img"
        height="140" 
        image="public\static\images\dishimg\potato.png"
        alt="potatochips"
      />
      <CardContent>
        
        <Typography gutterBottom variant="h5" component="div">
          {dish.dishname}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {dish.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">点餐</Button>
        <Button size="small">查看详细评价</Button>
      </CardActions>
     </Card> </Grid>
     );
  
     })
    }
    </Grid> 
    </Box>
  );
}


 Dishpanel.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default Dishpanel;
