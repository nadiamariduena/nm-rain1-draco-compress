```javascript
import React, { Component } from "react";
//  ADD THIS inside the SCENE SETUP
//
import * as THREE from "three";
//
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
//
//

const style = {
  height: 600, // we can control scene size by setting container dimensions
};
//

//
//
class TropicalVoid extends Component {
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

export default TropicalVoid;
```
