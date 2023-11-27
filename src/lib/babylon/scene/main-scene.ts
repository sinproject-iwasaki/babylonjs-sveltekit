import { SceneBuilder } from '../scene-builder'
import * as BABYLON from 'babylonjs'
import earcut from 'earcut'

export class MainScene {
	private _scene_builder: SceneBuilder

	public constructor(canvas: HTMLCanvasElement) {
		this._scene_builder = new SceneBuilder(canvas)
	}

	private _build_car_body(): BABYLON.Mesh {
		const outline = [new BABYLON.Vector3(-0.3, 0, -0.1), new BABYLON.Vector3(0.2, 0, -0.1)]

		for (let i = 0; i < 20; i++) {
			outline.push(
				new BABYLON.Vector3(
					0.2 * Math.cos((i * Math.PI) / 40),
					0,
					0.2 * Math.sin((i * Math.PI) / 40) - 0.1
				)
			)
		}

		outline.push(new BABYLON.Vector3(0, 0, 0.1))
		outline.push(new BABYLON.Vector3(-0.3, 0, 0.1))

		const car_body = BABYLON.MeshBuilder.ExtrudePolygon(
			'car',
			{ shape: outline, depth: 0.2 },
			undefined,
			earcut
		)

		return car_body
	}

	private _build_wheels(parent: BABYLON.Mesh): void {
		const wheel_rb = BABYLON.MeshBuilder.CreateCylinder('wheel_rb', {
			diameter: 0.125,
			height: 0.05,
		})
		wheel_rb.parent = parent
		wheel_rb.position.z = -0.1
		wheel_rb.position.x = -0.2
		wheel_rb.position.y = 0.035

		const wheel_rf = wheel_rb.clone('wheel_rf')
		wheel_rf.position.x = 0.1

		const wheel_lb = wheel_rb.clone('wheel_lb')
		wheel_lb.position.y = -0.2 - 0.035

		const wheel_lf = wheel_rf.clone('wheel_lf')
		wheel_lf.position.y = -0.2 - 0.035
	}

	private _build_car(): void {
		const car_body = this._build_car_body()

		this._build_wheels(car_body)
	}

	public create(): this {
		const scene_builder = this._scene_builder

		scene_builder.attach_arc_rotate_camera()
		scene_builder.attach_light({})

		this._build_car()

		scene_builder.run()

		return this
	}
}
