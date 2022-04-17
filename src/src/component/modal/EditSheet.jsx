import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, MenuItem, Modal, Fade, Grid, FormControl, TextField, Select, Typography, InputLabel } from '@mui/material';
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
        // category: "B"
        // content: "This is a media card. You can use this section to describe the content"
        // description: "This is a media card. You can use this section to describe the content . This is a media card. You can use this section to describe the content"
        // image: {contentType: 'image/png', url: 'uploads/1650152675080.png'}
        // machineId: "M01"
        // machineName: "Macbook"
        // modifiedDate: "2022-04-17T00:00:00.000Z"
        // spentAmount: 10000
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

    const onUpload = () => {
        fileUploader.current.click()
    }

    const onChange = (e) => {
        const file = e.target.files[0];
        setFiles(file);
        setName(file.name);
        setImage(URL.createObjectURL(file));
        fd.delete('image');
        fd.append('image', file, file.name);
    }

    const onSave = () => {
        let i = 0;
        for (var value of fd.values()) {
            // console.log(value,"value")
            i++;
        }
        if (i > 0) {

            MachineRepository.updateMachineData(fd, _.get(data, '_id', '')).then(res => {
                console.log("successful", res);
                onClose(true)
            }).catch(error => {
                console.log("Document was not saved", error)
            })



        } else {
            onClose()
        }



    }

    const handleChange = (event) => {
        setCategoryData(event.target.value);
        fd.delete('category');
        fd.append('category', event.target.value)
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
                            Edit Form
                        </Typography>

                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                                <FormControl sx={{ width: '100%' }}>
                                    <TextField
                                        onChange={(event) => {
                                            const text = event.target.value;
                                            fd.delete('machineId');
                                            setMid(text);
                                            fd.append('machineId', text)
                                        }}
                                        value={mId} fullWidth label="Machine Id" />
                                    <br />
                                    <TextField
                                        onChange={(event) => {
                                            const text = event.target.value;
                                            fd.delete('machineName');
                                            setMName(text);
                                            fd.append('machineName', text)
                                        }}
                                        value={mName} fullWidth label="Machine Name" />
                                    <br />
                                    <TextField
                                        onChange={(event) => {
                                            const text = event.target.value;
                                            fd.delete('modifiedDate');
                                            setRDate(text)
                                            const date = new Date(moment(text).format('YYYY-MM-DD')).getTime()
                                            fd.append('modifiedDate', date)
                                        }}
                                        defaultValue={new Date()} type={'date'} fullWidth label="Repaired Date" value={rDate} />
                                    <br />
                                    <TextField
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                        onChange={(event) => {
                                            const text = parseInt(event.target.value);

                                            const isNumber = _.isNumber(text)
                                            if (isNumber) {
                                                fd.delete('spentAmount');
                                                setAmount(_.isNaN(text) ? 0 : text);
                                                fd.append('spentAmount', text)
                                            }

                                        }}
                                        value={amount} fullWidth label="Amount Spent On Repairs" />
                                    <br />
                                    <TextField
                                        onChange={(event) => {
                                            const text = event.target.value;
                                            setDescription(text)
                                            fd.delete('description');
                                            fd.append('description', text)
                                        }}
                                        value={description} fullWidth multiline label="Description" />
                                    <br />
                                    <TextField
                                        onChange={(event) => {
                                            const text = event.target.value;
                                            setContent(text)
                                            fd.delete('content');
                                            fd.append('content', text)
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
                                            <img src={`${URL}${image}`} className={"uploadedImg"} />
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
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                            <Button sx={{ width: 200, marginRight: 10, backgroundColor: 'red' }} onClick={onClose} variant="contained">Cancel</Button>
                            <Button sx={{ width: 200, marginLeft: 10, }} onClick={onSave} variant="contained">Update</Button>
                        </div>
                    </Box>

                </Fade>

            </Modal>
        </div>
    );
}