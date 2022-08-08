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
  Grid,
  Stack,
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
import { CryptoTable,CryptoTableStatus } from '@/models/crypto_table';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import BulkActions from './BulkActions';
import TextField from '@mui/material/TextField';

import ModifyDialog from './ModifyDialog'
import SignUpVip from './AssignSeat'
import IndividualTable from './IndividualTable'
import Skeleton from '@mui/material/Skeleton';

const TableListTableSkeleton = () => {

  return (
    <Card>

        <CardHeader
          action={
            <Box width={400}>
              <FormControl variant="outlined"  sx={{ m: 1, minWidth: 120 }}>
              <Skeleton animation="wave" variant="text" />
              </FormControl>

              <FormControl variant="outlined"  sx={{ m: 1, minWidth: 120 }}>
                   <InputLabel >筛选</InputLabel>
                   <Skeleton animation="wave" variant="text" />                            
              </FormControl>              
            </Box>
          }
          title="餐桌"
        />
      
      <Divider />

      <Grid container spacing={1}>
      <Skeleton animation="wave" variant="text" />
      <Skeleton animation="wave" variant="text" />
      <Skeleton animation="wave" variant="text" />
      </Grid>

      <Box p={2}>
      <Skeleton animation="wave" variant="text" />
      </Box>
    </Card>
  );
};


export default TableListTableSkeleton;
