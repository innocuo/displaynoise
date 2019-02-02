define(function() {
  const display_width = 128;

  let current_pos = {
    x: 0,
    y: 0
  };

  let display = {
    moveTo: function(x, y) {
      current_pos.x = x;
      current_pos.y = y; //display is 64px high, but we group it in 8 rows of 8px
    },
    moveToNext: function() {
      // after displaying the data, move the position 1 pixel to the right
      current_pos.x += 1;

      // if it's reached the end of the screen, move down one row,
      // and reset x pos to 0
      // we're working on a 128x64 screen
      if (current_pos.x >= display_width) {
        display.moveTo(0, current_pos.y + 1);
      }
    },
    send: function(byte) {
      for (let i = 7; i >= 0; i--) {
        if ((byte >> i) & 1) {
          point(current_pos.x, 8 * current_pos.y + (7 - i));
        }
      }
    },
    sendAndMove: function(byte) {
      display.send(byte);
      display.moveToNext();
    },
    get_x: function() {
      return current_pos.x;
    },
    get_y: function() {
      return current_pos.y;
    },
    clear: function() {
      background(0);
    }
  };

  return display;
});
