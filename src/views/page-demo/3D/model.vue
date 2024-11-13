<script setup>
import { onMounted, ref, onUnmounted } from 'vue'
import * as THREE from 'three'
import { initHelper } from './utils/helper'
import { initCamera, initLight } from './utils/tool'
import { initModel } from './utils/geometry'

// 常量配置抽离
const MODEL_CONFIG = [
  { 
    position: { x: 0, y: -1.6, z: -1 }, 
    scale: 2, 
    modelUrl: '/mint-admin/model/cat/scene.gltf' 
  },
  { 
    position: { x: 0, y: -2, z: 0 }, 
    scale: 8, 
    modelUrl: '/mint-admin/model/room/scene.gltf' 
  }
]

// 响应式状态
const loading = ref(false)
const webglContainer = ref(null)

// 计算属性或方法
const getCanvasSize = () => ({
  width: window.innerWidth - 183,
  height: window.innerHeight - 52
})

// 场景相关变量
let scene, renderer, animationId

// 初始化WebGL
const initWebGL = async (config) => {
  const { canvas, meshConf, lightConf, cameraConf, needHelper } = config
  
  // 创建场景
  scene = new THREE.Scene()
  
  // 加载模型
  const meshPromises = meshConf.map(item => initModel({ scene, ...item }))
  const meshes = await Promise.all(meshPromises)
  
  // 初始化灯光和相机
  const light = initLight({ scene, ...lightConf })
  const camera = initCamera({
    ...canvas,
    position: cameraConf.position,
    targetPosition: new THREE.Vector3(0, 0, 0)
  })
  
  // 初始化渲染器
  renderer = initRenderer({ scene, camera, canvas })
  
  // 添加辅助工具
  if (needHelper) {
    initHelper({ 
      scene, 
      camera, 
      mesh: meshes[0], 
      light,
      lightType: lightConf.lightType,
      renderer,
      limit: cameraConf.limit 
    })
  }
}

// 渲染器初始化
const initRenderer = ({ scene, camera, canvas }) => {
  const renderer = new THREE.WebGLRenderer({ 
    antialias: true // 抗锯齿
  })
  
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setClearColor(0xffffff, 1)
  renderer.setSize(canvas.width, canvas.height)
  
  // 动画循环
  const animate = () => {
    animationId = requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }
  animate()
  
  webglContainer.value.appendChild(renderer.domElement)
  return renderer
}

// 窗口大小变化处理
const handleResize = () => {
  if (!renderer) return
  const { width, height } = getCanvasSize()
  renderer.setSize(width, height)
}

// 生命周期钩子
onMounted(async () => {
  loading.value = true
  try {
    const { width, height } = getCanvasSize()
    await initWebGL({
      canvas: { width, height },
      meshConf: MODEL_CONFIG,
      lightConf: { 
        lightType: 'PointLight', 
        position: { x: 0, y: 200, z: 200 } 
      },
      cameraConf: {
        position: { x: 0, y: 1, z: 5 },
        limit: { 
          maxPolarAngle: Math.PI / 2, 
          minAzimuthAngle: -Math.PI / 2, 
          maxAzimuthAngle: Math.PI / 4 
        }
      },
      needHelper: true
    })
    
    // 添加窗口resize监听
    window.addEventListener('resize', handleResize)
  } catch (error) {
    console.error('3D场景初始化失败:', error)
  } finally {
    loading.value = false
  }
})

onUnmounted(() => {
  // 清理资源
  window.removeEventListener('resize', handleResize)
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  if (renderer) {
    renderer.dispose()
  }
  if (scene) {
    scene.clear()
  }
})
</script>

<template>
  <div class="page-3d" v-loading="loading">
    <div ref="webglContainer" class="webgl-container" />
  </div>
</template>

<style lang="scss" scoped>
.page-3d {
  width: 100%;
  height: 100%;
  
  .webgl-container {
    width: 100%;
    height: 100%;
    border: 1px solid #eee;
  }
}
</style>