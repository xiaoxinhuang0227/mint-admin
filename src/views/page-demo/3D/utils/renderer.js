import * as THREE from 'three';
import { getCanvasSize } from './tool';

export const initRenderer = ({ scene, camera, canvas: { width, height }, bgColor = 0x000000, meshRes }) => {
  const renderer = new THREE.WebGLRenderer({
    preserveDrawingBuffer: true,
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(bgColor, 1);
  renderer.setSize(width, height);

  const ball = meshRes[3];
  const animate = () => {
    requestAnimationFrame(animate);
    ball.rotation.y += 0.01;
    renderer.render(scene, camera);
  }
  animate();

  document.getElementById('webgl').appendChild(renderer.domElement);

  handleResize(renderer, camera);

  return renderer;
}

const handleResize = (renderer, camera) => {
  window.onresize = () => {
    const { width, height } = getCanvasSize();
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
} 