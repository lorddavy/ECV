//Graphics Variables
var renderer; //the thing that draws
var scene; //this contains all objects
var camera; //this is where we look from
var cameraControl;

//Canvas
var c_width = window.innerWidth * 0.95;
var c_heigth = window.innerHeight * 0.95;

//Movement
var ROT_SPEED = 0.002;
var angle = 0;
var orbit = 20;

//View
var v_cabin = false;
var v_out = false;

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
	 camera.position.x = 5;
	 camera.position.y = 10;
	 camera.position.z = 5;


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
	createDirectionalLight(100, 10, 100);
	createDirectionalLight(-100, 10, -100);
    //createEnviroment();
    
    
	loadObject('3Dmodels/', 'spaceship/', 'Wraith_Raider_Starship', 'spaceship');
    //loadObject('3Dmodels/', 'tableandchair/', 'tableAndChair', 'tableandchair');

    
    //var model = scene.getObjectByName('spaceship');
    //camera.lookAt(model.position);

	
	//camera.lookAt(scene.position);
	cameraControl = new THREE.OrbitControls(camera, renderer.domElement);

	//document.querySelector("#graphicsArea").appendChild(renderer.domElement);
    document.body.appendChild(renderer.domElement);
	render();
}

function render() {
	//render the scene
	renderer.render(scene, camera);
	requestAnimationFrame(render);
}

init();

