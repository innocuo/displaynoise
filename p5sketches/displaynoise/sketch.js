function setup() {
  createCanvas(128, 64);
}

var linepos = 0;
var linepos_speed = 4;

var linepos2 = 0;
var linepos2_speed = 6;

var linepos3 = 0;
var linepos3_speed = 4;

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
	linepos3_speed = Math.max(1, linepos3_speed-0.2);
	if(linepos3>64){
		linepos3 = 0;
		linepos3_speed = 4;
	}

	background(0);
  noFill();

	stroke(200, 200, 255);
	line(0, linepos, 128, linepos);
	line(0, linepos2, 128, linepos2);
	line(0, linepos3, 128, linepos3);

}
