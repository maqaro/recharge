export class Challenge {

	private duration: number;
	private goal: string;
	private type: string;

	constructor() {
		// TODO - implement Challenge.Challenge
		this.duration = 0;
		this.goal = "";
		this.type = "";
		return;
	}

	public updatePoints() {
		// TODO - implement Challenge.updatePoints
		return;
	}

	public pushNotification(): string {
		// TODO - implement Challenge.pushNotification
		return "";
	}

	public getDuration(): number {
		return this.duration;
	}

	public getGoal(): string {
		return this.goal;
	}

	public getType(): string {
		return this.type;
	}

}