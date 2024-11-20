import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import * as THREE from 'three'

interface IControlsLimit {
  minDistance?: number
  maxDistance?: number
  minZoom?: number
  maxZoom?: number
  minPolarAngle?: number
  maxPolarAngle?: number
  minAzimuthAngle?: number
  maxAzimuthAngle?: number
}

export const initControls = ({ 
  camera, 
  renderer,
  target,
  limit = {},
  enableDamping = true
}) => {
  const controls = new OrbitControls(camera, renderer.domElement)
  
  const {
    minDistance = 2,
    maxDistance = 20,
    minZoom = 0.5,
    maxZoom = 4,
    minPolarAngle = 0,
    maxPolarAngle = Math.PI,
    minAzimuthAngle = -Math.PI,
    maxAzimuthAngle = Math.PI
  } = limit as IControlsLimit

  // 基础配置
  controls.enableDamping = enableDamping // 启用阻尼效果
  controls.dampingFactor = 0.05 // 阻尼系数
  
  // 设置控制限制
  controls.minDistance = minDistance
  controls.maxDistance = maxDistance
  controls.minZoom = minZoom
  controls.maxZoom = maxZoom
  controls.minPolarAngle = minPolarAngle
  controls.maxPolarAngle = maxPolarAngle
  controls.minAzimuthAngle = minAzimuthAngle
  controls.maxAzimuthAngle = maxAzimuthAngle

  // 设置目标点
  if (target) {
    controls.target.copy(target)
  }

  // 更新控制器
  controls.update()

  return controls
}

// 更新相机跟随目标
export const updateCameraFollow = (controls, target, offset = new THREE.Vector3(0, 2, 4)) => {
  if (!controls || !target) return
  
  controls.target.copy(target.position)
  controls.object.position.copy(target.position).add(offset)
  controls.update()
} 