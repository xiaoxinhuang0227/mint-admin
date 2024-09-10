<script setup>
import { onMounted, ref } from 'vue';
import * as THREE from 'three';
// 引入扩展库GLTFLoader.js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { initHelper } from './utils/helper';
import { initCamera, initLight } from './utils/tool';
const cameraPosition = ref(null);

const MESH_CONF = [
  { position: { x: 0, y: 0, z: 0}, size: { width: 100, height: 100 } },
]
onMounted(() => {
  initWebgl({
    // 定义相机输出画布的尺寸(单位:像素px)
    canvas: { width: 1682, height: 500 },
    meshConf: MESH_CONF,
    lightConf: { lightType: 'PointLight', position: { x: 0, y: 200, z: 200 } },
    cameraPosition: { x: 0, y: 1, z: 5 },
  });
})

const initWebgl = async ({ 
  canvas: { width, height },
  meshConf,
  lightConf,
  cameraPosition,
  needHelper = true
}) => {
  // 创建3D场景对象Scene
  const scene = new THREE.Scene();

  const mesh = await initModel({ scene });

  const light = initLight({ scene, ...lightConf });

  const camera = initCamera({
    width,
    height,
    position: cameraPosition,
    targetPosition: new THREE.Vector3(0,0,0)
  });
  
  const renderer = initRender({ scene, camera, canvas: { width, height } });
  
  needHelper && initHelper({ scene, camera, mesh, light, lightType: lightConf.lightType, renderer });
}
const initModel = ({scene}) => {
  return new Promise((resolve, reject) => {
    // 创建GLTF加载器对象
    const loader = new GLTFLoader();
    loader.load(
      '/mint-admin/model/scene.gltf',
      function (gltf) {
        gltf.scene.position.set(0, 0, 0);
        // 返回的场景对象gltf.scene插入到threejs场景中
        scene.add( gltf.scene );

        // 返回名.name为"1号楼"对应的对象
        // const nameNode = gltf.scene.getObjectByName("Sketchfab_Scene");
        // nameNode.material.color.set(0xff0000);//改变1号楼Mesh材质颜色
        resolve(gltf.scene);
      },
      function ( xhr ) {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
      },
      function ( error ) {
        console.log( error );
        reject(error);
      }
    )
  })
  
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
  <div class="page-3D">
    <div id="webgl"></div>
  </div>
</template>

<style lang="scss" scoped>
#webgl {
  border: 1px solid #eee;
}
</style>