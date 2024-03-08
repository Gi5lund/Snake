
export class Gamecontroller {
    constructor(model, view){
        this.model=model;
        this.view=view;
        this.setupEventlisteners();
        this.init();
        this.controls={
            left: false,
            right: false,
            up: false,
            down: false,
        }
    }
    init(){
        console.log("controller init");
        
        this.gameTick();
    }
    
    setupEventlisteners() {
        document.addEventListener("keyPressed", (event) => {
        const key=event.detail.key;
        this.setControls(key);   
        });
        document.addEventListener("keyReleased", (event) => {
           const key=event.detail.key; 
           this.removeControl(key);
        });
    }
    setControls(direction){
        switch (direction) {
            case "ArrowLeft":
                this.controls.left = true;
                
                break;
            case "ArrowRight":
                this.controls.right = true;
                break;
            case "ArrowUp":
                this.controls.up = true;
                break;
            case "ArrowDown":
                this.controls.down = true;
                break;
        }
    }
    getControls(){
        return this.controls;
    }
    removeControl(direction){
        switch (direction) {
            case "ArrowLeft":
                this.controls.left = false;
                
                break;
            case "ArrowRight":
                this.controls.right = false;
                break;
            case "ArrowUp":
                this.controls.up = false;
                break;
            case "ArrowDown":
                this.controls.down = false;
                break;
        }
    }
    gameTick(){
        //prepare next game tick
        setTimeout(this.gameTick.bind(this), 500);

        //remove snake and food from model.grid
        this.model.writeToCell(this.model.snake.peek()[0], this.model.snake.peek()[1], 0);
        this.model.writeToCell(this.model.food[0][0], this.model.food[0][1], 0);
        //respond to controls(change direction)
        this.model.setDirection(this.getControls());

        //copy snake head 
      // const snakeHead=this.model.snake.peek();
        //change/calculate position of new head
        this.model.moveSnake();
        //add new head to model.snake
       // this.model.snake.enqueue(snakeHead); 
       
        //check for collision with self
        if(this.model.checkCollisionWithSelf()){
            this.model.gameOver=true;
        }
        //check for food
        if(this.model.food.length===0){
            this.model.addFood();
        }else{
            //check for collision with food
            if(this.model.food[0][0]===this.model.snake.peek()[0]&&this.model.food[0][1]===this.model.snake.peek()[1]){
                this.model.food.pop();
            }
        }

        //remove tail if no food, else grow by one
        if(this.model.food.length===0){
            this.model.snake.dequeue();
        }else{
            this.model.growSnake();
        }
        //add snake and food to model.grid 
        this.model.writeToCell(this.model.snake.peek()[0], this.model.snake.peek()[1], 1);
        this.model.writeToCell(this.model.food[0][0], this.model.food[0][1], 2);
        //update view
        this.view.updateView();
    }
}