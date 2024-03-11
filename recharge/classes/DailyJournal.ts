import { Tracker } from "../classes/Tracker";

export class DailyJournal extends Tracker {

	private journalEntry: string;

	constructor() {
		super();
		this.journalEntry = "";
	}

	public storeData(journalEntry: string): null {
		// TODO - implement DailyJournal.storeData
		return null;
	}

	public write() {
		// TODO - implement DailyJournal.write
		return;
	}

	public edit() {
		// TODO - implement DailyJournal.edit
		return;
	}

	public erase() {
		// TODO - implement DailyJournal.erase
		return;
	}

}