let display;
let started = false;

let mic;
const screenColor = { r: 90, g: 190, b: 255 };

let curr_angle = 0;
let curr_speed = 0;
let curr_inc = 28;
const inc_every = 1;
let curr_inc_every = 0;

let pix_val = 0;

let row_height = 4;
const row_total = 8;

requirejs(['../../modules/display'], function(qdisplay) {
  display = qdisplay;
  started = true;
});

function setup() {
  mic = new p5.AudioIn(); //microphone
  mic.start();
  c = createCanvas(128, 64);

  frameRate(32);
}

let count = 0;
function draw() {
  if (!started) return;

  // curr_angle = 0;
  const vol = mic.getLevel();
  curr_inc = (360 * (ceil(300 * vol) - 1)) / 90; // 2000* vol;
  if (curr_inc > 255) {
    curr_inc = 1;
  }
  curr_speed = 1900 * vol;
  if (count == 0) {
    display.clear();
  }
  count++;
  if (count > 0) {
    count = 0;
  }

  fill(screenColor.r, screenColor.g, screenColor.b);
  stroke(screenColor.r, screenColor.g, screenColor.b);

  // there are 16 columns, 8 rows. Each "cell" is 8x8  pixels.
  // we traverse the display from left to right from top to bottom.
  // we draw pixels on vertical lines of 8 pixels.

  // curr_angle = 0;

  curr_angle += curr_speed;
  if (abs(curr_angle) > 360) {
    curr_angle %= 360;
  }
  if (vol < 10) {
    curr_angle -= 2;
  }
  // move from top row to bottom row
  for (let row = 0; row < row_total; row += 1) {
    let tmp_angle = curr_angle;
    curr_inc_every = 0;

    let curr_row = ceil((row + 1) / row_height) - 1;
    // move from left to right
    for (let col = 0; col < 16; col++) {
      // multiplied by 8 because each col is 8 pixels wide
      display.moveTo(col * 8, row);

      for (let sub_col = 0; sub_col < 8; sub_col++) {
        tmp_angle += get_inc() * (curr_row + 1);

        let sin1 = sin((tmp_angle * PI) / 180);

        let wave_val = sin1 + 1; // now values go from 0 to 2;

        const pixel_pos =
          curr_row * row_height * 8 +
          round((wave_val * (8 * row_height - 1)) / 2);

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

function get_inc() {
  curr_inc_every++;
  if (curr_inc_every == inc_every) {
    curr_inc_every = 0;
    return curr_inc;
  }
  return 0;
}

function keyPressed() {
  switch (key) {
    case 'J':
      curr_inc += 0.5;
      break;
    case 'K':
      curr_inc -= 0.5;
      break;
    case 'U':
      curr_speed += 0.5;
      break;
    case 'I':
      curr_speed -= 0.5;
      break;
    case 'G':
      curr_inc2 += 0.5;
      break;
    case 'H':
      curr_inc2 -= 0.5;
      break;
    case 'L':
      pix_val = random(1, 255);
      break;
    case 'M':
      row_height += 1;
      if (row_height > 8) {
        row_height = 1;
      }
      break;
  }
  console.log(curr_inc, curr_speed, row_height, pix_val);
}
