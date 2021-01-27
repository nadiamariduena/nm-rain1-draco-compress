import React, { Component } from "react";
import * as THREE from "three";
//
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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
    // this.controls.dispose();
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
    //  https://www.geeksforgeeks.org/program-for-volume-and-surface-area-of-frustum-of-cone/

    //
    //
    //
    //----------------                  --------------
    // Set the rotation camera looking UP to the sky
    //----------------                  --------------
    //
    this.camera.position.z = 1;
    //rotation
    this.camera.rotation.x = 1.16;
    this.camera.rotation.y = -0.12;
    this.camera.rotation.z = -0.27;
    //
    //
    this.renderer = new THREE.WebGL1Renderer();
    // ------------------
    // f     FOG
    // ------------------
    //
    this.scene.fog = new THREE.FogExp2(0x1c1c2a, 0.002);
    this.renderer.setClearColor(this.scene.fog.color);
    //
    //
    // this.controls = new OrbitControls(this.camera, this.eleModelBlOne);
    this.renderer.setSize(width, height);
    this.eleModelBlOne.appendChild(this.renderer.domElement); // mount using React ref
  };

  /*

 
  





  */
  // 2
  addCustomSceneObjects = () => {
    //
    //-------- 1* cloudParticles
    this.cloudParticles = [];

    // ------------------
    //      LIGHTS
    // ------------------
    //
    // This light will illuminate all objects of the scene, from all the directions
    const ambient = new THREE.AmbientLight(0x555555);
    this.scene.add(ambient);
    //
    //
    // This light will represent a MOONlight in the sky
    const directionalLight = new THREE.DirectionalLight(0xffeedd); //0x  then the hex color ,ex: ffffff for white
    directionalLight.position.set(0, 0, 0); // it means that it stands totally at the center
    this.scene.add(directionalLight);
    //
    // ----------------
    //   FLASH Lights
    // ---------------
    // add a bluelight 0x062d89 or red ff0000 or purple b600c7
    this.flash = new THREE.PointLight(0xb600c7, 30, 500, 1.7); //1.7 intensity .. 0 is really strong
    //  You will position it BEHIND a cloud
    this.flash.position.set(200, 300, 100);
    // and added it to the scene
    this.scene.add(this.flash);
    //
    //
    // ------------------
    // a     RAIN  ***
    // ------------------
    //
    this.rainCount = 15000;

    //
    // ------------------
    // b     Rain
    // ------------------
    //
    this.rainGeo = new THREE.Geometry();
    for (let i = 0; i < this.rainCount; i++) {
      this.rainDrop = new THREE.Vector3(
        Math.random() * 400 - 200,
        Math.random() * 500 - 250,
        Math.random() * 400 - 200
      );
      //
      // --------------------
      // e     rainAnimation
      // --------------------
      // Here you will add Velocity property to each raindrop

      this.rainDrop.velocity = {};
      this.rainDrop.velocity = 0;
      //
      this.rainGeo.vertices.push(this.rainDrop);
    }

    // ------------------
    // c     CREATE Rain Material
    // ------------------
    //
    this.rainMaterial = new THREE.PointsMaterial({
      color: 0xaaaaaa,
      size: 0.3,
      transparent: true,
    });
    //
    // ------------------
    // d     CREATE Rain Object
    // ------------------

    //
    this.rain = new THREE.Points(this.rainGeo, this.rainMaterial);
    this.scene.add(this.rain);
    //
    //
    // ---------------------------
    //  ***  Texture Loader   ***
    // ---------------------------
    //
    //
    //
    let loader = new THREE.TextureLoader();
    // You can change the image of the cloud and have a different outcome everytime you do it
    loader.load("./images/smoke-1.png", (texture) => {
      this.meshyAnimationVar = texture.scene;
      //
      this.cloudGeo = new THREE.PlaneBufferGeometry(500, 500);
      this.cloudMaterial = new THREE.MeshLambertMaterial({
        map: texture,
        transparent: true,
      });
      //
      //
      // if (model.material) model.material.metalness = 0.08;
      for (let p = 0; p < 25; p++) {
        this.cloud = new THREE.Mesh(this.cloudGeo, this.cloudMaterial);
        this.cloud.position.set(
          Math.random() * 800 - 400,
          500,
          Math.random() * 500 - 450
        );
        //
        this.cloud.rotation.x = 1.16;
        this.cloud.rotation.y = -0.12;
        this.cloud.rotation.z = Math.random() * 360;
        this.cloud.material.opacity = 0.6;
        // ------------------  2* cloudParticles
        // the cloud Particles
        this.cloudParticles.push(this.cloud);
        //-------------------
        //
        this.scene.add(this.cloud);
      }
      //
      this.scene.add(texture.scene);
    });
    //
    //
    //
  };

  /*












  */
  // 3
  startAnimationLoop = () => {
    // ------------------  3* cloudParticles
    // the cloud Particles
    this.cloudParticles.forEach((p) => {
      p.rotation.z -= 0.002;
    });
    // --------------------   ****** rainAnimation LOOP
    //s then in the animate function, we will move each drop and increase the,
    // the velocity to simulate the gravity, also reset the position
    //
    this.rainGeo.vertices.forEach((p) => {
      //
      // also reset the position if they are outside the screen
      p.velocity -= 0.1 + Math.random() * 0.1;

      p.y += p.velocity;
      if (p.y < -200) {
        p.y = 200;
        p.velocity = 0;
      }
    });
    this.rainGeo.verticesNeedUpdate = true;
    // --------------------   ****** rainAnimation LOOP
    //   FOG
    // This rotation here will serve to add some sort of cinematic effect
    this.rain.rotation.y += 0.002;
    //
    //
    //
    // -----------------------
    // ANIMATE the FlashLight
    // -----------------------
    if (Math.random() > 0.93 || this.flash.power > 100) {
      if (this.flash.power < 100)
        this.flash.position.set(
          Math.random() * 400,
          300 + Math.random() * 200,
          100
        );
      this.flash.power = 50 + Math.random() * 500;
    }
    // -----------------------

    this.renderer.render(this.scene, this.camera);
    this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
  };
  /*







  */
  handleWindowResize = () => {
    const width = this.eleModelBlOne.clientWidth;
    const height = this.eleModelBlOne.clientHeight;
    // updated renderer
    this.renderer.setSize(width, height);
    //
    // updated **camera** aspect ratio
    this.camera.aspect = width / height;
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
