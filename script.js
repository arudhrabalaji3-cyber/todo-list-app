const input=document.querySelector("input");
const list=document.querySelector("ul");
const addbutton=document.querySelector("button");
let tasklist=[];

let saved=localStorage.getItem("tasks");
if(saved)
{
    tasklist=JSON.parse(saved);
    tasklist.forEach((task,index)=>{
        createTaskElement(task,index);
    });

}



let task;

let newtask;

function renderFunction()
{
    list.innerHTML="";
    tasklist.forEach((task,index)=>{
        if(currentFilter=='all'||
            currentFilter=="completed" && task.completed||
            currentFilter=="notcompleted" && !task.completed)
            createTaskElement(task,index);
        
        });
}

function createTaskElement(newtask,index){
        const li=document.createElement("li");
        li.innerHTML = `<span>${newtask.text}</span>`;
        li.dataset.index=index;
        list.appendChild(li);
        if(newtask.completed){
            li.classList.add("checked");
            li.classList.add("changes");
        }
        li.addEventListener("click",function(){
        li.classList.toggle("changes");
        li.classList.toggle("checked");
        let index = Number(this.dataset.index);
        tasklist[index].completed = !tasklist[index].completed;
        localStorage.setItem("tasks",JSON.stringify(tasklist));
        renderFunction();
        });

        const cross=document.createElement("button");
        cross.innerText="❌";
        li.appendChild(cross);
        cross.addEventListener("click",function(e){
            e.stopPropagation();
            let removeindex=Number(this.parentElement.dataset.index);
            tasklist.splice(removeindex,1);
            this.parentElement.remove();
            let allLi = document.querySelectorAll("li");

            allLi.forEach((item, index) => {
            item.dataset.index = index;
            });
            localStorage.setItem("tasks",JSON.stringify(tasklist));
            renderFunction();
            
        });
}

addbutton.addEventListener("click",function(){
    if(input.value.trim()==='')
        alert("enter some task!");
    else{
        task=input.value.trim();
        newtask={text: task, completed: false};
        tasklist.push(newtask);
        let index = tasklist.length - 1;
        localStorage.setItem("tasks",JSON.stringify(tasklist));
        renderFunction();
        input.value="";
    }
});

input.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        addbutton.click();
    }
});

const allButton=document.getElementById("allButton");
const completedButton=document.getElementById("completedButton");
const pendingButton=document.getElementById("pendingButton");
const filterButtons=document.querySelectorAll(".filterButtons");
let currentFilter="all";
function setActiveButton(clickedButton){
    filterButtons.forEach(btn=>btn.classList.remove("active"));
    clickedButton.classList.add("active");
}

allButton.addEventListener("click",function(){
    setActiveButton(allButton);
    currentFilter="all";
    renderFunction();
});

completedButton.addEventListener("click",function(){
    setActiveButton(completedButton);
    currentFilter="completed";
    renderFunction();
});

pendingButton.addEventListener("click",function(){
    setActiveButton(pendingButton);
    currentFilter="notcompleted";
    renderFunction();
});