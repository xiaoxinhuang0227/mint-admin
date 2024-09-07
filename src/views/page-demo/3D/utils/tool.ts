
import * as THREE from 'three';
export const initCamera = ({ width, height, position: { x = 0, y = 0, z = 0 }, targetPosition }) => {
  // 30:视场角度, width / height:Canvas画布宽高比, 1:近裁截面, 3000：远裁截面
  const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);

  // 相机在Three.js三维坐标系中的位置
  // 根据需要设置相机位置具体值
  camera.position.set(x, y, z); 

  //lookAt相机观察目标，指向mesh对应的位置
  camera.lookAt(targetPosition);

  return camera;
}

export const initLight = ({ scene, position: { x = 0, y = 0, z = 0} }) => {
  const pointLight = new THREE.PointLight(0xffffff, 1.0);
  //点光源位置
  pointLight.position.set(x, y, z);//点光源放在x轴上
  // 光源添加到场景
  scene.add(pointLight);

  return pointLight;
}
