
export class Gamecontroller {
    constructor(model, view){
        this.model=model;
        this.view=view;
        this.setupEventlisteners();
       
        
        this.init();
    }
    init(){
        console.log("controller init");    
        this.gameTick();
    }
    
    setupEventlisteners() {
        document.addEventListener("keyPressed", (event) => {
        const key=event.detail.key;
        console.log("keypressed: ",key); 
        this.setControls(key);   
        });
        document.addEventListener("keyReleased", (event) => {
           const key=event.detail.key; 
           this.removeControl(key);
        });
    }
    setControls(key){
        switch (key) {
            case "ArrowLeft":
                this.model.controls.left = true;
                
                break;
            case "ArrowRight":
                this.model.controls.right = true;
                break;
            case "ArrowUp":
                this.model.controls.up = true;
                break;
            case "ArrowDown":
                this.model.controls.down = true;
                break;
        }
        console.log("setcontrols: ",this.model.controls);
        this.model.setDirection(this.model.controls);
    }
   
    removeControl(key){
        switch (key) {
            case "ArrowLeft":
                this.model.controls.left = false;                
                break;
            case "ArrowRight":
                this.model.controls.right = false;
                break;
            case "ArrowUp":
                this.model.controls.up = false;
                break;
            case "ArrowDown":
                this.model.controls.down = false;
                break;
        }
        this.model.setDirection(this.model.controls);
    }
    getControls(){
        return this.model.controls;
    }
    gameTick(){
        //prepare next game tick
         setTimeout(this.gameTick.bind(this), 500);
        //remove snake from model.grid
        console.log("remove snake");
        let currenthead = this.model.snake.front;
        console.log("currenthead.front.data[0]: ",currenthead.data[0]);
        // console.log("curent.front.next: ",current.front.next);
        // console.log("current length: ",current.length)
        while(currenthead) {
       
            this.model.writeToCell(currenthead.data[0][0], currenthead.data[0][1], 0);
            currenthead = currenthead.next;
        }
       
    console.log("set directions");
        this.model.setDirection(this.getControls());
        const newdirection=this.model.direction;
        console.log("new direction",this.model.direction);
        console.log("move snake");
        const newHead={
            row:this.model.snake.rear.data[0][0],
            col:this.model.snake.rear.data[0][1]
        };
        console.log("switch directions");
        switch(newdirection) {
            case "left":
                newHead.col--;
                if(newHead.col<0){
                    newHead.col=this.model.gridSize-1;
                }
                break;
            case "right":
                newHead.col++;
                if(newHead.col>=this.model.gridSize){
                    newHead.col=0;
                }
                break;
            case "up":
                newHead.row--;
                if(newHead.row<0){
                    newHead.row=this.model.gridSize-1;
                }
                break;
            default: // down
                newHead.row++;
                if(newHead.row>=this.model.gridSize){
                    newHead.row=0;
                }
        }
        this.model.snake.enqueue([[newHead.row, newHead.col]]);
       
        console.log("check collision with food");
        console.log("data: ",this.model.grid[newHead.row][newHead.col])
       if(this.model.grid[newHead.row][newHead.col]===2){
            this.model.food.pop();
            this.model.incrementScore();
            this.view.updateScore();
            this.view.updateCell(newHead.row, newHead.col);
            this.model.growSnake();
            this.model.addFood();
       }
       this.model.snake.dequeue();

      
        if(this.model.grid[newHead.row][newHead.col]===1){
            this.model.gameOver=true;
            console.log("game over");
           return; 
        }
        // //check for food
        // if(this.model.food.length===0){
        //     this.model.addFood();
        // }else{
        //     //check for collision with food
        //     if(this.model.food[0][0]===this.model.snake.peek()[0][0]&&this.model.food[0][1]===this.model.snake.peek()[0][1]){
        //         this.model.food.pop();
        //     }
        // }

        //remove tail if no food, else grow by one
        // if(this.model.food.length===0){
        //     this.model.snake.dequeue();
        // }else{
        //     this.model.growSnake();
        // }
        //add snake and food to model.grid 
        // this.model.writeToCell(this.model.snake.peek()[0], this.model.snake.peek()[1], 1);

        let newsnake = this.model.snake.front;
        console.log("new snake.data", newsnake);
        while(newsnake) {            
             
             this.model.writeToCell(newsnake.data[0][0], newsnake.data[0][1], 1);
             console.log("snakebit:", newsnake.data[0][0], newsnake.data[0][1]);
             newsnake = newsnake.next;
        }
        // console.log("food: ",this.model.food[0][0],this.model.food[0][1]);
        this.model.writeToCell(this.model.food[0][0], this.model.food[0][1], 2);
        //update view
        this.view.updateView();
    }
}