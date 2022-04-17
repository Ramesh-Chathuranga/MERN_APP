import React from "react";
import {AppBar, Toolbar, Typography} from "@mui/material";
import CameraIcon from '@mui/icons-material/PhotoCamera';
import "./style.css"

export default ({})=>{
    return(
        <AppBar position="relative">
        <Toolbar className={'headerBox'}>
          {/* <CameraIcon sx={{ mr: 2 }} /> */}
          <Typography variant="h6" color="inherit" noWrap>
           MERN APP
          </Typography>
        </Toolbar>
      </AppBar>
    )
}