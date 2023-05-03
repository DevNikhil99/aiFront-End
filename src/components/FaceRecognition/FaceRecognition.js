import React from "react";
import "./FaceRecognition.css"




const FaceRecognition= ({ImageUrl, box}) => {
    return (
        <div className="center">  
            <img id="image1" src={ImageUrl} alt="" />
             <div className="bpunding-box" style={{top:box.topRow, right: box.rightCol , bottom: box.bottomRow, left: box.leftCol}}></div>
        </div>
    )
}


export default FaceRecognition 