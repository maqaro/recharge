import { Tracker } from "./Tracker";

export class SleepTracker extends Tracker {

	private totalSleep: number;

	constructor() {
		super();
		this.totalSleep=0;
	}

	public addStartTime(start: Date) {
		// TODO - implement SleepTracker.addStartTime
		return;
	}

	public addEndTime(end: Date) {
		// TODO - implement SleepTracker.addEndTime
		return;
	}

	public storeData(totalSleep: number): null {
		// TODO - implement SleepTracker.storeData
		return null;
	}

}