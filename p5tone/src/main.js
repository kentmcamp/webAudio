import './style.css';

document.querySelector('#app').innerHTML = `
  <button id="start-noise">Play Sound</button>
  <button id="stop-noise">Stop Sound</button>
`;

let noise;
let isPlaying = false;

document.getElementById('start-noise').addEventListener('click', () => {
  if (!isPlaying) {
    new p5((p) => {
      p.setup = function() {
        p.createCanvas(400, 400);
        noise = new p5.Noise('brown');
        noise.amp(0.5);
        noise.start();
        isPlaying = true;
      };

      // p.draw = function() {
      //   p.background(220);
      // };
    });
  }
});

document.getElementById('stop-noise').addEventListener('click', () => {
  if (noise && isPlaying) {
    noise.stop();
    isPlaying = false;
  }
});
