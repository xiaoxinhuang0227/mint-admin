
import * as THREE from 'three';
// 引入扩展库OrbitControls.js
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
export const initHelper = ({ scene, camera, mesh, renderer, light, lightType}) => {
  initGUI({ mesh });
  setAxesHelper({ scene });
  setCameraHelper({ scene, camera, renderer });
  setLightHelper({ scene, light, lightType });
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
  // const obj = {
  //   color: mesh.material.color,
  // };
  // meshFolder.addColor(obj, 'color').name('材质颜色').onChange(function(value){
  //   mesh.material.color.set(value);
  // });
}

export const setCameraHelper = ({ scene, camera, renderer }) => {
  // 设置相机控件轨道控制器OrbitControls
  const controls = new OrbitControls(camera, renderer.domElement);
  console.log(controls)
  // 设置透视相机的缩放范围
  controls.minDistance = 2; // 最小距离
  controls.maxDistance = 20; // 最大距离

  // 设置正交相机的缩放范围
  controls.minZoom = 0.5; // 最小缩放级别
  controls.maxZoom = 4;   // 最大缩放级别

  // 上下旋转范围
  controls.minPolarAngle = 0;//默认值0
  controls.maxPolarAngle = Math.PI / 2;//默认值Math.PI

  // 左右旋转范围
  controls.minAzimuthAngle = -Math.PI / 2;
  controls.maxAzimuthAngle = Math.PI / 4;

  // 更新控制器
  controls.update();
  // 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
  controls.addEventListener('change', () => {
    // 浏览器控制台查看相机位置变化
    // cameraPosition.value = camera.position;
    // console.log('cameraPosition', cameraPosition.value);
    renderer.render(scene, camera); //执行渲染操作
  });//监听鼠标、键盘事件
}

const setAxesHelper = ({ scene }) => {
  // AxesHelper：辅助观察的坐标系，参数表示坐标系坐标轴线段尺寸大小，你可以根据需要改变尺寸
  const axesHelper = new THREE.AxesHelper(500);
  scene.add(axesHelper);
}