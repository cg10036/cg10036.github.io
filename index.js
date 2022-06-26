class Todo {
  constructor() {
    this.data = localStorage.getItem("data");
    if (this.data) {
      try {
        this.data = JSON.parse(this.data);
      } catch {}
    }
    this.idx = 0;
    if (!this.data) this.data = [];
    console.log(this.data);
  }
  save() {
    localStorage.setItem("data", JSON.stringify(this.data));
  }
  getNowData() {
    return this.data[this.idx];
  }
  getNextData() {
    if (++this.idx >= this.data.length) {
      this.idx = 0;
    }
    return this.getNowData();
  }
  getPrevData() {
    if (--this.idx < 0) {
      this.idx = this.data.length - 1;
    }
    return this.getNowData();
  }
  removeNowData() {
    this.data.splice(this.idx, 1);
    if (this.idx >= this.data.length) {
      this.idx = 0;
    }
    this.save();
  }
  addNewData(str) {
    this.data.push(str);
    this.save();
  }
}
let todo = new Todo();
window.todo = todo; // for debug

switch (location.pathname.split("/").at(-1)) {
  case "add.html":
    window.onload = () => {
      setTimeout(() => {
        let result = "";
        while (result === "") {
          result = prompt("추가할 할 일을 입력해주세요");
          if (result === null) {
            location.href = "./index.html";
          } else if (result === "") {
            alert("빈칸이 있습니다.");
          } else {
            todo.addNewData(result);
            location.href = "./index.html";
          }
        }
      }, 1);
    };
    break;
  case "":
  case "index.html":
    let mutex = false;

    let prev = document.querySelector("#prev");
    let next = document.querySelector("#next");
    let content = document.querySelector(".todo-content");
    let button = document.querySelector(".todo-button");
    content.textContent = todo.getNowData() ?? "등록된 할 일이 없습니다.";
    prev.addEventListener("click", () => {
      content.textContent = todo.getPrevData() ?? "등록된 할 일이 없습니다.";
    });
    next.addEventListener("click", () => {
      content.textContent = todo.getNextData() ?? "등록된 할 일이 없습니다.";
    });
    button.addEventListener("click", () => {
      if (todo.getNowData() === undefined) return;
      if (mutex) return;
      mutex = true;

      button.classList.add("active");
      setTimeout(() => {
        todo.removeNowData();
        button.classList.remove("active");
        content.textContent = todo.getNowData() ?? "등록된 할 일이 없습니다.";

        mutex = false;
      }, 750);
    });
    break;
}
