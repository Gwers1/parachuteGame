class MovingObject {
    xPos: number;
    yPos: number;
    height: number;
    length:number;
    speed: number; //Pixels per update
    direction: number; //Degrees 0-360

    constructor(xInit: number, yInit: number, height: number, length: number, speed: number, direction: number){
        this.xPos = xInit;
        this.yPos = yInit;
        this.height = height;
        this.length = length;
        this.speed = speed;
        this.direction = direction;
    }

    move(canvasWidth : number, canvasLength: number) {
        const radians = this.direction * Math.PI / 180;
        const dx = this.speed * Math.cos(radians);
        const dy = this.speed * Math.sin(radians);
        const xCheck = this.xPos + dx;
        const yCheck = this.yPos + dy;
        if(xCheck < canvasWidth || xCheck > 0){
            this.xPos += dx;
        }
        if(this.xPos + dx < 0){
            this.xPos = 0;
        }
        if(this.xPos + dx > canvasWidth){
            this.xPos = canvasWidth;
        }
        if(yCheck < canvasWidth || yCheck > 0){
            this.yPos += dy;
        }
        if(yCheck > canvasLength){
            this.yPos = canvasLength;
        }
        if(yCheck < 0){
            this.yPos = 0;
        }
    }
}
class Plane extends MovingObject {

    override move(canvasWidth : number, canvasLength: number) {
        if(this.xPos == canvasWidth){
            this.direction = 180;
        }
        if(this.xPos == 0){
            this.direction = 0;
        }
        super.move(canvasWidth, canvasLength);
    }

}

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