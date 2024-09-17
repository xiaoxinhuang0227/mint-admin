<script setup>
import { onMounted, ref } from 'vue';
import * as THREE from 'three';
import threeGuide from './components/threeGuide.vue';
import { initHelper } from './utils/helper';
import { initCamera, initLight, downloadCanvas } from './utils/tool';
import { initMesh, changeTexture } from './utils/geometry';
import { Icon } from '@/components/Icon'

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

const getCanvasSize = () => {
  return {
    width: window.innerWidth - 183,
    height: 500
  }
}

let meshArr = [];
let canvasRender = null;
const canvasWidth = getCanvasSize().width;
const canvasHeight =  getCanvasSize().height;

onMounted(async () => {
  const renderRes = await initWebgl({
    // 定义相机输出画布的尺寸(单位:像素px)
    canvas: { width: canvasWidth, height: canvasHeight },
    meshConf: MESH_CONF,
    lightConf: { lightType: 'AmbientLight', position: { x: 0, y: 200, z: 200 } },
    cameraPosition: { x: 0, y: 100, z: 500 },
  });
  meshArr = renderRes.meshRes;
  canvasRender = renderRes.renderer;
})

const loading = ref(false);
const initWebgl = async ({ 
  canvas: { width, height },
  meshConf,
  lightConf,
  cameraPosition,
  needHelper = true
}) => {
  loading.value = true;
  // 创建3D场景对象Scene
  const scene = new THREE.Scene();
  
  let meshPromiseRes = [];
  meshConf.map((item) => {
    const object = initMesh({ scene, ...item });
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

  loading.value = false;
  return { meshRes, renderer };
}

const initRender = ({ scene, camera, canvas: { width, height }, bgColor = 0x000000 }) => {
  // 创建渲染器对象
  const renderer = new THREE.WebGLRenderer({
    //想把canvas画布上内容下载到本地，需要设置为true
    preserveDrawingBuffer:true,
  });

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

  window.onresize = function () {
    const width = getCanvasSize().width;
    const height = getCanvasSize().height;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  return renderer;
}

const activeFloorIdx = ref(0);
const changeFloorTexture = (textureConf, idx) => {
  activeFloorIdx.value = idx;
  const objects = meshArr;
  changeTexture({ newTextureUrl: textureConf.url, mesh: objects[0], repeat: textureConf.repeat });
}

const download = () => {
  downloadCanvas({ renderer: canvasRender });
}
</script>

<template>
  <div v-loading="loading" class="page-3D">
    <div id="webgl"></div>
    <div class="tool">
      <Icon @click="download" icon="mingcute:download-fill" color="#fff" :size="20"></Icon>
    </div>
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
.page-3D {
  height: 100vh;
}
#webgl {
  height: 500px;
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
.tool {
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
}
</style>