import { Mentor } from "./Mentor";
import { ResourcesType } from "./ResourcesType"

export class Approved extends ResourcesType{

	private recommended = false;
	private recommendedBy?: Mentor;

	public getRecommended(): Mentor|undefined{
		// TODO - implement Approved.getRecommended
		return this.recommendedBy;
	}

	public isRecommended(): boolean {
		// TODO - implement Approved.isRecommended
		return this.recommended;
	}

}