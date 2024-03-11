import { Exercise } from "./Exercise.ts";
import { Tracker } from "./Tracker.ts";

export class ExerciseTracker extends Tracker {

	private totalExercise: number;

	public ExerciseTracker() {
		// TODO - implement ExerciseTracker.ExerciseTracker
		return;
	}

	public addExercise(): Exercise {
		// TODO - implement ExerciseTracker.addExercise
		return new Exercise();
	}

	public storeData(exercise: Exercise) {
		// TODO - implement ExerciseTracker.storeData
		return;
	}

}