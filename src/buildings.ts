import { Graphics, GraphicsGeometry, Point } from "pixi.js";
import "@pixi/math-extras"
export class BuildingGraphics extends Graphics {
	readonly drawPosition: Point = new Point(0, 0);
	constructor(geometry?: GraphicsGeometry) {
		super(geometry);
	}

	moveTo(x: number, y: number): this {
		this.drawPosition.copyFrom(new Point(x, y));
		return super.moveTo(x, y);
	}

	lineTo(x: number, y: number): this {
		this.drawPosition.copyFrom(new Point(x, y));
		return super.lineTo(x, y);
	}

	drawDashedLine(x: number, y: number, segmentLength: number, segmentGap: number): this {
		const from = this.drawPosition.clone();
		const to = new Point(x, y);

		const distanceVector = to
		return this;
	}
}