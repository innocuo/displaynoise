
const scolors = [90,190,255];

var count=0;
var point_buffer=[];
var multiplier = 10;
var multiplier2 = 2;
var multiplier3 = 2;

var noise_buffer = [];
var noise_count = -1;
var noise_row_toggle = true;

var capture;
var recording = false;
var c;

var current_pos={
	x: 0,
	y: 0
}
function setup() {
	c=createCanvas(128, 64);

	frameRate(3);

}

function draw() {
	background(0);
	fill(scolors[0], scolors[1], scolors[2]);
	stroke(scolors[0], scolors[1], scolors[2]);


	for (let row = 0; row<8; row++){

		for(var col=0;col<16; col++){
			moveTo(col*8,row);
			//let rand1 = random(0,255);
			//for(var block=0; block<8; block++){
			//	if(rand1 > 200){
			//		send( rand1);
			//	}
			//}

			let rand1 = int(random(0,4));
			for(var block=0; block<8; block++){
				if(rand1 == 2){
					send( 0x55);
				}else if(rand1 == 1){
					send(0x55<<block);
				}else if(rand1 == 0){
					send(0x55>>block);
				}else if(rand1 == 4){
					send( 0x00);
				}
			}
		}
	}
}


function moveTo(x, y){
	current_pos.x = x;
	current_pos.y = y;
}

function send( byte ){
	for(var i=7;i>=0;i--){
		if((byte >> i) & 1){
			point(current_pos.x, (8*current_pos.y) + (7-i));
		}
	}
	current_pos.x += 1;
	if(current_pos.x > 127){
		current_pos.x = 0;
		current_pos.y +=1;
	}
}


function mousePressed() {

}
