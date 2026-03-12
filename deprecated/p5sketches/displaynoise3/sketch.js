//vars
var count=0;
var wave_count = 0;
var wave_inc = 0.3;

var point_buffer=[];
var multiplier = 10;
var multiplier2 = 0.5;
var multiplier3 = 2;

var noise_buffer = [];
var noise_count = -1;
var noise_row_toggle = true;

let scolors = [90,190,255];
let img_width = 18;
let img_height = 30;


//set main screen
function setup() {

	createCanvas(128, 64);
	frameRate(50);
}


//the actions
function draw() {

	background(0);

	fill(scolors[0], scolors[1], scolors[2]);
	stroke(scolors[0], scolors[1], scolors[2]);

	var posy;
	let wave1 = Math.round(Math.sin( wave_count * multiplier2)*2);//*(count/20))
	let wave2 = Math.round(Math.sin((wave_count))*2);
	let wave3 = Math.round(Math.tan( Math.sin(second()*multiplier2) )*2)

	posy = (wave1*wave2)+wave3;

	//posy *=Math.round(Math.atan((count+30)/multiplier)*3)
	//posy -=Math.round(Math.tan((count*multiplier2)/multiplier3))
	//posy +=Math.round(Math.sin((count*second())/multiplier3)*3)

	point_buffer.unshift([count, height*0.5+posy])

	if(point_buffer.length>width){
		point_buffer.pop();
	}

	//draws the random points on top and left
	for(var i=0;i<point_buffer.length;i++){

		point(point_buffer[i][0]+Math.random()*width/2, point_buffer[i][1]/5);

		if(random(0,10)>9)
			point(10+random(0,4), point_buffer[i][1]+random(-10,60));
	}

	for(var k=0;k<height;k++){
		var half_width = Math.min(12-Math.floor(posy), width/3);
		if(posy<4 || k%2==0){
			continue;
		}
		var extra = (k>=point_buffer.length)? 0 : (point_buffer[k][1]-(height/2))*0.6;

		line(width/2-half_width+extra, k, width/2+half_width+extra,k )
	}

	if(posy>2){
		draw_noise(posy);
	}else{
		rect(Math.round( (width-img_width)/2), Math.round( (height-img_height)/2)-wave3+wave2+wave1, img_width, img_height);
	}

	count+=1;
	wave_count += wave_inc;

	//if count is passed the width of the screen, reset
	if(count>width){
		count=0;
		wave_count = 0;
		multiplier = 10+Math.random()*10;
		multiplier2 = 0.1+20/random(1,20);
		multiplier3 = 2+Math.random()*100;
	}
}


function draw_noise(amplifier){

	var local_buffer;
	if( noise_count<2 && noise_count >= 0 ){

	}else{
		noise_row_toggle = !noise_row_toggle;
		noise_count = -1;
		noise_buffer = [];
		for(var i=0; i< height*width; i++){
			var test_pixel = Math.random() * 100 > Math.min(99,800/amplifier);
			var ypos = Math.floor(i/width);
			if(ypos==amplifier){
				continue;
			}

			if(test_pixel){
				var xpos = i%width;
				noise_buffer.push([ xpos, ypos ]);
			}
		}

	}

	for(var i=0; i< noise_buffer.length; i++){
		point(noise_buffer[i][0], noise_buffer[i][1]);
	}
	noise_count++

}
