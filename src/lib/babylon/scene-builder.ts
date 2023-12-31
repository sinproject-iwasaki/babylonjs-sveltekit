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

	public attach_arc_rotate_camera(radius = 3, y = 0): void {
		const camera = new BABYLON.ArcRotateCamera(
			'camera',
			-Math.PI / 2,
			Math.PI / 2.5,
			radius,
			new BABYLON.Vector3(0, y, 0)
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

	public begin_animation(
		mesh: BABYLON.AbstractMesh,
		animation: BABYLON.Animation,
		from = 0,
		to = 30
	): void {
		mesh.animations.push(animation)
		this._scene.beginAnimation(mesh, from, to, true)
	}

	public begin_animation_by_names(
		names: string[],
		animation: BABYLON.Animation,
		from = 0,
		to = 30
	): void {
		names.forEach((name) => {
			const mesh = this._scene.getMeshByName(name)

			if (!mesh) return

			this.begin_animation(mesh, animation, from, to)
		})
	}

	public begin_skelton_animation(
		skelton: BABYLON.Skeleton,
		from = 0,
		to = 30,
		speed_ratio = 1.0
	): void {
		this._scene.beginAnimation(skelton, from, to, true, speed_ratio)
	}

	public get_by_name(name: string): BABYLON.AbstractMesh {
		const mesh = this._scene.getMeshByName(name)

		if (!mesh) throw new Error(`Mesh ${name} not found`)

		return mesh
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
