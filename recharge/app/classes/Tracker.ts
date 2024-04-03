export abstract class Tracker {
    exercise: any;
    date: any;
    weights: any;

	public Tracker() {
		// TODO - implement Tracker.Tracker
		return;
	}

	public async storeData(value: Object, goal: Object): Promise<undefined>;

	public viewHistory() {
		// TODO - implement Tracker.viewHistory
		return;
	}

	public updatePoints() {
		// TODO - implement Tracker.updatePoints
		return;
	}

}