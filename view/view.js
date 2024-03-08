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
        for (let i = 0; i < this.model.gridSize; i++) {
            for (let j = 0; j < this.model.gridSize; j++) {
                let cell = document.createElement("div");
                cell.classList.add("cell");
                cell.id = i + "-" + j;
                this.grid.appendChild(cell);
            }
            
        }
        this.grid.style.gridTemplateColumns = `repeat(${this.model.gridSize}, 4px)`;
    }
    setupEventlisteners(){
        document.addEventListener("keydown",(event)=>{
            const keydownEvent=new CustomEvent("keypressed",{detail:{key:event.key}});
            document.dispatchEvent(keydownEvent);
        });
         document.addEventListener("keyup",(event)=>{
            const keyupEvent=new CustomEvent("keyReleased",{detail:{key:event.key}});
            document.dispatchEvent(keyupEvent);
        });
        
    }
    updateView(){
       /* This method is responsible for updating the view. It should be called every time the model changes. */
       const cells = document.querySelectorAll("#grid .cell");
       for (let row = 0; row < this.model.gridSize; row++) {
         for (let col = 0; col < this.model.gridSize; col++) {
           const index = row * this.model.gridSize + col;
     
           switch (this.model.readFromCell(row, col)) {
             case 0:
               cells[index].classList.remove("player", "goal");
               break;
             case 1: // Note: doesn't remove goal if previously set
               cells[index].classList.add("player");
               break;
             case 2: // Note: doesn't remove player if previously set
               cells[index].classList.add("goal");
               break;
           }
         }
       }
    } 
}