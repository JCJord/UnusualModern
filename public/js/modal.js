function confirmDelete(event, form) {
  event.preventDefault();

  openModal();

  document.getElementById("deleteModal").onclick = function () {
    form.submit();
  };
}

function openModal() {
  showModal();

  function showModal() {
    document.getElementById("modal").classList.remove("hidden");
    document.querySelector(".overlay").classList.remove("hidden");
  }
}

function closeModal() {
  document.getElementById("btnCancel").onclick = function () {
    closeButton();
  };
  document.getElementById("btnClose").onclick = function () {
    closeButton();
  };

  function closeButton() {
    document.getElementById("modal").classList.add("hidden");
    document.querySelector(".overlay").classList.add("hidden");
  }
}
closeModal();
