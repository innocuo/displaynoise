function setup() {
	createCanvas(128, 64);
	 frameRate(50);

}

var count=0;
var point_buffer=[];
var multiplier = 10;
var multiplier2 = 2;
var multiplier3 = 2;

var noise_buffer = [];
var noise_count = -1;
var noise_row_toggle = true;

function draw() {
	background(0);
	fill(200, 200, 255);

	stroke(200, 200, 255);

	var posy=Math.round(Math.sin(count/multiplier2)*(count/20))
	posy *=Math.round(Math.atan((count+30)/multiplier)*3)
	posy -=Math.round(Math.tan((count*multiplier2)/multiplier3))
	posy +=Math.round(Math.sin((count*second())/multiplier3)*3)

	point_buffer.unshift([count, height*0.5+posy])
	if(point_buffer.length>width){
		point_buffer.pop();
	}
	for(var i=0;i<point_buffer.length;i++){
		point(point_buffer[i][0]+Math.random()*width/2, point_buffer[i][1]/5);
	//	point(point_buffer[i][0], point_buffer[i][1]);
		if(random(0,10)>9) point(40+random(0,4), point_buffer[i][1]+random(-10,60));
}

	count++;
	if(count>width){
		count=0;
		multiplier = 10+Math.random()*10;
		multiplier2 = 2+Math.random()*80;
		multiplier3 = 2+Math.random()*100;
	}

	for(var k=0;k<height;k++){
		var half_width = Math.min(12-Math.floor(posy), width/3);
		if(posy<5 || k%2==0){
			continue;
		}
		var extra = (k>=point_buffer.length)? 0 : (point_buffer[k][1]-(height/2))*0.6;

		line(width/2-half_width+extra, k, width/2+half_width+extra,k )
	}

	if(posy>3){
		draw_noise(posy);
	}else{
		rect(width/2-10, height/2-15-posy/3, 20,30);
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
