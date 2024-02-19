
let sceneEarth;
let cameraEarth;
let rendererEarth;
function setup() {

    // Obtaining the canvas element where the graphics resides.
    const canvasContainer = document.querySelector('#canvasContainer');

    // Creating the scene, camera, and the renderer.
    sceneEarth = new THREE.Scene();

    cameraEarth = new THREE.PerspectiveCamera(
        75, canvasContainer.offsetWidth/canvasContainer.offsetHeight, 0.1, 1000);
    cameraEarth.position.z = 4.2;

    rendererEarth = new THREE.WebGLRenderer({
        antialias: true,
        canvas: document.querySelector('#figureCanvas')
    });

    rendererEarth.setClearColor(0x000000);
    rendererEarth.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
    rendererEarth.setPixelRatio(window.devicePixelRatio);

    // Resize the window as the user alters the width and height of the window.
    window.addEventListener('resize', () => {
        rendererEarth.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
        cameraEarth.aspect = canvasContainer.offsetWidth / canvasContainer.offsetHeight;

        cameraEarth.updateProjectionMatrix();
    });
}

let sphere;
function createSphere() {

    // Loading textures from the images folder.
    const loader = new THREE.TextureLoader();
    const baseEarthTexture = loader.load('../images/8k_earth_daymap.jpeg');
    const cloudTexture = loader.load('../images/8k_earth_clouds.jpeg');
    const normalMap = loader.load('../images/8k_earth_normal_map.jpg');

    // Creating a shader material to blend the two textures.
    const shaderMaterial = new THREE.ShaderMaterial({
        uniforms: {
            earthTexture: { value: baseEarthTexture },
            cloudTexture: { value: cloudTexture },
            normalMap: { value: normalMap}
        },
        vertexShader: document.getElementById('vertexShaderEarth').textContent,
        fragmentShader: document.getElementById('fragmentShaderEarth').textContent
    });

    // Creating the sphere.
    sphere = new THREE.Mesh(new THREE.SphereGeometry(2, 50, 50), shaderMaterial);

    // Add the sphere to the scene.
    sceneEarth.add(sphere);
}

let atmosphere;
function createEnvironment() {

    // Creating a shader material to blend the two textures.
    const shaderMaterial = new THREE.ShaderMaterial({
        vertexShader: document.getElementById('vertexShaderAtm').textContent,
        fragmentShader: document.getElementById('fragmentShaderAtm').textContent,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide
    });

    // Creating the atmosphere.
    atmosphere = new THREE.Mesh(new THREE.SphereGeometry(2, 50, 50), shaderMaterial);

    // Scale the atmosphere as compared to the sphere.
    atmosphere.scale.set(1.1, 1.1, 1.1);

    // Add the atmosphere to the scene.
    sceneEarth.add(atmosphere);
}

// This mouse object holds the current x and y coordinates of the mouse.
let mouse = {
    x: 0,
    y: 0
}
function eventListener() {
    // Only listen for the mouse coordinates if the mouse is pressed.
    document.addEventListener('mousemove', (event) => {
        if (event.buttons === 1) {
            mouse.x += event.movementY;
            mouse.y += event.movementX;
        }
    });
}

let group;
function addMovementToEarth() {
    group = new THREE.Group();
    group.add(sphere);
    sceneEarth.add(group);
}

function addBackgroundStars() {
    let starGeometry = new THREE.BufferGeometry();

    // Defining an array to hold the positions of stars
    const starPositions = [];

    // Generate 8000 stars in random positions in the scene.
    for (let i = 0; i < 8000; i++) {
        // Calculate a random position for each star.
        const x = (Math.random() - 0.5) * 35;
        const y = (Math.random() - 0.5) * 35;
        const z = -5;
        starPositions.push(x, y, z);
    }

    const positions = new Float32Array(starPositions);
    starGeometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
    let starMaterial = new THREE.ShaderMaterial({
        vertexShader: `
        void main() {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
        fragmentShader: `
        void main() {
            gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
        }
    `,
        blending: THREE.AdditiveBlending,
        transparent: false
    })

    let starPoint = new THREE.Points(starGeometry, starMaterial);
    sceneEarth.add(starPoint);
}

function addCountryMeshes() {
    // 1. Load GeoJSON data using D3.js
    d3.json('../files/countries.geojson').then(function(data) {
        // 2. Create Three.js meshes for countries
        data.features.forEach(function (feature) {
            // Check the geometry type
            if (feature.geometry.type === 'MultiPolygon') {
                // Iterate over each polygon in the MultiPolygon
                feature.geometry.coordinates.forEach(function (polygonCoords) {
                    createMeshFromPolygon(polygonCoords);
                });
            }
        });
    });

    // Function to create a Three.js mesh from a polygon coordinates array
    function createMeshFromPolygon(polygonCoords) {
        // Create geometry for the country
        const geometry = new THREE.BufferGeometry();

        // Flatten the coordinates array
        const flatCoords = polygonCoords[0].reduce((acc, val) => acc.concat(val), []);

        // Convert longitude-latitude to Cartesian coordinates
        const vertices = new Float32Array(flatCoords.length);
        for (let i = 0; i < flatCoords.length; i += 2) {
            vertices[i] = flatCoords[i];
            vertices[i + 1] = flatCoords[i + 1];
            vertices[i + 2] = 0; // Set z-coordinate to 0 for simplicity
        }

        // Set positions in the geometry
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

        // Convert geometry to mesh
        const material = new THREE.LineBasicMaterial({color: 0xffffff}); // Customize material as needed
        const mesh = new THREE.Line(geometry, material);

        // Add mesh to scene
        sceneEarth.add(mesh);
    }
}

function determineCountry() {
    // Using the geoJson file, creating meshes for each country and adding the meshes into the scene.
    addCountryMeshes();

    // Adding the rayCaster.

}

function render() {
    requestAnimationFrame(render);
    rendererEarth.render(sceneEarth, cameraEarth);

    // Add a constant rotation to the earth.
    sphere.rotation.y += 0.0008;

    // Add movement to the earth based on the mouse coordinates.
    group.rotation.y = mouse.y * 0.002;
    group.rotation.x = mouse.x * 0.002;
}

function setupEarth() {
    // Set up the scene, perspective camera, and the renderer using Three.js.
    setup();

    // Creating a sphere to represent the globe.
    createSphere();

    // Creating the atmosphere surrounding environment.
    createEnvironment();

    // Adding event listener for mouse move.
    eventListener();

    // Adding rotation to the earth base on mouse movement.
    addMovementToEarth();

    // Adding background stars.
    addBackgroundStars();

    // Determine the county which was clicked.
    determineCountry();

    render();
}

document.addEventListener('DOMContentLoaded', setupEarth);