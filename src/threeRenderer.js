import React from "react";
import * as THREE from "three";
import mainTexture from "./default.jpg";

import * as AR from "jsartoolkit5";
import cameraData from "./camera_para-iPhone.dat";
import patternData from "./patt.hiro";

class ThreeRenderer extends React.Component {
  constructor(props) {
    super(props);
    this.renderer = null;
    this.canvas = null;
  }

  componentDidMount() {
    AR.ARController.getUserMediaThreeScene({
      maxARVideoSize: 320,
      cameraParam: cameraData,
      onSuccess: (arScene, arController, arCamera) => {
        const renderer = (this.renderer = new THREE.WebGLRenderer({
          canvas: this.canvas
        }));
        const w =
          window.innerWidth /
          arController.videoHeight *
          arController.videoWidth;
        const h = window.innerWidth;
        renderer.setSize(w, h);

        var sphere = new THREE.Mesh(
          new THREE.SphereGeometry(0.5, 8, 8),
          new THREE.MeshNormalMaterial()
        );
        sphere.material.shading = THREE.FlatShading;
        sphere.position.z = 0.5;

        arController.loadMarker(patternData, markerId => {
          var markerRoot = arController.createThreeMarker(markerId);
          markerRoot.add(sphere);
          //arScene.scene.add(sphere);
          arScene.scene.add(markerRoot);
        });

        var tick = function() {
          arScene.process();

          arScene.renderOn(renderer);
          requestAnimationFrame(tick);
        };
        tick();
      }
    });
  }
  /*
  componentDidMount() {
    if (window.ARController && AR.ARController.getUserMediaThreeScene) {
      //ARThreeOnLoad();
      console.log("ARController ready");
    }

    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x222222);

    const renderer = (this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas
    }));
    renderer.setSize(width, height);
    renderer.setClearColor(0xffffff, 1.0);

    const camera = new THREE.Camera();
    //scene

    //const texture = new THREE.Texture(mainTexture);
    const texture = new THREE.TextureLoader().load(mainTexture);

    const geometryy = new THREE.PlaneGeometry(1, 1, 1);

    const materiall = new THREE.MeshBasicMaterial({
      map: texture,
      opacity: 100,
      side: THREE.DoubleSide,
      transparent: false
    });

    const mesh = new THREE.Mesh(geometryy, materiall);

    scene.add(mesh);

    // Anim
    const animate = function() {
      requestAnimationFrame(animate);

      const f1 = Date.now() / 1000;
      //mesh.rotation.x = Math.sin(f1);
      //mesh.rotation.y = Math.cos(f1);

      renderer.render(scene, camera);
    };

    animate();
  }
  */

  componentWillUnmount() {
    //this.renderer.dispose();
  }

  storeRef = node => {
    this.canvas = node;
  };

  render() {
    return <canvas id="three" ref={this.storeRef} />;
  }
}

export default ThreeRenderer;
