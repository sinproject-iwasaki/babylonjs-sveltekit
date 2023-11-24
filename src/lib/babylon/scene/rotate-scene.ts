import { SceneBuilder } from '../scene-builder'

export class RotateScene {
	private _scene_builder: SceneBuilder

	public constructor(canvas: HTMLCanvasElement) {
		this._scene_builder = new SceneBuilder(canvas)
	}

	public create(): RotateScene {
		const scene_builder = this._scene_builder

		scene_builder.attach_arc_rotate_camera()
		scene_builder.attach_light({})

		scene_builder.create_sphere()
		scene_builder.create_ground()

		scene_builder.run()

		return this
	}
}
