import { Tracker } from "../classes/Tracker";

export class EmotionTracker extends Tracker {

	private colourEmotion: string;

	constructor() {
		super();
		this.colourEmotion = "";
	}

	public storeData(colour: String): null {
		// TODO - implement EmotionTracker.storeData
		return null;
	}

	public selectEmotion() {
		// TODO - implement EmotionTracker.selectEmotion
		return;
	}

}