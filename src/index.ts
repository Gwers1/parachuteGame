import { Game } from './game';
import { MovingObject } from './object';
import { Plane } from './plane';
import { Boat } from './boat';

function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if(boat != null){
        boat.yPos = window.innerHeight - 75;
    }
}

window.addEventListener('resize', resizeCanvas);

const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

const game = new Game(0, 3, canvas, ctx);

const objList: MovingObject[] = [];
const planeImage = new Image();
const boatImage = new Image();
planeImage.src = "./resources/plane.png";
boatImage.src = "./resources/boat.png";
const plane = new Plane(0, 100, 113, 145, 5, 0, planeImage);
const boat = new Boat(0, window.innerHeight - 75, 100, 100, 2, 0, boatImage);
objList.push(plane);
objList.push(boat);

document.addEventListener('keydown', (e) => {
    boat.handleKeyInput(e.key);
});

canvas.addEventListener('dblclick', (e) => {
    const canvasRect = canvas.getBoundingClientRect();
    boat.handleMouseInput(e.clientX - canvasRect.left);
})

game.gameLoop(objList);

