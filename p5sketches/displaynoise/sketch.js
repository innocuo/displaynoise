function setup() {
  createCanvas(128, 64);
}

var linepos = 0;
var linepos_speed = 4;

var linepos2 = 0;
var linepos2_speed = 6;

var linepos3 = 0;
var linepos3_speed = 9;

function draw() {

	linepos += linepos_speed;
	linepos_speed = Math.max(1, linepos_speed-0.21);
	if(linepos>64){
		linepos = 0;
		linepos_speed = 4;
	}

	linepos2+= linepos2_speed;
	linepos2_speed = Math.max(1, linepos2_speed-0.4);
	if(linepos2>64){
		linepos2 = 0;
		linepos2_speed = 6;
	}

	linepos3+= linepos3_speed;
	linepos3_speed = Math.max(3, linepos3_speed-0.2);
	if(linepos3>64){
		linepos3 = 0;
		linepos3_speed = 9;
	}

	background(0);
  fill(200, 200, 255);

	stroke(200, 200, 255);
	rect(0, linepos, 128, 2);
	rect(0, linepos2, 128, 1);
	rect(0, linepos3, 128,  3);
	draw_noise();
}

var noise_buffer = [];
var noise_count = -1;
function draw_noise(){
	var local_buffer;
	if( noise_count<2 && noise_count >= 0 ){

	}else{

		noise_count = -1;
		noise_buffer = [];
		for(var i=0; i< 64*128; i++){
			var test_pixel = Math.random() * 100 > 70;
			var ypos = Math.floor(i/128);
			if(ypos%3 == 0 || ypos%6.5 == 0 || ypos%4==0){
				continue;
			}
			if(test_pixel){
				var xpos = i%128;
				noise_buffer.push([ xpos, ypos ]);
			}
		}

	}

	for(var i=0; i< noise_buffer.length; i++){
		point(noise_buffer[i][0], noise_buffer[i][1]);
	}
	noise_count++

}
