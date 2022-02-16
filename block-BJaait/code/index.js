let form = document.querySelector("form");
let ul = document.querySelector("ul");
var dragSrcEl = null;

function createUI(item){
    let li = document.createElement("li");
    li.setAttribute("draggable",true);
    li.innerHTML = item;
    li.addEventListener('dragstart', handleDragStart, false);
    li.addEventListener('dragenter', handleDragEnter, false);
    li.addEventListener('dragover', handleDragOver, false);
    li.addEventListener('dragleave', handleDragLeave, false);
    li.addEventListener('drop', handleDrop, false);
    li.addEventListener('dragend', handleDragEnd, false);
    ul.append(li);
}

form.addEventListener("submit",(event) => {
    event.preventDefault();
    let item = form.elements['todo'].value;
    form.elements['todo'].value = '';
    createUI(item)
})

function handleDragStart(e){
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragEnd(e) {
    let lis = document.querySelectorAll("li");
    lis.forEach(function (li) {
      li.classList.remove('hover');
    });
  }

function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }

    e.dataTransfer.dropEffect = 'move';
    
    return false;
  }

  function handleDragEnter(e) {
    this.classList.add('hover');
  }

  function handleDragLeave(e) {
    this.classList.remove('hover');
  }

  function handleDrop(e) {
    if (e.stopPropagation) {
      e.stopPropagation(); // stops the browser from redirecting.
    }
    
    if (dragSrcEl != this) {
      dragSrcEl.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData('text/html');
    }
    
    return false;
  }