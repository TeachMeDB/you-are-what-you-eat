
import CurOrderTable from "./CurOrderTable";
import CurOrderSummary from "./CurOrderSummary";
import { Grid } from '@mui/material';
import { CurOrder } from "@/models/cur_order";

import { FC, ChangeEvent, useState, useEffect, useCallback } from 'react'
export default function CurOrders() {

  const [test, SetTest] = useState<number>(0);

  return (

    <>
      <CurOrderTable />
    </>


  )

}
