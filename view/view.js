// her findes eventlisteners og funktioner til at opdatere view
export class GameView {
    constructor(model){
        this.model=model;
        this.grid=document.querySelector("#grid");
        this.score=document.querySelector("#score"); 
        this.setupEventlisteners()       
        this.init();
    }
    init(){
        this.grid.innerHTML="";
        for (let i = 0; i < this.model.gameRules.gridSize; i++) {
            for (let j = 0; j < this.model.gameRules.gridSize; j++) {
                let cell = document.createElement("div");
                cell.classList.add("cell");
                cell.id = i + "-" + j;
                this.grid.appendChild(cell);
            }
            
        }
    }
    setupEventlisteners(){
        document.addEventListener("keydown",(event)=>{
            const keydownEvent=new CustomEvent("keydown",{detail:{key:event.key}});
            document.dispatchEvent(keydownEvent);
        });
         document.addEventListener("keyup",(event)=>{
            const keyupEvent=new CustomEvent("keyup",{detail:{key:event.key}});
            document.dispatchEvent(keyupEvent);
        });
        
    }
    updateView(){
       /* This method is responsible for updating the view. It should be called every time the model changes. */
    } 
}