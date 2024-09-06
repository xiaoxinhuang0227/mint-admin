<script setup>
import { onMounted, ref } from 'vue';
import * as THREE from 'three';
// 引入扩展库OrbitControls.js
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
// 引入扩展库GLTFLoader.js
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import threeGuide from './components/threeGuide.vue';

const cameraPosition = ref();

onMounted(() => {
  initWebgl({
    // 定义相机输出画布的尺寸(单位:像素px)
    canvas: { width: 800, height: 500 },
    mesh: { meshPosition: { x: 0, y: 0, z: 0}, meshSize: { length: 100, width: 100, height: 100 } },
    lightPosition: { x: 200, y: 200, z: 200 },
    cameraPosition: { x: 200, y: 300, z: 300 },
  });
})

const initWebgl = ({ 
  canvas: { width, height },
  mesh: { meshPosition, meshSize },
  lightPosition,
  cameraPosition,
  needHelper = true
}) => {
  // 创建3D场景对象Scene
  const scene = new THREE.Scene();

  const mesh = initMesh({
    position: meshPosition,
    size: meshSize
  });


  scene.add(mesh);
  
  const pointLight = initLight({ scene, position: lightPosition });

  const camera = initCamera({
    width,
    height,
    position: cameraPosition,
    targetPosition: mesh.position
  });
  
  const renderer = initRender({ scene, camera, canvas: { width, height } });
  
  needHelper && initHelper({ scene, camera, mesh, pointLight, renderer });
}

const initHelper = ({ scene, camera, mesh, renderer, pointLight}) => {
  initGUI({ mesh });
  setAxesHelper({ scene });
  setCameraHelper({ scene, camera, renderer });

  // 光源辅助观察
  const pointLightHelper = new THREE.PointLightHelper(pointLight, 10);
  scene.add(pointLightHelper);
}

const initRender = ({ scene, camera, canvas: { width, height }, bgColor = 0x444444 }) => {
  // 创建渲染器对象
  const renderer = new THREE.WebGLRenderer();

  // 获取你屏幕对应的设备像素比.devicePixelRatio告诉threejs,以免渲染模糊问题
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(bgColor, 1); //设置背景颜色

  renderer.setSize(width, height); //设置three.js渲染区域的尺寸(像素px)
  function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera); //执行渲染操作，可理解为相机按下快门的操作
  }
  animate();

  // renderer.domElement获得Canvas画布，添加到页面上
  document.getElementById('webgl').appendChild(renderer.domElement);

  return renderer;
}

const initMesh = ({ color = 0x00ffff, opacity = 0.5, transparent = true, size,  position }) => {
  const { length, width, height } = size;
  const { x, y, z } = position;
  //创建一个长方体几何对象Geometry
  const geometry = new THREE.BoxGeometry(length, width, height); 

  //创建一个材质对象Material
  const material = new THREE.MeshBasicMaterial({
    color,
    transparent,//开启透明
    opacity,//设置透明度
  }); 

  // 两个参数分别为几何体geometry、材质material
  const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
  // 设置模型mesh的xyz坐标
  mesh.position.set(x, y, z);

  return mesh;
}

const initLight = ({ scene, position: { x = 0, y = 0, z = 0} }) => {
  const pointLight = new THREE.PointLight(0xffffff, 1.0);
  //点光源位置
  pointLight.position.set(x, y, z);//点光源放在x轴上
  // 光源添加到场景
  scene.add(pointLight);

  return pointLight;
}

const initCamera = ({ width, height, position: { x = 0, y = 0, z = 0 }, targetPosition }) => {
  // 30:视场角度, width / height:Canvas画布宽高比, 1:近裁截面, 3000：远裁截面
  const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);

  //相机在Three.js三维坐标系中的位置
  // 根据需要设置相机位置具体值
  camera.position.set(x, y, z); 

  //lookAt相机观察目标，指向mesh对应的位置
  camera.lookAt(targetPosition);

  return camera;
}

const setAxesHelper = ({ scene }) => {
  // AxesHelper：辅助观察的坐标系，参数表示坐标系坐标轴线段尺寸大小，你可以根据需要改变尺寸
  const axesHelper = new THREE.AxesHelper(150);
  scene.add(axesHelper);
}
const setCameraHelper = ({ scene, camera, renderer }) => {
  // 设置相机控件轨道控制器OrbitControls
  const controls = new OrbitControls(camera, renderer.domElement);
  // 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
  controls.addEventListener('change', () => {
    // 浏览器控制台查看相机位置变化
    cameraPosition.value = camera.position;
    // console.log('cameraPosition', cameraPosition.value);
    renderer.render(scene, camera); //执行渲染操作
  });//监听鼠标、键盘事件
}

const initGUI = ({ mesh }) => {
  const gui = new GUI();
  //改变交互界面style属性
  gui.domElement.style.right = '0px';
  gui.domElement.style.width = '300px';

  const obj = {
    color:0x00ffff,
  };

  // gui界面上增加交互界面，改变obj对应属性
  gui.add(mesh.position, 'x', 0, 100).name('x坐标');
  gui.add(mesh.position, 'y', 0, 50).name('y坐标');
  gui.add(mesh.position, 'z', 0, 60).name('z坐标');
  gui.addColor(obj, 'color').name('材质颜色').onChange(function(value){
    mesh.material.color.set(value);
  });
}
</script>

<template>
  <div class="page-3D">
    <div id="webgl"></div>
    <p>cameraPosition：{{ cameraPosition }}</p>
    <threeGuide></threeGuide>
  </div>
</template>

<style lang="scss" scoped>
</style>