import { SceneBuilder } from '../scene-builder'

export class DefaultScene {
	private _scene_builder: SceneBuilder

	public constructor(canvas: HTMLCanvasElement) {
		this._scene_builder = new SceneBuilder(canvas)
	}

	public create(): DefaultScene {
		const scene_builder = this._scene_builder

		scene_builder.attach_free_camera()
		scene_builder.attach_light({})

		scene_builder.create_sphere()
		scene_builder.create_ground(6)

		scene_builder.run()

		return this
	}
}
