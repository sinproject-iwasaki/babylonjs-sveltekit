import { SceneBuilder } from '../scene-builder'

export class BoxesScene {
	private _scene_builder: SceneBuilder

	public constructor(canvas: HTMLCanvasElement) {
		this._scene_builder = new SceneBuilder(canvas)
	}

	public create(): BoxesScene {
		const scene_builder = this._scene_builder

		scene_builder.attach_arc_rotate_camera()
		scene_builder.attach_light({})
		scene_builder.create_ground()

		const box1 = BABYLON.MeshBuilder.CreateBox('box1', { width: 2, height: 1.5, depth: 3 })
		box1.position.y = 0.75

		const box2 = BABYLON.MeshBuilder.CreateBox('box2', {})
		box2.scaling.x = 2
		box2.scaling.y = 1.5
		box2.scaling.z = 3
		box2.position = new BABYLON.Vector3(-3, 0.75, 0)

		const box3 = BABYLON.MeshBuilder.CreateBox('box3', {})
		box3.scaling = new BABYLON.Vector3(2, 1.5, 3)
		box3.position.x = 3
		box3.position.y = 0.75
		box3.position.z = 0

		scene_builder.run()

		return this
	}
}
