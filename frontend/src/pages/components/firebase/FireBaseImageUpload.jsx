import React, { useState } from "react";
import { imageDB } from "./FireBaseConfig.jsx";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

function FireBaseImageUpload(){
    const [img, setImg] = useState("");

    const handleClick = () =>{
        const imgRef = ref(imageDB, 'files/$v4()')
        uploadBytes(imgRef, img)
    }
    return(
        <>
        </>
    );
}

export default FireBaseImageUpload;