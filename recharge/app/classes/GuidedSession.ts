import { Mentor } from "./Mentor";

export class GuidedSession {

	private ID: string;
	private name: string;
	private duration: number;
	private recommendedBy?: Mentor;

	constructor(){
		this.ID = "";
		this.name="";
		this.duration=0;
	}

	public getID(): string {
		// TODO - implement GuidedSession.getID
		return this.ID;
	}

	public getName(): string {
		return this.name;
	}

	public getDuration(): number {
		return this.duration;
	}

	public getRecommended(): Mentor|undefined {
		// TODO - implement GuidedSession.getRecommended
		return this.recommendedBy;
		
	}

}