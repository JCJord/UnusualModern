$(".hamburger").click(function () {
  $(this).toggleClass("active");
});

var icon = document.querySelector(".hamburger");

function openNav() {
  if (!icon.classList.contains("open")) {
    document.getElementById("mySidenav").style.width = "300px";
    icon.classList.add("open");
    icon.classList.add("bz");

    $("body").addClass("fixed-position");
  } else {
    document.getElementById("mySidenav").style.width = "0";
    icon.classList.remove("bz");
    icon.classList.remove("open");
    $("body").removeClass("fixed-position");
  }
}
