
import * as THREE from 'three';
export const initMesh = ({ geometryType, materialType, scene, color = 0x00ffff, opacity = 1, transparent = true, size,  position }) => {
  //创建一个长方体几何对象Geometry
  const geometry = choseGeometry({ geometryType, size });

  const materialConf = {
    color,
    transparent,//开启透明
    opacity,//设置透明度
  }

  //创建一个材质对象Material
  const material = choseMaterial({ materialType, materialConf });
  
  // 两个参数分别为几何体geometry、材质material
  const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh

  const { x, y, z } = position;
  // 设置模型mesh的xyz坐标
  mesh.position.set(x, y, z);

  scene.add(mesh);
  return mesh;
}

export const choseMaterial = ({ materialType, materialConf }) => {
  let material; 
  switch (materialType) {
    case 'MeshLamberMaterial':
      material = new THREE.MeshLambertMaterial(materialConf);
      break;
    case 'MeshPhongMaterial':
      material = new THREE.MeshPhongMaterial(materialConf);
      break;
    case 'MeshStandardMaterial':
      material = new THREE.MeshStandardMaterial(materialConf);
      break;
    case 'MeshPhysicalMaterial':
      material = new THREE.MeshPhysicalMaterial(materialConf);
      break;
    default:
      material = new THREE.MeshBasicMaterial(materialConf);
      break;
  }
  return material;
}

export const choseGeometry = ({ geometryType, size }) => {
  const { length, width, height, radius, radiusTop, radiusBottom } = size;
  let geometry;
  switch (geometryType) {
    case 'SphereGeometry':
      geometry = new THREE.SphereGeometry(radius);
      break;
    case 'CylinderGeometry':
      geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height);
      break;
    case 'ConeGeometry':
      geometry = new THREE.ConeGeometry(radius, height);
      break;
    case 'PlaneGeometry':
      geometry = new THREE.PlaneGeometry(width, height);
      break;
    case 'circleGeometry':
      geometry = new THREE.CircleGeometry(radius);
      break;
    default:
      geometry = new THREE.BoxGeometry(width, height, length);
      break;
  }
  return geometry;
}