import React from "react";
import "./Input.css"



const ImageLinkForm = ({onInputChange, onSubmit}) => {
    return (
        <div className="ma4 mt0">
            <p className="f3">
                {"This Magic Brain Will Detect Faces in your picture"}
            </p>
            <div className="center">
                <div className=" center form  pa4 br3 shadow-3">
                    <input className="fa4 pa2 w-70 center" type="text"  onChange={onInputChange} />
                    <button className="w-30 grow f4 link pv2 dib white bg-light-purple " onClick={onSubmit}>Detect</button>
                </div>
            </div>
        </div>
    )
}


export default ImageLinkForm