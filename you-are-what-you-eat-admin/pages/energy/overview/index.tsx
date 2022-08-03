import PageHeader from 'src/content/Energy/Overview/PageHeader';
import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import Head from 'next/head';

import SidebarLayout from 'src/layouts/SidebarLayout';

import { 
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Divider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EnergyPanel from '@/content/Energy/Overview/EnergyPanel';
import EnergySurplus from '@/content/Energy/Overview/EnergySurplus';
import OverallUsage from 'src/content/Energy/Overview/OverallUsage';
import TypesOverview from '@/content/Energy/Overview/EnergyTypesOverview';
import { useState } from 'react';

function DataDisplayChartsLarge() {

  const [expanded, setExpanded] = useState<string | false>(false);
  const handleChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  }

  return (
    <>
      <Head>
        <title>能源管理</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>

      <Grid
        sx={{
          px: 4
        }}
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={4}
      >
        <Grid item xs={12}>
          <EnergyPanel />
        </Grid>
        <Grid item xs={12}>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography><b>周用量概览</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <OverallUsage />
        </AccordionDetails>
        </Accordion>
        <Divider />
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography><b>按能耗类型概览</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TypesOverview />
        </AccordionDetails>
        </Accordion>
        <Divider />
        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography><b>年度能耗总览</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <EnergySurplus />
        </AccordionDetails>
        </Accordion>
        </Grid>
        </Grid>
      <Footer />
    </>
  );
}

DataDisplayChartsLarge.getLayout = (page) => (
    <SidebarLayout>{page}</SidebarLayout>
);

export default DataDisplayChartsLarge;
