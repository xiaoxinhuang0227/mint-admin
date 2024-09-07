
import * as THREE from 'three';
export const initMesh = ({ geometryType, materialType, scene, materialParams, size, position }) => {
  //创建一个长方体几何对象Geometry
  const geometry = choseGeometry({ geometryType, size });

  const materialConf = Object.assign({}, { color: 0x00ffff }, materialParams);

  //创建一个材质对象Material
  const material = choseMaterial({ materialType, materialConf, geometry });
  
  // 两个参数分别为几何体geometry、材质material
  let object;
  switch (materialType) {
    case 'Points':
      object = new THREE.Points(geometry, material);
      break;
    default:
      object = new THREE.Mesh(geometry, material); //网格模型对象Mesh
      break;
  }
  const { x, y, z } = position;
  // 设置模型mesh的xyz坐标
  object.position.set(x, y, z);

  scene.add(object);
  return object;
}

export const choseMaterial = ({ materialType, materialConf, geometry }) => {
  let material; 
  switch (materialType) {
    case 'MeshLamberMaterial':
      // 漫反射
      material = new THREE.MeshLambertMaterial(materialConf);
      break;
    case 'MeshPhongMaterial':
      // 高光
      material = new THREE.MeshPhongMaterial(materialConf);
      break;
    case 'MeshStandardMaterial':
      material = new THREE.MeshStandardMaterial(materialConf);
      break;
    case 'MeshPhysicalMaterial':
      material = new THREE.MeshPhysicalMaterial(materialConf);
      break;
    case 'Points':
      const { verticesData, ...others } = materialConf;
      const vertices = new Float32Array(verticesData);
      //3个为一组，表示一个顶点的xyz坐标
      const attribue = new THREE.BufferAttribute(vertices, 3); 
      // 设置几何体attributes属性的位置属性
      geometry.attributes.position = attribue;
      material = new THREE.PointsMaterial(others); 
      break;
    default:
      // 基础材质，不受光照影响
      material = new THREE.MeshBasicMaterial(materialConf);
      break;
  }
  return material;
}

export const choseGeometry = ({ geometryType, size }) => {
  const { length, width, height, radius, radiusTop, radiusBottom } = size || {};
  let geometry;
  switch (geometryType) {
    case 'SphereGeometry':
      // 球体
      geometry = new THREE.SphereGeometry(radius);
      break;
    case 'CylinderGeometry':
      // 圆柱体
      geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height);
      break;
    case 'ConeGeometry':
      // 圆锥
      geometry = new THREE.ConeGeometry(radius, height);
      break;
    case 'PlaneGeometry':
      // 矩形平面
      geometry = new THREE.PlaneGeometry(width, height);
      break;
    case 'CircleGeometry':
      // 圆形平面
      geometry = new THREE.CircleGeometry(radius);
      break;
    case 'BufferGeometry':
      // 自定义几何体，定义顶点数据
      geometry = new THREE.BufferGeometry();
      break;
    default:
      // 长方体
      geometry = new THREE.BoxGeometry(width, height, length);
      break;
  }
  return geometry;
}