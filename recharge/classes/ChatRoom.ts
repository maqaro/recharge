import { Mentor } from "../classes/Mentor";
import { User } from "../classes/User";

export class ChatRoom {

	private chatHistory: string;
	private members: User[];
	private owner: Mentor;

	constructor(owner: Mentor){
		this.owner = owner;
		this.members = [];
		this.chatHistory = "";
	}

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
}