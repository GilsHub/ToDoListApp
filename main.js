//유저가 값을 입력한다.

let taskInput=document.getElementById("task-input");
taskInput.addEventListener("focus",function(){taskInput.value="";})
let addButton=document.getElementById("addthing");
let tabs=document.querySelectorAll(".task-tabs div");
console.log(tabs);
addButton.addEventListener("click",addTask);
let taskList=[];
let mode="all";
let filterList=[];


for(let i=1;i<tabs.length;i++){
     tabs[i].addEventListener("click",function(event){filter(event)});
}

function addTask(){
    if(taskInput.value==""){
        alert("can't add the empty contents!");
        return;
    }
    let task={
        id:randomIdGenerate(),
        taskContent:taskInput.value,
        isComplete:false
    }
    taskList.push(task);
    console.log(taskList);
    render();
}

function render(){
    let list=[];
    if(mode==="all"){
        //taskList를 보여줌
        list=taskList;
    }
    else if(mode==="ondoing"){
        //filterList
        list=filterList;
    }
    else if(mode==="done"){
        list=filterList;
    }
    //내가 선택한 탭에 따라서 리스트를 달리 보여준다.
    let resultHTML="";
    
    for(let i=0;i<list.length;i++){
        if(list[i].isComplete==true){
            resultHTML+=
            `<div class="task">
        <div class="task-done">
           ${list[i].taskContent}
        </div>
        <div>
         <button class="check-button" onclick="toggleComplete('${list[i].id}')">check</button>
         <button class="delete-button" onclick="deleteTask('${list[i].id}')">delete</button>
        </div>
    </div>`
        }
        else{
            resultHTML +=`<div class="task">
            <div class="task-contents">
               ${list[i].taskContent}
            </div>
            <div>
             <button class="check-button" onclick="toggleComplete('${list[i].id}')">check</button>
             <button class="delete-button" onclick="deleteTask('${list[i].id}')">delete</button>
            </div>
        </div>`
        }
        
    }
    document.getElementById("task-board").innerHTML=resultHTML;
}

function toggleComplete(id){
  console.log("deleted",id);
  for(let i=0;i<taskList.length;i++){
    if(taskList[i].id==id){
        taskList[i].isComplete=!taskList[i].isComplete;
        break;
    }   
  }
  render();
  console.log(taskList);
}

function deleteTask(id){
    console.log("삭제됨!",id);
    
        //list에서 삭제해줌
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].id==id){
              taskList.splice(i,1);
              break;
            }
        }
        for(let i=0;i<filterList.length;i++){
            if(filterList[i].id==id){
                filterList.splice(i,1);
                break;
            }
        }
        render();
        console.log(taskList);
    
    
}
function filter(event){
    mode=event.target.id;
    filterList=[];
    if(mode==="all"){
        //모든것을 다 보여줌.false,true다 보여줌
        render();
    }
    else if(mode==="ondoing"){
        //진행중false만 보여줌
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete===false){
                filterList.push(taskList[i]);
            }
        }
        console.log("진행중",filterList);
        render();
    }
    else if(mode==='done'){
        //true만 보여줌.
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete===true){
                filterList.push(taskList[i]);
            }
        }
        console.log("완성함",filterList);
        render();
    }
}
function randomIdGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}