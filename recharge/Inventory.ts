export class Inventory {

	private static instance: Inventory;

	private Inventory() {
		// TODO - implement Inventory.Inventory
		return;
	}

	public static getInstance(): Inventory {
		return this.instance;
	}

}