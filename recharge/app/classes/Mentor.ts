import { User } from "./User";
import { ChatRoom } from "./ChatRoom";
import { Employee } from "./Employee";
import { Approved } from "./Approved";
import { Unapproved } from "./Unapproved";

export class Mentor extends User {

	private speciality: string;
	private chatRooms: ChatRoom[];
	private employees: Employee[];

	constructor(){
		super()
		this.speciality="";
		this.chatRooms = [];
		this.employees = [];
	}

	public recommend(): Approved {
		// TODO - implement Mentor.recommend
		return new Approved()
	}

	public editResource(): Unapproved {
		// TODO - implement Mentor.editResource
		return new Unapproved()
	}

	public addResource(): Unapproved {
		// TODO - implement Mentor.addResource
		return new Unapproved()
	}

	public removeResource(resource: Unapproved) {
		// TODO - implement Mentor.removeResource
		return
	}

	public getSpeciality(): string {
		return this.speciality;
	}

	public viewChatrooms(): ChatRoom[] {
		// TODO - implement Mentor.viewChatrooms
		return this.chatRooms;
	}

	public viewEmployees(): Employee[] {
		// TODO - implement Mentor.viewEmployees
		return this.employees;
	}

	public accessChatroom(): ChatRoom {
		// TODO - implement Mentor.accessChatroom
		return new ChatRoom(new Mentor())
	}

}