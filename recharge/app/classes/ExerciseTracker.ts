import { Exercise } from "./Exercise";
import { Tracker } from "./Tracker";

export class ExerciseTracker extends Tracker {

	private totalExercise: number;

	constructor(){
		super();
		this.totalExercise = 0;
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