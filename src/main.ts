import { Application } from "pixi.js";
import { BuildingGraphics } from "./buildings";

function main(element: HTMLElement) {
	const app = new Application({
		width: 1000,
		height: 700,
		backgroundColor: "green"
	});

	const width = 500;
	const height = 400;

	const building = new BuildingGraphics();
	building.beginFill("black");
	building.drawRect(0, 0, width, height);
	building.endFill();
	building.lineStyle({ color: "skyblue", width: 10 })

	// solid borders
	building.moveTo(0, 0)
	building.lineTo(width, 0);

	building.moveTo(width, 0)
	building.lineTo(width, height);

	building.moveTo(width, height)
	building.lineTo(0, height);

	building.moveTo(0, height);
	building.lineTo(0, 0);
	// dotted borders
	building.lineStyle({ color: "red", width: 5 });

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