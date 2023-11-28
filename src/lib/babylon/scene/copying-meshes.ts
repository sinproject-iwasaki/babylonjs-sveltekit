import { DwellingMesh } from '../mesh/dwelling-mesh'
import { SceneBuilder } from '../scene-builder'

export class MainScene {
	private _scene_builder: SceneBuilder

	public constructor(canvas: HTMLCanvasElement) {
		this._scene_builder = new SceneBuilder(canvas)
	}

	public create(): this {
		const scene_builder = this._scene_builder

		scene_builder.attach_arc_rotate_camera(15)
		scene_builder.attach_light({})

		new DwellingMesh(scene_builder).build()

		scene_builder.run()

		return this
	}
}
