import { Tracker } from "./Tracker";
import { supabase } from '../../lib/supabase';
import React from 'react';

export class WaterTracker extends Tracker {

	private totalWaterIntake: number;

	constructor() {
		super();
		this.totalWaterIntake=0;
	}
	

	public async storeWaterData(totalWaterIntake: Promise<string> , waterIntakeGoal: Promise<string>): Promise<undefined> {
		const [userid, setUserid] = React.useState<string | undefined>();

		const { data: { user } } = await supabase.auth.getUser();
		setUserid(user?.id);
		let today = new Date().toLocaleDateString(); 

		let { data:watertracker, error } = await supabase
		.from('watertracker')
		.upsert([
			{ user_id: userid, date: today, water_intake_ml: totalWaterIntake, water_intake_goal:waterIntakeGoal}], {onConflict:'date'} )
		.select()
		return;
	}

	public async getWaterDrank(): Promise<string>{
		const [userid, setUserid] = React.useState<string | undefined>();

		const { data: { user } } = await supabase.auth.getUser();
		setUserid(user?.id);
		let today = new Date().toLocaleDateString(); 

		try {		  
			let { data, error } = await supabase
			.from('watertracker')
			.select('water_intake')
			.eq('date', today)

			if (data === null){
				return '0'
			}
			return data.toString();} 
		catch (e) {
			console.log(e);
			return '0'
		  }
	}

	public async getWaterGoal(){
		const [userid, setUserid] = React.useState<string | undefined>();

		const { data: { user } } = await supabase.auth.getUser();
		setUserid(user?.id);
		let today = new Date().toLocaleDateString(); 

		let { data, error } = await supabase
		.from('watertracker')
		.select('water_intake_goal')
		.eq('date', today)

		if (data === undefined){
			return '0'
		}
		return data?.toString();
	}

	public pushNotification(): string {
		// TODO - implement WaterTracker.pushNotification
		return "";
	}

	public viewHistory() {
		// TODO - implement Tracker.viewHistory
		return;
	}

}

export default WaterTracker;