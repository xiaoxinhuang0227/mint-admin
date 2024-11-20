import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
export const initHelper = ({ 
  scene, 
  camera, 
  mesh, 
  light, 
  lightType, 
  config = {
    enableGUI: true,
    enableAxesHelper: true,
    enableCameraHelper: true,
    enableLightHelper: true
  }
}) => {
  // 根据配置决定是否启用各个 helper
  if (config.enableGUI && mesh) {
    initGUI({ mesh });
  }
  if (config.enableAxesHelper) {
    setAxesHelper({ scene });
  }
  if (config.enableCameraHelper) {
    setCameraHelper({ scene, camera });
  }
  if (config.enableLightHelper && light) {
    setLightHelper({ scene, light, lightType });
  }
}

export const setLightHelper = ({ scene, light, lightType }) => {
  if (lightType === 'AmbientLight') return;
  let lightHelper;
  switch (lightType) {
    case 'PointLight':
      lightHelper = new THREE.PointLightHelper(light, 10);
      break;
    case 'DirectionalLight':
      lightHelper = new THREE.DirectionalLightHelper(light, 10);
      break;
    case 'SpotLight':
      lightHelper = new THREE.SpotLightHelper(light);
      break;
    default:
      break;
  }
  scene.add(lightHelper);
}

export const initGUI = ({ mesh }) => {
  const gui = new GUI();
  //改变交互界面style属性
  gui.domElement.style.left = '184px';
  gui.domElement.style.top = '52px';
  gui.domElement.style.width = '200px';

  const meshFolder = gui.addFolder('参数调试');

  // gui界面上增加交互界面，改变obj对应属性
  meshFolder.add(mesh.position, 'x', 0, 100).name('x坐标');
  meshFolder.add(mesh.position, 'y', 0, 50).name('y坐标');
  meshFolder.add(mesh.position, 'z', 0, 60).name('z坐标');
}

export const setCameraHelper = ({ scene, camera }) => {
  // 仅保留相机辅助对象
  const helper = new THREE.CameraHelper(camera)
  scene.add(helper)
}

const setAxesHelper = ({ scene }) => {
  // AxesHelper：辅助观察的坐标系，参数表示坐标系坐标轴线段尺寸大小，你可以根据需要改变尺寸
  const axesHelper = new THREE.AxesHelper(500);
  scene.add(axesHelper);
}
