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

class QueueApp {
}
export const controls={
    left: false,
    right: false,
    up: false,
    down: false,
}
export function setControls(direction){
    switch (direction) {
        case "left":
            controls.left = true;
            
            break;
        case "right":
            controls.right = true;
            break;
        case "up":
            controls.up = true;
            break;
        case "down":
            controls.down = true;
            break;
    }

}