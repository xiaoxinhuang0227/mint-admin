import * as THREE from 'three'

interface TextureConfig {
  url: string
  repeat: {
    x: number
    y: number
  }
}

interface MeshConfig {
  geometryType: string
  materialType: string
  position: THREE.Vector3 | { x: number; y: number; z: number }
  size?: {
    width?: number
    height?: number
    depth?: number
    radius?: number
    length?: number
  }
  materialParams?: {
    textureUrl?: string
    repeat?: { x: number; y: number }
    verticesData?: number[]
    color?: number
    size?: number
  }
}


// 顶点数据
export const VERTICES_DATA = [
    0, 0, 0,
    100, 0, 0,
    100, 100, 0,
    100, 100, 100,
    0, 100, 0,
    0, 100, 100,
    0, 0, 100,
    100, 0, 100,
  ] 

// 纹理配置
export const TEXTURE_CONF: TextureConfig[] = [
  { url: '/mint-admin/texture/floor-1.jpg', repeat: { x: 2, y: 2 } },
  { url: '/mint-admin/texture/floor-2.jpeg', repeat: { x: 2, y: 2 } },
]

// 网格配置
export const MESH_CONF: MeshConfig[]  = [
    { geometryType: 'PlaneGeometry',
      materialType: 'MeshBasicMaterial',
      position: { x: -100, y: 50, z: 50},
      size: { width: 100, height: 100 },
      materialParams: {
        textureUrl: TEXTURE_CONF[0].url,
        repeat: TEXTURE_CONF[0].repeat
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
    { geometryType: 'BufferGeometry', materialType: 'Points', position: { x: 0, y: 0, z: 0}, materialParams: { verticesData: VERTICES_DATA, color: 0xffff00, size: 10.0 }  },
  ]
