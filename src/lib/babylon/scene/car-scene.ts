import * as BABYLON from 'babylonjs'
import earcut from 'earcut'
import { SceneBuilder } from '../scene-builder'

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

	private _create_wheel_animation(): BABYLON.Animation {
		const wheel_animation = new BABYLON.Animation(
			'wheel_animation',
			'rotation.y',
			30,
			BABYLON.Animation.ANIMATIONTYPE_FLOAT,
			BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
		)

		type Key = {
			frame: number
			value: number
		}

		const wheel_keys: Key[] = []

		wheel_keys.push({
			frame: 0,
			value: 0,
		})

		wheel_keys.push({
			frame: 30,
			value: 2 * Math.PI,
		})

		wheel_animation.setKeys(wheel_keys)

		return wheel_animation
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
		wheel_rb.animations.push(this._create_wheel_animation())

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
		const car = this._build_car_body()
		car.rotation.x = -Math.PI / 2

		this._build_wheels(car)
	}

	public create(): this {
		const scene_builder = this._scene_builder

		scene_builder.attach_arc_rotate_camera(1.5)
		scene_builder.attach_light({})

		this._build_car()

		scene_builder.begin_animation(['wheel_rb', 'wheel_rf', 'wheel_lb', 'wheel_lf'])
		scene_builder.run()

		return this
	}
}
