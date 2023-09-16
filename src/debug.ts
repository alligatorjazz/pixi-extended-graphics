import { Graphics, Point } from "pixi.js";

export function debugDot(position: Point, radius: number) {
	// debug dot - located at the wheel event's position on the container
	const dot = new Graphics();
	dot.beginFill("#5fd");
	dot.drawCircle(0, 0, radius);
	dot.position = position;
	return dot;
}

export function generateRandomColor(){
    let maxVal = 0xFFFFFF; // 16777215
    let randomNumber: string | number = Math.random() * maxVal; 
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, "0");   
    return `#${randColor.toUpperCase()}`
}