import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

//Loading
const textureLoader = new THREE.TextureLoader()
const normalTexture = textureLoader.load('/textures/NormalMap.png')

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereGeometry( .5, 64, 64);

// Materials
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.336
material.metalness = 0.496
material.normalMap = normalTexture
material.color = new THREE.Color(0xffffff)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// LUCES =>
// Light 1
const pointLight = new THREE.PointLight(0x77ff, 1)
pointLight.position.x = -0.92
pointLight.position.y = -1.58
pointLight.position.z = -3
pointLight.intensity = 0.15

scene.add(pointLight)

//para hacer carpetas dentro de los parámetros del GUI
const light1 = gui.addFolder('Light 1')

// PER VERURE ELS CONTROLS AL NAVEGADOR
light1.add(pointLight.position, 'y').min(-3).max(3).step(0.01)
light1.add(pointLight.position, 'x').min(-6).max(6).step(0.01)
light1.add(pointLight.position, 'z').min(-3).max(3).step(0.01)
light1.add(pointLight, 'intensity').min(0).max(10).step(0.01)

// PER VEURE LA LLUM COM A UN OBJECTE
const pointLightHelper = new THREE.PointLightHelper(pointLight, 1)
scene.add(pointLightHelper)


// Light 2
const pointLight2 = new THREE.PointLight(0xff0000, 2)
pointLight2.position.set(-0.13,0.8,-0.52)
pointLight2.intensity = 0.38

scene.add(pointLight2)

//para hacer carpetas dentro de los parámetros del GUI
const light2 = gui.addFolder('Light 2')

// PER VERURE ELS CONTROLS AL NAVEGADOR
light2.add(pointLight2.position, 'y').min(-3).max(3).step(0.01)
light2.add(pointLight2.position, 'x').min(-6).max(6).step(0.01)
light2.add(pointLight2.position, 'z').min(-3).max(3).step(0.01)
light2.add(pointLight2, 'intensity').min(0).max(10).step(0.01)

// PER VEURE LA LLUM COM A UN OBJECTE
const pointLightHelperWhite = new THREE.PointLightHelper(pointLight2, 1)
scene.add(pointLightHelperWhite)

// Light 3
const pointLight3 = new THREE.PointLight(0x000fff, 1)
pointLight3.position.set(-0.19,-0.78,-3)
pointLight3.intensity = 0.03

scene.add(pointLight3)

//para hacer carpetas dentro de los parámetros del GUI
const light3 = gui.addFolder('Light')

// PER VERURE ELS CONTROLS AL NAVEGADOR
light3.add(pointLight3.position, 'y').min(-3).max(3).step(0.01)
light3.add(pointLight3.position, 'x').min(-6).max(6).step(0.01)
light3.add(pointLight3.position, 'z').min(-3).max(3).step(0.01)
light3.add(pointLight3, 'intensity').min(0).max(10).step(0.01)

// PER VEURE LA LLUM COM A UN OBJECTE
const pointLightHelperBlue = new THREE.PointLightHelper(pointLight3, 1)
scene.add(pointLightHelperBlue)

// Light 4
const pointLight4 = new THREE.PointLight(0x77ff, 1)
pointLight4.position.set(3,6,-2)
pointLight4.intensity = 0.49

scene.add(pointLight4)

//para hacer carpetas dentro de los parámetros del GUI
const light4 = gui.addFolder('Light 4')

// PER VERURE ELS CONTROLS AL NAVEGADOR
light4.add(pointLight4.position, 'y').min(-3).max(3).step(0.01)
light4.add(pointLight4.position, 'x').min(-6).max(6).step(0.01)
light4.add(pointLight4.position, 'z').min(-3).max(3).step(0.01)
light4.add(pointLight4, 'intensity').min(0).max(10).step(0.01)

// PER VEURE LA LLUM COM A UN OBJECTE
const pointLightHelperBlue2 = new THREE.PointLightHelper(pointLight4, 1)
scene.add(pointLightHelperBlue)

// CAMBIO DE COLOR HELPER NAVEGADOR
const light4Color = {
    color: 0x77ff
}

light4.addColor(light4Color, 'color')
    .onChange(() => {
        pointLight4.color.set(light4Color.color)
    })
    
/**
 * Sizes
 */
 const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

window.onmousewheel = (e) => {
    if (sphere) {
        // rotación en scroll
        sphere.rotation.x += e.deltaY / 400;
        sphere.rotation.y += e.deltaY / 400;
        sphere.rotation.z += e.deltaY / 400;
    }
    // if (pointLight2) {
    //     pointLight2.position.set(-2.11,2.37,-3)
    // }
};

document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowX)
    mouseY = (event.clientY - windowY)
}

const clock = new THREE.Clock()

const tick = () =>
{
    targetX = mouseX * .001
    targetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    sphere.rotation.x += .5 * (targetY - sphere.rotation.x)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
