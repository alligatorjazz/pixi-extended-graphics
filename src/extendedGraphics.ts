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

export class ExtendedGraphics extends Graphics {
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
		const origin = this.drawPosition.clone();
		const destination = new Point(x, y);
		const delta = destination.subtract(origin);

		// the factor the delta will be multipled by to produce the start and end of each segment
		const segmentScalar = segmentLength / delta.magnitude();
		// same as above, including space for the gap
		const totalScalar = (segmentLength + segmentGap) / delta.magnitude();
		const pieceCount = Math.floor(delta.magnitude() / (segmentLength + segmentGap));

		for (let i = 0; i < pieceCount; i++) {
			const start = i == 0 ? origin : delta
				.multiplyScalar(Math.min(i * totalScalar))
				// ensures segments are drawn relative to the specified origin rather than (0, 0)
				.add(origin);
			this.moveTo(start.x, start.y);
			const end = delta.multiplyScalar(segmentScalar + (i * totalScalar)).add(origin);
			this.lineTo(end.x, end.y);
		}

		// the dashed line may have a gap at the end. 
		// this line ensures the drawing location is set
		// to the actual destination rather than whatever 
		// location the final segment happened to cut off at.
		this.moveTo(x, y);
		return this;
	}

	// convenience functions
	moveToPoint(point: Point) {
		this.moveTo(point.x, point.y)
	}

	lineToPoint(point: Point) {
		this.lineTo(point.x, point.y)
	}

	dashedLineToPoint(point: Point, segmentLength: number, segmentGap: number) {
		this.dashedLineTo(point.x, point.y, segmentLength, segmentGap)
	}
}