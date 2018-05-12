var noise_row_toggle = true;
var noise_row_buffer = [];

function setup() {
	createCanvas(128, 64);
	frameRate(40);
	for(var i=0;i<30;i++){
		noise_row_buffer.push(0);
	}
}

var noise_buffer = [];
var side_buffer = [];
var delay_side = 0;

function draw() {
	background(0);
	fill(200, 200, 255);

	stroke(200, 200, 255);

	var row_buffer = [];

	for( var i=0; i<width; i++){
		var should_create = Math.random()*100 > 10;
		if(should_create){
			var line_length = 1 + Math.round(Math.random()*(width*0.05));

			line(i, 0, i+line_length, 0);

			row_buffer.push([i,0, line_length]);
			i = i+ line_length+3;
		}
	}

	for(var j=noise_buffer.length-1; j>=0; j--){
		var new_pos = noise_buffer[j][1] +2;
		if(new_pos > height){
			noise_buffer.pop();
		}else{
			noise_buffer[j][1] = new_pos;
			noise_buffer[j][0]+= (Math.random()>0.5? 2:-2);
			line(noise_buffer[j][0]+1, noise_buffer[j][1], noise_buffer[j][0]+noise_buffer[j][2], noise_buffer[j][1]);
		}
	}
	noise_buffer = row_buffer.concat( noise_buffer );

	delay_side++;
	if(delay_side>7){
		side_buffer = [];
		for(var k=0;k<height;k++){
			var side_length = 5+Math.round(Math.random()*(width*0.05));
			line(0,k, side_length, k);
			side_buffer.push([k, side_length])
		}
		delay_side = 0;
	}else{
		for(var k=0;k<side_buffer.length;k++){
			side_buffer[k][1]+= (Math.random()>0.5? 2:-2);
			line(0,side_buffer[k][0], side_buffer[k][1], side_buffer[k][0]);
		}
	}

	noise_row_toggle = !noise_row_toggle;

	if(noise_row_toggle){
		for(var i=0;i<noise_row_buffer.length;i++){
		 	var extra = (Math.random()>0.5? -3:2);
			if(noise_buffer[i]){
				
			}
			var line_x = width/2-10 + extra;
			line(line_x,height/2-15+i, line_x+20, height/2-15+i);
		}
		// rect(width/2-10, height/2-15, 20,30);
	}
}
