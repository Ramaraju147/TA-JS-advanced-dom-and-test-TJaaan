window.addEventListener('DOMContentLoaded', (event) => {
    alert(`The content of the DOM is loaded`)
});

window.addEventListener("scroll",populate);

let id = 0;

function populate(){
    while(true){
    let bottom = document.documentElement.getBoundingClientRect.bottom
    if(bottom>document.documentElement.clientHeight+100)
        break;
    document.body.insertAdjacentHTML("beforeend", `<p>${quotes[id].quoteText}</p>
    <p>${quotes[id].quoteAuthor}</p>`)
    id++;
}
}

populate();