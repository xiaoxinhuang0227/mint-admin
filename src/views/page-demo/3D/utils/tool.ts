import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

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

export const initLight = ({ scene, lightType, position: { x = 0, y = 0, z = 0} }) => {
  const light = choseLight({ lightType });
  //点光源位置
  light.position.set(x, y, z);//点光源放在x轴上
  // 光源添加到场景
  scene.add(light);

  return light;
}

export const choseLight = ({ lightType, lightConf = { color: 0xffffff, intensity: 1 } }) => {
  const { color, intensity } = lightConf;
  let light;
  switch (lightType) {
    case 'PointLight':
      // 点光源
      light = new THREE.PointLight(color, intensity);
      break;
    case 'DirectionalLight':
      // 平行光
      light = new THREE.DirectionalLight(color, intensity);
      break;
    case 'SpotLight':
      // 聚光灯
      light = new THREE.SpotLight(color, intensity);
      break;
    default:
      // 环境光 AmbientLight
      light = new THREE.AmbientLight(color, intensity);
      break;
  }
  return light;
}

export const downloadCanvas = ({ renderer, fileName = '3D' }) => {
  // 创建一个超链接元素，用来下载保存数据的文件
  const link = document.createElement('a');
  // 通过超链接herf属性，设置要保存到文件中的数据
  const canvas = renderer.domElement; //获取canvas对象
  // 通过超链接herf属性，设置要保存到文件中的数据
  link.href = canvas.toDataURL("image/png");
  link.download = `${ fileName }.png`; //下载文件名
  link.click(); //js代码触发超链接元素a的鼠标点击事件，开始下载文件到本地
}

export const getBox3 = ({ mesh}) => {
  const box3 = new THREE.Box3();
  box3.expandByObject(mesh); // 计算模型包围盒
  console.log('查看包围盒',box3);
}

export const getCanvasSize = () => {
  return {
    width: window.innerWidth - 183,  // 减去侧边栏宽度
    height: 500
  }
}

export const initControls = ({ 
  camera, 
  renderer, 
  target,
  limit = {}, 
  enableDamping = true 
}) => {
  const controls = new OrbitControls(camera, renderer.domElement)
  
  // 设置控制器的目标点
  controls.target.copy(target)
  
  // 启用阻尼效果
  controls.enableDamping = enableDamping
  controls.dampingFactor = 0.05
  
  // 设置旋转限制
  if (limit.minPolarAngle !== undefined) controls.minPolarAngle = limit.minPolarAngle
  if (limit.maxPolarAngle !== undefined) controls.maxPolarAngle = limit.maxPolarAngle
  if (limit.minAzimuthAngle !== undefined) controls.minAzimuthAngle = limit.minAzimuthAngle
  if (limit.maxAzimuthAngle !== undefined) controls.maxAzimuthAngle = limit.maxAzimuthAngle
  
  // 设置缩放限制
  controls.enableZoom = true  // 启用缩放
  controls.minDistance = 2    // 最小缩放距离
  controls.maxDistance = 10   // 最大缩放距离
  
  // 禁用平移
  controls.enablePan = false
  
  controls.update()
  return controls
}
