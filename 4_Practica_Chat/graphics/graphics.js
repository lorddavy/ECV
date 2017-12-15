/*var GRAPHICS = {};

GRAPHICS.createRenderer = function() {
    
}*/

var renderer; //the thing that draws
var scene; //this contains all objects
var camera; //this is where we look from
var cameraControl;
var canvas;
var c_width = window.innerWidth*0.45;
var c_heigth = window.innerHeight*0.75;

function createRenderer() {
	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(0x000000, 1.0); //makes the screen black
	renderer.setSize(c_width, c_heigth);
	renderer.shadowMap.enabled = true;
}

function createCamera() {
	camera = new THREE.PerspectiveCamera(
		45,
		c_width / c_heigth,
		0.1, 1000);
	camera.position.x = 90;
	camera.position.y = 32;
	camera.position.z = 32;
	camera.lookAt(scene.position);
}

function createBox(){
	var boxGeometry = new THREE.BoxGeometry(6,4,6); //height width depth
	var boxMaterial = new THREE.MeshLambertMaterial({
		color: "red"
	});
	var box = new THREE.Mesh(boxGeometry, boxMaterial);
	box.castShadow = true;
	scene.add(box);
}

function createPlane() {
	var planeGeometry = new THREE.PlaneGeometry(20, 20);
	var planeMaterial = new THREE.MeshLambertMaterial({
		color: 0xcccccc
	});
	var plane = new THREE.Mesh(planeGeometry, planeMaterial);
	plane.receiveShadow = true;
	plane.rotation.x = -0.5 * Math.PI;
	plane.position.y = -2;
	scene.add(plane);
}

function createLight() {
	var spotLight = new THREE.SpotLight(0xffffff);
	spotLight.position.set(10, 20, 20);
	spotLight.shadowCameraNear = 20;
	spotLight.shadowCameraFar = 50;
	spotLight.castShadow = true;
	scene.add(spotLight);
}

function createDirectionalLight() {
	var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
	directionalLight.position.set(100, 10, -50);
	directionalLight.name = 'directional';
	scene.add(directionalLight);

	var ambientLight = new THREE.AmbientLight(0x111111);
	scene.add(ambientLight);
}

function createEarthMaterial() {
	var earthTexture = new THREE.Texture();
	var loader = new THREE.ImageLoader();
	loader.load('./data/earth.jpg', function(image){
		earthTexture.image = image;
		earthTexture.needsUpdate = true;
	});

	var normalTexture = new THREE.Texture();
	var loader = new THREE.ImageLoader();
	loader.load('./data/earth.normalmap.jpg', function(image){
		normalTexture.image = image;
		normalTexture.needsUpdate = true;
	});

	var specularTexture = new THREE.Texture();
	var loader = new THREE.ImageLoader();
	loader.load('./data/earth.specularmap.jpg', function(image){
		specularTexture.image = image;
		specularTexture.needsUpdate = true;
	});

	var earthMaterial = new THREE.MeshPhongMaterial();
	earthMaterial.map = earthTexture;

	earthMaterial.normalMap = normalTexture;
	earthMaterial.normalScale = new THREE.Vector2(1.0, 1.0);

	earthMaterial.specularMap = specularTexture;
	earthMaterial.specular = new THREE.Color(0x262626);
	earthMaterial.shininess = 30;

	return earthMaterial;
}

function createCloudsMaterial() {
		var cloudsTexture = new THREE.Texture();
		var loader = new THREE.ImageLoader();
		loader.load('./data/clouds.png', function(image){
			cloudsTexture.image = image;
			cloudsTexture.needsUpdate = true;
			cloudsTexture.transparent = true;
		});

		var cloudsMaterial = new THREE.MeshPhongMaterial();
		cloudsMaterial.map = cloudsTexture;
		cloudsMaterial.transparent = true;

		return cloudsMaterial;
}

function createEarth(){
	var sphereGeometry = new THREE.SphereGeometry(15, 32, 32);
	var sphereMaterial = createEarthMaterial();
	var earthMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
	earthMesh.name = 'earth';
	scene.add(earthMesh);
}

function createClouds(){
	var sphereGeometry = new THREE.SphereGeometry(15.1, 32, 32);
	var sphereMaterial = createCloudsMaterial();
	var cloudsMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);

	cloudsMesh.name = 'clouds';
	scene.add(cloudsMesh);
}

function createEnviroment(){
	// create the geometry sphere
	var envGeometry = new THREE.SphereGeometry(90, 32, 32)
	// create the material, using a texture of startfield
	var envMaterial = new THREE.MeshBasicMaterial()
	envMaterial.map = THREE.ImageUtils.loadTexture('./data/stars.png')
	envMaterial.side = THREE.BackSide
	// create the mesh based on geometry and material
	var mesh = new THREE.Mesh(envGeometry, envMaterial);
	scene.add(mesh);

}

//Devuelve posición de la camara
function getCameraPosition ()
{
    cameraPos = [Math.round(camera.position.x), Math.round(camera.position.y), Math.round(camera.position.z)] ;
    return cameraPos
}
//Cambia posición de la camara
function setCameraPosition (cameraPos)
{
    camera.position.x = Math.round(cameraPos[0]);
	camera.position.y = Math.round(cameraPos[1]);
	camera.position.z = Math.round(cameraPos[2]);
}

function init() {
	scene = new THREE.Scene();

	//initialise all of our objects
	createRenderer();
	createCamera();
	//createBox();
	//createPlane();
	createEarth();
	createClouds();
	//createLight();
	createDirectionalLight();
	createEnviroment();

	cameraControl = new THREE.OrbitControls(camera, renderer.domElement);

	document.querySelector("#graphicsArea").appendChild(renderer.domElement);
	render();
}

function render() {
	//render the scene
	renderer.render(scene, camera);
	requestAnimationFrame(render);

	cameraControl.update();
	var ROT_SPEED = 0.002;
	scene.getObjectByName('earth').rotation.y += ROT_SPEED;
	scene.getObjectByName('clouds').rotation.y += ROT_SPEED;
}
function update(){
   
}

init();

