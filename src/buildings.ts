import { Graphics, GraphicsGeometry, Point } from "pixi.js";
import "@pixi/math-extras"
import { debugDot } from "./debug";
import init from "@astrojs/image/dist/vendor/squoosh/png/squoosh_oxipng.js";

function sleep(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export function findTargetFactor(m: number, wx: number, wy: number, gx: number, gy: number) {
	const numerator = m ** 2 - 2 * m * Math.sqrt(wx + wy) + wx + wy;
	const denominator = gx + gy;

	if (denominator === 0) {
		throw new Error("The denominator cannot be zero.");
	}

	const s = numerator / denominator;
	return s;

}

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

	dashedLineTo(x: number, y: number, segmentLength: number, segmentGap: number): this {
		console.warn("dashed line");
		// TODO: moving point along vector
		const origin = this.drawPosition.clone();
		const destination = new Point(x, y);
		const segmentScalar = segmentLength / destination.magnitude();
		const totalScalar = (segmentLength + segmentGap) / destination.magnitude();
		const pieceCount = Math.floor(destination.magnitude() / (segmentLength + segmentGap));
		for (let i = 0; i < pieceCount; i++) {
			// const color = generateRandomColor();
			// this.lineStyle({ color, width: 10 });
			const start = i == 0 ? origin : destination.multiplyScalar(i * totalScalar);
			this.moveTo(start.x, start.y);
			const end = destination.multiplyScalar(segmentScalar + (i * totalScalar))
			this.lineTo(end.x, end.y);
		}
		return this;
	}
}