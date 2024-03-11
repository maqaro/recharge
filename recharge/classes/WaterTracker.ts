import { Tracker } from "../classes/Tracker";

export class WaterTracker extends Tracker {

	private totalWaterIntake: number;

	constructor() {
		super();
		this.totalWaterIntake=0;
	}

	public addWaterIntake(intake: number) {
		// TODO - implement WaterTracker.addWaterIntake
		return;
	}

	public storeData(totalWaterIntake: number): null {
		// TODO - implement WaterTracker.storeData
		return null;
	}

	public pushNotification(): string {
		// TODO - implement WaterTracker.pushNotification
		return "";
	}

}