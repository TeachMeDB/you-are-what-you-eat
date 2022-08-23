import { Box, Container, Link, Typography, styled } from '@mui/material';

const FooterWrapper = styled(Container)(
  ({ theme }) => `
        margin-top: ${theme.spacing(4)};
`
);

function Footer() {
  return (
    <FooterWrapper className="footer-wrapper">
      <Box
        pb={4}
        display={{ xs: 'block', md: 'flex' }}
        alignItems="center"
        textAlign={{ xs: 'center', md: 'left' }}
        justifyContent="space-between"
      >
        <Box>
          <Typography variant="subtitle1">
            &copy; 人如其食智慧餐厅
          </Typography>
        </Box>
        <Typography
          sx={{
            pt: { xs: 2, md: 0 }
          }}
          variant="subtitle1"
        >
          课程项目来源：{' '}
          <Link
            href="sse.tongji.edu.cn"
            target="_blank"
            rel="noopener noreferrer"
          >
            同济大学软件学院
          </Link>
        </Typography>
      </Box>
    </FooterWrapper>
  );
}

export default Footer;
