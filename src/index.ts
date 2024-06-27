import { Game } from './game';
import { MovingObject } from './object';
import { Plane } from './plane';
import { Boat } from './boat';


function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if(boat != null){
        boat.yPos = window.innerHeight - 85;
    }
}
window.addEventListener('resize', resizeCanvas);

const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

const game = new Game(0, 3, canvas, ctx);
//Initally used object list to animate movement (Allows more objects to be added/easily created)
//const objList: MovingObject[] = [];

//Boat and plane initalisation (Images are kept in the object as a field)
const planeImage = new Image();
const boatImage = new Image();
const parachutistImage = new Image();
const backgroundImage = new Image();
const seaImage = new Image();
planeImage.src = "./resources/plane.png";
boatImage.src = "./resources/boat.png";
parachutistImage.src = "./resources/parachutist.png";
backgroundImage.src = "./resources/background.png";
seaImage.src = "./resources/sea.png";
const plane = new Plane(0, 100, 113, 145, 4, 0, planeImage);
const boat = new Boat(0, window.innerHeight - 75, 153, 244, 4, 0, boatImage);
//objList.push(plane);
//objList.push(boat);

//Event listeners for controls
document.addEventListener('keydown', (e) => {
    boat.handleKeyInput(e.key);
});

canvas.addEventListener('dblclick', (e) => {
    const canvasRect = canvas.getBoundingClientRect();
    boat.handleMouseInput(e.clientX - canvasRect.left);
})

resizeCanvas();
game.gameLoop(plane, boat, parachutistImage, backgroundImage, seaImage);

