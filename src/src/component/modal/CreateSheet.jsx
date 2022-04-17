import React, { useState, useRef } from 'react';
import { Box, Button, MenuItem, Modal, Fade, Grid, FormControl, TextField, Select, Typography, InputLabel} from '@mui/material';
import Upload from "../../../asset/upload.png";
import { useTheme } from '@mui/material/styles';
import _ from "lodash";
import moment from "moment";
import MachineRepository from '../../init/repository/MachineRepository';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: '#ffffff',
    border: '0px solid #000',
    boxShadow: 24,
    p: 4,
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const getStyles = (name, data, theme) => {
    const index = data.indexOf(name);
    return {
        fontWeight: index === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightBold
    };
}

const categories = [
    'A',
    'B',
    'C',
    'D',
];

export default ({ open = false, onClose = () => { } }) => {
    const fileUploader = useRef(null);
    const [files, setFiles] = useState(null);
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [categoryData, setCategoryData] = useState('');
    const [isOpen, setIsOpen] = React.useState(false);

    const [mId, setMid] = useState('');
    const [mName, setMName] = useState('');
    const [rDate, setRDate] = useState(moment().format('YYYY-MM-DD'));
    const [amount, setAmount] = useState('');
    const [content, setContent] = useState('');
    const [description, setDescription] = useState('');

    const theme = useTheme();

    const onUpload = () => {
        fileUploader.current.click()
    }

    const onChange = (e) => {
        const file = e.target.files[0];
        setFiles(file);
        setName(file.name);
        setImage(URL.createObjectURL(file))
    }

    const onSave = () => {
        if(files){
           const fd = new FormData();
           const date = new Date(moment(rDate).format('YYYY-MM-DD')).getTime()
           fd.append('machineId',mId)
           fd.append('machineName',mName)
           fd.append('spentAmount',amount)
           fd.append('description',description)
           fd.append('content',content)
           fd.append('category',categoryData)
           fd.append('image',files, files.name)
           fd.append('modifiedDate',date);
           MachineRepository.saveMachineData(fd).then(res=>{
            console.log("successful",res);
            onClose(true)
           }).catch(error=>{
               console.log("Document was not saved",error)
           })
          
        }else{
            alert('Upload a photo to continue')
        }

    }

    const handleChange = (event) => {
        setCategoryData(event.target.value);
    };


    return (
        <div>
            <input accept="image/x-png,image/gif,image/jpeg" onChange={onChange} type="file" id="file" ref={fileUploader} style={{ display: "none" }} />
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography
                            component="h1"
                            variant="h4"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Create Form
                        </Typography>

                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                                <FormControl sx={{ width: '100%' }}>
                                    <TextField
                                        onChange={(event) => {
                                            const text = event.target.value;
                                            setMid(text)
                                        }}
                                        value={mId} fullWidth label="Machine Id" />
                                    <br />
                                    <TextField
                                        onChange={(event) => {
                                            const text = event.target.value;
                                            setMName(text)
                                        }}
                                        value={mName} fullWidth label="Machine Name" />
                                    <br />
                                    <TextField
                                        onChange={(event) => {
                                            const text = event.target.value;
                                            setRDate(text)
                                        }}
                                        defaultValue={new Date()} type={'date'} fullWidth label="Repaired Date" value={rDate} />
                                    <br />
                                    <TextField
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                        onChange={(event) => {
                                            const text = parseInt(event.target.value);

                                            const isNumber = _.isNumber(text)
                                            if (isNumber) {
                                                setAmount(_.isNaN(text) ? 0 : text)
                                            }

                                        }}
                                        value={amount} fullWidth label="Amount Spent On Repairs" />
                                    <br />
                                    <TextField
                                        onChange={(event) => {
                                            const text = event.target.value;
                                            setDescription(text)
                                        }}
                                        value={description} fullWidth multiline label="Description" />
                                    <br />
                                    <TextField
                                        onChange={(event) => {
                                            const text = event.target.value;
                                            setContent(text)
                                        }}
                                        value={content} fullWidth multiline label="Content" />
                                    <br />
                                    <FormControl>
                                    <InputLabel htmlFor="my-input">Category</InputLabel>
                                    <Select
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        open={isOpen}
                                        onClose={() => setIsOpen(false)}
                                        onOpen={() => setIsOpen(true)}
                                        value={categoryData}
                                        label="Category"
                                        onChange={handleChange}
                                    >
                                        {categories.map((name) => (
                                            <MenuItem
                                                key={name}
                                                value={name}
                                                style={getStyles(name, categoryData, theme)}
                                            >
                                                {name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    </FormControl>
                                </FormControl>
                            </Grid>

                            <Grid item xs={4}>
                                <FormControl sx={{ width: '100%' }}>
                                    {image ?
                                        <>
                                            <img src={image} className={"uploadedImg"} />
                                            <Button onClick={onUpload} variant="outlined">Browse Files</Button>
                                        </> :
                                        <>
                                            <img src={Upload} />
                                            <Button onClick={onUpload} variant="outlined">Browse Files</Button>
                                        </>}
                                </FormControl>
                            </Grid>
                        </Grid>
                        <br />
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Button sx={{ width: 200 }} onClick={onSave} variant="contained">Save</Button>
                        </div>
                    </Box>

                </Fade>

            </Modal>
        </div>
    );
}