import * as THREE from './threejs/three.module.js' 
import { STLLoader } from './threejs/STLLoader.js'
import { OrbitControls } from './threejs/OrbitControls.js'

let scene, camera, renderer, object, controls, light;

// escena
function init() {
    scene = new THREE.Scene()
    scene.background = new THREE.Color(0x087b93)

    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth/window.innerHeight
    )
    camera.position.z = 5

    renderer = new THREE.WebGL1Renderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    // let material = new THREE.MeshBasicMaterial({color: 0x00ff00})
    // object = new THREE.Mesh( new THREE.BoxGeometry, material)

    scene.add(object)

    renderer.render(scene, camera)

    controls = new OrbitControls(camera, renderer.domElement)

    light = new THREE.DirectionalLight(0xffffff)
    light.position.set(0, 0, 10)
    scene.add(light)

    animate()
}

function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}

let loader = new STLLoader()
loader.load('./3dModels/mandolorian_yoda_3Dee.stl', (model) => {
    object = new THREE.Mesh(
        model,
        new THREE.MeshLambertMaterial({Color: 0x00ff00 }))
    object.scale.set(0.09, 0.09, 0.09)
    object.position.set(1, -2, 0)
    object.rotation.x = -Math.PI / 2
    init()
})

