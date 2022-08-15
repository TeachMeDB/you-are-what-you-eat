import { Box, Card, Container, Button, styled } from '@mui/material';
import { ReactElement, useEffect } from 'react';
import BaseLayout from 'src/layouts/BaseLayout';

import Link from 'src/components/Link';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import Logo from 'src/components/LogoSign';
import Hero from 'src/content/Overview/Hero';
import Highlights from 'src/content/Overview/Highlights';
import Footer from 'src/components/Footer';
import authorization from '@/utils/authorization';
import GlobalConfig from '@/utils/config';
import { useRouter } from 'next/router';

const HeaderWrapper = styled(Card)(
  ({ theme }) => `
  width: 100%;
  display: flex;
  align-items: center;
  height: ${theme.spacing(10)};
  margin-bottom: ${theme.spacing(10)};
`
);

const OverviewWrapper = styled(Box)(
  ({ theme }) => `
    overflow: auto;
    background: ${theme.palette.common.white};
    flex: 1;
    overflow-x: hidden;
`
);

function Overview() {
  const { t }: { t: any } = useTranslation();


  useEffect(()=>{

    console.log(window.location.host);

    GlobalConfig.setFrontendURL(window.location.host)

  })

  return (
    <OverviewWrapper>
      <Head>
        <title>人如其食</title>
      </Head>
      <HeaderWrapper>
        <Container maxWidth="lg">
          <Box display="flex" alignItems="center">
            <Logo />
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              flex={1}
            >
              <Box />
              <Box>
                <Button
                  variant="contained"
                  sx={{ ml: 2 }}
                  onClick={()=>{

                    window.location.replace(authorization.getSigninUrl(GlobalConfig.getFrontendURL()));
                  
                  }}
                >
                  {t('登陆')}
                </Button>
                <Button
                  variant="contained"
                  sx={{ ml: 2 }}
                  onClick={()=>{

                    window.location.replace(authorization.getSignupUrl(GlobalConfig.getFrontendURL()));
                  
                  }}
                >
                  {t('注册')}
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </HeaderWrapper>
      <Hero />
      <Highlights />
      <Footer />
    </OverviewWrapper>
  );
}

export default Overview;

Overview.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
