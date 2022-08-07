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
import { CryptoVip,CryptoVipStatus } from '@/models/crypto_vip';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import BulkActions from './BulkActions';
import TextField from '@mui/material/TextField';

import ModifyDialog from './ModifyDialog'
import SignUpVip from './SignUpVip'
import Skeleton from '@mui/material/Skeleton';



const VIPListTableSkeleton = () => {

  const theme = useTheme();

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
          title="会员"
        />
        
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Skeleton variant="text" />
              </TableCell>
              <TableCell>用户名</TableCell>
              <TableCell>出生日期</TableCell>
              <TableCell>性别</TableCell>
              <TableCell align="right">余额</TableCell>
              <TableCell align="right">积分</TableCell>
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

export default VIPListTableSkeleton;
