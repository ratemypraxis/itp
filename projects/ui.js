function init_ui() {
  {
    let elm = createSpan().id('fps');
    elm.style('font-size', '30px');
  } {
    // Other DOM elements...
  }
}

// Show frames per second averaged over the last n frames
let fps_tlast; // Array of frame start times
let fps_nframes = 60 * 5;

function show_fps() {
  if (!fps_tlast) {
    fps_tlast = [millis()];
    // Continue to have show_num create DOM span
  }
  fps_tlast.push(millis());
  if (fps_tlast.length > fps_nframes) {
    fps_tlast.splice(0, 1);
  }
  let sum = 0;
  for (let ind = 1; ind < fps_tlast.length; ind++) {
    sum += fps_tlast[ind] - fps_tlast[ind - 1];
  }
  let avg = sum / (fps_tlast.length - 1);
  show_num('fps', 1 / (avg / 1000));
}

function show_num(label, num) {
  let elm = select('#' + label);
  num = round(num, 2);
  elm.html('[' + label + ' ' + num + '] ');
}
