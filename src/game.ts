import { Plane } from './plane';
import { MovingObject } from './object';

const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

const planeImage = new Image();
console.log("Importing");
planeImage.src = "./resources/plane.png";
console.log("After");
// planeImage.onload = () => {
//     ctx.drawImage(planeImage,x,y);
// }
const plane = new Plane(0, 0, 100, 100, 5, 0);

function drawPlane(plane: Plane){
    ctx.save();
    ctx.translate(plane.xPos, plane.yPos);
    ctx.rotate(plane.direction * Math.PI / 180);
    ctx.drawImage(planeImage, -planeImage.width/2, -planeImage.height/2);
    ctx.restore();
}

function gameLoop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log("AA");
    plane.move(canvas.width, canvas.height);
    
    drawPlane(plane);
    
    requestAnimationFrame(gameLoop);
}

gameLoop();

//The game will make all of the objects (Plane + Boat)