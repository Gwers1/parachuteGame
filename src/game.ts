import { MovingObject } from './object';
import { Parachutist } from './parachutist';
import { Boat } from './boat';
import { Plane } from './plane';

export class Game {
    score: number;
    lives: number;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    parachutes: Parachutist[];

    constructor(score: number, lives: number, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D){
        this.score = score;
        this.lives = lives;
        this.canvas = canvas;
        this.ctx = ctx;
        this.parachutes = [];
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

    gameLoop(plane: Plane, boat: Boat, parachutistImage: HTMLImageElement, 
        bgImage: HTMLImageElement, seaImage: HTMLImageElement){

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(bgImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(seaImage, 0, this.canvas.height-75, this.canvas.width, 75);
        if(this.lives > 0){
            //Code for UI
            this.ctx.fillStyle = 'black';
            this.ctx.font = '26px Arial'; 
            this.ctx.fillText('Score: ' + this.score, 20, 25);
            this.ctx.fillText('Lives: ' + this.lives, this.canvas.width - 125, 25);
            // for(let i = 0; i < obj.length; i++){
            //     obj[i].move(this.canvas.width, this.canvas.height);
            //     this.drawObject(obj[i], obj[i].image);
            // }
            //Object steps and drawing
            plane.move(this.canvas.width, this.canvas.height);
            this.drawObject(plane, plane.image);
            boat.move(this.canvas.width, this.canvas.height);
            this.drawObject(boat, boat.image);
            //Parachute steps and drawing + collision checking
            for(let i = 0; i < this.parachutes.length; i++){
                this.parachutes[i].move(this.canvas.width, this.canvas.height);
                if(this.parachutes[i].isCaught(boat)){
                    console.log("Caught");
                    this.score += 10;
                    this.parachutes.splice(i,1);
                    continue;
                }
                if(this.parachutes[i].yPos >= this.canvas.height - 50){
                    console.log("Missed");
                    this.lives--;
                    this.parachutes.splice(i,1);
                }
                this.drawObject(this.parachutes[i], this.parachutes[i].image)
            }
            //Parachute spawning
            if(Math.random() < 0.01 && this.parachutes.length < 10){
                const tempParachutist = new Parachutist(
                    plane.xPos, plane.yPos,
                    113, 77, 0.5, 90, parachutistImage
                );
                this.parachutes.push(tempParachutist);
            }
            requestAnimationFrame(() => this.gameLoop(plane, boat, parachutistImage, bgImage, seaImage));
        }else{
            this.ctx.fillStyle = 'black';
            this.ctx.font = '50px Arial'; 
            this.ctx.fillText('Final Score: ' + this.score, this.canvas.width/2, this.canvas.height/2);
            requestAnimationFrame(() => this.gameLoop(plane, boat, parachutistImage, bgImage, seaImage));
        }
    }
}