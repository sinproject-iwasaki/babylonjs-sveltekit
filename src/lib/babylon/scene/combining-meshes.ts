import { SceneBuilder } from '../scene-builder'
import * as BABYLON from 'babylonjs'

export class MainScene {
	private _scene_builder: SceneBuilder

	public constructor(canvas: HTMLCanvasElement) {
		this._scene_builder = new SceneBuilder(canvas)
	}

	private _build_ground(): void {
		const ground_mat = this._scene_builder.create_color3_material('ground_mat', 0, 1, 0)

		const ground = this._scene_builder.create_ground()
		ground.material = ground_mat
	}

	private _build_box(): BABYLON.Mesh {
		const box_mat = this._scene_builder.create_textured_material(
			'box_mat',
			'https://assets.babylonjs.com/environments/semihouse.png'
		)

		const face_uv: BABYLON.Vector4[] = []
		face_uv.push(new BABYLON.Vector4(0.6, 0.0, 1.0, 1.0))
		face_uv.push(new BABYLON.Vector4(0.0, 0.0, 0.4, 1.0))
		face_uv.push(new BABYLON.Vector4(0.4, 0.0, 0.6, 1.0))
		face_uv.push(new BABYLON.Vector4(0.4, 0.0, 0.6, 1.0))

		const box = BABYLON.MeshBuilder.CreateBox('box', { width: 2, faceUV: face_uv, wrap: true })
		box.position.y = 0.5
		box.material = box_mat

		return box
	}

	private _build_roof(): BABYLON.Mesh {
		const roof_mat = this._scene_builder.create_textured_material(
			'roof_mat',
			'https://assets.babylonjs.com/environments/roof.jpg'
		)

		const roof = BABYLON.MeshBuilder.CreateCylinder('roof', {
			diameter: 1.3,
			height: 1.2,
			tessellation: 3,
		})
		roof.scaling.x = 0.75
		roof.scaling.y = 2
		roof.rotation.z = Math.PI / 2
		roof.position.y = 1.22
		roof.material = roof_mat

		return roof
	}

	private _build_house(): BABYLON.Nullable<BABYLON.Mesh> {
		const box = this._build_box()
		const roof = this._build_roof()
		const house = BABYLON.Mesh.MergeMeshes([box, roof], true, false, undefined, false, true)

		return house
	}

	public create(): MainScene {
		const scene_builder = this._scene_builder

		scene_builder.attach_arc_rotate_camera()
		scene_builder.attach_light({})

		this._build_ground()
		this._build_house()

		scene_builder.run()

		return this
	}
}
