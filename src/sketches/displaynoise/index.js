export function createSketch() {
  return function(p) {
    function setup() {
      p.createCanvas(128, 64);
    }

    var linepos = 0;
    var linepos_speed = 4;

    var linepos2 = 0;
    var linepos2_speed = 6;

    var linepos3 = 0;
    var linepos3_speed = 9;

    var noise_buffer = [];
    var noise_count = -1;
    var noise_row_toggle = true;

    function draw() {

		linepos += linepos_speed;
		linepos_speed = Math.max(1, linepos_speed*.9);
		if(linepos>p.height){
			linepos = 0;
			linepos_speed = p.height*.09;
		}

		linepos2+= linepos2_speed;
		linepos2_speed = Math.max(1, linepos2_speed*.9);
		if(linepos2>p.height){
			linepos2 = 0;
			linepos2_speed = p.height*.16;
		}

		linepos3+= linepos3_speed;
		linepos3_speed = Math.max(2, linepos3_speed*.9);
		if(linepos3>p.height){
			linepos3 = 0;
			linepos3_speed = p.height*.1;
		}

		p.background(0);
      p.fill(200, 200, 255);

		p.stroke(200, 200, 255);
		p.rect(0, Math.floor(linepos), p.width, 2);
		p.rect(0, Math.floor(linepos2), p.width, 1);
		p.rect(0, Math.floor(linepos3), p.width,  3);

		if(noise_row_toggle){
			p.rect(p.width/2-10, p.height/2-15, 20,30);
		}
		draw_noise();
	}

	function draw_noise(){
		var local_buffer;
		if( noise_count<2 && noise_count >= 0 ){

		}else{
			noise_row_toggle = !noise_row_toggle;
			noise_count = -1;
			noise_buffer = [];
			for(var i=0; i< p.height*p.width; i++){
				var test_pixel = Math.random() * 100 > 70;
				var ypos = Math.floor(i/p.width);
				if(noise_row_toggle){
		//			console.log(1)
					if(ypos%3 == 0 || ypos%6.5 == 0 || ypos%5==0){
						continue;
					}
				}else{
			//	console.log(2)
					if(ypos%2 == 0 || ypos%6.5 == 0 || ypos%11==0){
						continue;
					}
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
  };
}

