import { SceneBuilder } from '../scene-builder'
import * as BABYLON from 'babylonjs'

export class MainScene {
	private _scene_builder: SceneBuilder

	public constructor(canvas: HTMLCanvasElement) {
		this._scene_builder = new SceneBuilder(canvas)
	}

	public create(): MainScene {
		const scene_builder = this._scene_builder

		scene_builder.attach_arc_rotate_camera()
		scene_builder.attach_light({})

		const ground_mat = scene_builder.create_color3_material('ground_mat', 0, 1, 0)

		const roof_mat = scene_builder.create_textured_material(
			'roof_mat',
			'https://assets.babylonjs.com/environments/roof.jpg'
		)

		const box_mat = scene_builder.create_textured_material(
			'box_mat',
			'https://www.babylonjs-playground.com/textures/floor.png'
		)

		const ground = scene_builder.create_ground()
		const box = scene_builder.create_box()
		const roof = BABYLON.MeshBuilder.CreateCylinder('roof', {
			diameter: 1.3,
			height: 1.2,
			tessellation: 3,
		})
		roof.scaling.x = 0.75
		roof.rotation.z = Math.PI / 2
		roof.position.y = 1.22

		ground.material = ground_mat
		box.material = box_mat
		roof.material = roof_mat

		scene_builder.run()

		return this
	}
}
