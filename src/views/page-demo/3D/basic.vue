<script setup>
import { onMounted, ref, computed } from 'vue';
import * as THREE from 'three';
import threeGuide from './components/threeGuide.vue';
import { Icon } from '@/components/Icon';
import { initHelper } from './utils/helper';
import { initCamera, initLight, downloadCanvas, getCanvasSize } from './utils/tool';
import { initMesh, changeTexture } from './utils/geometry';
import { initRenderer } from './utils/renderer';
import { MESH_CONF, TEXTURE_CONF } from './config';

// 响应式状态
const loading = ref(false);
const activeFloorIdx = ref(0);
const meshArr = ref([]);
const canvasRender = ref(null);

// 计算属性
const canvasSize = computed(() => getCanvasSize());

// 方法
const initWebgl = async (config) => {
  loading.value = true;
  try {
    const scene = new THREE.Scene();
    const meshRes = await initMeshes(scene, config.meshConf);
    
    // 添加默认目标位置
    const targetPosition = meshRes[2]?.position || new THREE.Vector3(0, 0, 0);
    
    const light = initLight({ scene, ...config.lightConf });
    const camera = initCamera({
      ...config.canvas,
      position: config.cameraConf.position,
      targetPosition // 使用安全的目标位置
    });
    
    const renderer = initRenderer({ 
      scene, 
      camera, 
      canvas: config.canvas, 
      meshRes 
    });
    
    if (config.needHelper && meshRes[2]) {
      initHelper({ 
        scene, 
        camera, 
        mesh: meshRes[2], 
        light, 
        lightType: config.lightConf.lightType, 
        renderer, 
        limit: config.cameraConf.limit 
      });
    }

    return { meshRes, renderer };
  } catch (error) {
    console.error('初始化3D场景失败:', error);
    throw error;
  } finally {
    loading.value = false;
  }
}

const initMeshes = async (scene, meshConf) => {
  const meshPromises = meshConf.map(item => initMesh({ scene, ...item }));
  return Promise.all(meshPromises);
}

const changeFloorTexture = (textureConf, idx) => {
  activeFloorIdx.value = idx;
  changeTexture({ 
    newTextureUrl: textureConf.url, 
    mesh: meshArr.value[0], 
    repeat: textureConf.repeat 
  });
}

// 生命周期
onMounted(async () => {
  try {
    const renderRes = await initWebgl({
      canvas: canvasSize.value,
      meshConf: MESH_CONF,
      lightConf: { 
        lightType: 'AmbientLight', 
        position: { x: 0, y: 200, z: 200 } 
      },
      cameraConf: {
        position: { x: 0, y: 100, z: 500 },
        limit: { minDistance: 100, maxDistance: 800 }
      },
      needHelper: true // 明确指定是否需要helper
    });
    meshArr.value = renderRes.meshRes;
    canvasRender.value = renderRes.renderer;
  } catch (error) {
    console.error('加载3D场景失败:', error);
    // 可以添加错误提示UI
  }
})
</script>

<template>
  <div v-loading="loading" class="page-3D">
    <div id="webgl"></div>
    <div class="tool">
      <Icon 
        @click="() => downloadCanvas({ renderer: canvasRender })" 
        icon="mingcute:download-fill" 
        color="#fff" 
        :size="20"
      />
    </div>
    <div class="texture">
      地板材质选择：
      <div
        v-for="(item, idx) in TEXTURE_CONF"
        :key="item.url"
        class="toggle-item"
        :class="{ active: activeFloorIdx === idx }"
        @click="changeFloorTexture(item, idx)"
      >
        <img :src="item.url" />
      </div>
    </div>
    <threeGuide />
  </div>
</template>

<style lang="scss" scoped>
.page-3D {
  height: 100vh;
  
  #webgl {
    height: 500px;
    border: 1px solid #eee;
  }
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
    
    img {
      width: 100%;
      height: 100%;
    }
  }
}

.tool {
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
}
</style>