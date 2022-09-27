import './style.css'
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let camera, scene, renderer;

const mouse = new THREE.Vector2();
const target = new THREE.Vector2();
const windowHalf = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);
let key_press_flag = false
let lst_cubes = [];


init();
animate();




function init() {


  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 500);
  camera.position.z = 50;

  scene = new THREE.Scene();

  const geometry = new THREE.BoxBufferGeometry();
  const material = new THREE.MeshNormalMaterial();

  for (let i = 0; i < 1000; i++) {

    const object = new THREE.Mesh(geometry, material);
    object.position.x = Math.random() * 80 - 40;
    object.position.y = Math.random() * 80 - 40;
    object.position.z = Math.random() * 80 - 40;
    object.rotation.x = Math.random() * 2 * Math.PI;
    object.rotation.y = Math.random() * 2 * Math.PI;
    object.rotation.z = Math.random() * 2 * Math.PI;
    lst_cubes.push(object)
    scene.add(object);

  }

  renderer = new THREE.WebGLRenderer({ antialias: true, canvas: document.querySelector('#bg'), });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  document.addEventListener('mousemove', onMouseMove, false);
  document.addEventListener('keydown', onKeyDown, false)
  document.addEventListener('wheel', onMouseWheel, false);
  window.addEventListener('resize', onResize, false);

}

function onKeyDown(event) {
  if (event.key == " " && key_press_flag == false) {
    console.log("lmaoo")
    key_press_flag = true
  }
  else {
    key_press_flag = false
  }
}

function onMouseMove(event) {

  mouse.x = (event.clientX - windowHalf.x);
  mouse.y = (event.clientY - windowHalf.x);

}

function onMouseWheel(event) {

  camera.position.z += event.deltaY * 0.1; // move camera along z-axis

}

function onResize(event) {

  const width = window.innerWidth;
  const height = window.innerHeight;

  windowHalf.set(width / 2, height / 2);

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);

}

function animate_cubes(cube) {
  cube.rotation.z += 0.01
}

function animate() {

  lst_cubes.forEach(animate_cubes)

  if (key_press_flag == true) {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  else {

    target.x = (1 - mouse.x) * 0.002;
    target.y = (1 - mouse.y) * 0.002;

    camera.rotation.x += 0.01 * (target.y - camera.rotation.x);
    camera.rotation.y += 0.01 * (target.x - camera.rotation.y);

    requestAnimationFrame(animate);
    renderer.render(scene, camera);

  }


}

