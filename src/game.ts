import { MovingObject } from './object';

export class Game {
    score: number;
    lives: number;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    constructor(score: number, lives: number, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D){
        this.score = score;
        this.lives = lives;
        this.canvas = canvas;
        this.ctx = ctx;
    }

    drawObject(obj: MovingObject, img: HTMLImageElement){
        this.ctx.save();
        this.ctx.translate(obj.xPos, obj.yPos);
        //this.ctx.rotate((obj.direction * Math.PI / 180)); 
        //Needs to context.scale(-1, 1) whenever the object holding the image has a value(flip) that is true
        //Which will later be false upon flipping
        this.ctx.drawImage(img, -img.width/2, -img.height/2);
        this.ctx.restore();
    }

    gameLoop(obj: MovingObject[]){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for(let i = 0; i < obj.length; i++){
            obj[i].move(this.canvas.width, this.canvas.height);
            this.drawObject(obj[i], obj[i].image);
        }

        requestAnimationFrame(() => this.gameLoop(obj));

    }
}