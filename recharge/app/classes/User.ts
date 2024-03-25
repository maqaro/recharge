export class User {

	private username: string;
	private password: string;


	constructor(){
		this.username="";
		this.password="";
	}

	public login() {
		// TODO - implement user.login
		return;
	}

	public searchExercises(type: string[]) {
		// TODO - implement user.searchExercises
		return;
	}

	public searchGuidedFocus(type: string) {
		// TODO - implement user.searchGuidedFocus
		return;
	}

	public searchResource(name: string, type: string) {
		// TODO - implement user.searchResource
		return;
	}

	public accessTracker() {
		// TODO - implement user.accessTracker
		return;
	}

	public getUsername(): string {
		return this.username;
	}

	public getPassword(): string {
		return this.password;
	}

}