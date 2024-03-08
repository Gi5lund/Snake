//her findes modeller for gameEntities

class Node{
    constructor(data){
  this.data=data;
    this.next=null;
    }

}

 class SnakeQueue {
    constructor() {
        this.front=null;
        this.rear = null;
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
          console.log(current.data);
          current = current.next;
     }
    }
}




export class GameModel{
    constructor(){
        this.direction="right";
        this.snake=new SnakeQueue();
        this.food=[];
        this.score=0;
        this.gameOver=false;
        this.gridSize=20;
        this.grid = this.createGrid();
      
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
    setDirection(controls){
        if(controls.left){
            this.direction="left";
        }else if (controls.up){
            this.direction="up";  
        } else if (controls.right){ 
            this.direction="right";
        } else if (controls.down){    
            this.direction="down";
        }
        
    }
    moveSnake(){
        let newHead;
        let head=this.snake.peek();
        
        if (this.direction==="right"){
            newHead=[head[0],head[1]+1];
            
        }else if(this.direction==="left"){
            newHead=[head[0],head[1]-1];
        }else if(this.direction== "up"){
            newHead=[head[0]-1,head[1]];
        } else {
            newHead=[head[0]+1,head[1]];
        }
        this.snake.enqueue(newHead);
         console.log("New Snake")
    }
    addFood(){
        let x=Math.floor(Math.random()*this.gridSize);
        let y=Math.floor(Math.random()*this.gridSize);
        this.food.push([x,y]);
    }
    writeToCell(row,col,value){
        this.grid[row][col]=value;
    }
    readFromCell(row,col){
        return this.grid[row][col];
    }
    growSnake(){
        let tail=this.snake.peek();
        this.snake.enqueue(tail);
    }
    checkCollisionWithSelf(){ 
        let head=this.snake.peek();
        let current=this.snake.front;
        while(current.next){
            if(current.data[0]===head[0]&&current.data[1]===head[1]){
                
                return true;
            }
            current=current.next;
        }
        return false;
    }

}

