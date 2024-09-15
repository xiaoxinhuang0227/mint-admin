<script setup>
import { onMounted, ref } from 'vue';
import * as THREE from 'three';
import threeGuide from './components/threeGuide.vue';
import { initHelper } from './utils/helper';
import { initCamera, initLight } from './utils/tool';
import { initMesh, changeTexture } from './utils/geometry';
const cameraPosition = ref(null);

const verticesData =  [
  0, 0, 0,
  100, 0, 0,
  100, 100, 0,
  100, 100, 100,
  0, 100, 0,
  0, 100, 100,
  0, 0, 100,
  100, 0, 100,
]

let textureConf = [
  { url: '/mint-admin/texture/floor-1.jpg', repeat: { x: 2, y: 2 } },
  { url: '/mint-admin/texture/floor-2.jpeg', repeat: { x: 2, y: 2 } },
]

const MESH_CONF = [
  { geometryType: 'PlaneGeometry',
    materialType: 'MeshBasicMaterial',
    position: { x: -100, y: 50, z: 50},
    size: { width: 100, height: 100 },
    materialParams: {
      textureUrl: textureConf[0].url,
      repeat: textureConf[0].repeat
    }
  },
  {
    geometryType: 'CircleGeometry',
    materialType: 'MeshBasicMaterial',
    position: { x: -250, y: 50, z: 50},
    size: { radius: 50 },
    materialParams: {
      textureUrl: '/mint-admin/texture/sky.jpg',
    }
  },
  {
    geometryType: 'BoxGeometry',
    materialType: 'MeshPhongMaterial',
    position: { x: 50, y: 50, z: 50},
    size: { width: 100, height: 100,length: 100 }
  },
  {
    geometryType: 'SphereGeometry',
    materialType: 'MeshStandardMaterial',
    position: { x: 200, y: 50, z: 50},
    size: { radius: 50 },
    materialParams: {
      textureUrl: '/mint-admin/texture/map.jpeg',
    }
  },
  // {
  //   geometryType: 'CylinderGeometry',
  //   materialType: 'MeshPhysicalMaterial',
  //   position: { x: 350, y: 50, z: 50},
  //   size: { radiusTop: 20, radiusBottom: 50, height: 100 },
  // },
  { geometryType: 'BufferGeometry', materialType: 'Points', position: { x: 0, y: 0, z: 0}, materialParams: { verticesData, color: 0xffff00, size: 10.0 }  },
]

let meshArr = [];
onMounted(() => {
  meshArr = initWebgl({
    // 定义相机输出画布的尺寸(单位:像素px)
    canvas: { width: 1682, height: 500 },
    meshConf: MESH_CONF,
    lightConf: { lightType: 'AmbientLight', position: { x: 0, y: 200, z: 200 } },
    cameraPosition: { x: 0, y: 100, z: 500 },
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
  
  let meshPromiseRes = [];
  meshConf.map((item) => {
    const object = initMesh({ scene, ...item });
    console.log('object', object)
    meshPromiseRes.push(object);
  })
  const meshRes = await Promise.all(meshPromiseRes);
  const mesh = meshRes[2];

  const light = initLight({ scene, ...lightConf });

  const camera = initCamera({
    width,
    height,
    position: cameraPosition,
    targetPosition: mesh.position
  });
  
  const renderer = initRender({ scene, camera, canvas: { width, height } });
  
  needHelper && initHelper({ scene, camera, mesh, light, lightType: lightConf.lightType, renderer });

  return meshRes;
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

const activeFloorIdx = ref(0);
const changeFloorTexture = async (textureConf, idx) => {
  activeFloorIdx.value = idx;
  const objects = await meshArr;
  changeTexture({ newTextureUrl: textureConf.url, mesh: objects[0], repeat: textureConf.repeat });
}
</script>

<template>
  <div class="page-3D">
    <div id="webgl"></div>
    <div class="texture">
      地板材质选择：
      <div
        class="toggle-item"
        v-for="(item, idx) of textureConf"
        :key="item.url"
        :class="{ active: activeFloorIdx === idx }"
      >
        <img :src="item.url" @click="changeFloorTexture(item, idx)" />
      </div>
    </div>
    <threeGuide></threeGuide>
  </div>
</template>

<style lang="scss" scoped>
#webgl {
  border: 1px solid #eee;
}

.texture {
  display: flex;
  .toggle-item {
    margin-right: 10px;
    width: 50px;
    height: 50px;
    box-sizing: border-box;
    &.active {
      border: 4px solid #000;
    }
  }
  img {
    width: 100%;
    height: 100%;
  }
}
</style>