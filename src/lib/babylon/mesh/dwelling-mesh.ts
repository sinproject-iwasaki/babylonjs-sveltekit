import * as BABYLON from 'babylonjs'
import type { SceneBuilder } from '../scene-builder'

export class DwellingMesh {
	public constructor(private _scene_builder: SceneBuilder) {}

	private _build_box(width = 1): BABYLON.Mesh {
		const house_type = width == 2 ? 'semi' : 'cube'
		const box_mat = this._scene_builder.create_textured_material(
			'box_mat',
			`https://assets.babylonjs.com/environments/${house_type}house.png`
		)

		const face_uv: BABYLON.Vector4[] = []

		if (width == 2) {
			face_uv[0] = new BABYLON.Vector4(0.6, 0.0, 1.0, 1.0)
			face_uv[1] = new BABYLON.Vector4(0.0, 0.0, 0.4, 1.0)
			face_uv[2] = new BABYLON.Vector4(0.4, 0.0, 0.6, 1.0)
			face_uv[3] = new BABYLON.Vector4(0.4, 0.0, 0.6, 1.0)
		} else {
			face_uv[0] = new BABYLON.Vector4(0.5, 0.0, 0.75, 1.0)
			face_uv[1] = new BABYLON.Vector4(0.0, 0.0, 0.25, 1.0)
			face_uv[2] = new BABYLON.Vector4(0.25, 0, 0.5, 1.0)
			face_uv[3] = new BABYLON.Vector4(0.75, 0, 1.0, 1.0)
		}

		const box = BABYLON.MeshBuilder.CreateBox('box', { width, faceUV: face_uv, wrap: true })
		box.position.y = 0.5
		box.material = box_mat

		return box
	}

	private _build_roof(width = 1): BABYLON.Mesh {
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
		roof.scaling.y = width
		roof.rotation.z = Math.PI / 2
		roof.position.y = 1.22
		roof.material = roof_mat

		return roof
	}

	private _build_house(width = 1): BABYLON.Mesh {
		const box = this._build_box(width)
		const roof = this._build_roof(width)
		const house = BABYLON.Mesh.MergeMeshes([box, roof], true, false, undefined, false, true)

		if (!house) throw Error('house not found')

		return house
	}

	private _set_rotation_and_position(
		instanced_mesh: BABYLON.Mesh | BABYLON.InstancedMesh,
		rotation_y: number,
		position_x: number,
		position_z: number
	): void {
		instanced_mesh.rotation.y = rotation_y
		instanced_mesh.position.x = position_x
		instanced_mesh.position.z = position_z
	}

	private _build_ground(size = 10): void {
		const ground_mat = this._scene_builder.create_color3_material('ground_mat', 0, 1, 0)

		const ground = this._scene_builder.create_ground(size)
		ground.material = ground_mat
	}

	private _build_dwellings(): void {
		this._build_ground(16)

		const detached_house = this._build_house()
		this._set_rotation_and_position(detached_house, -Math.PI / 16, -6.8, 2.5)

		const semi_house = this._build_house(2)
		this._set_rotation_and_position(semi_house, -Math.PI / 16, -4.5, 3)

		type Place = [number, number, number, number]

		const places: Place[] = [] //each entry is an array [house type, rotation, x, z]
		places.push([1, -Math.PI / 16, -6.8, 2.5])
		places.push([2, -Math.PI / 16, -4.5, 3])
		places.push([2, -Math.PI / 16, -1.5, 4])
		places.push([2, -Math.PI / 3, 1.5, 6])
		places.push([2, (15 * Math.PI) / 16, -6.4, -1.5])
		places.push([1, (15 * Math.PI) / 16, -4.1, -1])
		places.push([2, (15 * Math.PI) / 16, -2.1, -0.5])
		places.push([1, (5 * Math.PI) / 4, 0, -1])
		places.push([1, Math.PI + Math.PI / 2.5, 0.5, -3])
		places.push([2, Math.PI + Math.PI / 2.1, 0.75, -5])
		places.push([1, Math.PI + Math.PI / 2.25, 0.75, -7])
		places.push([2, Math.PI / 1.9, 4.75, -1])
		places.push([1, Math.PI / 1.95, 4.5, -3])
		places.push([2, Math.PI / 1.9, 4.75, -5])
		places.push([1, Math.PI / 1.9, 4.75, -7])
		places.push([2, -Math.PI / 3, 5.25, 2])
		places.push([1, -Math.PI / 3, 6, 4])

		// const houses: BABYLON.InstancedMesh[] = []

		places.forEach((place, index) => {
			const original_house = place[0] === 1 ? detached_house : semi_house
			const house_instance = original_house.createInstance(`house_${index}`)

			this._set_rotation_and_position(house_instance, place[1], place[2], place[3])

			// houses.push(house_instance)
		})
	}

	public build(): this {
		this._build_dwellings()

		return this
	}
}
