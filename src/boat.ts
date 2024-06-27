import { MovingObject } from './object'

export class Boat extends MovingObject {
    //dSpeed = 1;

    handleKeyInput(key: string){
        switch(key){
            case 'ArrowLeft':
                this.direction = 180;
                break;
            case 'ArrowRight':
                this.direction = 0;
                break;
            default:
                break;
        }
    }

    handleMouseInput(xCoord: number){
        const diff = this.xPos - xCoord;
        if(diff < 0){
            this.direction = 0;
        }
        if(diff > 0){
            this.direction = 180;
        }
    }

}