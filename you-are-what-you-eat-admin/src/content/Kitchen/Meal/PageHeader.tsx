import {
  styled,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardMedia
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import * as React from 'react';

import { GenerateBase64 } from '@/utils/image';

import DialogActions from '@mui/material/DialogActions';
import { MealInfoAdd } from '@/models/meal_info';
import { mealInfoApi } from '@/queries/meal';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone'

import { useTranslation } from 'react-i18next';

import { queryIngredientApi } from '@/queries/query_ingredient';
import { IngredientInfo } from '@/models/ingredient_info';

import { useRefMounted } from '@/hooks/useRefMounted';

let m: MealInfoAdd = {
  id: 123,
  dis_name: '123',
  price: 123,
  description: '123',
  tags: [""],
  picture: null,
  video: "",
  ingredient: [""]
}

const Input = styled('input')({
  display: 'none'
});

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



function PageHeader() {

  const [judgeIng, setJudgeIng] = React.useState(false);
  let a = [];
  const { t }: { t: any } = useTranslation();

  const [open, setOpen] = React.useState(false);
  const [newPromotionCover, setNewPromotionCover] = useState<string>('');
  const [judgeID, setJudgeID] = React.useState(false);
  const [judgePrice, setJudgePrice] = React.useState(false);
  const [ing, setIng] = useState<IngredientInfo[]>([]);
  const isMountedRef = useRefMounted();


  const getAllData = useCallback(async () => {
    try {

      let ig = await queryIngredientApi.getIngredientList('');
      if (isMountedRef()) {

        setIng(ig);

      }

    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);






  useEffect(() => {
    getAllData();
  }, [getAllData]);



  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const idInputChange = (e) => {

    m.id = Number(e.target.value);
    var rex = /^[0-9]+$/;//正则表达式
    var flag = (rex.test(m.id.toString()));//通过表达式进行匹配
    if (flag) {
      setJudgeID(false);
    }

    else {
      setJudgeID(true);
    }

  }
  const nameInputChange = (e) => {
    m.dis_name = e.target.value;
  }
  const priceInputChange = (e) => {
    m.price = Number(e.target.value);
    var rex = /^[0-9]+$/;//正则表达式
    var flag = (rex.test(m.price.toString()));//通过表达式进行匹配
    if (flag) {
      setJudgePrice(false);
    }

    else {
      setJudgePrice(true);
    }
  }
  const descriptionInputChange = (e) => {
    m.description = e.target.value;
  }
  const tagsInputChange = (e) => {
    m.tags = e.target.value.split(" ");

  }
  const ingInputChange = (e) => {
    m.ingredient = e.target.value.split(" ");
    let j = 1;
    m.ingredient.map((item) => {
      if (a.indexOf(item) == -1) {
        j = 0;
        console.log(item);
      }
      if (j == 0) {
        setJudgeIng(true);
      }
      else {
        setJudgeIng(false);
      }

    })

  }
  const viedoInputChange = (e) => {
    m.video = e.target.value;
  }

  ing.map((item) => {
    a.push(item.ingr_name);
  })
  console.log("库存啦啦啦");
  console.log(a);
  console.log(ing);

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          菜品信息
        </Typography>
        <Typography variant="subtitle2">
          查看并编辑所有菜品信息
        </Typography>
      </Grid>

      <Grid item>

        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={handleClickOpen}
        >
          新增菜品
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>菜品信息</DialogTitle>
          <DialogContent>

            <TextField
              autoFocus
              margin="dense"
              id="id"
              label="菜品编号"
              fullWidth
              variant="standard"
              onChange={idInputChange}
              helperText="请输入合法数字"
              error={judgeID}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="菜品名称"
              fullWidth
              variant="standard"
              onChange={nameInputChange}

            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="菜品价格"
              fullWidth
              variant="standard"
              onChange={priceInputChange}
              helperText="请输入合法数字"
              error={judgePrice}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="菜品描述"
              fullWidth
              variant="standard"
              onChange={descriptionInputChange}
            />
            <TextField

              autoFocus
              margin="dense"
              id="name"
              label="菜品需要的原料"
              fullWidth
              variant="standard"
              onChange={ingInputChange}
              helperText="请输入现有的原料"
              error={judgeIng}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="标签"
              fullWidth
              variant="standard"
              onChange={tagsInputChange}
              helperText="单锅，拼锅，全新套餐，季节新品，牛羊肉类，水产鱼类，丸滑虾类，美味主食，豆面制品，根茎菌菇，酒水，甜点小食"
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="视频链接"
              fullWidth
              variant="standard"
              onChange={viedoInputChange}
            />

            <Grid item xs={12}>
              <Box m={2}>
                <Box pb={1} mb={1}>
                  <b>{t('菜品图片')}:</b>
                </Box>
                <CardCover>
                  <CardMedia image={newPromotionCover} />
                  <CardCoverAction>
                    <Input accept="image/*" id="change-cover"
                      multiple
                      type="file"
                      onChange={(event) => {
                        if (event.target.files.length > 0) {
                          let file = event.target.files[0];
                          GenerateBase64(file, (url: string) => {
                            setNewPromotionCover(url);
                          });
                        }
                      }} />
                    <label htmlFor="change-cover">
                      <Button
                        startIcon={<UploadTwoToneIcon />}
                        variant="contained"
                        component="span"
                      >
                        上传菜品图片
                      </Button>
                    </label>
                  </CardCoverAction>
                </CardCover>
              </ Box>
            </Grid>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>退出</Button>
            <Button onClick={() => {
              const conduct = async () => {
                m.picture = newPromotionCover;
                console.log(m.tags);
                return mealInfoApi.addMeal(m);
              }
              var rex = /^[0-9]+$/;//正则表达式
              var flag = (rex.test(m.price.toString()) && rex.test(m.id.toString()));//通过表达式进行匹配

              if (flag) {
                conduct().then((value) => {
                  alert("增加成功：" + value);
                  window.location.reload();

                }).catch((value) => {

                  alert("增加失败：" + value);
                });
              } else {
                alert("数据类型不合法");
              }



            }}>确定</Button>
          </DialogActions>
        </Dialog>
      </Grid>



    </Grid>
  );

}

export default PageHeader;
