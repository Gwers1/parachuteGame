export class MovingObject {
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