export class Exercise {

	private name: string;
	private intensity: number; //rating from 1-10
	private muscleGroup: string;
	private equipment: string;
	private sets: number;
	private reps: number;
	private weight: number;


	constructor() {
		this.name = "";
		this.intensity = 0;
		this.muscleGroup = "";
		this.equipment = "";
		this.sets = 0;
		this.reps = 0;
		this.weight = 0;
	}
	public setSets(sets: number) {
		this.sets = sets;
	}

	public setReps(reps: number) {
		this.reps = reps;
	}
	public setWeight(weight: number) {
		this.weight = weight;
	}
	public getSets(): number {
		return this.sets;
	}
	public getReps(): number {
		return this.reps;
	}
	public getWeight(): number {
		return this.weight;
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

	public setEquipment(equipment: string) {
		this.equipment = equipment;
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

	public getEquipment(): string {
		return this.equipment;
	}

}