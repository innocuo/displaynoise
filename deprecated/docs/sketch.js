let display;
let started = false;

let mic;
const screenColor = { r: 99, g: 212, b: 255 };

let start_angle = 0; //angle at the start of each draw cycle
let wave_speed = 20;

const angle_increment_fixed = false;
let angle_increment = 1;
const segment_width = 1; //how many pixels before we change the angle, best if value is between 1 to 8

const display_width = 128;
const display_height = 64;
const display_rows = display_height/8; //how many 8px rows fit in the display
const display_cols = display_width/8; //how many 8px cols fit in the display

let wave_count = 1; //how many waves you want to draw on the display

requirejs(['modules/display'], function(qdisplay) {
  display = qdisplay;
});

function setup() {
  frameRate(45);
  c = createCanvas(display_width, display_height);
  let ac = getAudioContext();

  ac.suspend().then(function() {
    var myButton = createButton('click to start audio');
    myButton.elt.className = "start-audio-button";
    
    userStartAudio(myButton, function() {
      mic = new p5.AudioIn(); //microphone
      mic.start();

      started = true;
      myButton.remove();
    });
  });
}

let count = 0;
function draw() {
  if (!started || !display) return;

  let draw_wave_height = ceil(display_rows / wave_count); //unit is # of rows
  let draw_wave_height_in_px = draw_wave_height * 8;
  fill(screenColor.r, screenColor.g, screenColor.b);
  stroke(screenColor.r, screenColor.g, screenColor.b);

  let vol = mic.getLevel(); //value between 0.0 to 1.0

  if(!angle_increment_fixed){
    angle_increment = ( 1+floor(vol * 7719) ) % 360; // value between 1 to 360
  }
  
  let amplitude = 39 * vol; //value between 0 to 20, more volume, more amplitude;
  let y_amplitude_offset = round(draw_wave_height_in_px  *(1 - amplitude) * 0.5)
  
  display.clear();
  
  // there are 16 columns, 8 rows. Each "cell" is 8x8  pixels.
  // we traverse the display from left to right from top to bottom.
  // we draw pixels on vertical lines of 8 pixels.

  start_angle += wave_speed;
  if (abs(start_angle) > 360) {
    start_angle %= 360;
  }
  
  // move from top row to bottom row
  for (let row = 0; row < display_rows; row++) {
    let current_angle = start_angle; //reset the angle for each row
    
    const current_wave = ceil((row + 1) / draw_wave_height) - 1;
    const y_offset = current_wave * draw_wave_height_in_px
    
    //range where a y px can be drawn
    let row_y_positions = {
      min: row * 8,
      max: row * 8 + 7
    };
    
    // move from left to right
    for (let col = 0; col < display_cols; col++) {
      // multiplied by 8 because each col is 8 pixels wide
      display.moveTo(col * 8, row);

      //we need to loop through 8px in each column
      for (let sub_col = 0; sub_col < 8; sub_col++) {
        let x_pos = 8*col + sub_col //current x absolute position
        
        //only increment the angle when we've reached the segment width
        if(x_pos % segment_width == 0)
          current_angle += angle_increment;

        let wave_value = sin((current_angle * PI) / 180) + 1; // value from 0.0 to 2.0
        wave_value *= 0.5 //value is now between 0 to 1.0
        wave_value *= amplitude;
        
        // initial y position
        // + half of empty space of row height - amplitude, so it's centered
        // + rounded pixel position between 0 to row height in pixels
        const pixel_pos =
          y_offset + 
          y_amplitude_offset+
          round(wave_value * (draw_wave_height_in_px -1) ); //say row is 64px, values should go from 0 to 63, that's  why we do a -1
        
        //if the pixel position is in the current row, render it
        if (pixel_pos >= row_y_positions.min && pixel_pos <= row_y_positions.max) {
          let pixel_in_sub_col = pixel_pos % 8;
          display.send(0 | (1 << (7 - pixel_in_sub_col)));
        }

        display.moveToNext();
      }
    }
  }
}

function keyPressed() {
  switch (key) {
    case 'J':
      angle_increment += 0.5;
      break;
    case 'K':
      angle_increment -= 0.5;
      break;
    case 'U':
      wave_speed += 0.5;
      break;
    case 'I':
      wave_speed -= 0.5;
      break;
  }
  console.log(angle_increment, wave_speed);
}
