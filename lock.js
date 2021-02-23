// function lock (orientation) {
//   // Go into full screen first
//   if (document.documentElement.requestFullscreen) {
//     document.documentElement.requestFullscreen();
//   } else if (document.documentElement.mozRequestFullScreen) {
//     document.documentElement.mozRequestFullScreen();
//   } else if (document.documentElement.webkitRequestFullscreen) {
//     document.documentElement.webkitRequestFullscreen();
//   } else if (document.documentElement.msRequestFullscreen) {
//     document.documentElement.msRequestFullscreen();
//   }

//   // Then lock orientation
//   screen.orientation.lock(orientation);
// }

function unlock () {
  // Unlock orientation
  screen.orientation.unlock();

  // Exit full screen
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}


function fullScreenCheck() {
  if (document.fullscreenElement) return;
  return document.documentElement.requestFullscreen();
}

function updateDetails(lockButton) {
  const buttonOrientation = getOppositeOrientation();
  lockButton.textContent = `Lock to ${buttonOrientation}`;
}

function getOppositeOrientation() {
  const { type } = screen.orientation;
  return type.startsWith("portrait") ? "landscape" : "portrait";
}

async function rotate(lockButton) {
  try {
    await fullScreenCheck();
  } catch (err) {
    console.error(err);
  }
  const newOrientation = getOppositeOrientation();
  await screen.orientation.lock(newOrientation);
  updateDetails(lockButton);
}

function show() {
  const { type, angle } = screen.orientation;
  console.log(`Orientation type is ${type} & angle is ${angle}.`);
}

screen.orientation.addEventListener("change", () => {
  show();
  updateDetails(document.getElementById("button"));
});

window.addEventListener("load", () => {
  show();
  updateDetails(document.getElementById("button"));
});