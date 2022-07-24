import { useState, ReactElement, Ref, forwardRef } from 'react';
import type { FC, ChangeEvent } from 'react';
import PropTypes from 'prop-types';

import {
  Avatar,
  Box,
  Card,
  Slide,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableContainer,
  TableRow,
  Button,
  Typography,
  Dialog,
  styled
} from '@mui/material';

import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import type { Log } from '@/models/energy';
import { useTranslation } from 'react-i18next';
import BulkActions from './BulkActions';

const DialogWrapper = styled(Dialog)(
  () => `
      .MuiDialog-paper {
        overflow: visible;
      }
`
);

const AvatarError = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.error.lighter};
      color: ${theme.colors.error.main};
      width: ${theme.spacing(12)};
      height: ${theme.spacing(12)};

      .MuiSvgIcon-root {
        font-size: ${theme.typography.pxToRem(45)};
      }
`
);

const ButtonError = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors.error.main};
     color: ${theme.palette.error.contrastText};

     &:hover {
        background: ${theme.colors.error.dark};
     }
    `
);

interface ResultsProps {
  logs: Log[],
  type: string,
  id: string,
  model: string,
  location: string
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});


const applyPagination = (
  logs: Log[],
  page: number,
  limit: number
): Log[] => {
  return logs.slice(page * limit, page * limit + limit);
};

const Results: FC<ResultsProps> = ({ logs, type, id, model, location }) => {
  const [selectedItems] = useState<string[]>([]);
  const { t }: { t: any } = useTranslation();
  // const { enqueueSnackbar } = useSnackbar();

  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);


  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const paginatedPromotions = applyPagination(logs, page, limit);
  const selectedBulkActions = selectedItems.length > 0;

  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

  const closeConfirmDelete = () => {
    setOpenConfirmDelete(false);
  };

  const handleDeleteCompleted = () => {
    setOpenConfirmDelete(false);

  };

  return (
    <>
      <Card>
        <Box pl={2} display="flex" alignItems="center">
          {selectedBulkActions && (
            <Box flex={1} p={2}>
              <BulkActions />
            </Box>
          )}
          {!selectedBulkActions && (
            <Box
              flex={1}
              p={2}
              display={{ xs: 'block', sm: 'flex' }}
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Typography component="span" variant="subtitle1">
                  {t('传感器')}:
                </Typography>{' '}
                 <b>{t(`${id}`)}</b>
              </Box>
              <Box>
                <Typography component="span" variant="subtitle1">
                  {t('位置')}:
                </Typography>{' '}
                 <b>{t(`${location}`)}</b>
              </Box>
              <TablePagination
                component="div"
                count={logs.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 15]}
              />
            </Box>
          )}
        </Box>
        <Divider />

        {paginatedPromotions.length === 0 ? (
          <Typography
            sx={{
              py: 10
            }}
            variant="h3"
            fontWeight="normal"
            color="text.secondary"
            align="center"
          >
            {t("We couldn't find any invoices matching your search criteria")}
          </Typography>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align='center'>{t('id')}</TableCell>
                    <TableCell align='center'>{t('类型')}</TableCell>
                    <TableCell align='center'>{t('型号')}</TableCell>
                    <TableCell align='center'>{t('时间')}</TableCell>
                    <TableCell align="center">{t('数值')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedPromotions.map((log) => {
                    const isPromotionSelected = selectedItems.includes(
                      log.time
                    );
                    return (
                      <TableRow
                        hover
                        key={log.time}
                        selected={isPromotionSelected}
                      >
                        <TableCell align='center'>
                            <Box pl={1}>
                              <Typography noWrap variant="subtitle2">
                                {id}
                              </Typography>
                            </Box>

                        </TableCell>
                        <TableCell align='center'>
                          <Typography noWrap>
                            {type}
                          </Typography>
                        </TableCell>
                        <TableCell align='center'>
                            <Typography variant="h5">
                              {model}
                            </Typography>
                        </TableCell>
                        <TableCell align='center'>
                          <Typography noWrap>
                            {log.time}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          {log.value}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <Box p={2}>
              <TablePagination
                component="div"
                count={logs.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 15]}
              />
            </Box>
          </>
        )}
      </Card>

      <DialogWrapper
        open={openConfirmDelete}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Transition}
        keepMounted
        onClose={closeConfirmDelete}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          p={5}
        >
          <AvatarError>
            <CloseIcon />
          </AvatarError>

          <Typography
            align="center"
            sx={{
              pt: 4,
              px: 6
            }}
            variant="h3"
          >
            {t('你确定要删除该促销活动吗？')}?
          </Typography>

          <Typography
            align="center"
            sx={{
              pt: 2,
              pb: 4,
              px: 6
            }}
            fontWeight="normal"
            color="text.secondary"
            variant="h4"
          >
            {t("You won't be able to revert after deletion")}
          </Typography>

          <Box>
            <Button
              variant="text"
              size="large"
              sx={{
                mx: 1
              }}
              onClick={closeConfirmDelete}
            >
              {t('Cancel')}
            </Button>
            <ButtonError
              onClick={handleDeleteCompleted}
              size="large"
              sx={{
                mx: 1,
                px: 3
              }}
              variant="contained"
            >
              {t('Delete')}
            </ButtonError>
          </Box>
        </Box>
      </DialogWrapper>
    </>
  );
};

Results.propTypes = {
  logs: PropTypes.array.isRequired
};

Results.defaultProps = {
  logs: []
};

export default Results;
