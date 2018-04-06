// Set the scene size
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

var container;

// Set some camera attributes
const VIEW_ANGLE = 45;
const ASPECT = WIDTH / HEIGHT;
const NEAR = 0.1;
const FAR = 10000;

// Scene object variables
var renderer, scene, camera, pointLight;

// Set up the sphere vars (para el material)
const RADIUS = 60;
const SEGMENTS = 16;
const RINGS = 16;

var sphere;
var cube;

function setup()
{
	createScene();
    addMesh();
    addLight();
    requestAnimationFrame(draw); // redibujar la esfera todo el rato.
}

function createScene()
{
    // Set up all the 3D objects in the scene

	// Get the DOM element to attach to
    container = document.getElementById("#container");

    // Create a WebGL renderer, camera and a scene
    renderer = new THREE.WebGLRenderer();
    camera =
        new THREE.PerspectiveCamera(
            VIEW_ANGLE,
            ASPECT,
            NEAR,
            FAR
        );

    scene = new THREE.Scene();

    // Add the camera to the scene
    scene.add(camera);

    // Start the renderer
    renderer.setSize(WIDTH, HEIGHT);

    // Attach the renderer-supplied DOM element.
    document.body.appendChild(renderer.domElement);
}

function addMesh()
{
    var geometry = new THREE.SphereGeometry(
        RADIUS,
        SEGMENTS,
        RINGS);
    var material = new THREE.MeshLambertMaterial(
        {
          color: 0xCC0000
        });

		/*var material = new THREE.LineDashedMaterial( {
			color: 0xCC0000,
			linewidth: 1,
			scale: 1,
			dashSize: 3,
			gapSize: 1,
		} );*/

		// Create a new mesh with sphere geometry
		sphere = new THREE.Mesh(geometry, material);

		var geometry = new THREE.BoxGeometry( 1, 1, 1 );
		var material = new THREE.MeshNormalMaterial( { color: 0x00ff00 } );
		cube = new THREE.Mesh( geometry, material );


    // Move the Sphere back in Z so we can see it
    sphere.position.z = -300;

    // Finally, add the sphere to the scene
    scene.add(sphere);

		cube.position.z = -30;
		scene.add(cube);
}


function addLight()
{
    // Create a point light
    pointLight =
      new THREE.PointLight(0xFFFFFF);

		// light = new THREE.AmbientLight( 0x404040,); // soft white light ambiental

		// Dirlight = new THREE.DirectionalLight(0xFFFFFF, 1)

    // Set its position
    pointLight.position.x = 10;
    pointLight.position.y = 50;
    pointLight.position.z = 130;

    // Add to the scene
    scene.add(pointLight);
}

function draw()
{

    // Draw!
    renderer.render(scene, camera);

    // Schedule the next frame
    requestAnimationFrame(draw);

		sphere.rotation.x += 0.1;
		sphere.rotation.y += 0.1;

		cube.rotation.x += 0.01;
		cube.rotation.y += 0.01;

}
