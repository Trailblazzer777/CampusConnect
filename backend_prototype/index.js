const port = 4001;
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const exp = require('constants');

app.use(express.json());
app.use(cors());

//Databse connection mongodb
mongoose.connect("mongodb+srv://TrailblazeCC:campusconnect123@cluster1.ltzhhyj.mongodb.net/CampusConnect");

//API creaction
app.get('/', (req, res) => {
    res.send('Hello from Campus Connect');
});

//Image storage engine
const storage = multer.diskStorage({
    destination: './upload/images',  
    filename:(req,file,cb)=>{
        console.log(file)
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

//Image upload

const upload = multer({storage:storage})

//upload endpoint for images
app.use('/images',express.static('upload/images'))

app.post("/upload",upload.single('post'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})




// schema for creating event psots

const Post = mongoose.model('Post', {
    id:{
        type: Number,
        required: true,
    },
    eventname:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    eventinfo:{
        type: String,
        required: true,
    },
    eventstime:{
        type: String,
        required: true,
    },
    eventetime:{
        type: String,
        required: true,
    },
    eventdate:{
        type: String,
        required: true,
    },
    eventvenue:{
        type: String,
        required: true,
    },
    eventorganizer:{
        type: String,
        required: true,
    },
    eventdescription:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now,
    },
    eventapproval:{
        type: Boolean,
        default: true,
    },
    });

    app.post('/createpost', async (req, res) => {
        let posts = await Post.find({});
        let id;
        if(posts.length>0){
            let last_post_array = posts.slice(-1);
            let last_post = last_post_array[0];
            id = last_post.id+1;
        }
        else{
            {id = 1;}
        }
        const post = new Post({
            id: id,
            eventname: req.body.eventname,
            image: req.body.image,
            eventinfo: req.body.eventinfo,
            eventstime: req.body.eventstime,
            eventetime: req.body.eventetime,
            eventdate: req.body.eventdate,
            eventvenue: req.body.eventvenue,
            eventorganizer: req.body.eventorganizer,
            eventdescription: req.body.eventdescription,
        });
        console.log(post);
        await post.save();
        console.log("Post created successfully");
        res.json({
            success:true,
            name:req.body.eventname,
        })
    })


    //Creating api for removing posts
    app.post('/removepost', async (req, res) => {
        await Post.findOneAndDelete({id: req.body.id});
        console.log("Post removed successfully");
        res.json({
            success:true,
            name:req.body.eventname,
        })
    });


    //Creating api for getting all products
    app.get('/allposts', async (req, res) => {
        let posts = await Post.find({});
        console.log("All products fetched successfully")
        res.send(posts);
    });

    //user schema
const Users = mongoose.model('Users', {
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    registeredPostsData:{
        type: Object,
    },
    date:{
        type: Date,
        default: Date.now,
    },
    hasRegistered: {
        type: Boolean,
        default: false,
    },
    });


 

    //user registration endpoint
    app.post('/signup' , async (req, res) => {
        console.log("SIGNUP");
        let check = await Users.findOne({email: req.body.email});
        if(check){
            return res.status(400).json({success:false,errors:"User already exists"});

            }
        let registeredList ={};
        for( let i=0 ; i < 300; i++){
            registeredList[i] = false;
        }
        const user = new Users({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            registeredPostsData: registeredList,
        });
        await user.save();
            const data = {
                user: {
                    id: user.id
                }
            }

        const token = jwt.sign(data, 'secret')
        success = true;
        res.json({success,token});
    }
    )

    //user login endpoint
    app.post('/login', async (req, res) => {
    console.log("LOGIN");
        let user = await Users.findOne({email: req.body.email })
        if (user){
            const passCompare = req.body.password === user.password;
            if(passCompare){
                const data = {
                    user: {
                        id: user.id
                    }
                }
                console.log(user.id);
                const token = jwt.sign(data, 'secret')
                res.json({success:true,token});
        }
        else{
            res.json({success:false,errors:"Invalid Password"});
        }
    }
    else{
        res.json({success:false,errors:"Invalid User EmailId"});
    }
    }
    )


    //middleware to fetch user
    const fetchuser = async (req, res, next) => {
        const token = req.header('auth-token');
        if(!token){
            res.status(401).send({errors: 'Please authenticate using valid details'});
        }
        else{
            try{
                const data = jwt.verify(token, 'secret');
                req.user = data.user;
                next();
            }
            catch(error){
                res.status(401).send({errors: 'Please authenticate using valid details'});
            }
        }
    }

// endpoint for registering to the posts
app.post('/addToRegisteredList', fetchuser, async (req, res) => {
    console.log("addToRegisteredList", req.body.postId);
    let userData = await Users.findOne({_id: req.user.id});
    if (!userData.registeredPostsData[req.body.postId]) {
        userData.registeredPostsData[req.body.postId] = true;
    }
    await Users.findOneAndUpdate({_id: req.user.id}, {registeredPostsData: userData.registeredPostsData});
    res.send("Added to registered list");
    console.log(req.body.postId, req.body.eventId, req.body.eventOrganizer);
});

//endpoint to remove post from registered post
app.post('/removeFromRegisteredList', fetchuser, async (req, res) => {
    console.log("removeFromRegisteredList",req.body.postId);
    let userData = await Users.findOne({_id: req.user.id});
    if(userData.registeredPostsData[req.body.postId] = true)
    userData.registeredPostsData[req.body.postId] = userData.registeredPostsData[req.body.postId]-1;
    await Users.findOneAndUpdate({_id: req.user.id}, {registeredPostsData: userData.registeredPostsData});
    res.send("Removed from registered list");
})

//endpoint to get registered posts
app.post('/getRegisteredPosts', fetchuser, async (req, res) => {
    console.log("Get Registered Posts");
    let userData = await Users.findOne({_id: req.user.id});
    res.json(userData.registeredPostsData);
})


const RegisteredUserListSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    srn: {
      type: String,
      required: true,
    },
    school: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    section: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    postId: {
        type: Number,
        required: true,
        },
    eventname: {
        type: String,
        required: true,
        },
    eventorganizer: {
        type: String,
        required: true,
        },
    dateRegistered: {
      type: Date,
      default: Date.now,
    },
  });
  
  const RegisteredUserList = mongoose.model('RegisteredUserList', RegisteredUserListSchema);

  //endpoint to register 
    app.post('/register', async (req, res) => {
        const registeredUser = new RegisteredUserList({
            name: req.body.name,
            srn: req.body.srn,
            school: req.body.school,
            course: req.body.course,
            section: req.body.section,
            email: req.body.email,
            phone: req.body.phone,
            postId: req.body.postId,
            eventname: req.body.eventname,
            eventorganizer: req.body.eventorganizer,

        });
        await registeredUser.save();
        res.json({success:true});
    }
    )


    //endpoint to get the registered users list
    app.get('/registeredUsers', async (req, res) => {
        try {
            const users = await RegisteredUserList.find();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });


    app.listen(port, (error) => {
        if(!error){
            console.log("Server is running on port: " + port);
        }
        else{
            console.log("Error: " + error);
        }   
    }   
    );