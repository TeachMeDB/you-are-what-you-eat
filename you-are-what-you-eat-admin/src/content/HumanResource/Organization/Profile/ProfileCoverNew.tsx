import {
  Box,
  Typography,
  Card,
  Tooltip,
  Avatar,
  CardMedia,
  Button,
  IconButton,
  Grid,
  TextField,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';

import BadgeIcon from '@mui/icons-material/Badge';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import { useRefMounted } from '@/hooks/useRefMounted';
import { useCallback, useEffect, useState } from 'react';
import { humanResourceApi } from '@/queries/employee';
import { EmployeeDetail, EmployeeUpload } from '@/models/employee';

import {
  differenceInYears,
  format,
  formatDistance,
  formatRelative,
  parse,
  subDays
} from 'date-fns';
import { GenerateBase64 } from '@/utils/image';
import { Upload } from '@mui/icons-material';
import { DesktopDatePicker } from '@mui/lab';
import { handleClientScriptLoad } from 'next/script';

const Input = styled('input')({
  display: 'none'
});

const AvatarWrapper = styled(Card)(
  ({ theme }) => `

    position: relative;
    overflow: visible;
    display: inline-block;
    margin-top: -${theme.spacing(9)};
    margin-left: ${theme.spacing(2)};

    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
    }
`
);

const ButtonUploadWrapper = styled(Box)(
  ({ theme }) => `
    position: absolute;
    width: ${theme.spacing(4)};
    height: ${theme.spacing(4)};
    bottom: -${theme.spacing(1)};
    right: -${theme.spacing(1)};

    .MuiIconButton-root {
      border-radius: 100%;
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      box-shadow: ${theme.colors.shadows.primary};
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
      padding: 0;
  
      &:hover {
        background: ${theme.colors.primary.dark};
      }
    }
`
);

const CardCover = styled(Card)(
  ({ theme }) => `
    position: relative;

    .MuiCardMedia-root {
      height: ${theme.spacing(26)};
    }
`
);

const CardCoverAction = styled(Box)(
  ({ theme }) => `
    position: absolute;
    right: ${theme.spacing(2)};
    bottom: ${theme.spacing(2)};
`
);

const ProfileCoverNew = ({
  upload,
  setSelectedUpload
}: {
  upload: EmployeeUpload;
  setSelectedUpload: (upload: EmployeeUpload) => void;
}) => {
  console.log(upload);

  const handleNameChange = (event) => {
    if (event.target.value) {
      let newUpload = { ...upload };
      newUpload.name = event.target.value;

      setSelectedUpload(newUpload);
    }
  };

  const handleBirthdayChange = (value: Date) => {
    console.log(value);

    if (value) {
      let newUpload = { ...upload };
      newUpload.birthday = format(value, 'yyyy-MM-dd');
      setSelectedUpload(newUpload);
    }
  };

  const handleGenderChange = (event) => {
    if (event.target.value) {
      let newUpload = { ...upload };
      newUpload.gender = event.target.value;

      setSelectedUpload(newUpload);
    }
  };

  const handleOccupationChange = (event) => {
    if (event.target.value) {
      let newUpload = { ...upload };
      newUpload.occupation = event.target.value;

      setSelectedUpload(newUpload);
    }
  };

  return (
    <>
      <CardCover>
        <CardMedia image={upload.cover} />
        <CardCoverAction>
          <Input
            accept="image/*"
            id="change-cover"
            type="file"
            onChange={(event) => {
              if (event.target.files.length > 0) {
                let file = event.target.files[0];

                GenerateBase64(file, (url: string) => {
                  let newUpload = { ...upload };
                  newUpload.cover = url;

                  setSelectedUpload(newUpload);
                });
              }
            }}
          />
          <label htmlFor="change-cover">
            <Button
              startIcon={<UploadTwoToneIcon />}
              variant="contained"
              component="span"
            >
              更改封面
            </Button>
          </label>
        </CardCoverAction>
      </CardCover>
      <AvatarWrapper>
        <Avatar variant="rounded" alt={upload.name} src={upload.avatar} />
        <ButtonUploadWrapper>
          <Input
            accept="image/*"
            id="icon-button-file"
            name="icon-button-file"
            type="file"
            onChange={(event) => {
              if (event.target.files.length > 0) {
                let file = event.target.files[0];

                GenerateBase64(file, (url: string) => {
                  let newUpload = { ...upload };
                  newUpload.avatar = url;

                  setSelectedUpload(newUpload);
                });
              }
            }}
          />
          <label htmlFor="icon-button-file">
            <IconButton component="span" color="primary">
              <UploadTwoToneIcon />
            </IconButton>
          </label>
        </ButtonUploadWrapper>
      </AvatarWrapper>
      <Box py={2} pl={2} mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <Grid container>
              <Box
                display={{ xs: 'block', md: 'flex' }}
                alignItems="center"
                justifyContent="space-between"
              >
                <TextField
                  required
                  id="outlined-required"
                  label="姓名"
                  value={upload.name}
                  onChange={handleNameChange}
                />

                <DesktopDatePicker
                  label="员工出生日期"
                  inputFormat="yyyy-MM-dd"
                  mask="____-__-__"
                  value={parse(upload.birthday, 'yyyy-MM-dd', Date.now())}
                  onChange={handleBirthdayChange}
                  renderInput={(params) => (
                    <TextField sx={{ mx: 1 }} {...params} />
                  )}
                />

                <TextField
                  variant="outlined"
                  value={upload.gender}
                  required
                  id="outlined-disabled"
                  label="性别"
                  onChange={handleGenderChange}
                />
                <TextField
                  sx={{ mx: 1 }}
                  variant="outlined"
                  required
                  value={upload.occupation}
                  onChange={handleOccupationChange}
                  id="outlined-disabled"
                  label="职位"
                />
              </Box>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

ProfileCoverNew.propTypes = {};

export default ProfileCoverNew;
