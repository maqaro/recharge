import { Mentor } from "./Mentor.ts";
import { Employee } from "./Employee.ts";
import { User } from "./User.ts";

export class ChatRoom {

	private chatHistory: string;
	private members: User[];
	private owner: Mentor;

	public saveChat() {
		// TODO - implement ChatRoom.saveChat
		return;
	}

	public sendMessage() {
		// TODO - implement ChatRoom.sendMessage
		return;
	}

	public getOwner(): Mentor {
		// TODO - implement ChatRoom.getOwner
		return this.owner;
	}

	public getMembers(): User[] {
		return this.members;
	}

	public removeMessage() {
		// TODO - implement ChatRoom.removeMessage
		return;
	}

	public ChatRoom(owner: Mentor, employee: Employee) {
		// TODO - implement ChatRoom.ChatRoom
		return;
	}

}