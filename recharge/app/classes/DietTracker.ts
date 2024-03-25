import { Tracker } from "./Tracker";
import { Meal } from "./Meal";

export class DietTracker extends Tracker {

	private totalCalorieIntake: number;

	constructor() {
		super();
		this.totalCalorieIntake=0;
	}

	public addMeal(name: string, calories: number): Meal {
		// TODO - implement DietTracker.addMeal
		return new Meal("meal", 0);
	}

	public storeData(meal: Meal): null {
		// TODO - implement DietTracker.storeData
		return null;
	}

	public searchMeal(mealName: string): Meal[] {
		// TODO - implement DietTracker.searchMeal
		return [new Meal("meal", 0), new Meal("meal", 0)];
	}

	public selectMeal(options: Meal[]): Meal {
		// TODO - implement DietTracker.selectMeal
		return new Meal("meal", 0);
	}

	public EditMeal(meal: Meal): Meal {
		// TODO - implement DietTracker.EditMeal
		return new Meal("meal", 0);
	}

	public RemoveMeal(meal: Meal) {
		// TODO - implement DietTracker.RemoveMeal
		return;
	}

}