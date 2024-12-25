var notes = ["C", "D", "E", "F", "G", "A", "B"];
var html = "";
var synth = new Tone.PolySynth().toMaster();

for (var octave = 0; octave < 3; octave++) {

  for (var i = 0; i < notes.length; i++) {
    var hasSharp = true;
    var note = notes[i];

    if (note == "E" || note == "B") hasSharp = false;

    html += `<div class='whitenote'
    onmousedown='noteDown(this, false)'
    onmouseup='noteUp(this, false)'
    onmouseleave='noteUp(this, false)'
    data-note='${
      note + (octave + 4)
    }'>`;

    if (hasSharp) {
      html += `<div class='blacknote'
      onmousedown='noteDown(this, true)'
      onmouseup='noteUp(this, true)'
      onmouseleave='noteUp(this, true)'
      data-note='${
        note + "#" + (octave + 4)
      }'></div>`;
    }
    html += "</div>";
  }
}

document.getElementById("container").innerHTML = html;

function noteDown(elem, isSharp) {
  var note = elem.dataset.note;
  // alert(note);
  elem.style.backgroundColor = "cyan";
  synth.triggerAttackRelease(note, "16n");
  event.stopPropagation();
}

function noteUp(elem, isSharp) {
  elem.style.background = isSharp ? "black" : "white";
}
