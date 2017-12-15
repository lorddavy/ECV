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