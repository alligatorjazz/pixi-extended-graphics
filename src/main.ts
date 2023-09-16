import { Application, Point } from "pixi.js";
import { BuildingGraphics } from "./buildings";
import { generateRandomColor } from "./debug";

function main(element: HTMLElement) {
	const app = new Application({
		width: 1000,
		height: 700,
		backgroundColor: "grey"
	});

	const width = 500;
	const height = 500;

	const building = new BuildingGraphics();
	building.beginFill("black");
	building.drawRect(0, 0, width, height);
	building.endFill();
	building.lineStyle({ color: "skyblue", width: 10 })

	// solid borders
	// building.moveTo(0, 0)
	// building.lineTo(width, 0);

	// building.moveTo(width, 0)
	// building.lineTo(width, height);

	// building.moveTo(width, height)
	// building.lineTo(0, height);

	// building.moveTo(0, height);
	// building.lineTo(0, 0);
	// dotted borders

	// building.lineTo(0, 40);
	// building.moveTo(0, 50);
	// building.lineTo(0, 90);
	// building.moveTo(0, 100);
	// building.lineTo(0, 140);
	
	building.moveTo(0, 0);
	building.dashedLineTo(width, 0, 20, 5);
	building.dashedLineTo(width, height, 20, 5);
	building.dashedLineTo(0, height, 20, 5);
	building.dashedLineTo(0, 0, 20, 5);


	building.position.set(
		app.view.width / 2,
		app.view.height / 2
	);

	building.pivot.set(
		width / 2,
		height / 2
	)

	app.stage.addChild(building);

	element.appendChild(app.view as unknown as HTMLElement);
}

document.addEventListener("DOMContentLoaded", () => main(document.getElementById("app")!));