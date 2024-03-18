import { Exercise } from "../classes/Exercise";
import { Tracker } from "../classes/Tracker";

export class ExerciseTracker extends Tracker {

	private totalExercise: number;
	private exerciseList: Exercise[];

	constructor(){
		super();
		this.totalExercise = 0;
		this.exerciseList = [];
	}
	public getExercise(index: number): Exercise | undefined {
		return this.exerciseList[index];
	}

	public addExerciseToList(exercise: Exercise): void {
		this.exerciseList.push(exercise);
	}

	public ExerciseTracker() {
		// TODO - implement ExerciseTracker.ExerciseTracker
		return;
	}

	public addExercise(): Exercise {
		// TODO - implement ExerciseTracker.addExercise
		return new Exercise();
	}

	public storeData(exercise: Exercise): null {
		// TODO - implement ExerciseTracker.storeData
		return null;
	}

}