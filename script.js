"use strict"
import {GameModel} from "./model/model.js";
import {GameView} from "./view/view.js";
import{Gamecontroller} from "./controller/controller.js";


window.addEventListener("load", start);
function start(){
    console.log("start");
    const model=new GameModel();
    const view=new GameView(model);
    const controller=new Gamecontroller(model, view);
//    controller.gameTick();
}