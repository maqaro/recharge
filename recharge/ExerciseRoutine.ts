import { Mentor } from "./Mentor.ts";

export class ExerciseRoutine {

	private duration: number;
	private muscleGroup: string;
	private intensity: number;
	private ID: string;
	private recommendedBy?: Mentor;

	public UpdateTracker(exercise: ExerciseRoutine) {
		// TODO - implement ExerciseRoutine.UpdateTracker
		return;
	}

	public getDuration(): number {
		return this.duration;
	}

	public getMuscleGroup(): string {
		return this.muscleGroup;
	}

	public getIntensity(): number {
		return this.intensity;
	}

	public getID(): string {
		// TODO - implement ExerciseRoutine.getID
		return this.ID;
	}
	
	public getRecommended(): Mentor|undefined {
		// TODO - implement GuidedSession.getRecommended
		return this.recommendedBy;
		
	}

}