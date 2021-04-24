var icon = document.querySelector(".animated-icon1");

function openNav() {
  if (!icon.classList.contains("open")) {
    document.getElementById("mySidenav").style.width = "250px";
    icon.classList.add("open");
    icon.classList.add("bz");
    document.querySelector(".overlay").classList.remove("hidden");
    disableScroll();
  } else {
    document.getElementById("mySidenav").style.width = "0";
    icon.classList.remove("bz");
    icon.classList.remove("open");
    document.querySelector(".overlay").classList.add("hidden");
    enableScroll();
  }
}

// preven page scroll codes below
var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener(
    "test",
    null,
    Object.defineProperty({}, "passive", {
      get: function () {
        supportsPassive = true;
      },
    })
  );
} catch (e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent =
  "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

// call this to Disable
function disableScroll() {
  window.addEventListener("DOMMouseScroll", preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener("touchmove", preventDefault, wheelOpt); // mobile
  window.addEventListener("keydown", preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  window.removeEventListener("DOMMouseScroll", preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  window.removeEventListener("touchmove", preventDefault, wheelOpt);
  window.removeEventListener("keydown", preventDefaultForScrollKeys, false);
}

tinymce.init({
  language: "pt_BR",
  height: "335",
  selector: "#arigo",
  plugins: [
    "advlist autolink link image lists print preview hr searchreplace wordcount fullscreen insertdatetime media save table paste emoticons",
  ],
});
