let form = document.querySelector("form");
let cards = document.querySelector(".cards");
let area,view;

form.addEventListener("submit",(event)=>{
    event.preventDefault();
    let title = form.elements.title.value;
    let topic = form.elements.topic.value;
    createUI(title,topic);
    form.elements.title.value = "";
    form.elements.topic.value = "";
})

function createUI(title,topic){
    let div = document.createElement("div");
    div.classList.add("card")
    let li  = document.createElement("li");
    li.innerHTML = title
    let h2 = document.createElement("h2");
    h2.innerHTML = topic;
    li.onclick = function() {
        editStart.call(this);
      };
    h2.onclick = function() {
        editStart.call(this);
    }
    div.append(li,h2);
    cards.append(div);
}

function editStart() {
    view = this;
    console.log(view)
    area = document.createElement('input');
    area.className = 'edit';
    area.value = this.innerHTML;

    area.onkeydown = function(event) {
      if (event.key == 'Enter') {
        this.blur();
      }
    };

    area.onblur = function() {
      editEnd.call(this);
    };

    view.replaceWith(area);
    area.focus();
  }

  function editEnd() {
    view.innerHTML = area.value;
    area.replaceWith(view);
  }