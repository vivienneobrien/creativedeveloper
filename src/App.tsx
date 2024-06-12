import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { FontLoader } from "three/examples/jsm/Addons.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";

function App() {
  /**
   * Base
   */
  // Debug
  const gui = new GUI();

  // Canvas
  const canvas = document.querySelector("canvas.webgl") as HTMLCanvasElement;

  // Scene
  const scene = new THREE.Scene();

  // Axis helper
  const axeshelper = new THREE.AxesHelper();
  scene.add(axeshelper);
  // Font
  const fontLoader = new FontLoader();
  fontLoader.load(
    "./static/fonts/JetBrainsMonoExtraBold_Regular.json",
    (font) => {
      const textGeometry = new TextGeometry("tech_fairy", {
        font: font,
        size: 0.5,
        depth: 0.2, // used to be height
        curveSegments: 5,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02, // very important
        bevelOffset: 0,
        bevelSegments: 4,
      });

      textGeometry.center();
      const textMaterial = new THREE.MeshMatcapMaterial({});
      textMaterial.matcap = matcapTexture;
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);

      scene.add(textMesh);

      const textGeometryTwo = new TextGeometry("vivobrien", {
        font: font,
        size: 0.5,
        depth: 0.2, // used to be height
        curveSegments: 5,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02, // very important
        bevelOffset: 0,
        bevelSegments: 4,
      });

      textGeometryTwo.center();
      const textMeshTwo = new THREE.Mesh(textGeometryTwo, textMaterial);
      textMeshTwo.position.y = -0.8;
      scene.add(textMeshTwo);

      console.time("Before loop");
      // Doughnut
      const donutGeometry = new THREE.OctahedronGeometry(0.5, 0);
      const donutMaterial = new THREE.MeshMatcapMaterial({});
      donutMaterial.matcap = matcapTextureTwo;

      for (let i = 0; i < 300; i++) {
        donutMaterial.matcap = matcapTextureTwo;
        const donutMesh = new THREE.Mesh(donutGeometry, donutMaterial);
        // Position
        donutMesh.position.x = (Math.random() - 0.5) * 10;
        donutMesh.position.z = (Math.random() - 0.5) * 10;
        donutMesh.position.y = (Math.random() - 0.5) * 10;
        // Rotation
        donutMesh.rotation.x = Math.random() * Math.PI;
        donutMesh.rotation.y = Math.random() * Math.PI;
        // Scale
        const scale = Math.random();
        console.log(scale);
        // donutMesh.scale.x = scale;
        // donutMesh.scale.y = scale;
        // donutMesh.scale.z = scale;
        donutMesh.scale.set(scale, scale, scale);

        scene.add(donutMesh);
      }
      console.timeEnd("After loop");
    }
  );

  /**
   * Textures
   */
  const textureLoader = new THREE.TextureLoader();
  const matcapTexture = textureLoader.load(
    "./static/textures/matcaps/chosen5.png"
  );
  matcapTexture.colorSpace = THREE.SRGBColorSpace;

  const matcapTextureTwo = textureLoader.load(
    "./static/textures/matcaps/chosen6.png"
  );
  matcapTextureTwo.colorSpace = THREE.SRGBColorSpace;

  /**
   * Sizes
   */
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  /**
   * Camera
   */
  // Base camera
  const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
  );
  camera.position.x = 1.8;
  camera.position.y = 1.8;
  camera.position.z = 2.8;
  scene.add(camera);

  // Controls
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  /**
   * Renderer
   */
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  /**
   * Animate
   */
  const clock = new THREE.Clock();

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
  };

  tick();

  return <></>;
}

export default App;
