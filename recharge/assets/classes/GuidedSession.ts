class GuidedSession {

	private ID: string;
	private name: string;
	private duration: number;
	private recommendedBy?: Mentor;

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