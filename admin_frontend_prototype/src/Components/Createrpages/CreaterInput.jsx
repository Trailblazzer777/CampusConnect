import React, {useState} from 'react'
import './CreaterInput.css'
import upload_area from "../../Components/Assets/upload_area.svg"


function CreaterInput() {

    const[image,setImage] = useState(false);
    //state variable for uploading the Post details
    const [postDetails, setPostDetails] = useState({ 
        eventname: "",
        image: "",
        eventinfo: "",
        eventstime: "",
        eventetime: "",
        eventdate: "",
        eventvenue: "",
        eventorganizer: "",
        eventdescription: "",
        eventapproval: true   
    })

    //function to handle the post details
    const changeHandler = (e) => {
        setPostDetails({...postDetails, [e.target.name]: e.target.value})
    }

    const AddPost = async()=>{
        console.log(postDetails);
        let responseData;
        let post = postDetails;

        let formData = new FormData();
        formData.append('post',image);

        await fetch('http://localhost:4001/upload',{
            method:'POST',
            headers:{
                Accept:'application/json',
            },
            body:formData,
        }).then((resp)=> resp.json()).then((data)=>{responseData=data});

        if(responseData.success){
           post.image = responseData.image_url;
           await fetch('http://localhost:4001/createpost',{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify(post),
           }).then((resp)=>resp.json()).then((data)=>{
            data.success?alert("Post Created"):alert("Failed")
           })
        }
    }





    //function to handle the image upload
    const imageHandler = (e) => {
        setImage(e.target.files[0]);
        }

       
  return (
    <div className='createri-container'>
    <div className='createri-container-head'>
        <div className="createri-header">
            <h1>Event Details</h1>
        </div>
            <form onSubmit={(e) => {
            e.preventDefault();
            AddPost();
            }}>
        <div className="createri-body">
            <div className="createri-body-head">
                <div className="createri-head1-img" >
                    <label for="file-input">
                            <img className="addproduct-thumbnail-img" src={!image?upload_area:URL.createObjectURL(image)} alt="" />
                            </label>
                            <input onChange={(e)=>{imageHandler(e)}} type="file" name="image" id="file-input" hidden />
               
                </div>
                <div className="createri-head1-text">
                   <label>Enter host details</label>
                   <select value={postDetails.eventorganizer} onChange={changeHandler} name='eventorganizer' placeholder='Type here' required>
                    <option>Devtrack</option>
                    <option>Facit</option>
                    <option>Face</option>
                    <option>Force</option>
                   </select>
                </div>
            </div>
            <div className="createri-body1-content">
                <div className="createri-body-info">
                   <label>Event name input</label>
                   <input value={postDetails.eventname} onChange={changeHandler} type="text" id="event-name" name="eventname" placeholder="Type your event name..." required></input>
                   <hr></hr>
                   <label>Event info</label> 
                   <textarea value={postDetails.eventinfo}onChange={changeHandler} type="textarea" name='eventinfo' placeholder='Type here' required></textarea>
                </div>
                <div className="createri-date-time">
                    <div className='createri-time'>
                    <label>Select date and time</label>
                    <h3>From:</h3>
                    <input value={postDetails.eventstime} onChange={changeHandler} type="text" id="event-time" name="eventstime" placeholder='HH:TT' required></input>
                    <h3>To:</h3>
                    <input value={postDetails.eventetime} onChange={changeHandler} type="text" id="event-time" name="eventetime" placeholder='HH:TT' required></input>
                    </div>
                    <div className='createri-date'>
                        <label>Select Date</label>
                    <input value={postDetails.eventdate} onChange={changeHandler} type="text" id="event-date" name="eventdate" placeholder='dd-mm-yyyy' required></input>
                    </div>
                </div>
                <div className="createri-location">
                    <label>Location input</label>
                    <input value={postDetails.eventvenue} onChange={changeHandler} type="text" id="location" name="eventvenue" placeholder="Type your location..." required></input>
                </div>
                <div className="createri-registeration">
                    <h2>Registeration</h2>
                    <select value={postDetails.eventapproval} onChange={changeHandler} name='eventapproval'>
                        <option value="true">Not Required</option>
                        <option value="false">Required</option>
                    </select>
                </div>
                <div className="createri-event-description">
                    <label>discription input</label>
                    <textarea value={postDetails.eventdescription} onChange={changeHandler} type="textarea" name='eventdescription' placeholder='Type here' required></textarea>
                </div>
                <div className='createri-event-button'>
                    <button ><h2>Create</h2></button>
                </div>
            </div>
        </div>
        </form>
    </div>
 
</div>
  )
}

export default CreaterInput