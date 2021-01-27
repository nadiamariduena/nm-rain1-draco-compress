### FIRST RAIN ATTEMPT

<br>
<br>
<br>

# Basic Boilerplate

<br>

```javascript
import React, { Component } from "react";
import * as THREE from "three";
//
//
// the size of the scene (the black square)
const style = {
  height: 600, // we can control scene size by setting container dimensions
};
//
//
class RainTest1 extends Component {
  componentDidMount() {}
  /*






  */
  componentWillUnmount() {}
  /*






  */
  // 1
  sceneSetup = () => {};

  /*






  */
  // 2
  addCustomSceneObjects = () => {};
  /*






  */
  // 3
  startAnimationLoop = () => {};
  /*






  */
  render() {
    return (
      <div className="scene-oblivion">
        <div
          className="modelBleOne"
          style={style}
          ref={(ref) => (this.eleModelBlOne = ref)}
        ></div>
      </div>
    );
  }
}

export default RainTest1;
```

<br>
<br>
<br>

# 🍨

## BUILDING THE SCENE

#### But what is Frustum?

- In geometry, a frustum (plural: frusta or frustums) is the portion of a solid (normally
  a cone or pyramid) that lies between one or two parallel
  planes cutting it. A right frustum is a parallel truncation of a
  right pyramid or right cone.

  <br>

[VISUALIZATION: surface-area-of-frustum-of-cone](https://www.geeksforgeeks.org/program-for-volume-and-surface-area-of-frustum-of-cone/)

##### Example:

- The right circular cone after being cut by a plane parallel to its base results in a frustum as follows:

[<img src="./src/images/frustum.jpg"/>]()

> which has a circular base at bottom of radius **R**

> circular upper portion with radius **r**

> height **h**

> and slant height **l**

<br>

```javascript
import React, { Component } from "react";
//  ADD THIS inside the SCENE SETUP
//
import * as THREE from "three";
//
//
//

const style = {
  height: 600, // we can control scene size by setting container dimensions
};
//

//
//
class TropicalVoid extends Component {
  componentDidMount() {
    this.sceneSetup();
    this.addCustomSceneObjects();
    this.startAnimationLoop();

    //
    window.addEventListener("resize", this.handleWindowResize);
  }
  //
  //
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
    window.cancelAnimationFrame(this.requestID);
    this.controls.dispose();
  }
  /*






  */
  // 1
  sceneSetup = () => {
    const width = this.eleModelBlOne.clientWidth;
    const height = this.eleModelBlOne.clientHeight;
    //
    //
    //
    this.scene = new THREE.Scene();
    //
    //
    this.camera = new THREE.PerspectiveCamera(
      // 60 degrees field of View
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    // using current viewport aspect ratio ( window.innerWidth / window.innerHeight),
    // 1, near plane
    //   1000 unit viewing frustum
    /*
    
    In geometry, a frustum (plural: frusta or frustums) is the portion of a solid (normally 
        a cone or pyramid) that lies between one or two parallel 
    planes cutting it. A right frustum is a parallel truncation of a 
    right pyramid or right cone.
    
    https://www.geeksforgeeks.org/program-for-volume-and-surface-area-of-frustum-of-cone/
    */
    //
    //----------------
    // Set the rotation camera looking UP to the sky
    //
    this.camera.position.z = 1;
    //
    this.camera.rotation.x = 1.16;
    this.camera.rotation.y = -0.12;
    this.camera.rotation.z = -0.27;
    //

    //
    this.renderer = new THREE.WebGL1Renderer();
    this.renderer.setSize(width, height);
    this.eleModelBlOne.appendChild(this.renderer.domElement); // mount using React ref
  };

  /*






  */
  // 2
  addCustomSceneObjects = () => {
    // ------------------
    //      LIGHTS
    // ------------------
    //
    //
    // a
    // This light will illuminate all objects of the scene, from all the directions
    const ambient = new THREE.AmbientLight(0x555555);
    this.scene.add(ambient);
    //
    //
    //
    //
    //
    // b This light will represent a MOONlight in the sky
    const directionalLight = new THREE.DirectionalLight(0xffeedd); //0x  then the hex color ,ex: ffffff for white
    directionalLight.position.set(0, 0, 0); // it means that it stands totally at the center
    this.scene.add(directionalLight);
    //
  };
  /*






  */
  // 3
  startAnimationLoop = () => {};
  /*






  */
  handleWindowResize = () => {
    const width = this.eleModelBlOne.clientWidth;
    const height = this.eleModelBlOne.clientHeight;

    //
    //
    // updated renderer
    this.renderer.setSize(width, height);
    //
    // updated **camera** aspect ratio
    this.camera.aspect = width / height;
    //
    //
    // That is the Three.js optimization: you can group multiple camera changes into a block with only one
    this.camera.updateProjectionMatrix();
  };
  /*






  */
  render() {
    return (
      <div className="scene-oblivion">
        <div
          className="modelBleOne"
          style={style}
          ref={(ref) => (this.eleModelBlOne = ref)}
        ></div>
      </div>
    );
  }
}

export default TropicalVoid;
```

##### How it should look like:

[<img src="./src/images/black_scene.jpg"/>]()

<br>
<br>
<br>

# 🍨 CLOUDS

### After the scene is ready, start by adding some clouds

#### But before...

- Lets get rid of the Orbitscontrol so to have a better view of the process

[<img src="./src/images/with-and-without-orbitControls.gif"/>]()

<br>
<br>
<br>

# 👾

#### SET UP THE **TEXTURE loader**

<br>

```javascript
let loader = new THREE.TextureLoader();
//1 adding the callback function
loader.load("./images/img-cloud2.png", (texture) => {
  //
  //2 Here below: we will create a geometry for each cloud
  //   500 units plane square

  this.cloudGeo = new THREE.PlaneBufferGeometry(500, 500);
  //3   Then create a Material and a map it with  a texture: (texture) => {
  this.cloudMaterial = new THREE.MeshLambertMaterial({
    map: texture,
    transparent: true,
  });
  //
  //
  //
  // 4 Create a Loop, to randomly add each cloud to the SCENE
  for (let p = 0; p < 25; p++) {
    //
    // 5 First create a cloud OBJ from the geometry and material (above: in step2)
    this.cloud = new THREE.Mesh(this.cloudGeo, this.cloudMaterial);
    // 6 Then randomly SET the position
    this.cloud.position.set(
      Math.random() * 800 - 400,
      500,
      Math.random() * 500 - 450
    );
    //
    // 7 I will set the cloud rotation angle to FACE the camera
    //
    this.cloud.rotation.x = 1.16;
    this.cloud.rotation.y = -0.12;
    //
    // 8 also add random around the Z-axis
    this.cloud.rotation.z = Math.random() * 360;
    // 9 add opacity
    this.cloud.material.opacity = 0.6;
    //
    //
    this.scene.add(this.cloud);
  }

  this.scene.add(texture.scene);
});
```

<br>

##### the code:

[check the whole code](./src/docs/CLOUDSETUP.md)

<br>
<hr>
<br>

# 🍦

<br>

# ANIMATING THE Scene

<br>

##### Add the following on the top of the scene (just above the first function)

- **cloudParticles** This is keeping a reference to each cloud in the array

```javascript
// let cloudParticles = [];
// // this.cloudParticles = [];
// //
// // above this:
// class TropicalVoid extends Component {
this.cloudParticles = [];
//  I Inlcuded the cloudParticles inside the addCustomSceneObjects = () => { because on top of the file it dodnt work
```

<br>

### Now add the cloudParticles to the function animation

```javascript
// this.cloud.material.opacity = 0.6;
this.cloudParticles.push(this.cloud);
// this.scene.add(this.cloud);
```

<br>

#### THEN in the animate function, use the Array to rotate them one by one

```javascript
startAnimationLoop = () => {
  this.cloudParticles.forEach((p) => {
    //   Here  ...
  });

  //
  //
  //

  this.renderer.render(this.scene, this.camera);
  this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
};
```

<br>

```javascript
startAnimationLoop = () => {
  this.cloudParticles.forEach((p) => {
    p.rotation.z -= 0.002;
  });

  // this.cube.rotation.x += 0.01;
  // this.cube.rotation.y += 0.01;
  //
  //
  //
  // You need the following 2 lines to launch the animation
  this.renderer.render(this.scene, this.camera);
  this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
};
```

[<img src="./src/images/rotation-animation1_basic-setup.gif"/>]()

<br>
<br>
<br>

# 🚀 🚀 🚀

<br>

### FLASHLIGHTS

- 1 Set up a **point Light with Blue Color**

- 2 You will **position it BEHIND a cloud**

- 3 And **add it to the Scene**

```javascript
// ----------------
//   FLASH Lights
// ---------------
// add a bluelight 0x062d89 or red ff0000 or purple b600c7
this.flash = new THREE.PointLight(0xb600c7, 30, 500, 1.7);
//  You will position it BEHIND a cloud
this.flash.position.set(200, 300, 100);
// and added it to the scene
this.scene.add(this.flash);
```

##### RESULT

[<img src="./src/images/rotation-animation2_basic-setup.gif"/>]()

<br>
<br>
<br>

### 🔥🔥🔥

## ANIMATE the FlashLight
