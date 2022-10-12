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
        color:"gray"
    },
    logo:{
        width:130,
        height:130,
        // marginTop:-120
    }
 
  }));

  
  const AddFood = () => {

    const [foodName,setFoodName] = useState('');
    const [price,setPrice] = useState('')
    const [quantity,setQuantity] = useState('')
    const [description,setDescription] = useState('')
    const [size,setSize] = useState('')
    const [category,setCategory] = useState('')
    const [menu,setMenu] = useState({})
    const navigate = useNavigate();

    //push image to firebase

    const [myForm,setMyForm] = useState({
        image:'',
      })
      
    
      const handleImage =(e) => {
    
        setMyForm({...myForm, image:e.target.files[0]})
      }

    const addFood = () => {
         //data to push to firebase
         const storageRef = ref(storage,`/images/${Date.now()}${myForm.image.name}`);

         const uploadImage = uploadBytesResumable(storageRef,myForm.image);
         uploadImage.on(
           "state_changed",
           (snapshot) => {
             const progressPercent = Math.round(
               (snapshot.bytesTransferred/snapshot.totalBytes)* 100
             );
           },
           (err) => {
             console.log(err);
           },
           ()=>{
             setMyForm({
               image:'',
             });
             getDownloadURL(uploadImage.snapshot.ref).then((url)=> {
                console.log(url);
                const collectionRef = collection (db,"menu");
                const foodEntry = {
                    foodName:foodName,
                    price:price,
                    description:description,
                    category:category,
                    size:size,
                    image: url
                    
                };
                
                addDoc(collectionRef,foodEntry).then(()=>{
                  alert("successfully added", {type:'successful'});
                }).catch((err)=> {
                  alert('Something went wrong', {type:"error"})
                })
              })
            }
          )     
    }

  

    const addMenuRef = collection(db,"menu")   
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
            <div className={classes.aside} style={{width:'80%',marginLeft:"20%",position:'absolute',top:300,right:0}}>
                <Typography variant="h6" className={classes.second}>
                    Add Food To Menu
                </Typography>
            <TextField id="standard-basic" label="Food Name" onChange={(e)=> setFoodName(e.target.value)} style={{marginTop:"1%",width:'40%',color:"white",borderBottom:"5px solid gray",borderRadius:5}} /><br></br>
            <TextField id="standard-basic" label="Price" onChange={(e)=> setPrice(e.target.value)} style={{marginTop:"1%",width:'40%',color:"white",borderBottom:"5px solid gray",borderRadius:5}} /><br></br>
            <TextField id="standard-basic" label="Quantity" onChange={(e)=> setQuantity(e.target.value)} style={{marginTop:"1%",width:'40%',color:"white",borderBottom:"5px solid gray",borderRadius:5}}/><br></br>
            <TextField id="standard-basic" label="Description" onChange={(e)=> setDescription(e.target.value)} style={{marginTop:"1%",width:'40%',color:"white",borderBottom:"5px solid gray",borderRadius:5}}/><br></br>
            <TextField id="standard-basic" label="Category" onChange={(e)=> setCategory(e.target.value)} style={{marginTop:"1%",width:'40%',color:"white",borderBottom:"5px solid gray",borderRadius:5}}/><br></br>
            <TextField id="standard-basic" label="Size" onChange={(e)=> setSize(e.target.value)} style={{marginTop:"1%",width:'40%',color:"white",borderBottom:"5px solid gray",borderRadius:5}}/><br></br>
            <input type='file'accept='image' onChange={(e)=>{handleImage(e)}} style={{marginTop:'2%',alignItems:"end"}} /><br></br>
            <Button variant="contained" style={{ backgroundColor: "#E85800" ,width:'30%',height:40,marginTop:'30px',color:'white'}} onClick={(e)=>{addFood()}}> Add To Menu</Button>
            </div>
           
           
        </div>

  
    )
  }

  export default AddFood;