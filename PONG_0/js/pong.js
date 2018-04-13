// GLOBAL VARIABLES
const WIDTH = 640,
      HEIGHT = 360;

var container;

const RADIUS = 5,
      SEGMENTS = 6,
      RINGS = 6;

// Set some camera attributes
const VIEW_ANGLE = 50;
const ASPECT = WIDTH / HEIGHT;
const NEAR = 0.1;
const FAR = 10000;

// Scene object variables
var renderer, scene, camera, pointLight;

var sphere;

var cubePlayer, cubeCPU, plane;

const FIELD_WIDTH = 400,
      FIELD_HEIGHT = 200;
const
      PLANE_WIDTH = FIELD_WIDTH,
      PLANE_HEIGHT = FIELD_HEIGHT,
      PLANE_QUALITY = 10;

const PADDLE_WIDTH = 10,
      PADDLE_HEIGHT = 30,
      PADDLE_DEPTH = 10,
      PADDLE_QUALITY = 1;

var   playerPaddleDirY = 0,
      cpuPaddleDirY = 0,
      paddleSpeed = 3;

var   playerPaddle,
      cpuPaddle;

var ballDirX = 1, ballDirY = 1, ballSpeed = 2;

// GAME FUNCTIONS

function setup()
{
    createScene();
      addSphereMesh();
      addPlaneMesh();
      addCubeMeshPlayer();
      addCubeMeshCPU();
      addLight();
      //draw();
      requestAnimationFrame(draw); // redibujar la esfera todo el rato.
}

function createScene(){
  // Set up all the 3D objects in the scene

// Get the DOM element to attach to
  container = document.getElementById('gameCanvas');

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
  container.appendChild(renderer.domElement);
}

function addSphereMesh(){

  var geometry = new THREE.SphereGeometry(RADIUS, SEGMENTS, RINGS);
  var material = new THREE.MeshLambertMaterial(
      {
        color: '#00FF00'
      });

      // Create a new mesh with sphere geometry
  		sphere = new THREE.Mesh(geometry, material);

      // Move the Sphere back in Z so we can see it
      sphere.position.z = -300;

      // Finally, add the sphere to the scene
      scene.add(sphere);
}

function addPlaneMesh(){
  var geometry = new THREE.PlaneGeometry( PLANE_WIDTH, PLANE_HEIGHT);
  var material = new THREE.MeshLambertMaterial(
      {
        color: '#FFF8DC'
      });
  plane = new THREE.Mesh( geometry, material );
  scene.add( plane );
  plane.position.z = -300;
}

function addCubeMeshPlayer(){
  var geometry = new THREE.BoxGeometry(PADDLE_WIDTH, PADDLE_HEIGHT, PADDLE_DEPTH);
  var material = new THREE.MeshLambertMaterial(
      {
        color: '#2E9AFE'
      });
  cubePlayer = new THREE.Mesh( geometry, material );
  scene.add( cubePlayer );
  cubePlayer.position.z = -300;
  cubePlayer.position.x = -190;
}

function addCubeMeshCPU(){
  var geometry = new THREE.BoxGeometry(PADDLE_WIDTH, PADDLE_HEIGHT, PADDLE_DEPTH);
  var material = new THREE.MeshLambertMaterial(
      {
        color: '#FF0000'
      });
  cubeCPU = new THREE.Mesh( geometry, material );
  scene.add( cubeCPU );
  cubeCPU.position.z = -300;
  cubeCPU.position.x = 190;
}

function addLight(){

  // Create a point light
  pointLight =
    new THREE.PointLight(0xFFFFFF);

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
  sphere.position.x += ballSpeed*ballDirX;
  if (sphere.position.x == PLANE_WIDTH/2 || sphere.position.x == -PLANE_WIDTH/2){
    ballDirX = -ballDirX;
  }
  sphere.position.y += ballSpeed*ballDirY;
  if (sphere.position.y == PLANE_HEIGHT/2 || sphere.position.y == -PLANE_HEIGHT/2){
    ballDirY = -ballDirY;
  }
  sphere.rotation.x += 0.1;
  sphere.rotation.y += 0.1;

  if (Key.isDown(Key.A))
  {
    if (cubePlayer.position.y <= ((PLANE_HEIGHT/2) - PADDLE_HEIGHT)){
      cubePlayer.position.y += 1;
    }
    if (sphere.position.x == cubePlayer.position.x &&){
      ballDirX = -ballDirX;
    }
  }
  if (Key.isDown(Key.D))
  {
    if (cubePlayer.position.y >= ((-PLANE_HEIGHT/2) + PADDLE_HEIGHT)){
      cubePlayer.position.y -= 1;
    }

  }
}
