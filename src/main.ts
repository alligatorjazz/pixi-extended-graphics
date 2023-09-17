import { Application, Point } from "pixi.js";
import { ExtendedGraphics } from "../lib/extendedGraphics";

function main(element: HTMLElement) {
	const app = new Application({
		width: 1000,
		height: 700,
		backgroundColor: "grey"
	});

	const width = 500;
	const height = 500;

	const extended = new ExtendedGraphics();



	extended;
		

	const points = [
		new Point(width, 0),
		new Point(width, height),
		new Point(0, height),
		new Point(width / 2, height / 2),
		new Point(0, 0),
	];

	extended
		.beginFill("black")
		.setDashedFill(true)
		.lineStyle({ color: "skyblue", width: 10, alignment: 0 })
		.dashedLineToPoint(points[0], 20, 5)
		.dashedLineToPoint(points[1], 20, 5)
		.dashedLineToPoint(points[2], 20, 5)
		.dashedLineToPoint(points[3], 20, 5)
		.endFill();

	extended.position.set(
		app.view.width / 2,
		app.view.height / 2
	);

	extended.pivot.set(
		width / 2,
		height / 2
	);

	app.stage.addChild(extended);

	element.appendChild(app.view as unknown as HTMLElement);
}

document.addEventListener("DOMContentLoaded", () => main(document.getElementById("app")!));