import * as BABYLON from 'babylonjs'

export class Scene {
	public static create(canvas: HTMLCanvasElement): BABYLON.Scene {
		const engine = new BABYLON.Engine(canvas, true)
		const scene = new BABYLON.Scene(engine)

		const camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 5, -10), scene)
		camera.setTarget(BABYLON.Vector3.Zero())
		camera.attachControl(canvas, false)

		const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene)
		light.intensity = 0.7

		const sphere = BABYLON.MeshBuilder.CreateSphere('sphere', { diameter: 2 }, scene)
		sphere.position.y = 1

		BABYLON.MeshBuilder.CreateGround('ground', { width: 6, height: 6 }, scene)

		engine.runRenderLoop(() => {
			scene.render()
		})

		window.addEventListener('resize', () => {
			engine.resize()
		})

		return scene
	}
}
