export class Exercise {

	private name: string;
	private intensity: number;
	private muscleGroup: string;
	private duration: number;

	public Exercise() {
		// TODO - implement Exercise.Exercise
		return;
	}

	public setName(name: string) {
		this.name = name;
	}

	public setIntensity(intensity: number) {
		this.intensity = intensity;
	}

	public setMuscleGroup(muscleGroup: string) {
		this.muscleGroup = muscleGroup;
	}

	public setDuration(duration: number) {
		this.duration = duration;
	}

	public getName(): string {
		return this.name;
	}

	public getIntensity(): number {
		return this.intensity;
	}

	public getMuscleGroup(): string {
		return this.muscleGroup;
	}

	public getDuration(): number {
		return this.duration;
	}

}