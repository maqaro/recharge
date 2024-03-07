class DietTracker extends Tracker {

	private totalCalorieIntake: number;

	public DietTracker() {
		// TODO - implement DietTracker.DietTracker
		return;
	}

	public addMeal(name: string, calories: number): Meal {
		// TODO - implement DietTracker.addMeal
		return new Meal();
	}

	public storeData(meal: Meal) {
		// TODO - implement DietTracker.storeData
		return;
	}

	public searchMeal(mealName: string): Meal[] {
		// TODO - implement DietTracker.searchMeal
		return [new Meal(), new Meal()];
	}

	public selectMeal(options: Meal[]): Meal {
		// TODO - implement DietTracker.selectMeal
		return new Meal();
	}

	public EditMeal(meal: Meal): Meal {
		// TODO - implement DietTracker.EditMeal
		return new Meal();
	}

	public RemoveMeal(meal: Meal) {
		// TODO - implement DietTracker.RemoveMeal
		return;
	}

}