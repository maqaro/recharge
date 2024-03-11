import { ChatRoom } from "./ChatRoom.ts";
import { Mentor } from "./Mentor.ts";
import { Challenge } from "./Challenge.ts";
import { User } from "./User.ts"

const readline = require('node:readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  readline.question(`What's your name?`, name => {
    console.log(`Hi ${name}!`);
    readline.close();
  });

export class Employee extends User {

	private friends: Employee[];
	private requests: Employee[];
	private points: number;
	private chatRooms: ChatRoom[];
	private challenges: Challenge[];
	private mentors: Mentor[];


	public Employee(){
		this.points = 0;
		
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
		return [new Employee(), new Employee()];
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
		return new ChatRoom();
	}

	public viewChallenges(): Challenge[] {
		// TODO - implement Employee.viewChallenges
		return [new Challenge(), new Challenge()];
	}

	public pushNotification(): string {
		// TODO - implement Employee.pushNotification
		return ""
	}

	public viewFriendRequests(): Employee[] {
		// TODO - implement Employee.viewFriendRequests
		return [new Employee(), new Employee()];
	}

	public viewChatrooms(): ChatRoom[] {
		// TODO - implement Employee.viewChatrooms
		return [new ChatRoom(), new ChatRoom()];
	}

	public viewMentors(): Mentor[] {
		// TODO - implement Employee.viewMentors
		return [new Mentor(), new Mentor()];
	}

}