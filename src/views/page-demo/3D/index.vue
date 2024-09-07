<script setup>
import { onMounted, ref } from 'vue';
import * as THREE from 'three';
// 引入扩展库GLTFLoader.js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import threeGuide from './components/threeGuide.vue';
import { initHelper } from './utils/helper';
import { initCamera, initLight } from './utils/tool';
const cameraPosition = ref(null);

onMounted(() => {
  initWebgl({
    // 定义相机输出画布的尺寸(单位:像素px)
    canvas: { width: 800, height: 500 },
    mesh: { meshPosition: { x: 50, y: 50, z: 50}, meshSize: { length: 100, width: 100, height: 100 } },
    lightPosition: { x: 200, y: 200, z: 200 },
    cameraPosition: { x: 500, y: 500, z: 1000 },
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
    size: meshSize,
    scene
  });
  initPoints({ scene });
  
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

const initRender = ({ scene, camera, canvas: { width, height }, bgColor = 0x000000 }) => {
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

const initMesh = ({ scene, color = 0x00ffff, opacity = 0.5, transparent = true, size,  position }) => {
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

  scene.add(mesh);
  return mesh;
}

const initPoints = ({ scene }) => {
  //创建一个空的几何体对象
  const geometry = new THREE.BufferGeometry(); 

  //类型化数组创建顶点数据
  const vertices = new Float32Array([
      0, 0, 0,
      100, 0, 0,
      100, 100, 0,
      100, 100, 100,
      0, 100, 0,
      0, 100, 100,
      0, 0, 100,
      100, 0, 100,
  ]);

  // 创建属性缓冲区对象
  //3个为一组，表示一个顶点的xyz坐标
  const attribue = new THREE.BufferAttribute(vertices, 3); 
  // 设置几何体attributes属性的位置属性
  geometry.attributes.position = attribue;
  // 点渲染模式
  const material = new THREE.PointsMaterial({
      color: 0xffff00,
      size: 10.0 //点对象像素尺寸
  }); 
  const object = new THREE.Points(geometry, material); //点模型对象
  // 线材质对象
  // 创建线模型对象
  // const object = new THREE.Line(geometry, material);

  object.position.set(0, 0, 0);

  scene.add(object);
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
#webgl {
  border: 1px solid #eee;
}
</style>