import './App.css';
import "tachyons";
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg'
import React, { Component } from 'react';

const app = new Clarifai.App({
  apiKey: "2cf89661d1ff40549191db16ba89d17b"
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      route: "signin",
      isSignedIn: false,
      user:{
        id:"",
        name:"",
        password:"",
        email:"",
        entries:0,
        joined:""
    }

    }
  }
  

 loadUser = (user)=>{
  this.setState({
    user:{
      id:user.id,
        name:user.name,
        password:user.password,
        email:user.email,
        entries:user.entries,
        joined:user.joined
    }
  })
 }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("image1");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)

    }

  }

  displayFaceBox = (box) => {
    this.setState({ box: box })
  }
  onInputChange = (e) => {
    this.setState({ input: e.target.value })

  }

  onBtnSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
      .then(res=>{
        if(res){
          fetch("http://localhost:3005",{
            method:"put",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({
              id: this.state.user.id 
            })
          })
        }
      })
      .then(resp=>resp.JSON())
      .then(count=>{
        this.setState(Object.assign(this.state.user, {entries:count}))
      })
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response))
        .then(console.log("hey api"))
        .catch(err => console.log(err))
      );
  }

  onRouteChange = (route) => {
    if(route==="signout"){
      this.setState({isSignedIn: false})
    }else if(route==="home"){
      this.setState({ isSignedIn : true})
    }
    this.setState({route: route})
  }


  render() {
   const {isSignedIn , imageUrl, route, box} =this.state
    return (
      <div className="App">
        <ParticlesBg type="cobweb" bg={true} />
        <Navigation isSignedIn={isSignedIn}  onRouteChange={this.onRouteChange} />
        { route === "home" ?
          <>
            <Logo />
            <Rank />
            <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onBtnSubmit} />
            <FaceRecognition box={box} ImageUrl={imageUrl} />
          </>
          :(
            this.state.route ==="signin"?
            <SignIn onRouteChange={this.onRouteChange} />
            : <Register loadUser ={this.loadUser} onRouteChange={this.onRouteChange}  />
          )
        }
      </div>
    );
  }
}

export default App
