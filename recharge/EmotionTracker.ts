// import { Tracker } from "./Tracker.ts";
import { supabase } from './lib/supabase';

export class EmotionTracker extends Tracker {

	private colourEmotion: string;

	public EmotionTracker() {
		// TODO - implement EmotionTracker.EmotionTracker
		return;
	}

	public storeData(colour: String) {
		// TODO - implement EmotionTracker.storeData
		return;
	}

	public selectEmotion() {
		// TODO - implement EmotionTracker.selectEmotion
		return;
	}

// export const storeEmotion = async (userId: string, emotion: string) => {
// 	try {
// 		const { data, error } = await supabase.from('emotiontracker').insert([
// 			{
				
// 				user_id: userId,
// 				emotion_colour: emotion,
// 				tracked_date: new Date().toISOString(),
// 			},
// 		]);
	
// 		if (error) {
// 			throw new Error(error.message);
// 		}
	
// 		return data;
// 	} catch (error: any) {
// 		throw new Error('Error storing emotion: ' + error.message);
// 	}
};

// }