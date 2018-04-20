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

var score1 = 0, score2 = 0, maxScore = 3;

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

const COLUM_RIGHT_WIDTH =  20,
      COLUM_RIGHT_HEIGHT =  20,
      COLUM_RIGHT_DEPTH = 50;

const COLUM_LEFT_WIDTH =  20,
      COLUM_LEFT_HEIGHT =  20,
      COLUM_LEFT_DEPTH = 50;

var   playerPaddleDirY = 0,
      cpuPaddleDirY = 0,
      paddleSpeed = 3;

var   playerPaddle,
      cpuPaddle;

var ballDirX = 1, ballDirY = 1, ballSpeed = 2, constballSpeed = ballSpeed;

// GAME FUNCTIONS

function setup()
{
    createScene();
      addSphereMesh();
      addPlaneMesh();
      addPaddleMeshPlayer();
      addPaddleMeshCPU();
      addColumMeshRight();
      addColumMeshLeft();
      addLight();
      //score();
      //rebound();
      //paddleCPUmov();
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
        color: '#C5FF00'
      });

      // Create a new mesh with sphere geometry
  		sphere = new THREE.Mesh(geometry, material);

      // Move the Sphere back in Z so we can see it
      sphere.position.z = -296;

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
}

function addColumMeshRight(){
  var geometry = new THREE.BoxGeometry(COLUM_RIGHT_WIDTH, COLUM_RIGHT_HEIGHT, COLUM_RIGHT_DEPTH);
  var material = new THREE.MeshLambertMaterial(
      {
        color: '#26D190'
      });
  columRight1 = new THREE.Mesh( geometry, material );
  scene.add( columRight1 );
  columRight1.position.z = -300;
  columRight1.position.y = -120;
  columRight1.position.x = -120;

  columRight2 = new THREE.Mesh( geometry, material );
  scene.add( columRight2 );
  columRight2.position.z = -300;
  columRight2.position.y = -120;
  columRight2.position.x = 0;

  columRight3 = new THREE.Mesh( geometry, material );
  scene.add( columRight3 );
  columRight3.position.z = -300;
  columRight3.position.y = -120;
  columRight3.position.x = 120;
}

function addColumMeshLeft(){
  var geometry = new THREE.BoxGeometry(COLUM_LEFT_WIDTH, COLUM_LEFT_HEIGHT, COLUM_LEFT_DEPTH);
  var material = new THREE.MeshLambertMaterial(
      {
        color: '#26D190'
      });
  columLEFT1 = new THREE.Mesh( geometry, material );
  scene.add( columLEFT1 );
  columLEFT1.position.z = -300;
  columLEFT1.position.y = 120;
  columLEFT1.position.x = 120;

  columLEFT2 = new THREE.Mesh( geometry, material );
  scene.add( columLEFT2 );
  columLEFT2.position.z = -300;
  columLEFT2.position.y = 120;
  columLEFT2.position.x = 0;

  columLEFT3 = new THREE.Mesh( geometry, material );
  scene.add( columLEFT3 );
  columLEFT3.position.z = -300;
  columLEFT3.position.y = 120;
  columLEFT3.position.x = -120;
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
  if (sphere.position.x >= PLANE_WIDTH/2){
    score1 += 1;
    console.log("gol");
    ballSpeed = constballSpeed
    console.log(constballSpeed);
    document.getElementById("scores").innerHTML = (score1) + "-" + (score2 + 0);
  }
  if (sphere.position.x <= -PLANE_WIDTH/2){
    score2 += 1;
    console.log("gol");
    ballSpeed = constballSpeed
    console.log(constballSpeed);
    document.getElementById("scores").innerHTML = (score1 + 0) + "-" + (score2);
  }
  if (score1 == maxScore){
    window.alert("Has ganado, maquina!");
    score1 = 0;
    score2 = 0;
    document.getElementById("scores").innerHTML = (score1) + "-" + (score2);
  }
  else if (score2 == maxScore) {
    window.alert("Has perdido! Refresca para volver a intentarlo");
    score1 = 0;
    score2 = 0;
    document.getElementById("scores").innerHTML = (score1) + "-" + (score2);
  }
  document.getElementById("winnerBoard").innerHTML = "First to " + maxScore + " wins!"
}

function rebound(){
  if (sphere.position.x >= paddleCPU.position.x){
     if ((sphere.position.y <= (paddleCPU.position.y + PADDLE_HEIGHT/2)) && (sphere.position.y >= (paddleCPU.position.y - PADDLE_HEIGHT/2))){
       console.log("rebote")
       ballDirX = -ballDirX;
       ballSpeed = ballSpeed + 0.1;
       console.log(ballSpeed);
    }
  }
  if (sphere.position.x <= paddlePlayer.position.x){
     if ((sphere.position.y <= (paddlePlayer.position.y + PADDLE_HEIGHT/2)) && (sphere.position.y >= (paddlePlayer.position.y - PADDLE_HEIGHT/2))){
       console.log("rebote")
       ballDirX = -ballDirX;
       ballSpeed = ballSpeed + 0.1;
       console.log(ballSpeed);
    }
  }
}

function paddleCPUmov(){
  // set opponent reaction rate (0-easiest, 1-hardest)
  var difficulty = 0.2;
  cpuPaddleDirY = (sphere.position.y - paddleCPU.position.y) * difficulty;
  paddleCPU.position.y += cpuPaddleDirY;
}

function paddlePlayerMov(){
  // Movimiento pala del jugador
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

function sphereMov(){
  // Movimiento de la pelota
  sphere.position.x += ballSpeed * ballDirX;
  if (sphere.position.x >= PLANE_WIDTH/2 || sphere.position.x <= -PLANE_WIDTH/2){
    score();
    sphere.position.x = 0;
    ballDirX = -ballDirX;
  }
  sphere.position.y += ballSpeed * ballDirY;
  if (sphere.position.y >= PLANE_HEIGHT/2 || sphere.position.y <= -PLANE_HEIGHT/2){
    ballDirY = -ballDirY;
    sphere.position.y += ballSpeed * ballDirY;
    ballSpeed = ballSpeed + 0.1;
  }
}

  function paddlePlayerCamera(){
    camera.position.x = paddlePlayer.position.x - 150;
    camera.position.z = paddlePlayer.position.z + 50;
    camera.rotation.y = -Math.PI/2;
    camera.rotation.z = -Math.PI/2;;
    camera.rotation.x = 0;
    renderer.render(scene, camera);
  }

  function sphereSpeed(){
    // Incremento velocidad pelota en rebote
    if (ballSpeed >= constballSpeed * 2){
      ballSpeed = constballSpeed * 2;
    }
  }

function draw(){
  // Draw!
  //renderer.render(scene, camera);

  paddlePlayerCamera();

  // Schedule the next frame
  requestAnimationFrame(draw);

  rebound();

  sphereMov();

  paddlePlayerMov();

  paddleCPUmov();

  sphereSpeed();

}
