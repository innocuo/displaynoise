let display;
let started = false;

let mic;
const screenColor = { r: 99, g: 212, b: 255 };

let start_angle = 0; //angle at the start of each draw cycle
let curr_speed = 20;

const angle_increment_fixed = false;
let angle_increment = 28;
const inc_every = 1;
let curr_inc_every = 0;

let row_height = 8;
const row_total = 8;

requirejs(['../../modules/display'], function(qdisplay) {
  display = qdisplay;
  // started = true;
});

function setup() {
  frameRate(45);
  c = createCanvas(128, 64);
  let ac = getAudioContext();

  ac.suspend().then(function() {
    var myButton = createButton('click to start audio');
    myButton.position(0, 0);

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
  if (!started) return;

  fill(screenColor.r, screenColor.g, screenColor.b);
  stroke(screenColor.r, screenColor.g, screenColor.b);

  const vol = mic.getLevel(); //value between 0.0 to 1.0
  if(!angle_increment_fixed){
    angle_increment = ( 1+floor(vol * 719) ) % 360; // value between 1 to 360
  }
  
  display.clear();
  
  // there are 16 columns, 8 rows. Each "cell" is 8x8  pixels.
  // we traverse the display from left to right from top to bottom.
  // we draw pixels on vertical lines of 8 pixels.

  start_angle += curr_speed;
  if (abs(start_angle) > 360) {
    start_angle %= 360;
  }
  
  // move from top row to bottom row
  for (let row = 0; row < row_total; row += 1) {
    let current_angle = start_angle; //reset the angle for each row
    curr_inc_every = 0;

    let curr_row = ceil((row + 1) / row_height) - 1;
    // move from left to right
    for (let col = 0; col < 16; col++) {
      // multiplied by 8 because each col is 8 pixels wide
      display.moveTo(col * 8, row);

      for (let sub_col = 0; sub_col < 8; sub_col++) {
        current_angle += get_angle_increment() * (curr_row + 1);

        let sin1 = sin((current_angle * PI) / 180);
        let wave_multiplier = 20 * vol;
        let wave_val = sin1 + 1; // now values go from 0 to 2;
        wave_val *= wave_multiplier;
        const pixel_pos =
          curr_row * row_height * 8 +
          round((wave_val * (8 * row_height - 1)) / 2) +
          round(row_height * 8 * (1 - wave_multiplier) * 0.5);

        const cache_pos = { x: display.get_x(), y: display.get_y() };

        let pixel_divided = pixel_pos % 8;
        let px = {
          min: row * 8,
          max: row * 8 + 7
        };

        if (pixel_pos >= px.min && pixel_pos <= px.max) {
          display.send(0 | (1 << (7 - pixel_divided)));
        }

        //display.moveTo(cache_pos.x, cache_pos.y);

        display.moveToNext();
      }
    }
  }
}

function get_angle_increment() {
  curr_inc_every++;
  if (curr_inc_every == inc_every) {
    curr_inc_every = 0;
    return angle_increment;
  }
  return 0;
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
      curr_speed += 0.5;
      break;
    case 'I':
      curr_speed -= 0.5;
      break;
    case 'M':
      row_height += 1;
      if (row_height > 8) {
        row_height = 1;
      }
      break;
  }
  console.log(angle_increment, curr_speed, row_height);
}
