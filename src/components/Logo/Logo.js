import React from "react";
import Tilt from 'react-parallax-tilt';
import "./Logo.css"
import brain from "./artificial-intelligence.png"


const Logo = () => {
    return (
        <div className="ma4 mt0">
            <Tilt className="Tilt br2 shadow-2" options={{max: 35}} style={{height:250 ,width:250}}>
                {/* <div style={{ height: '300px', backgroundColor: 'darkgreen' }}>
                    <h1>React Parallax Tilt </h1>
                </div> */}
                <div className="Tilt-inner pa3">
                 <img style={{height:"200px", width:"200px"}} src={brain} alt="logo"  />
                </div>
            </Tilt>
        </div>
    )
}


export default Logo