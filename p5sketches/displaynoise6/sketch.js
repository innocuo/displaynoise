let display;
let started = false;

requirejs(['../../modules/display'], function(qdisplay) {
  display = qdisplay;
  started = true;
});

let mic;
const screenColor = { r: 90, g: 190, b: 255 };

let curr_angle = 0;
let curr_speed = 0;
let curr_inc = 28;
const inc_every = 1;
let curr_inc_every = 0;

let curr_angle2 = 90;
let curr_inc2 = 10;

let pix_val = 0;

let row_height = 8;

function setup() {
  mic = new p5.AudioIn();
  mic.start();
  c = createCanvas(128, 64);

  frameRate(33);
}

let count = 0;
function draw() {
  if (!started) return;

  // curr_angle = 0;
  const vol = mic.getLevel();
  curr_inc = (360 * (ceil(300 * vol) - 1)) / 128; // 2000* vol;
  if (curr_inc > 255) {
    curr_inc = 255;
  }
  curr_inc *= -1;
  curr_speed = 900 * vol;
  // if(count == 0){
  background(0);
  // }
  count++;
  if (count > 1) {
    count = 0;
  }
  // background(0);
  fill(screenColor.r, screenColor.g, screenColor.b);
  stroke(screenColor.r, screenColor.g, screenColor.b);

  // there are 16 columns, 8 rows. Each "cell" is 8x8  pixels.
  // we traverse the display from left to right from top to bottom.
  // we draw pixels on vertical lines of 8 pixels.

  // curr_angle = 0;

  const row_total = 8;
  curr_angle += curr_speed;
  if (curr_angle > 360) {
    curr_angle -= 360;
  }
  if (vol < 10) {
    curr_angle -= 20;
  }
  // move from top row to bottom row
  for (let row = 0; row < row_total; row += row_height) {
    let tmp_angle = curr_angle;
    curr_inc_every = 0;
    // tmp_angle=0;
    // move from left to right
    for (let col = 0; col < 16; col++) {
      curr_angle2 += curr_inc2;
      if (curr_angle2 > 360) {
        curr_angle2 -= 360;
      }
      // multiplied by 8 because each col is 8 pixels wide
      display.moveTo(col * 8, row);

      for (let block = 0; block < 8; block++) {
        // console.log(curr_angle, sin1)
        // console.log(sin1)

        tmp_angle += get_inc() * (row + 1) * (row + 1);
        // tmp_angle += get_inc();
        let sin1 = sin((tmp_angle * PI) / 180);

        const inc_factor = curr_inc / 70;
        if (inc_factor < 0 && inc_factor > -1) {
          sin1 *= inc_factor;
        }

        const wave_val = sin1 + 1; // now values go from 0 to 2;

        const pixel_pos = int((wave_val * (row_total * row_height - 1)) / 2);

        const cache_pos = { x: display.get_x(), y: display.get_y() };

        for (let ii = 0; ii < row_height; ii++) {
          const pixel_divided = pixel_pos % 8;
          // pixel_divided = pixel_divided<<1<<(pixel_divided+1);
          let pixel2 = 0;
          for (let lo = 0; lo < inc_every / 2; lo++) {
            pixel2 |= 1 << (pixel_divided - lo);
            // pixel2 |= 1<< (pixel_divided+lo)
          }

          display.moveTo(cache_pos.x, cache_pos.y + (row_height - ii - 1));

          if (ii == int(pixel_pos / 8)) {
            if (pix_val == 0) {
              if (pixel2 > 0) {
                display.send(round(curr_inc * -1) >> pixel2);
              }
              // send( pixel2);
            } else {
              display.send(pix_val & int((wave_val * 255) / 2));
            }
          } else {
            // send( 0 );
          }
        }

        display.moveTo(cache_pos.x, cache_pos.y);

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
