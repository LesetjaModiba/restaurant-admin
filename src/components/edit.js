import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {db} from '../config/firebase';
import { Link } from 'react-router-dom';
import pic from '../images/logo.png';


import { makeStyles } from '@material-ui/core/styles';


import {  doc, getDoc, updateDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';


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

const Editpage = () => {

    const {id} = useParams()
    console.log(id)

    //fuction to get single doc
    const getDocDetails = async(id)=>{
        const docref = doc(db,'food Menu',id)
        try{
            const docSnap = await getDoc(docref);
             if(docSnap.exists()){
                console.log('available')
                setDetails(docSnap.data())
             }else{
                console.log('not available')
             }

        }catch(err){
            console.log(err)
        }
    }

    //updateButton
    const update = async(id,foodName)=>{
        const menuDoc = doc(db,'food Menu',id)

        const foodEntry = {
            foodName:foodName,
            price:price,
            quantity:quantity,
            description:description,
            category:category,
            size:size,
    
        };

        await updateDoc(menuDoc,foodEntry).then(()=>{
            alert('updated successfully')
        }).catch(err=>{
            console.log(err)
        })
         
    }

    useEffect(()=>{
        getDocDetails(id)

    },[])

    const [foodName, setFoodName] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [size, setSize] = useState("")

    const classes = useStyles();
    const [details, setDetails] = useState([])
    return (
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
                    Edit Food Menu
                </Typography>
            <TextField id="standard-basic" label="Food Name" onChange={(e)=> setFoodName(e.target.value)} style={{marginTop:"1%",width:'40%',color:"white",borderBottom:"5px solid gray",borderRadius:5}} /><br></br>
            <TextField id="standard-basic" label="Price" onChange={(e)=> setPrice(e.target.value)} style={{marginTop:"1%",width:'40%',color:"white",borderBottom:"5px solid gray",borderRadius:5}} /><br></br>
            <TextField id="standard-basic" label="Quantity" onChange={(e)=> setQuantity(e.target.value)} style={{marginTop:"1%",width:'40%',color:"white",borderBottom:"5px solid gray",borderRadius:5}}/><br></br>
            <TextField id="standard-basic" label="Description" onChange={(e)=> setDescription(e.target.value)} style={{marginTop:"1%",width:'40%',color:"white",borderBottom:"5px solid gray",borderRadius:5}}/><br></br>
            <TextField id="standard-basic" label="Category" onChange={(e)=> setCategory(e.target.value)} style={{marginTop:"1%",width:'40%',color:"white",borderBottom:"5px solid gray",borderRadius:5}}/><br></br>
            <TextField id="standard-basic" label="Size" onChange={(e)=> setSize(e.target.value)} style={{marginTop:"1%",width:'40%',color:"white",borderBottom:"5px solid gray",borderRadius:5}}/><br></br>
            <Button onClick={(e)=>{update(id,foodName)}}  className={classes.but} style={{ backgroundColor: "#E85800" ,width:'30%',height:40,marginTop:'30px',color:'white'}} variant="contained" color="primary" id='myMainButton'>
                UPDATE
            </Button>
</div>
        </div>
       
    );
}

export default Editpage;
