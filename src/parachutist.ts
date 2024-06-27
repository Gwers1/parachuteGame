import { MovingObject } from './object';
import { Boat } from './boat';
export class Parachutist extends MovingObject{

    isCaught(boat: Boat){
        //Parachutist sides
        const PRS = this.xPos + this.length/2; 
        const PLS = this.xPos - this.length/2;
        const PBS = this.yPos + this.height/2; 
        //Boat sides
        const BRS = boat.xPos + boat.length/2; 
        const BLS = boat.xPos - boat.length/2;
        const BTS = boat.yPos - boat.height/2;

        console.log("Parachute", PRS);
        console.log("Boat", BLS);
        return PBS >= BTS && ((PRS >= BLS && PRS <= BRS) || (PLS <= BRS && PLS >= BLS)) && !(PBS < boat.yPos);
    }
}