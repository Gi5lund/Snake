//her findes modeller for gameEntities

class Node{
    constructor(data){
  this.data=data;
    this.next=null;
    }

}

 class SnakeQueue {
    constructor() {
        this.front=new Node();
        this.rear = new Node();
        // this.value=1;
        this.length = 0;
    }
    isEmpty(){
      return (this.length == 0);
    }
    
    enqueue(data) {
        const newNode = new Node(data);
        if(this.isEmpty()) {
            this.front = newNode;
            this.rear = newNode;
        } else {
            this.rear.next = newNode;
            this.rear = newNode;    
        }
        this.length++;                
    }
   dequeue() {
    if(this.isEmpty()) {
        return null;
    } 
    const removeNode=this.front;
    if(this.length===1){
        this.front=null;
        this.rear=null;
    }else{
        this.front=this.front.next;
    }
    this.length--;
    return removeNode.data;
   }
   peek() {
    if(this.isEmpty()) {
        return null;
    } else {
        return this.front.data;
    }
   }
    print() {
     let current = this.front;
     while(current) {
          console.log("Print snake: ",current.data);
          current = current.next;
     }
    }
}




export class GameModel{
    constructor(){
        this.controls={
            left: false,
            right: false,
            up: false,
            down: false,
        }
        this.direction="right";
        this.snake=new SnakeQueue();
        this.food=[];
        this.score=0;
        this.gameOver=false;
        this.gridSize=20;
        this.grid = this.createGrid();
        // console.log("grid: ",this.grid);
        this.initSnake();
        console.log("snake: ",this.snake);
        this.addFood();
      
    }
    createGrid(){
        let grid=[];
        for(let i=0;i<this.gridSize;i++){
            let row=[];
            for(let j=0;j<this.gridSize;j++){
                row.push(0);
            }
            grid.push(row);
        }
        return grid;
    }
    getScore(){
        return this.score;
    }
    incrementScore(){
        this.score++;
    }
    initSnake(){
         const startPos=[this.gridSize/2,this.gridSize/2]
                
        this.snake.enqueue([startPos]);
    }
    setDirection(controls){
        if(this.controls.left){
            this.direction="left";
        }else if (controls.up){
            this.direction="up";  
        } else if (this.controls.right){ 
            this.direction="right";
        } else if (this.controls.down){    
            this.direction="down";
        }
        // this.moveSnake(this.direction);
    }
    
    addFood(){
        let x=Math.floor(Math.random()*this.gridSize);
        let y=Math.floor(Math.random()*this.gridSize);
        this.food.push([x,y]);
    }
    writeToCell(row,col,value){ 
        if(row!==undefined&&col!==undefined&&value!==undefined){    
         console.log("new writetocell",row,col, value)       
       this.grid[row][col]= value;     
    }else{
        console.log("row, col, value: ",row, col, value);
    
    }
}
    readFromCell(row,col){
        return this.grid[row][col];
    }
    growSnake(){
        let tail=this.snake.rear.data;
        this.snake.enqueue(tail);
    }
    checkCollisionWithSelf(){ 
        let head=this.snake.peek();
        let current=this.snake.rear;
        while(current.next){
            if(current.data[0]===head[0]&&current.data[1]===head[1]){
                
                return true;
            }
            current=current.next;
        }
        return false;
    }

}

