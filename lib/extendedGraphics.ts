import "@pixi/math-extras";
import { Graphics, GraphicsGeometry, Point } from "pixi.js";
/**
	 * Adds a variety of utility functions to the base pixi.js graphics class.
	 * @remarks
	 *
	 * Enables support for dotted lines and more.
	 *
	 * @example
	 * ```typescript
		import { Point } from "pixi.js";
		import { ExtendedGraphics } from "./extendedGraphics";

		const graphics = new ExtendedGraphics();
		graphics.lineStyle({ color: "white", width: 10, alignment: 0.5 });

		// draw line to point
		const point1 = new Point(120, 0);
		graphics.lineToPoint(point1);

		// draw dashed line
		const segmentLength = 20;
		const segmentGap = 5;
		graphics.dashedLineTo(240, 0, segmentLength, segmentGap);

		// draw dashed line to point
		const point2 = new Point(360, 0);
		graphics.dashedLineToPoint(point2, segmentLength, segmentGap);
	 * ```
	 *
	 * @public 
	 */
export class ExtendedGraphics extends Graphics {
	/**
	 * Stores the current drawing position of the graphics element.
	 * @public @readonly
	*/
	readonly drawPosition: Point = new Point(0, 0);

	private _dashedFill: boolean = false;
	private solidQueue: Point[] = [];
	private dashQueue: (() => void)[] = [];
	/**
	 * Creates a new `ExtendedGraphics()` instance.
	 *
	 * @constructor
	 *
	 * @param @see PIXI.Geometry
	 * @returns type and meaning of return value
	*/
	constructor(geometry?: GraphicsGeometry) {
		super(geometry);
	}

	endFill(): this {
		// if dashedFill enabled, draw transparent lines underneath the dashed ones
		if (this.dashedFill) {
			const originalStyle = { ...this.line };
			this.lineStyle({ ...originalStyle, alpha: 0 });

			this.drawPolygon(this.solidQueue);
			this.lineStyle(originalStyle);

			for (const drawLine of this.dashQueue) {
				drawLine();
			}
		}
		super.endFill();
		return this;
	}
	/**
	 * Same as `PIXI.Graphics.moveTo()`, but stores the drawing position.
	 *
	 * @returns This ExtendedGraphics object. Good for chaining method calls
	*/
	moveTo(x: number, y: number): this {
		this.drawPosition.copyFrom(new Point(x, y));
		return super.moveTo(x, y);
	}

	/**
	 * Same as `PIXI.Graphics.lineTo()`, but stores the drawing position.
	 *
	 * @returns This ExtendedGraphics object. Good for chaining method calls
	*/
	lineTo(x: number, y: number): this {
		this.drawPosition.copyFrom(new Point(x, y));
		return super.lineTo(x, y);
	}

	private drawDashesBetween(p1: Point, p2: Point, segmentLength: number, segmentGap: number): void {
		const delta = p2.subtract(p1);
		// the factor the delta will be multipled by to produce the start and end of each segment
		const segmentScalar = segmentLength / delta.magnitude();
		// same as above, including space for the gap
		const totalScalar = (segmentLength + segmentGap) / delta.magnitude();
		const pieceCount = Math.floor(delta.magnitude() / (segmentLength + segmentGap));
		for (let i = 0; i <= pieceCount; i++) {
			const start = i == 0 ? p1 : delta
				.multiplyScalar(i * totalScalar)
				// ensures segments are drawn relative to the specified origin rather than (0, 0)
				.add(p1);
			this.moveTo(start.x, start.y);

			const end = delta.multiplyScalar(segmentScalar + (i * totalScalar)).add(p1);
			// the dashed line may have a gap at the end. these lines ensures the drawing location is set
			// to the actual destination rather than whatever location the final segment happened to cut off at.
			this.lineTo(
				i == pieceCount ? delta.x + p1.x : end.x,
				i == pieceCount ? delta.y + p1.y : end.y,
			);
		}
	}
	/**
	 * Draws a dashed line in the current line style from the current drawing position to `(x, y)`.
	 *
	 * @param x - The x coordinate of the point that the line will terminate at.
	 * @param y - The y coordinate of the point that the line will terminate at.
	 * @param segmentLength - The length, in pixels, of each constituent line dash.
	 * @param segmentGap - The gap, in pixels, between every line dash.
	 *
	 * @returns This ExtendedGraphics object. Good for chaining method calls
	*/
	dashedLineTo(x: number, y: number, segmentLength: number, segmentGap: number): this {
		const origin = this.drawPosition.clone();
		const destination = new Point(x, y);

		if (this.dashedFill) {
			this.solidQueue.push(origin);
			this.solidQueue.push(destination);
			this.dashQueue.push(() => this.drawDashesBetween(origin, destination, segmentLength, segmentGap));
		} else {
			this.drawDashesBetween(origin, destination, segmentLength, segmentGap);
		}

		this.moveTo(x, y);

		return this;
	}

	/**
	 * Same as `ExtendedGraphics.moveTo()`, but accepts a point instead of two separate numbers.
	 *
	 * @param point - The point you want to move the drawing position to.
	 * @returns This ExtendedGraphics object. Good for chaining method calls
	*/
	moveToPoint(point: Point): this {
		return this.moveTo(point.x, point.y);
	}

	/**
	 * Same as `ExtendedGraphics.lineTo()`, but accepts a point instead of two separate numbers.
	 *
	 * @param point - The point you want the line to terminate at.
	 * @returns This ExtendedGraphics object. Good for chaining method calls
	*/
	lineToPoint(point: Point): this {
		return this.lineTo(point.x, point.y);
	}

	/**
	 * Same as `ExtendedGraphics.dashedLineTo()`, but accepts a point instead of two separate numbers.
	 *
	 * @param point - The point you want the line to terminate at.
	 * @returns This ExtendedGraphics object. Good for chaining method calls
	*/
	dashedLineToPoint(point: Point, segmentLength: number, segmentGap: number): this {
		return this.dashedLineTo(point.x, point.y, segmentLength, segmentGap);
	}

	/**
	 * Controls whether lines drawn with dashedLineTo are treated as solid with respect to fills **Only applies to dashed lines drawn while `dashedFill` is set to `true`.
	 *
	 * @remarks Internally, this is done by storing the instruction to draw each dashed line, and then drawing solid transparent lines underneath them all at once. May cause performance bottlenecks if drawing many dashed lines. Ensure your rendering environment supports transparency.
	 *
	*/
	get dashedFill(): boolean {
		return this._dashedFill;
	}

	setDashedFill(value: boolean): this {
		this._dashedFill = value;
		return this;
	}
}