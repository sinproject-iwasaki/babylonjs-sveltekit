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

	public create_box(): BABYLON.Mesh {
		const box = BABYLON.MeshBuilder.CreateBox('box', {})
		box.position.y = 0.5

		return box
	}

	public create_ground(size = 10): BABYLON.GroundMesh {
		return BABYLON.MeshBuilder.CreateGround('ground', { width: size, height: size }, this._scene)
	}

	private _create_standard_material(name: string): BABYLON.StandardMaterial {
		return new BABYLON.StandardMaterial(name, this._scene)
	}

	private _create_color3(r: number, g: number, b: number): BABYLON.Color3 {
		return new BABYLON.Color3(r, g, b)
	}

	private _create_texture(url: string): BABYLON.Texture {
		return new BABYLON.Texture(url, this._scene)
	}

	public create_color3_material(
		name: string,
		r: number,
		g: number,
		b: number
	): BABYLON.StandardMaterial {
		const material = this._create_standard_material(name)

		material.diffuseColor = this._create_color3(r, g, b)

		return material
	}

	public create_textured_material(name: string, url: string): BABYLON.StandardMaterial {
		const material = this._create_standard_material(name)

		material.diffuseTexture = this._create_texture(url)

		return material
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
