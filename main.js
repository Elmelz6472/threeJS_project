import './style.css'
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);
// camera.position.setY(2);


renderer.render(scene, camera);




const geometry = new THREE.TorusGeometry(10, 3, 16, 80);
const material = new THREE.MeshStandardMaterial({color: 0xff6347, wireframe: true});
const torus = new THREE.Mesh(geometry, material);

torus.position.set(1, 1, 1)
scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight)

// helper
// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// camera.position.z = -10

const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 25;
// controls.maxDistance = 50;


let lst_stars = [];

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(200));
  star.position.set(x, y, z);
  scene.add(star);
  lst_stars.push(star)
}

Array(1000).fill().forEach(addStar)


const spaceTexture = new THREE.TextureLoader().load("space.jpg");
scene.background = spaceTexture;

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = t * -0.01 * 7;
  camera.position.x = t * -0.0002 * 5;
  camera.rotation.y = t * -0.0002 * 5;
}

document.body.onscroll = moveCamera;
moveCamera();

function animate_stars(star) {
  star.translateZ(0.1);
}

function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  // torus.rotation.z += 0.01
  lst_stars.forEach(animate_stars)
  controls.update();
  renderer.render(scene, camera);

}

console.log(lst_stars)
animate()

