/*var GRAPHICS = {};

GRAPHICS.createRenderer = function() {
    
}*/

var renderer; //the thing that draws
var scene; //this contains all objects
var camera; //this is where we look from
var cameraControl;

//var canvas;
var c_width = window.innerWidth * 0.64;
var c_heigth = window.innerHeight * 0.75;

//Movement
var ROT_SPEED = 0.002;
var angle = 0;
var orbit = 20;

//View
var v_cabin = false;
var v_out = false;
var v_free = true;

function setCabin(){
	if (v_cabin){
		v_cabin = false;
		v_out = true;
	}else{
		v_cabin = true;
		v_out = false;
		v_free = false;
	}
}

function setFreeCamera(){
	if (v_free){
		v_free = false;
		v_free = false;
	}else{
		v_free = true;
		v_cabin = false;
		v_out = true;
	}
}

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
		0.001, 10000);
	camera.position.x = 0;
	camera.position.y = orbit + 30;
	camera.position.z = 0;
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

function createDirectionalLight(x, y, z) {
	var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
	directionalLight.position.set(x, y, z);
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

function createAxis(){
    var xRed = new THREE.LineBasicMaterial({
        color: 0xff0000
    });
    var yGreen = new THREE.LineBasicMaterial({
        color: 0x00ff00
    });
    var zBlue = new THREE.LineBasicMaterial({
        color: 0x0000ff
    });

    var xGeom = new THREE.Geometry();
    xGeom.vertices.push(
        new THREE.Vector3( 0, 0, 0 ),
        new THREE.Vector3( 100, 0, 0 )
    );
    
    var yGeom = new THREE.Geometry();
    yGeom.vertices.push(
        new THREE.Vector3( 0, 0, 0 ),
        new THREE.Vector3( 0, 100, 0 )
    );
    
    var zGeom = new THREE.Geometry();
    zGeom.vertices.push(
        new THREE.Vector3( 0, 0, 0 ),
        new THREE.Vector3( 0, 0, 100 )
    );

    var xAxis = new THREE.Line( xGeom, xRed );
    var yAxis = new THREE.Line( yGeom, yGreen );
    var zAxis = new THREE.Line( zGeom, zBlue );
    scene.add( xAxis );
    scene.add( yAxis );
    scene.add( zAxis );
}

function createSpheres(){
    var sphereGeometry = new THREE.SphereGeometry(2, 32, 32);
	var point = new THREE.Mesh(sphereGeometry, new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 }));
	point.name = 'pointL';
	scene.add(point);
    var sphereGeometry = new THREE.SphereGeometry(0.1, 32, 32);
	var point = new THREE.Mesh(sphereGeometry, new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 }));
	point.name = 'pointU';
	scene.add(point);
}

function loadObject(){
	var mtlLoader = new THREE.MTLLoader();
	mtlLoader.setBaseUrl( '3Dmodels/spaceship/' );
	mtlLoader.setPath('3Dmodels/spaceship/');
	mtlLoader.load( 'Wraith_Raider_Starship.mtl', function( materials ) {

		materials.preload();

		var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials( materials );
		objLoader.setPath('3Dmodels/spaceship/' );
		objLoader.load('Wraith_Raider_Starship.obj', function ( object ) {
            var SCALE = 1/100;
            object.scale.set(SCALE,SCALE,SCALE);
            object.position.y = 20;
            object.name = 'spaceship';
			scene.add( object );
		} );
	});

}

//Manipulación array posiciones
function getPosition(id){
    
    for (var i = 0, len = posiciones.length; i < len; i++) {
        if(posiciones[i][0] == id)
            {
                cameraPos = posiciones[i][1];
            }
    }
    
    return cameraPos
}

function setPosition(id, cameraPos){
    
    posiciones.push([id, cameraPos])
}

//Manipulación de posiciones de la camara
function getCameraPosition (){
    cameraPos = [Math.round(camera.position.x), Math.round(camera.position.y), Math.round(camera.position.z)] ;
    return cameraPos
}
function setCameraPosition (cameraPos){
    
    camera.position.x = Math.round(cameraPos[0]);
	camera.position.y = Math.round(cameraPos[1]);
	camera.position.z = Math.round(cameraPos[2]);
    camera.lookAt(scene.position);
}

function init() {
	scene = new THREE.Scene();

	//initialise all of our objects
	createRenderer();
	createCamera();
    //createAxis();
    createSpheres();
	//createBox();
	//createPlane();
	createEarth();
	createClouds();
	//createLight();
	createDirectionalLight(100, 10, 100);
	//createDirectionalLight(-100, 10, -100);
	createEnviroment();
	loadObject();
    
	//cameraControl = new THREE.OrbitControls(camera);
    cameraControl = new THREE.OrbitControls(camera, renderer.domElement);


	//document.body.appendChild(renderer.domElement);
	document.querySelector("#graphicsArea").appendChild(renderer.domElement);
	render();
}


function spaceshipCamera(dy, dz, dphi, dangle){
    angle += ROT_SPEED*3;
    
    var orbit2 = Math.sqrt((orbit+dy)*(orbit+dy)+dz*dz);
    var phi = Math.acos(orbit*(orbit+dy)/(orbit*orbit2)) * dphi;
    var rad = orbit + 10;
    var delta = Math.acos(orbit/rad)+1;
    
    var spaceship = scene.getObjectByName('spaceship');
    spaceship.position.y = orbit * Math.cos(angle);
    spaceship.position.z = orbit * Math.sin(angle);
    spaceship.rotation.x = angle+dangle;
    
    mypointL = scene.getObjectByName('pointL');
    mypointL.position.x = 0;
    mypointL.position.y = rad * Math.cos(angle+delta);
    mypointL.position.z = rad * Math.sin(angle+delta);
    
    mypointU = scene.getObjectByName('pointU');
    mypointU.position.x = 0;
    mypointU.position.y = orbit2 * Math.cos(angle + phi);
    mypointU.position.z = orbit2 * Math.sin(angle + phi);
    
    
    camera.position.x = spaceship.position.x;
	camera.position.y = orbit2 * Math.cos(angle + phi);
	camera.position.z = orbit2 * Math.sin(angle + phi);
    
    camera.lookAt(mypointL.position);
    /**/
}

function freeCamera(dy, dz, dphi, dangle){
    angle += ROT_SPEED*3;
    
    var orbit2 = Math.sqrt((orbit+dy)*(orbit+dy)+dz*dz);
    var phi = Math.acos(orbit*(orbit+dy)/(orbit*orbit2)) * dphi;
    var rad = orbit + 10;
    var delta = Math.acos(orbit/rad)+1;
    
    var spaceship = scene.getObjectByName('spaceship');
    spaceship.position.y = orbit * Math.cos(angle);
    spaceship.position.z = orbit * Math.sin(angle);
    spaceship.rotation.x = angle+dangle;
    
    mypointL = scene.getObjectByName('pointL');
    mypointL.position.x = 0;
    mypointL.position.y = rad * Math.cos(angle+delta);
    mypointL.position.z = rad * Math.sin(angle+delta);
    
    mypointU = scene.getObjectByName('pointU');
    mypointU.position.x = 0;
    mypointU.position.y = orbit2 * Math.cos(angle + phi);
    mypointU.position.z = orbit2 * Math.sin(angle + phi);

	camera.lookAt(scene.position);
    
}

function cameraMatrix(p){
    var cFront = -p/Math.sqrt(p.x*p.x + p.y*p.y + p.z*p.z);
    var cSide = [-1, 0, 0];
    var cTop = [0, -cFront.z, cFront.y];
    
    camera.matrix.elements[0] = cSide[0];
    camera.matrix.elements[1] = cSide[1];
    camera.matrix.elements[2] = cSide[2];
    
    camera.matrix.elements[4] = cTop[0];
    camera.matrix.elements[5] = cTop[1];
    camera.matrix.elements[6] = cTop[2];
    
    camera.matrix.elements[8] = -cFront[0];
    camera.matrix.elements[9] = -cFront[1];
    camera.matrix.elements[10] = -cFront[2];
    
    
    
    console.log("matrix");
    
}

function simpleTest(){
    var cFront = [-1,0,0]
    var cSide = [0, 0, 1];
    var cTop = [0, 1, 0];
    
    camera.matrix.elements[0] = cSide[0];
    camera.matrix.elements[1] = cSide[1];
    camera.matrix.elements[2] = cSide[2];
    
    camera.matrix.elements[4] = cTop[0];
    camera.matrix.elements[5] = cTop[1];
    camera.matrix.elements[6] = cTop[2];
    
    camera.matrix.elements[8] = -cFront[0];
    camera.matrix.elements[9] = -cFront[1];
    camera.matrix.elements[10] = -cFront[2];
    
    camera.matrix.elements[12] = 50;
    camera.matrix.elements[13] = 50;
    camera.matrix.elements[14] = 50;
    
    camera.updateMatrixWorld(true);
    
    //console.log("matrix");
    
}

function render() {
	//render the scene
	renderer.render(scene, camera);
	requestAnimationFrame(render);
	
	scene.getObjectByName('earth').rotation.y += ROT_SPEED;
	scene.getObjectByName('clouds').rotation.y += ROT_SPEED*1.2;
    
	if (v_cabin)
		spaceshipCamera(-0.08, 0.78, 1, 1);
	else if (v_out)
		spaceshipCamera(5, -5, -1, 0);
	if (v_free)
		freeCamera(5, -5, -1, 0);

    
    
    /*
    //cameraControl.update();
    //camera.up.set(0,1,0);
    //camera.matrixAutoUpdate = false;
    //camera.matrix.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 500 + (frame * 10), 0, 0, 0, 1);
    //simpleTest();
    //camera.lookAt(scene.position);
   
    camera.position.x = 0;
	camera.position.y = (10+orbit) * Math.cos(angle);
	camera.position.z = (10+orbit) * Math.sin(angle);
    camera.up.set(camera.position)
    */
    
    
}

init();

