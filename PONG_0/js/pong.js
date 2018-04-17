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

var score1 = 0, score2 = 0, maxScore = 5;

// set opponent reaction rate (0-easiest, 1-hardest)
var difficulty = 0.2;

// Scene object variables
var renderer, scene, camera, pointLight;

var sphere, paddlePlayer, paddleCPU, plane;

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
      addPaddleMeshPlayer();
      addPaddleMeshCPU();
      addLight();
      score();
      //rebound();
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

function addPaddleMeshPlayer(){
  var geometry = new THREE.BoxGeometry(PADDLE_WIDTH, PADDLE_HEIGHT, PADDLE_DEPTH);
  var material = new THREE.MeshLambertMaterial(
      {
        color: '#2E9AFE'
      });
  paddlePlayer = new THREE.Mesh( geometry, material );
  scene.add( paddlePlayer );
  paddlePlayer.position.z = -300;
  paddlePlayer.position.x = -190;
}

function addPaddleMeshCPU(){
  var geometry = new THREE.BoxGeometry(PADDLE_WIDTH, PADDLE_HEIGHT, PADDLE_DEPTH);
  var material = new THREE.MeshLambertMaterial(
      {
        color: '#FF0000'
      });
  paddleCPU = new THREE.Mesh( geometry, material );
  scene.add( paddleCPU );
  paddleCPU.position.z = -300;
  paddleCPU.position.x = 190;
  paddleCPU.position.y = 0;
  cpuPaddleDirY = (sphere.position.y - paddleCPU.position.y) * difficulty;
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

function score(){
  if (sphere.position.x == PLANE_WIDTH/2){
    score1 += 1;
    document.getElementById("scores").innerHTML = (score1) + "-" + (score2 + 0);
  }
  if (sphere.position.x == -PLANE_WIDTH/2){
    score2 += 1;
    document.getElementById("scores").innerHTML = (score1 + 0) + "-" + (score2);
  }
  if ((score1 || score2) == maxScore){
    alert("Has ganado! Refresca la pagina para volver a intentarlo.");
  }
  document.getElementById("winnerBoard").innerHTML = "First to " + maxScore + " wins!"
}

function rebound(){
  if (paddleCPU.position.x == sphere.position.x && ((sphere.position.y <= paddleCPU.position.y + PADDLE_HEIGHT/2) || (sphere.position.y >= paddleCPU.position.y - PADDLE_HEIGHT/2))){
    ballDirX = -ballDirX;
  }
  if (paddlePlayer.position.x == sphere.position.x && ((sphere.position.y <= paddlePlayer.position.y + PADDLE_HEIGHT/2) || (sphere.position.y >= paddlePlayer.position.y - PADDLE_HEIGHT/2))){
    ballDirX = -ballDirX;
  }
}

function draw(){
  // Draw!
  renderer.render(scene, camera);

  // Schedule the next frame
  requestAnimationFrame(draw);

  sphere.position.x += ballSpeed * ballDirX;
  if (sphere.position.x == PLANE_WIDTH/2 || sphere.position.x == -PLANE_WIDTH/2){
    score();
    sphere.position.x = ballSpeed * ballDirX;
  }
  sphere.position.y += ballSpeed * ballDirY;
  if (sphere.position.y == PLANE_HEIGHT/2 || sphere.position.y == -PLANE_HEIGHT/2){
    ballDirY = -ballDirY;
    score();
  }
  if (Key.isDown(Key.A)){
    if (paddlePlayer.position.y <= ((PLANE_HEIGHT/2) - PADDLE_HEIGHT/2)){
      paddlePlayer.position.y += 1 * paddleSpeed;
    }
  }
  if (Key.isDown(Key.D)){
    if (paddlePlayer.position.y >= ((-PLANE_HEIGHT/2) + PADDLE_HEIGHT/2)){
      paddlePlayer.position.y -= 1 * paddleSpeed;
    }
  }
}
