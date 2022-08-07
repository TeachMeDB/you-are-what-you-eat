import { FC, ChangeEvent, useState } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader
} from '@mui/material';

import Label from '@/components/Label';
import { CryptoOrder, CryptoOrderStatus } from '@/models/crypto_order';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import BulkActions from './BulkActions';
import TextField from '@mui/material/TextField';
import Skeleton from '@mui/material/Skeleton';

const RecentOrdersTableSkeleton = () => {

  return (
    <Card>
      {/*selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
        
      )*/}
      <CardHeader
          action={
            <Box width={400}>
            <FormControl variant="outlined"  sx={{ m: 1, minWidth: 120 }}>
              <Skeleton variant="text" />
            </FormControl>

            <FormControl variant="outlined"  sx={{ m: 1, minWidth: 120 }}>
                 <InputLabel >筛选</InputLabel>
                 <Skeleton variant="text" />                           
            </FormControl>              
          </Box>
          }
          title="最近订单"
        />
        
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>订单号</TableCell>
              <TableCell>创建时间</TableCell>
              <TableCell>桌号</TableCell>
              <TableCell align="right">金额</TableCell>
              <TableCell align="right">状态</TableCell>
              <TableCell align="right">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <Skeleton variant="text" />
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <Skeleton variant="text" />
      </Box>
    </Card>    
  );
};


export default RecentOrdersTableSkeleton;
