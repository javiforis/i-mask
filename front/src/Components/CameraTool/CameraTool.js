import React, { useState, useContext } from 'react';
import { useForm } from '../../Hooks/useForm';
import { Fetch } from '../../Hooks/useFetch';
import { useRedirect } from '../../Hooks/useRedirect';
import { useValidator } from '../../Hooks/useValidator';
import { LoginContext } from '../../Contexts/LoginContext';
import LoginCss from './Login.module.css';




function uploadImage() {
    const ref = firebase.storage().ref();
    const file = document.querySelector("#photo").files[0];
    const name = +new Date() + "-" + file.name;
    const metadata = {
      contentType: file.type
    };
    const task = ref.child(name).put(file, metadata);
    task
      .then(snapshot => snapshot.ref.getDownloadURL())
      .then(url => {
        console.log(url);
        document.querySelector("#image").src = url;
      })
      .catch(console.error);
  }


<input type="file" id="photo" />
    <button onclick="uploadImage()">Upload Image</button>