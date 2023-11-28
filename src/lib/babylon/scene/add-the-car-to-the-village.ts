import * as BABYLON from 'babylonjs'
import { SceneBuilder } from '../scene-builder'
import { CarMesh } from '../mesh/car-mesh'
import { DwellingMesh } from '../mesh/dwelling-mesh'

type AnimationKey = {
	frame: number
	value: number
}

export class MainScene {
	private _scene_builder: SceneBuilder

	public constructor(canvas: HTMLCanvasElement) {
		this._scene_builder = new SceneBuilder(canvas)
	}

	private _create_car_animation(): BABYLON.Animation {
		const car = this._scene_builder.get_by_name('car')
		car.rotation = new BABYLON.Vector3(-Math.PI / 2, Math.PI / 2, 0)
		car.position.y = 0.16
		car.position.x = 3
		car.position.z = -7

		const car_animation = new BABYLON.Animation(
			'car_animation',
			'position.z',
			30,
			BABYLON.Animation.ANIMATIONTYPE_FLOAT,
			BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
		)

		const car_animation_keys: AnimationKey[] = []

		car_animation_keys.push({
			frame: 0,
			value: 7,
		})

		car_animation_keys.push({
			frame: 150,
			value: -7,
		})

		car_animation_keys.push({
			frame: 210,
			value: -7,
		})

		car_animation.setKeys(car_animation_keys)
		this._scene_builder.begin_animation_by_names(['car'], car_animation, 0, 210)

		return car_animation
	}

	private _create_wheel_animation(): BABYLON.Animation {
		const wheel_animation = new BABYLON.Animation(
			'wheel_animation',
			'rotation.y',
			30,
			BABYLON.Animation.ANIMATIONTYPE_FLOAT,
			BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
		)

		const wheel_animation_keys: AnimationKey[] = []

		wheel_animation_keys.push({
			frame: 0,
			value: 0,
		})

		wheel_animation_keys.push({
			frame: 30,
			value: 2 * Math.PI,
		})

		wheel_animation.setKeys(wheel_animation_keys)

		this._scene_builder.begin_animation_by_names(
			['wheel_rb', 'wheel_rf', 'wheel_lb', 'wheel_lf'],
			wheel_animation
		)

		return wheel_animation
	}

	public create(): this {
		const scene_builder = this._scene_builder

		scene_builder.attach_arc_rotate_camera(15)
		scene_builder.attach_light({ x: -1 })

		new DwellingMesh(scene_builder).build()
		new CarMesh().build()

		this._create_car_animation()
		this._create_wheel_animation()

		scene_builder.run()

		return this
	}
}
