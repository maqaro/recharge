import { Tracker } from "./Tracker";

export class StepTracker extends Tracker {

	private totalSteps: number;

	constructor() {
		super();
		this.totalSteps=0;
	}

	public storeData(totalSteps: number): null {
		// TODO - implement StepTracker.storeData
		return null;
	}

}