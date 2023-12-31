import * as BABYLON from 'babylonjs'
import earcut from 'earcut'

export class CarMesh {
	private _build_body(): BABYLON.Mesh {
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

		const face_uv: BABYLON.Vector4[] = []
		face_uv[0] = new BABYLON.Vector4(0.0, 0.5, 0.38, 1.0)
		face_uv[1] = new BABYLON.Vector4(0.0, 0.0, 1.0, 0.5)
		face_uv[2] = new BABYLON.Vector4(0.38, 1.0, 0.0, 0.5)

		const car_mat = new BABYLON.StandardMaterial('carMat')

		car_mat.diffuseTexture = new BABYLON.Texture(
			'https://assets.babylonjs.com/environments/car.png'
		)

		const car_body = BABYLON.MeshBuilder.ExtrudePolygon(
			'car',
			{ shape: outline, depth: 0.2, faceUV: face_uv, wrap: true },
			undefined,
			earcut
		)
		car_body.material = car_mat

		return car_body
	}

	private _build_wheels(parent: BABYLON.Mesh): void {
		const face_uv: BABYLON.Vector4[] = []
		face_uv[0] = new BABYLON.Vector4(0.0, 0.0, 1.0, 1.0)
		face_uv[1] = new BABYLON.Vector4(0.0, 0.5, 0.0, 0.5)
		face_uv[2] = new BABYLON.Vector4(0.0, 0.0, 1.0, 1.0)

		const wheel_mat = new BABYLON.StandardMaterial('wheel_mat')

		wheel_mat.diffuseTexture = new BABYLON.Texture(
			'https://assets.babylonjs.com/environments/wheel.png'
		)

		const wheel_rb = BABYLON.MeshBuilder.CreateCylinder('wheel_rb', {
			diameter: 0.125,
			height: 0.05,
			faceUV: face_uv,
		})
		wheel_rb.material = wheel_mat

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

	public build(): BABYLON.Mesh {
		const car_body = this._build_body()
		car_body.rotation.x = -Math.PI / 2

		this._build_wheels(car_body)

		return car_body
	}
}
