var notes = ["C", "D", "E", "F", "G", "A", "B"];
var html = "";

var reverb = new Tone.Reverb({
  decay: 5,
  preDelay: 0.01
}).toDestination();

var chorus = new Tone.Chorus(4, 2.5, 0.5).toDestination();
var delay = new Tone.FeedbackDelay("8n", 0.5).toDestination();

var synth = new Tone.PolySynth(Tone.Synth, {
  oscillator: {
    type: "sine"
  },
  envelope: {
    attack: 0.1,
    decay: 0.1,
    sustain: 0.5,
    release: 0.5
  }
}).connect(reverb);

function applySettings() {
  var oscillatorType = document.getElementById("oscillatorType").value;
  var attack = parseFloat(document.getElementById("attack").value);
  var release = parseFloat(document.getElementById("release").value);
  var reverbToggle = document.getElementById("reverbToggle").checked;
  var chorusToggle = document.getElementById("chorusToggle").checked;
  var delayToggle = document.getElementById("delayToggle").checked;

  synth.set({
    oscillator: {
      type: oscillatorType
    },
    envelope: {
      attack: attack,
      decay: 0.1,
      sustain: 0.5,
      release: release
    }
  });

  synth.disconnect();
  if (reverbToggle) synth.connect(reverb);
  if (chorusToggle) synth.connect(chorus);
  if (delayToggle) synth.connect(delay);
  if (!reverbToggle && !chorusToggle && !delayToggle) synth.toDestination();
}

document.getElementById("applySettings").addEventListener("click", applySettings);

for (var octave = 0; octave < 3; octave++) {
  for (var i = 0; i < notes.length; i++) {
    var hasSharp = true;
    var note = notes[i];

    if (note == "E" || note == "B") hasSharp = false;

    html += `<div class='whitenote'
    onmousedown='noteDown(this, false)'
    onmouseup='noteUp(this, false)'
    onmouseleave='noteUp(this, false)'
    data-note='${note + (octave + 4)}'>`;

    if (hasSharp) {
      html += `<div class='blacknote'
      onmousedown='noteDown(this, true)'
      onmouseup='noteUp(this, true)'
      onmouseleave='noteUp(this, true)'
      data-note='${note + "#" + (octave + 4)}'></div>`;
    }
    html += "</div>";
  }
}

document.getElementById("container").innerHTML = html;

function noteDown(elem, isSharp) {
  var note = elem.dataset.note;
  elem.style.backgroundColor = "cyan";
  synth.triggerAttackRelease(note, "16n");
  event.stopPropagation();
}

function noteUp(elem, isSharp) {
  elem.style.background = isSharp ? "black" : "white";
}
