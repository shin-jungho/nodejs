console.log(this); 

function a() {
  console.log(this === global);
}

a();