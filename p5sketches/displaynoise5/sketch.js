
const scolors = [90,190,255];

// current_post x moves from 0 to 127,
// y moves from 0 to 7
var current_pos={
	x: 0,
	y: 0
}

let curr_angle = 0;
let curr_inc = 10;


function setup() {

	c=createCanvas(128, 64);

	frameRate(1);
}


function draw() {

	background(0);
	fill(scolors[0], scolors[1], scolors[2]);
	stroke(scolors[0], scolors[1], scolors[2]);

	//there are 16 columns, 8 rows. Each "cell" is 8x8  pixels.
	//we traverse the display from left to right from top to bottom.
	//we draw pixels on vertical lines of 8 pixels.

	curr_angle = 0;

	let row_total = 8;
	let row_height = 8;

	//move from top row to bottom row
	for (let row = 0; row< row_total; row+=row_height){

		//move from left to right
		for(var col=0; col<16; col++){

			//multiplied by 8 because each col is 8 pixels wide
			moveTo(col*8,row);


			for(var block=0;block<8; block++){
				let sin1 = sin(curr_angle*PI/180);
				//console.log(curr_angle, sin1)
				//console.log(sin1)
				curr_angle += (get_inc()) ;
				if(curr_angle>360){
					curr_angle = curr_angle-360;
				}

				let wave_val = sin1+1; //now values go from 0 to 2;
				let pixel_pos = (int(wave_val*((row_total*row_height)-1)/2));

				let cache_pos = {x: current_pos.x, y: current_pos.y };

				for(let ii=0; ii<row_height; ii++){
					let pixel_divided = pixel_pos%8 ;

					moveTo(cache_pos.x, cache_pos.y + (row_height-ii-1));

					if(ii == int( pixel_pos/8 ) ){
						send( 1<< pixel_divided);
					}else{
						send( 0 );
					}

				}

				moveTo(cache_pos.x, cache_pos.y);

				moveToNext();
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

function moveToNext(){

	//after displaying the data, move the position 1 pixel to the right
	current_pos.x += 1;

	//if it's reached the end of the screen, move down one row,
	//and reset x pos to 0
	//we're working on a 64x128 screen
	if(current_pos.x > 127){
		moveTo (0, current_pos.y + 1);
	}
}

function send( byte ) {

	for(var i=7;i>=0;i--){
		if((byte >> i) & 1){
			point(current_pos.x, (8*current_pos.y) + (7-i));
		}
	}
}

function sendAndMove( byte ){

	send( byte );
	moveToNext();
}
