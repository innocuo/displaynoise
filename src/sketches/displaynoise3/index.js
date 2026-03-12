export function createSketch() {
  return function(p) {
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

	p.createCanvas(128, 64);
	p.frameRate(50);
}


//the actions
function draw() {

	p.background(0);

	p.fill(scolors[0], scolors[1], scolors[2]);
	p.stroke(scolors[0], scolors[1], scolors[2]);

	var posy;
	let wave1 = Math.round(Math.sin( wave_count * multiplier2)*2);//*(count/20))
	let wave2 = Math.round(Math.sin((wave_count))*2);
	let wave3 = Math.round(Math.tan( Math.sin(p.second()*multiplier2) )*2)

	posy = (wave1*wave2)+wave3;

	//posy *=Math.round(Math.atan((count+30)/multiplier)*3)
	//posy -=Math.round(Math.tan((count*multiplier2)/multiplier3))
	//posy +=Math.round(Math.sin((count*p.second())/multiplier3)*3)

	point_buffer.unshift([count, p.height*0.5+posy])

	if(point_buffer.length>p.width){
		point_buffer.pop();
	}

	//draws the random points on top and left
	for(var i=0;i<point_buffer.length;i++){

		p.point(point_buffer[i][0]+Math.random()*p.width/2, point_buffer[i][1]/5);

		if(p.random(0,10)>9)
			p.point(10+p.random(0,4), point_buffer[i][1]+p.random(-10,60));
	}

	for(var k=0;k<p.height;k++){
		var half_width = Math.min(12-Math.floor(posy), p.width/3);
		if(posy<4 || k%2==0){
			continue;
		}
		var extra = (k>=point_buffer.length)? 0 : (point_buffer[k][1]-(p.height/2))*0.6;

		p.line(p.width/2-half_width+extra, k, p.width/2+half_width+extra,k )
	}

	if(posy>2){
		draw_noise(posy);
	}else{
		p.rect(Math.round( (p.width-img_width)/2), Math.round( (p.height-img_height)/2)-wave3+wave2+wave1, img_width, img_height);
	}

	count+=1;
	wave_count += wave_inc;

	//if count is passed the p.width of the screen, reset
	if(count>p.width){
		count=0;
		wave_count = 0;
		multiplier = 10+Math.random()*10;
		multiplier2 = 0.1+20/p.random(1,20);
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
		for(var i=0; i< p.height*p.width; i++){
			var test_pixel = Math.random() * 100 > Math.min(99,800/amplifier);
			var ypos = Math.floor(i/p.width);
			if(ypos==amplifier){
				continue;
			}

			if(test_pixel){
				var xpos = i%p.width;
				noise_buffer.push([ xpos, ypos ]);
			}
		}

	}

	for(var i=0; i< noise_buffer.length; i++){
		p.point(noise_buffer[i][0], noise_buffer[i][1]);
	}
	noise_count++

}


    p.setup = setup;
    p.draw = draw;
    if (typeof keyPressed === 'function') {
      p.keyPressed = keyPressed;
    }
  };
}

