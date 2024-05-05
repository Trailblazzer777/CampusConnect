import React, { createContext, useEffect, useState } from "react";

export const PostContext = createContext(null);

const PostContextProvider = (props) => {
//1
  const [posts, setPosts] = useState([]);

  
  const getDefaultregistered = () => {
    let registeredList = {};
    for (let i = 0; i < 300; i++) {
        registeredList[i] = false;
    }
    return registeredList;
  };
//2
  const [registeredPosts, setRegisteredPosts] = useState(getDefaultregistered());

  useEffect(() => {
    fetch('http://localhost:4001/allposts') 
          .then((res) => res.json()) 
          .then((data) => setPosts(data))

    if(localStorage.getItem("auth-token"))
    {
      fetch('http://localhost:4001/getRegisteredPosts', {
      method: 'POST',
      headers: {
        Accept:'application/form-data',
        'auth-token':`${localStorage.getItem("auth-token")}`,
        'Content-Type':'application/json',
      },
      body: JSON.stringify(),
    })
      .then((resp) => resp.json())
      .then((data) => {setRegisteredPosts(data)});
    }

}, [])

  

const addToRegisteredList = (postId) => {
  setRegisteredPosts((prev) => {
    if (!prev[postId]) {
      return { ...prev,  [postId]: prev[postId] = true };
    } else {
      return prev;
    }
  });
  console.log(registeredPosts);
  if(localStorage.getItem("auth-token")) {
    fetch('http://localhost:4001/addToRegisteredList', {
      method: 'POST',
      headers: {
        Accept:'application/form-data',
        'auth-token':`${localStorage.getItem("auth-token")}`,
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        "postId": postId
      }),
    })
    .then((resp) => resp.json())
    .then((data) => {console.log(data)});
  }
};

  const removeFromRegisteredList = (postId) => {
    setRegisteredPosts((prev) => ({ ...prev, [postId]: prev[postId] = false}));
    if(localStorage.getItem("auth-token"))
    {
      fetch('http://localhost:4001/removeFromRegisteredList', {
      method: 'POST',
      headers: {
        Accept:'application/form-data',
        'auth-token':`${localStorage.getItem("auth-token")}`,
        'Content-Type':'application/json',
      },
      body: JSON.stringify({"postId":postId}),
    })
      .then((resp) => resp.json())
      .then((data) => {console.log(data)});
    }
  };

  

  const contextValue = {posts,  registeredPosts, addToRegisteredList, removeFromRegisteredList};
  return (
    <PostContext.Provider value={contextValue}>
      {props.children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;


//addToCart,getTotalCartItems,  removeFromCart, getTotalCartAmount