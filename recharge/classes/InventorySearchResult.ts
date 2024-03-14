import { ExerciseRoutine } from "../classes/ExerciseRoutine";
import { GuidedSession } from "../classes/GuidedSession";
import { Approved } from "../classes/Approved";

export class InventorySearchResult {

	public searchExercisebyDuration(duration: number): ExerciseRoutine[] {
		// TODO - implement InventorySearchResult.searchExercisebyDuration
		return [new ExerciseRoutine(), new ExerciseRoutine()];
	}

	public searchExercisebyMuscleGroup(muscleGroup: string): ExerciseRoutine[] {
		// TODO - implement InventorySearchResult.searchExercisebyMuscleGroup
		return [new ExerciseRoutine(), new ExerciseRoutine()];
	}

	public searchExercisebyIntensity(intensity: number): ExerciseRoutine[] {
		// TODO - implement InventorySearchResult.searchExercisebyIntensity
		return [new ExerciseRoutine(), new ExerciseRoutine()];
	}

	public searchGuidedSessionbyType(type: string): GuidedSession[] {
		// TODO - implement InventorySearchResult.searchGuidedSessionbyType
		return [new GuidedSession(), new GuidedSession()];
	}

	public searchResourcebyName(name: string): Approved[] {
		// TODO - implement InventorySearchResult.searchResourcebyName
		return [new Approved(), new Approved()];
	}

	public searchResourcebyType(type: string): Approved[] {
		// TODO - implement InventorySearchResult.searchResourcebyType
		return [new Approved(), new Approved()];
	}

}