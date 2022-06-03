import * as THREE from 'three';
import { Matrix4 } from 'three';

let sceneInfos = []
let renderer;
//let mesh;
//let camera;
//let geometry;
let canvas;
function degToRad(deg) {
    return deg * Math.PI / 180.0
}

const verticesOfCube = [
    -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1,
    -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1,
];

const indicesOfFaces = [
    2, 1, 0, 0, 3, 2,
    0, 4, 7, 7, 3, 0,
    0, 1, 5, 5, 4, 0,
    1, 2, 6, 6, 5, 1,
    2, 3, 7, 7, 6, 2,
    4, 5, 6, 6, 7, 4
];
const d4 = {
    geometry: new THREE.TetrahedronGeometry(1, 0),
    restPosition: (mesh) => {
        mesh.rotation.x = 0
        mesh.rotation.y = 30
        mesh.rotation.z = 0
    }
}
const d6 = {
    geometry: new THREE.PolyhedronGeometry(verticesOfCube, indicesOfFaces, 1, 0),
    restPosition: (mesh) => {
        mesh.rotation.x = 0
        mesh.rotation.y = 0
        mesh.rotation.z = 0
    }
}
const d8 = {
    geometry: new THREE.OctahedronGeometry(1, 0),
    restPosition: (mesh) => {
        mesh.rotation.x = degToRad(20)
        mesh.rotation.y = degToRad(45)
        mesh.rotation.z = 0
    }
}
const d10 = {
    geometry: new THREE.BoxGeometry(1, 1, 1),
    restPosition: (mesh) => {
        mesh.rotation.x = 0
        mesh.rotation.y = 30
        mesh.rotation.z = 0
    }
}
const d12 = {
    geometry: new THREE.DodecahedronGeometry(1, 0),
    restPosition: (mesh) => {
        mesh.rotation.x = 0
        mesh.rotation.y = 30
        mesh.rotation.z = 0
    }
}
const d20 = {
    geometry: new THREE.IcosahedronGeometry(1, 0),
    restPosition: (mesh) => {
        mesh.rotation.set(0, degToRad((180.0 - 138.19) / 2.0), degToRad(30.0), "YXZ");
    }
}

const geometries = {
    d4: d4,
    d6: d6,
    d8: d8,
    d10: d10,
    d12: d12,
    d20: d20,

};


export function init(canvasElem) {
    renderer = new THREE.WebGLRenderer({ canvas: canvasElem, antialias: true });
    canvas = canvasElem
    renderer.setClearColor(0xffffff, 1);
    renderer.setPixelRatio(window.devicePixelRatio);
    //geometry = new THREE.BoxGeometry(1, 1, 1)
    //mesh = new THREE.InstancedMesh(geometry, material, 500);

    animate()
}

function makeScene(elem, diceName) {
    const scene = new THREE.Scene();
    //scene.add(new THREE.HemisphereLight(0xaaaaaa, 0x444444));

    c//onst light = new THREE.DirectionalLight(0xffffff, 0.5);
    //light.position.set(1, 1, 1);
    //scene.add(light);

    const light = new THREE.PointLight(0xff0000, 0.5, 100);
    light.position.set(0, 0, 4);
    scene.add(light);
    const Alight = new THREE.AmbientLight(0x404040, 2); // soft white light
    scene.add(Alight);

    const material = new THREE.MeshPhongMaterial({ color: 'red', shininess: 20 });
    let { geometry, restPosition } = geometries[diceName]
    const mesh = new THREE.Mesh(geometry, material);
    restPosition(mesh)
    scene.add(mesh);
    //const camera = new THREE.PerspectiveCamera(50, 1, 1, 10);
    const camera = new THREE.OrthographicCamera(-1.2, 1.2, 1.2, -1.2, 1, 5)
    camera.position.z = 3;
    const rand = Math.random() / 50
    const update = (mesh_a) => {
        //mesh_a.rotation.y = mesh_a.rotation.y + rand
        //mesh_a.rotation.x = mesh_a.rotation.x + rand
    }

    return { scene, camera, elem, mesh, update };
}

export function setupScene(element, diceName) {
    const sceneInfo = makeScene(element, diceName);
    sceneInfos.push(sceneInfo);

}
export function rollDice(element, diceName) {
    let sceneInfo = sceneInfos.find((value) => value.elem === element)
    const rand = Math.random() / 10
    if (sceneInfo) {
        sceneInfo.update = (mesh_a) => {
            mesh_a.rotation.y = mesh_a.rotation.y + rand
            mesh_a.rotation.x = mesh_a.rotation.x + rand
        }
        setTimeout(()=>{
            sceneInfo.update=null
            let { geometry, restPosition } = geometries[diceName]
            restPosition(sceneInfo.mesh)
        }, 1000);
    }
}


export function clearScene(element) {
    sceneInfos = sceneInfos.filter(sceneInfo => sceneInfo.elem !== element)
    console.log(sceneInfos)
}


function resizeRendererToDisplaySize() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (canvas.width !== width || canvas.height !== height) {

        renderer.setSize(width, height, false);

    }

}


function animate() {

    render();
    requestAnimationFrame(animate);

}

function render() {
    resizeRendererToDisplaySize();

    canvas.style.transform = `translateY(${window.scrollY}px)`;
    renderer.setClearColor(0xffffff);
    renderer.setScissorTest(false);
    renderer.clear();

    renderer.setClearColor(0xe0e0e0);
    renderer.setScissorTest(true);

    sceneInfos.forEach(function (sceneInfo) {
        const { scene, camera, elem, mesh, update } = sceneInfo;
        // so something moves
        if (update)
            update(mesh)

        // get the element that is a place holder for where we want to
        // draw the scene
        const element = elem;

        // get its position relative to the page's viewport
        const rect = element.getBoundingClientRect();

        // check if it's offscreen. If so skip it
        if (rect.bottom < 0 || rect.top > renderer.domElement.clientHeight ||
            rect.right < 0 || rect.left > renderer.domElement.clientWidth) {

            return; // it's off screen

        }

        // set the viewport
        const width = rect.right - rect.left;
        const height = rect.bottom - rect.top;
        const left = rect.left;
        const bottom = renderer.domElement.clientHeight - rect.bottom;

        renderer.setViewport(left, bottom, width, height);
        renderer.setScissor(left, bottom, width, height);



        camera.aspect = width / height; // not changing in this example
        camera.updateProjectionMatrix();

        //scene.userData.controls.update();

        renderer.render(scene, camera);

    });

}