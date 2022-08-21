import { EmployeeDetail } from '@/models/employee';
import {
  Typography,
  Card,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListSubheader,
  ListItemText,
  Avatar,
  useTheme,
  styled
} from '@mui/material';

const ListWrapper = styled(List)(
  () => `
        .MuiListItem-root {
          border-radius: 0;
          margin: 0;
        }
  `
);

function QuickLink({ user }: { user: EmployeeDetail }) {
  const theme = useTheme();

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader title="快速访问" />
      <Divider />
      <ListWrapper disablePadding>
        <ListSubheader>
          <Typography sx={{ py: 1.5 }} variant="h4" color="text.primary">
            国家官方网站
          </Typography>
        </ListSubheader>
        <Divider />
        <ListItem
          sx={{
            color: `${theme.colors.primary.main}`,
            '&:hover': { color: `${theme.colors.primary.dark}` }
          }}
          button
          onClick={()=>{
            window.open("http://si.zwfw.mohrss.gov.cn/index.jhtml?ua=pc");
          }}
        >
          <ListItemText primary="国家社会保险服务平台"/>
        </ListItem>
        <Divider />
        <ListItem
          sx={{
            color: `${theme.colors.primary.main}`,
            '&:hover': { color: `${theme.colors.primary.dark}` }
          }}
          button
          onClick={()=>{
            window.open("http://www.12388.gov.cn/cfda/");
          }}
        >
          <ListItemText primary="食品药品监管局网站" />
        </ListItem>
        <Divider />
        <ListSubheader>
          <Typography sx={{ py: 1.5 }} variant="h4" color="text.primary">
            平台官方网站
          </Typography>
        </ListSubheader>
        <Divider />
        <ListItem
          sx={{
            color: `${theme.colors.primary.main}`,
            '&:hover': { color: `${theme.colors.primary.dark}` }
          }}
          button
          onClick={()=>{
            window.open("https://www.dianping.com/citylist");
          }}
        >
          <ListItemText primary="大众点评平台" />
        </ListItem>
        <Divider />
        <ListItem
          sx={{
            color: `${theme.colors.primary.main}`,
            '&:hover': { color: `${theme.colors.primary.dark}` }
          }}
          button
          onClick={()=>{
            window.open("https://kaidian.ele.me/")

          }}
        >
          <ListItemText primary="饿了么商家端" />
        </ListItem>
        <Divider />
        <ListItem
          sx={{
            color: `${theme.colors.primary.main}`,
            '&:hover': { color: `${theme.colors.primary.dark}` }
          }}
          button
          onClick={()=>{
            window.open("https://ecom.meituan.com/emis/settle/merchantsSettle")

          }}
        >
          <ListItemText primary="美团商家端" />
        </ListItem>
        <Divider />

        <ListSubheader>
          <Typography sx={{ py: 1.5 }} variant="h4" color="text.primary">
            餐饮学习网站
          </Typography>
        </ListSubheader>
        <Divider />
        <ListItem
          sx={{
            color: `${theme.colors.primary.main}`,
            '&:hover': { color: `${theme.colors.primary.dark}` }
          }}
          button
          onClick={()=>{
            window.open("https://www.xiachufang.com/");
          }}
        >
          <ListItemText primary="下厨房" />
        </ListItem>
        <Divider />
        <ListItem
          sx={{
            color: `${theme.colors.primary.main}`,
            '&:hover': { color: `${theme.colors.primary.dark}` }
          }}
          button
          onClick={()=>{
            window.open("https://www.bilibili.com/v/food")

          }}
        >
          <ListItemText primary="哔哩哔哩美食区" />
        </ListItem>
        <Divider />


        

        
        
      </ListWrapper>
    </Card>
  );
}

export default QuickLink;
