import { ChatRoom } from "../classes/ChatRoom";
import { Mentor } from "../classes/Mentor";
import { Challenge } from "../classes/Challenge";
import { User } from "../classes/User"

export class Employee extends User {

	private friends: Employee[];
	private requests: Employee[];
	private points: number;
	private chatRooms: ChatRoom[];
	private challenges: Challenge[];
	private mentors: Mentor[];


	constructor(){
		super();
		this.points = 0;
		this.friends = [];
		this.requests = [];
		this.chatRooms = [];
		this.challenges = [];
		this.mentors = [];
	}

	public matchWithMentor(): Mentor {
		// TODO - implement Employee.matchWithMentor
		return new Mentor();
	}

	public searchEmployees(name: string) {
		// TODO - implement Employee.searchEmployees
		return;
	}

	public sendFriendRequest(employee: Employee) {
		// TODO - implement Employee.sendFriendRequest
		return;
	}

	public respondFriendRequest(): boolean {
		// TODO - implement Employee.respondFriendRequest
		return true;
	}

	public removeFriend(employee: Employee) {
		// TODO - implement Employee.removeFriend
		return;
	}

	public viewFriends(): Employee[] {
		// TODO - implement Employee.viewFriends
		return  this.friends;
	}

	public sendChallenge(): Challenge {
		// TODO - implement Employee.sendChallenge
		return new Challenge();
	}

	public respondChallenge(): boolean {
		// TODO - implement Employee.respondChallenge
		return true;
	}

	public accessChatroom(): ChatRoom {
		// TODO - implement Employee.accessChatroom
		return new ChatRoom(new Mentor());
	}

	public viewChallenges(): Challenge[] {
		// TODO - implement Employee.viewChallenges
		return this.challenges;
	}

	public pushNotification(): string {
		// TODO - implement Employee.pushNotification
		return ""
	}

	public viewFriendRequests(): Employee[] {
		// TODO - implement Employee.viewFriendRequests
		return this.requests;
	}

	public viewChatrooms(): ChatRoom[] {
		// TODO - implement Employee.viewChatrooms
		return this.chatRooms;
	}

	public viewMentors(): Mentor[] {
		// TODO - implement Employee.viewMentors
		return this.mentors;
	}

}