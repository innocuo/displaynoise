var noise_row_toggle = 0;
var noise_row_buffer = [];
var init_noise_row_pos;

function setup() {
	createCanvas(128, 64);
	frameRate(35);
	for(var i=0;i<30;i++){
		noise_row_buffer.push(0);
	}
	init_noise_row_pos =  width/2-10;
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
		var should_create = Math.random()*100 > 50;
		if(should_create){
			var line_length = 1 + Math.round(Math.random()*1);

			line(i, 0, i+line_length, 0);

			row_buffer.push([i,0, line_length]);
			i = i+ line_length;
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

	var regenerate = Math.random()>0.7;
	if(regenerate){
		side_buffer = [];
		for(var k=0;k<height;k++){
			var side_length = 4+Math.round(Math.random()*2);
			line(0,k, side_length, k);
			side_buffer.push([k, side_length])
		}
		delay_side = 0;
	}else{
		side_buffer.pop();
		side_buffer.unshift([-1, 4+Math.round(Math.random()*2)])
		for(var k=0;k<side_buffer.length;k++){
			side_buffer[k][0]+=1;
			side_buffer[k][1]+= (Math.random()>0.5? Math.round(Math.random()*1):-1);
			line(0,side_buffer[k][0], side_buffer[k][1], side_buffer[k][0]);
		}
	}

	noise_row_toggle++;
	if(noise_row_toggle>4){
		if(noise_row_toggle>9){
			noise_row_toggle = 0;
		}
		if(regenerate){
			noise_row_buffer = noise_row_buffer.map(function(item){
				return 0;
			});
		}
		var distort_lines = Math.random()>0.8;
		for(var i=0;i<noise_row_buffer.length;i++){
		 	var extra = (Math.random()>0.7? -5:2);
			if(noise_row_buffer[i]+extra> 90 || noise_row_buffer[i]+extra < -92){
				extra = -extra*2;
			}
			// if(i==0){
			// 	console.log(noise_row_buffer[i])
			// }
			noise_row_buffer[i] += extra;

			var line_x = init_noise_row_pos + noise_row_buffer[i];
			if(distort_lines){
				var distort1 = Math.round(Math.random()*10);
				var distort2 = distort1+3;
				line(line_x-distort2,height/2-15+i+distort1, line_x+20+distort2, height/2-15+i+distort2);
			}else{
				line(line_x,height/2-15+i, line_x+20, height/2-15+i);
			}
		}
		// rect(width/2-10, height/2-15, 20,30);
	}
}
