import { Mentor } from "../classes/Mentor";
import { Employee } from "../classes/Employee";

export class MentorForm {

	private employee: Employee;
	private description: string;
	private desiredSpeciality: string;
	private preferences: string;
	private topic: string;
	private mentalHeathScore: number;

	constructor(employee: Employee) {
		// TODO - implement MentorForm.MentorForm
		this.employee = employee
		this.description = ""
		this.desiredSpeciality=""
		this.preferences="";
		this.topic="";
		this.mentalHeathScore=0;
	}

	public filterMentors(): Mentor[] {
		// TODO - implement MentorForm.filterMentors
		return [new Mentor(), new Mentor()];
	}

	public selectMentor(mentors: Mentor[]) : Mentor {
		// TODO - implement MentorForm.selectMentor
		return new Mentor();
	}

}