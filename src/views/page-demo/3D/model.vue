<script setup>
import { onMounted, ref, onUnmounted } from 'vue'
import * as THREE from 'three'
import { initHelper } from './utils/helper'
import { initCamera, initLight } from './utils/tool'
import { initModel } from './utils/geometry'
import { initControls } from './utils/controls'
import LoadingProgress from '@/components/LoadingProgress/index.vue'

// 常量配置抽离
const MODEL_CONFIG = [
  { 
    position: { x: 0, y: 0, z: -1 }, 
    scale: 0.5, 
    modelUrl: '/mint-admin/model/cat/scene.gltf' 
  },
  { 
    position: { x: 0, y: -0.1, z: 0 }, 
    scale: 2, 
    modelUrl: '/mint-admin/model/room/scene.gltf' 
  }
]

// 响应式状态
const loading = ref(false)
const webglContainer = ref(null)
const loadingProgress = ref(0)
const loadingText = ref('')

// 计算属性或方法
const getCanvasSize = () => ({
  width: window.innerWidth - 183,
  height: window.innerHeight - 52
})

// 场景相关变量
let scene, renderer, animationId

// 添加模型控制状态
const catModel = ref(null)
const moveSpeed = 0.1

// 添加方向控制变量
let cameraControls
const rotateSpeed = 0.1 // 旋转速度
const direction = new THREE.Vector3() // 移动方向向量

// 添加相机跟随更新函数
const updateCameraFollow = (controls, target, offset) => {
  // 计算目标位置
  const targetPosition = new THREE.Vector3()
  targetPosition.copy(target.position).add(offset)
  
  // 更新相机位置
  controls.target.copy(target.position)
  controls.object.position.copy(targetPosition)
  controls.update()
}

// 键盘控制处理
const handleKeydown = (event) => {
  if (!catModel.value) return
  
  // 获取当前模型的朝向
  const modelRotation = catModel.value.rotation.y
  
  // 根据当前朝向计算移动方向
  switch(event.key) {
    case 'ArrowUp':
      // 向前移动
      direction.set(
        Math.sin(modelRotation) * moveSpeed,
        0,
        -Math.cos(modelRotation) * moveSpeed
      )
      catModel.value.position.add(direction)
      break
    case 'ArrowDown':
      // 向后移动
      direction.set(
        -Math.sin(modelRotation) * moveSpeed,
        0,
        Math.cos(modelRotation) * moveSpeed
      )
      catModel.value.position.add(direction)
      break
    case 'ArrowLeft':
      // 向左转向
      catModel.value.rotation.y += rotateSpeed
      break
    case 'ArrowRight':
      // 向右转向
      catModel.value.rotation.y -= rotateSpeed
      break
  }
}

// 初始化WebGL
const initWebGL = async (config) => {
  const { canvas, meshConf, lightConf, cameraConf, needHelper } = config
  
  scene = new THREE.Scene()
  
  const loadingManager = new THREE.LoadingManager()
  loadingManager.onProgress = (url, loaded, total) => {
    loadingProgress.value = Math.floor((loaded / total) * 100)
    loadingText.value = `加载中...${loadingProgress.value}%`
  }
  
  const meshPromises = meshConf.map(item => 
    initModel({ 
      scene, 
      ...item, 
      loadingManager 
    })
  )
  
  const meshes = await Promise.all(meshPromises)
  catModel.value = meshes[0]
  
  // 使用猫咪模型的位置作为相机目标点
  const targetPosition = new THREE.Vector3(
    catModel.value.position.x,
    catModel.value.position.y,
    catModel.value.position.z
  )
  
  const light = initLight({ scene, ...lightConf })
  const camera = initCamera({
    ...canvas,
    position: cameraConf.position,
    targetPosition
  })

  // 先初始化渲染器
  renderer = initRenderer({ scene, camera, canvas })
  
  // 再初始化控制器
  cameraControls = initControls({
    camera,
    renderer,
    target: catModel.value.position,
    limit: cameraConf.limit,
    enableDamping: true
  })

  if (needHelper) {
    initHelper({ 
      scene, 
      camera, 
      mesh: meshes[0], 
      light,
      lightType: lightConf.lightType,
      renderer,
      limit: cameraConf.limit,
      config: {
        enableGUI: true,
        enableAxesHelper: true,
        enableCameraHelper: true,
        enableLightHelper: true
      }
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
    
    if (cameraControls && catModel.value) {
      // 计算相机偏移,使其跟随猫咪朝向
      const offset = new THREE.Vector3(
        -Math.sin(catModel.value.rotation.y) * 10,
        20,
        -Math.cos(catModel.value.rotation.y) * -10
      )
      updateCameraFollow(cameraControls, catModel.value, offset)
    }
    
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
        position: { x: 0, y: 10, z: 10 } 
      },
      cameraConf: {
        position: { x: 0, y: 100, z: 0},
        limit: { 
          minPolarAngle: Math.PI / 2.5,  // 最小仰角（0表示正上方）
          maxPolarAngle: Math.PI,  // 最大俯角（约126度）
          
          minAzimuthAngle: -Infinity,  // 移除水平旋转的限制
          maxAzimuthAngle: Infinity,   // 移除水平旋转的限制
          
          minDistance: 0.5,
          maxDistance: 2
        }
      },
      needHelper: true
    })
    
    // 添加窗口resize监听
    window.addEventListener('resize', handleResize)
    // 添加键盘事件监听
    window.addEventListener('keydown', handleKeydown)
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
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="page-3d">
    <div ref="webglContainer" class="webgl-container" />
    
    <LoadingProgress 
      :loading="loading"
      :progress="loadingProgress"
      :text="loadingText"
    />
    
    <!-- 键盘操作提示保持不变 -->
    <div v-show="!loading" class="keyboard-tips">
      <div class="tips-title">键盘操作说明</div>
      <div class="keys-container">
        <div class="key-row">
          <div class="key">↑</div>
        </div>
        <div class="key-row">
          <div class="key">←</div>
          <div class="key">↓</div>
          <div class="key">→</div>
        </div>
        <div class="tips-text">使用方向键控制猫咪移动</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-3d {
  position: relative;
  width: 100%;
  height: 100%;
  
  .webgl-container {
    width: 100%;
    height: 100%;
    border: 1px solid #eee;
  }

  .keyboard-tips {
    position: absolute;
    left: 20px;
    bottom: 50px;
    background: rgba(0, 0, 0, 0.6);
    padding: 15px;
    border-radius: 8px;
    color: white;
    backdrop-filter: blur(8px);
    
    .tips-title {
      font-size: 14px;
      margin-bottom: 12px;
      text-align: center;
    }
    
    .keys-container {
      .key-row {
        display: flex;
        justify-content: center;
        gap: 8px;
        margin: 4px 0;
      }
      
      .key {
        width: 36px;
        height: 36px;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
      }
      
      .tips-text {
        font-size: 12px;
        color: rgba(255, 255, 255, 0.8);
        margin-top: 10px;
        text-align: center;
      }
    }
  }
}
</style>
