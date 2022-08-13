import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageHeader from '@/content/Ingredient/Overview/PageHeader';
import { Grid, Container } from '@mui/material';
import Footer from '@/components/Footer';

import PageTitleWrapper from '@/components/PageTitleWrapper';
import { queryIngredientApi } from '@/queries/query_ingredient';
import { queryIngredientRecordApi } from '@/queries/query_ingredient_record';
import { queryEmployeeApi } from '@/queries/query_employee';
import { useState } from 'react';
import AllIngredientInfoes from '@/content/Ingredient/Overview/IngredientInfo';
import AllIngredientRecordInfo from '@/content/Ingredient/IngredientRecord/IngredientRecordInfo';

function ingredientOverview({
  ingredientList = [],
  ingredientRecordList = [],
  employees = []
}) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [ingredientInfoes, setIngredientInfoes] = useState(ingredientList);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [ingredientRecordInfoes, setIngredientRecordInfoes] =
    useState(ingredientRecordList);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [tab, setTab] = useState(1);
  return (
    <>
      <Head>
        <title>耗材信息</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader
          employees={employees}
          ingredients={ingredientInfoes}
          setIngredientInfoes={setIngredientInfoes}
          setIngredientRecordInfoes={setIngredientRecordInfoes}
          currentTab={tab}
          handleTabsChange={setTab}
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            {tab === 1 ? (
              <AllIngredientInfoes
                list={ingredientInfoes || []}
                setIngredientInfoes={setIngredientInfoes}
              />
            ) : (
              <AllIngredientRecordInfo
                list={ingredientRecordInfoes || []}
                ingredients={ingredientInfoes || []}
                employees={employees || []}
                setIngredientRecordInfoes={setIngredientRecordInfoes}
              />
            )}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

ingredientOverview.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export async function getServerSideProps() {
  const ingredientList = await queryIngredientApi.getIngredientList('');
  const ingredientRecordList =
    await queryIngredientRecordApi.getIngredientRecordList();
  const employees = await queryEmployeeApi.getEmployeeList();
  return {
    props: {
      ingredientList: ingredientList || [],
      ingredientRecordList: ingredientRecordList || [],
      employees: employees || []
    } // will be passed to the page component as props
  };
}

export default ingredientOverview;
