import { Mentor } from "../classes/Mentor";
import { Resources } from "../classes/Resources";
import { Unapproved } from "../classes/Unapproved";
import { Meal } from "../classes/Meal";
import { User } from "../classes/User";

export class Admin extends User {

	public CreateAdminAccount(username: string, password: string): Admin {
		// TODO - implement Admin.CreateAdminAccount
		return new Admin();
	}

	public CreateMentorAccount(username: string, password: string): Mentor {
		// TODO - implement Admin.CreateMentorAccount
		return new Mentor();
	}

	public CreateAccount(username: string, password: string): User {
		// TODO - implement Admin.CreateAccount
		return new User();
	}

	public removeResource(resource: Resources): Resources {
		// TODO - implement Admin.removeResource
		return resource;
	}

	public approve(resource: Unapproved) {
		// TODO - implement Admin.approve
		return;
	}

	public editFoodDatabase(meal: Meal) {
		// TODO - implement Admin.editFoodDatabase
		return;
	}

}