import './style.css'
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls'



let camera, scene, renderer, controls;
var planes = [];
const mouse = new THREE.Vector2();
const target = new THREE.Vector2();
const windowHalf = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);
let key_press_flag = false
let lst_cubes = [];
const geometry_donut = new THREE.TorusGeometry(10, 3, 16, 100)
const material_donut = new THREE.MeshNormalMaterial()
const donut = new THREE.Mesh(geometry_donut, material_donut)

const geometry_sphere = new THREE.SphereGeometry(5 );
const material_sphere = new THREE.MeshStandardMaterial({ color: 0xffffff });
const sphere = new THREE.Mesh(geometry_sphere, material_sphere)

init();
animate();

function init() {


  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 500);
  camera.position.z = 50;

  scene = new THREE.Scene();

  const geometry = new THREE.BoxBufferGeometry();
  const material = new THREE.MeshNormalMaterial();


  const spaceTexture = new THREE.TextureLoader().load("pictures/background.jpg");
  scene.background = spaceTexture;




  // SETUP CUBES
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


  scene.add(donut)
  donut.position.set(10, 10, 200)

  scene.add(sphere)
  sphere.position.set(25, 10, 100)





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


  var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
  vector.unproject(camera);
  var dir = vector.sub(camera.position).normalize();
  var distance = - camera.position.z / dir.z;
  var pos = camera.position.clone().add(dir.multiplyScalar(distance));
  // camera.position.copy(pos);
  // console.log(pos)
  // (camera.getWorldDirection(pos));



}

function onMouseWheel(event) {
  camera.position.z += event.deltaY  * 0.1; // move camera along z-axis

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
  render();
  update()
  requestAnimationFrame(animate);



















  lst_cubes.forEach(animate_cubes)
  donut.rotation.x += 0.01
  donut.rotation.y += 0.01
  donut.rotation.z += 0.01

  if (key_press_flag == true) {

  }

  else {

    target.x = (1 - mouse.x) * 0.002;
    target.y = (1 - mouse.y) * 0.002;

    camera.rotation.x += 0.05 * (target.y - camera.rotation.x);
    camera.rotation.y += 0.05 * (target.x - camera.rotation.y);
  }

}

function update() {

}


function render() {
  renderer.render(scene, camera);
}

