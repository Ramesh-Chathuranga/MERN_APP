import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Header, Footer, CreateSheet, EditSheet ,ViewSheet} from "../../component";
import { PhotoCamera, Delete } from '@mui/icons-material';
import MachineRepository from '../../init/repository/MachineRepository';
import _ from "lodash";
import { URL } from "../../init/repository/Repository";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


export default () => {

  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [isViewSheet, setisViewSheet] = useState(false);
  const [list, setList] = useState([]);
  const [selectedItem, setSelectedItem] = useState({})

  useEffect(() => {
    onRefresh()
  }, []);


  const onRefresh = async () => {
    const data = await MachineRepository.getAllMachine();
    setList(_.get(data, 'data.data', []));
  }

  const onDelete = (item) => {
    // const data = confirm("Are you sure you want to remove this ?");
    confirmAlert({
      title: 'Confirm to Delete',
      message: 'Are you sure you want to remove this ?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            MachineRepository.deleteMachineData(item['_id']).then(res => {
              onRefresh();
              alert(_.get(res, 'data.message', ''))
            }).catch(error => {
              alert("Not dleted")
            })
          }
        },
        {
          label: 'No',
          onClick: () => {

          }
        }
      ]
    });


  }

  return (
    <>
      <CssBaseline />
      <Header />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              MERN APP
            </Typography>

            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button onClick={() => setOpen(true)} variant="contained">Create Ticket</Button>
              {/* <Button variant="outlined">Secondary action</Button> */}
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {list.map((card, id) => {

              return (
                <Grid item key={id} xs={12} sm={6} md={4}>
                  <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        // 16:9
                        pt: '56.25%',
                      }}
                      image={`${URL}${_.get(card, 'image.url', '')}`}
                      // image="https://source.unsplash.com/random"
                      alt="random"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {_.get(card, 'machineName', '')}
                      </Typography>
                      <Typography maxHeight={200}>
                        {_.get(card, 'description', '')}
                        {/* This is a media card. You can use this section to describe the
                        content. */}

                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button onClick={()=>{
                        setSelectedItem(card);
                        setisViewSheet(true)}} size="small">View</Button>
                      <Button onClick={() => {
                        setSelectedItem(card);
                        setOpenEdit(true);
                      }} size="small">Edit</Button>
                      <Button onClick={() => onDelete(card)} color="error" size="small">
                        <Delete sx={{}} />
                        Remove</Button>
                    </CardActions>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Footer />
      {/* End footer */}
      <CreateSheet open={open} onClose={(res) => {
        setOpen(false);
        if (res) {
          onRefresh()
        }

      }} />

      <EditSheet open={openEdit}
        data={selectedItem}
        onClose={(res) => {
          setOpenEdit(false);
          setSelectedItem({})
          if (res) {
            onRefresh()
          }

        }} />

        <ViewSheet data={selectedItem} open={isViewSheet} onClose={()=>{
          setSelectedItem({})
          setisViewSheet(false)}}/>
    </>
  );
}