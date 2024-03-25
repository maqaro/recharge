export class Resources {

	private name: string;
	private type: string;
	private ID: string;

	constructor(){
		this.name="";
		this.type="";
		this.ID="";
	}

	public getName(): string {
		return this.name;
	}

	public getType(): string {
		return this.type;
	}

	public getID(): string {
		// TODO - implement Resources.getID
		return this.ID;
	}

}