import React from "react";
import * as THREE from "three";
import mainTexture from "./default.jpg";

class ThreeRenderer extends React.Component {
  componentDidMount() {
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

  componentWillUnmount() {
    this.renderer.dispose();
  }

  storeRef = node => {
    this.canvas = node;
  };

  render() {
    return <canvas id="three" ref={this.storeRef} />;
  }
}

export default ThreeRenderer;
