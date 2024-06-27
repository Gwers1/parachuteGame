import { MovingObject } from './object'

export class Plane extends MovingObject {

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