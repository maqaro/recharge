import { Mentor } from "./Mentor.ts";
import { Employee } from "./Employee.ts";

export class MentorForm {

	private employee: Employee;
	private description: string;
	private desiredSpeciality: string;
	private preferences: string;
	private topic: string;
	private mentalHeathScore: number;

	public MentorForm(employee: Employee) {
		// TODO - implement MentorForm.MentorForm
		return new Employee();
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