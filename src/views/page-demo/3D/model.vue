<script setup>
import { onMounted, ref } from 'vue';
import * as THREE from 'three';
import { initHelper } from './utils/helper';
import { initCamera, initLight } from './utils/tool';
import { initModel } from './utils/geometry';

const MESH_CONF = [
  { position: { x: 0, y: -1.6, z: -1}, scale: 2, modelUrl: '/mint-admin/model/cat/scene.gltf' },
  { position: { x: 0, y: -2, z: 0}, scale: 8, modelUrl: '/mint-admin/model/room/scene.gltf' },
]

const getCanvasSize = () => {
  return {
    width: window.innerWidth - 183,
    height: window.innerHeight - 52
  }
}

const loading = ref(false);

const canvasWidth = getCanvasSize().width;
const canvasHeight =  getCanvasSize().height;
onMounted(async () => {
  loading.value = true;
  await initWebgl({
    // 定义相机输出画布的尺寸(单位:像素px)
    canvas: { width: canvasWidth, height: canvasHeight },
    meshConf: MESH_CONF,
    lightConf: { lightType: 'PointLight', position: { x: 0, y: 200, z: 200 } },
    cameraConf: {
      position: { x: 0, y: 1, z: 5 },
      limit: { maxPolarAngle: Math.PI / 2, minAzimuthAngle: -Math.PI / 2, maxAzimuthAngle: Math.PI / 4 }
    },
    needHelper: true
  });
  loading.value = false;
})

const initWebgl = async ({ 
  canvas: { width, height },
  meshConf,
  lightConf,
  cameraConf,
  needHelper = true
}) => {
  // 创建3D场景对象Scene
  const scene = new THREE.Scene();

  let meshPromiseRes = [];
  meshConf.map((item) => {
    const object = initModel({ scene, ...item });
    meshPromiseRes.push(object);
  })
  const meshRes = await Promise.all(meshPromiseRes);
  const mesh = meshRes[0];

  const light = initLight({ scene, ...lightConf });

  const camera = initCamera({
    width,
    height,
    position: cameraConf.position,
    targetPosition: new THREE.Vector3(0,0,0)
  });
  
  const renderer = initRender({ scene, camera, canvas: { width, height } });
  
  needHelper && initHelper({ scene, camera, mesh, light, lightType: lightConf.lightType, renderer, limit: cameraConf.limit });
}
const initRender = ({ scene, camera, canvas: { width, height }, bgColor = 0xffffff }) => {
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

</script>

<template>
  <div class="page-3D" v-loading="loading">
    <div id="webgl"></div>
  </div>
</template>

<style lang="scss" scoped>
#webgl {
  border: 1px solid #eee;
}
</style>