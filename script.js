
  // Sayfa yüklendiğinde kaydedilmiş görevleri geri yükle
  window.onload = function () {
    var savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      var tasks = JSON.parse(savedTasks);
      tasks.forEach(function (task) {
        createTaskElement(task);
      });
    }
  };

  // Yeni bir görev eklemek için
  function newElement() {
    var inputValue = document.getElementById("task").value;
    if (inputValue === "") {
      alert("Lütfen bir görev girin!");
    } else {
      createTaskElement(inputValue);

      // Kaydedilmiş görevleri güncelle
      var savedTasks = localStorage.getItem("tasks");
      var tasks = savedTasks ? JSON.parse(savedTasks) : [];
      tasks.push(inputValue);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    document.getElementById("task").value = "";
  }

  // Bir görevi kaldırmak için
  var list = document.getElementById("list");
  list.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
      event.target.remove();

      // Kaydedilmiş görevleri güncelle
      var savedTasks = localStorage.getItem("tasks");
      var tasks = savedTasks ? JSON.parse(savedTasks) : [];
      var taskIndex = tasks.indexOf(event.target.innerText);
      if (taskIndex > -1) {
        tasks.splice(taskIndex, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }
    }
  });

  // Görev elemanı oluşturma
  function createTaskElement(taskText) {
    var li = document.createElement("li");
    var text = document.createTextNode(taskText);
    li.appendChild(text);
    document.getElementById("list").appendChild(li);
  }

