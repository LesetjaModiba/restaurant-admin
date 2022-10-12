import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import pic from '../images/logo.png';
import { addDoc} from 'firebase/firestore';
import { db,storage } from '../config/firebase';
import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import {ref, uploadBytesResumable, getDownloadURL,storageRef} from 'firebase/storage'
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';

//material ui

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { async } from '@firebase/util';
import Admin from './Admin';



const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      fontSize:50,
      color:"#2B2C34"
    },
    navigation:{
        backgroundColor:'#2B2C34',
        alignItems:'center',
        color:'white'
    },
    aside:{
        backgroundColor:'white',
        alignItems:'center',
        color:"#2B2C34"
        
    },
    second:{
        flexGrow: 1,
        fontSize:30,
        marginTop:10,
        color:"#2B2C34"
    },
    logo:{
        width:130,
        height:130,
        // marginTop:-120
    }
 
  }));

  
  const Home = () => {

    const classes = useStyles(); 
    return(
        <div style={{width:'100%'}}>
            <div className={classes.root}>
              {/* '#E85800' */}
                <AppBar position="static" style={{ height: 150, backgroundColor: "white", width: '80%', justifyContent: "center",position:'absolute',top:0,right:0 }}>
                    <Toolbar>
                    <img src={pic} className={classes.logo}/>
                        <Typography variant="h6" className={classes.title}>
                            PLK Kitchen
                        </Typography>
                        
                    </Toolbar>
                </AppBar>
            </div>
            <div className={classes.navigation} style={{ width: "20%", height: "70vh" ,paddingTop:300}}>
            <Link to='/' style={{textDecoration:'none',color:'white'}}><Button color="inherit">Home</Button></Link><br></br><br></br>
            <Link to='/orders' style={{textDecoration:'none',color:'white'}}><Button color="inherit">Orders</Button></Link><br></br><br></br>
            <Link to='/add' style={{textDecoration:'none',color:'white'}}><Button color="inherit">Add Food</Button></Link><br></br><br></br>
            <Link to='/edit' style={{textDecoration:'none',color:'white'}}><Button color="inherit">Edit Menu</Button></Link><br></br><br></br>
            
            </div>
            <Admin/>
        </div>

  
    )
  }

  export default Home;