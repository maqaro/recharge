class Approved extends ResourcesType {

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