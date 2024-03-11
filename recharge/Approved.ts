import { Mentor } from "./Mentor.ts";
import { ResourcesType } from "./ResourcesType.ts"

export class Approved extends ResourcesType {

	private recommended: boolean;
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