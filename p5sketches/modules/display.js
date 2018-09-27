define(function() {
  let current_pos = {
    x: 0,
    y: 0
  };

  let display = {
    moveTo: function(x, y) {
      current_pos.x = x;
      current_pos.y = y;
    },
    moveToNext: function() {
      // after displaying the data, move the position 1 pixel to the right
      current_pos.x += 1;

      // if it's reached the end of the screen, move down one row,
      // and reset x pos to 0
      // we're working on a 64x128 screen
      if (current_pos.x > 127) {
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
    }
  };

  return display;
});
