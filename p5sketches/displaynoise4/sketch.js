
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
let curr_angle = 0;
let curr_inc = 44.5;
let sinlimit = 0.8;

let curr_angle2 = 0;
let curr_inc2 = 90.5;
let sin2_multiplier = 45;
function setup() {
	c=createCanvas(128, 64);

	frameRate(22);

	//curr_inc = TWO_PI / 25.0;

}


function draw() {
	background(0);
	fill(scolors[0], scolors[1], scolors[2]);
	stroke(scolors[0], scolors[1], scolors[2]);


	for (let row = 0; row<8; row++){
		let sin2 = sin(curr_angle2*PI/180);
		//console.log(curr_angle, sin1)
		//console.log(sin1)
		curr_angle2 += (curr_inc2);
		if(curr_angle2>360){
			curr_angle2 = curr_angle2-360;
		}

		let curr_angle = 180+(row*22) + (sin2*sin2_multiplier);

		for(var col=0;col<16; col++){

			moveTo(col*8,row);
			//let rand1 = random(0,255);
			//for(var block=0; block<8; block++){
			//	if(rand1 > 200){
			//		send( rand1);
			//	}
			//}

			// let rand1 = int(random(0,4));
			// for(var block=0; block<8; block++){
			// 	if(rand1 == 2){
			// 		send( 0x55);
			// 	}else if(rand1 == 1){
			// 		send(0x55<<block);
			// 	}else if(rand1 == 0){
			// 		send(0x55>>block);
			// 	}else if(rand1 == 4){
			// 		send( 0x00);
			// 	}
			// }


			// for(var block=0; block<8; block++){
			// 	let sin1 = sin(curr_angle);
			// 	curr_angle += (get_inc());
			// 	if(curr_angle>TWO_PI){
			// 		curr_angle = 0;
			// 	}
			//
			// 	if(sin1>0) send(0xff | (sin1*curr_inc))
			// }


			for(var block=0;block<8; block++){
				let sin1 = sin(curr_angle*PI/180);
				//console.log(curr_angle, sin1)
				//console.log(sin1)
				curr_angle += (get_inc());
				if(curr_angle>360){
					curr_angle = curr_angle-360;
				}

				if(abs(sin1)>sinlimit && sin1>0) send(0x0 | sin1*(sin2*88) )
				if(abs(sin1)>sinlimit && sin1<0) send(0x0 )
				if(abs(sin1)<sinlimit ) send(0x00 )
			}
		}
	}
}

function get_inc(){
	return curr_inc;
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


function keyPressed() {
	switch(key){
		case 'J':
			curr_inc+=0.5;
		break;
		case 'K':
			curr_inc-=0.5;
		break;
		case 'U':
			sinlimit+=0.01;
		break;
		case 'I':
			sinlimit-=0.01;
		break;

		case 'G':
			curr_inc2+=0.5;
		break;
		case 'H':
			curr_inc2-=0.5;
		break;
		case 'T':
			sin2_multiplier+=0.5;
		break;
		case 'Y':
			sin2_multiplier-=0.5;
		break;
	}
	console.log (curr_inc, sinlimit, curr_inc2, sin2_multiplier)
}
