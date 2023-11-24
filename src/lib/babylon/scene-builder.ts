import * as BABYLON from 'babylonjs'

export class SceneBuilder {
	private _engine: BABYLON.Engine
	private _scene: BABYLON.Scene

	public constructor(private _canvas: HTMLCanvasElement) {
		this._engine = new BABYLON.Engine(_canvas, true)
		this._scene = new BABYLON.Scene(this._engine)
	}

	public attach_free_camera(): void {
		const camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 5, -10), this._scene)

		camera.setTarget(BABYLON.Vector3.Zero())
		camera.attachControl(this._canvas, false)
	}

	public attach_arc_rotate_camera(): void {
		const camera = new BABYLON.ArcRotateCamera(
			'camera',
			-Math.PI / 2,
			Math.PI / 2.5,
			10,
			new BABYLON.Vector3(0, 0, 0)
		)
		camera.attachControl(this._canvas, true)
	}

	public attach_light({ x = 1, y = 1, z = 0, intensity = 1 }): void {
		const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(x, y, z), this._scene)

		light.intensity = intensity
	}

	public create_sphere(): void {
		const sphere = BABYLON.MeshBuilder.CreateSphere('sphere', { diameter: 2 }, this._scene)
		sphere.position.y = 1
	}

	public create_box(): void {
		const box = BABYLON.MeshBuilder.CreateBox('box', {})
		box.position.y = 0.5
	}

	public create_ground(size = 10): void {
		BABYLON.MeshBuilder.CreateGround('ground', { width: size, height: size }, this._scene)
	}

	public run(): void {
		this._engine.runRenderLoop(() => {
			this._scene.render()
		})

		window.addEventListener('resize', () => {
			this._engine.resize()
		})
	}
}
