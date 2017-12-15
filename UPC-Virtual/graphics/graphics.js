//Graphics Variables
var renderer; //the thing that draws
var scene; //this contains all objects
var camera; //this is where we look from
var cameraControl;

//Canvas
var c_width = window.innerWidth * 0.64;
var c_heigth = window.innerHeight * 0.75;

//Movement
var ROT_SPEED = 0.002;
var angle = 0;
var orbit = 20;

//View
var v_cabin = false;
var v_out = false;

function setCabin(){
	if (v_cabin){
		v_cabin = false;
		v_out = true;
	}else{
		v_cabin = true;
		v_out = false;
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
		0.01, 10000);
	// camera.position.x = 0;
	// camera.position.y = orbit + 30;
	// camera.position.z = 0;

	camera.position.x = 0;
	camera.position.y = orbit + 0.72;
	camera.position.z = 0.50;

	//camera.lookAt(scene.position);
}

function getCameraPosition (){
	//cameraPos = [Math.round(camera.position.x), Math.round(camera.position.y), Math.round(camera.position.z)] ;
	cameraPos = [camera.position.x, camera.position.y, camera.position.z];
	return cameraPos;
}

function setCameraPosition (cameraPos){   
	camera.position.x = Math.round(cameraPos[0]);
	camera.position.y = Math.round(cameraPos[1]);
	camera.position.z = Math.round(cameraPos[2]);
	camera.lookAt(scene.position);
}

function getPosition(id){
	for (var i = 0, len = posiciones.length; i < len; i++) {
		if(posiciones[i][0] == id)
				cameraPos = posiciones[i][1];
	}
	return cameraPos
}

function setPosition(id, cameraPos){
	posiciones.push([id, cameraPos]);
	;
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
	// var point = new THREE.Mesh(sphereGeometry, new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 }));
	var point = new THREE.Mesh(sphereGeometry, new THREE.MeshBasicMaterial());
	point.name = 'pointL';
	scene.add(point);
	var sphereGeometry = new THREE.SphereGeometry(0.1, 32, 32);
	var point = new THREE.Mesh(sphereGeometry, new THREE.MeshBasicMaterial());
	point.name = 'pointU';
	scene.add(point);
	console.log('spheres');
}

function loadObject(o_base, o_path, o_name, id){
	var mtlLoader = new THREE.MTLLoader();
	mtlLoader.setBaseUrl( o_base + o_path);
	mtlLoader.setPath( o_base + o_path );
	mtlLoader.load( o_name + '.mtl', function( materials ) {

		materials.preload();

		var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials( materials );
		objLoader.setPath( o_base + o_path );
		objLoader.load( o_name + '.obj', function ( object ) {
			var SCALE = 1/100;
			object.scale.set(SCALE,SCALE,SCALE);
			object.position.y = 20;
			object.name = id;
			scene.add( object );
		} );
	});
}

function init() {
	scene = new THREE.Scene();

	createRenderer();
	createCamera();
	//createAxis();
	createSpheres();
	createEarth();
	createClouds();
	createDirectionalLight(100, 10, 100);
	createDirectionalLight(-100, 10, -100);
	loadObject('3Dmodels/', 'spaceship/', 'Wraith_Raider_Starship', 'spaceship');
	//createEnviroment();
	
	//camera.lookAt(scene.position);

	
	angle += ROT_SPEED*3;
	
	var rad = orbit + 10;
	var delta = Math.acos(orbit/rad)+0;
	
	mypointL = scene.getObjectByName('pointL');
	mypointL.position.x = 0;
	mypointL.position.y = rad * Math.cos(angle+delta);
	mypointL.position.z = rad * Math.sin(angle+delta);


	cameraControl = new THREE.OrbitControls(camera, renderer.domElement);

	document.querySelector("#graphicsArea").appendChild(renderer.domElement);
	render();
}

function spaceshipCamera(dy, dz, dphi, dangle, free){
/*
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
	
	if (free == false){
		camera.position.x = spaceship.position.x;
		camera.position.y = orbit2 * Math.cos(angle + phi);
		camera.position.z = orbit2 * Math.sin(angle + phi);
		var newUp = spaceship.position.normalize();
		camera.up.set(newUp.x, newUp.y, newUp.z);
		camera.lookAt(mypointL.position);
	}
*/
}

function render() {
	//render the scene
	renderer.render(scene, camera);
	requestAnimationFrame(render);
	
	scene.getObjectByName('earth').rotation.y += ROT_SPEED;
	scene.getObjectByName('clouds').rotation.y += ROT_SPEED*1.2;

	if (v_cabin)
		spaceshipCamera(-0.08, 0.78, 1, 1, false);
	else if (v_out)
		spaceshipCamera(5, -5, -1, 0, false);
	else{
		spaceshipCamera(5, -5, -1, 0, true);
		
	}

	camera.lookAt(mypointL.position);
}

init();

