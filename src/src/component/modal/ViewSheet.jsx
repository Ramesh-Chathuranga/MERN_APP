import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, MenuItem, Modal, Fade, Grid, FormControl, TextField, Select, Typography, Card, CardMedia, CardContent, CardActionArea } from '@mui/material';
import Upload from "../../../asset/upload.png";
import { useTheme } from '@mui/material/styles';
import _ from "lodash";
import moment from "moment";
import MachineRepository from '../../init/repository/MachineRepository';
import { URL } from '../../init/repository/Repository';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const fd = new FormData();

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 800,
    bgcolor: '#ffffff',
    border: '0px solid #000',
    boxShadow: 24,
    p: 4,
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;


export default ({ open = false, onClose = () => { }, data = {} }) => {
    const fileUploader = useRef(null);
    const [files, setFiles] = useState(null);
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [categoryData, setCategoryData] = useState('');
    const [isOpen, setIsOpen] = React.useState(false);
    const [isImageUpdate, setIsImageUpdate] = React.useState(false);

    const [mId, setMid] = useState('');
    const [mName, setMName] = useState('');
    const [rDate, setRDate] = useState(moment().format('YYYY-MM-DD'));
    const [amount, setAmount] = useState('');
    const [content, setContent] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {

        const { spentAmount, modifiedDate, machineName, machineId, image, description, content, category } = data;
        setCategoryData(category || '');
        setDescription(description);
        setContent(content);
        setImage(_.get(image, 'url', null));
        setMid(machineId);
        setMName(machineName);
        setAmount(spentAmount);
        setRDate(moment(new Date(modifiedDate)).format('YYYY-MM-DD'))

    }, [data]);


    const theme = useTheme();



    return (
        <div>

            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Fade in={open}>
                    <Box sx={style} style={{ overflow: "scroll" }}>
                        <Typography
                            component="h5"
                            variant="h5"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            {mName}
                        </Typography>
                        <Typography
                            component="h6"
                            variant="h6"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            {mId}
                        </Typography>
                        <Typography
                            component="h6"
                            variant="h6"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            {rDate}
                        </Typography>

                        <Grid container spacing={2}>
                            <Card sx={{ height: '80%', display: 'flex', flexDirection: 'column', width: 500, }}>
                                <CardMedia
                                    component="img"
                                    sx={{
                                        // 16:9
                                        pt: '6.25%',
                                    }}

                                    image={`${URL}${image}`}
                                    // image="https://source.unsplash.com/random"
                                    alt="random"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="h6">
                                        Category : {categoryData}
                                    </Typography>
                                    <Typography gutterBottom variant="h6" component="h6">
                                        Description
                                    </Typography>
                                    <Typography gutterBottom variant="p" component="p">
                                        {description}
                                    </Typography>

                                    <Typography gutterBottom variant="h6" component="h6">
                                        Content
                                    </Typography>
                                    <Typography gutterBottom variant="p" component="p">
                                        {content}
                                    </Typography>
                                </CardContent>
                                <CardActionArea>
                                    <br />
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                        <Button sx={{ width: 200 }} onClick={onClose} variant="contained">Cancel</Button>

                                    </div>
                                    <br/>
                                </CardActionArea>
                            </Card>
                        </Grid>

                    </Box>

                </Fade>

            </Modal>
        </div>
    );
}