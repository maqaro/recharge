import AppleHealthKit, { HealthInputOptions, HealthKitPermissions, HealthUnit } from 'react-native-health';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { initialize, requestPermission, readRecords } from 'react-native-health-connect';
import { Permission } from 'react-native-health-connect/lib/typescript/types';
import { TimeRangeFilter } from 'react-native-health-connect/lib/typescript/types/base.types';


const permissions: HealthKitPermissions = {
  permissions: {
    read: [AppleHealthKit.Constants.Permissions.Steps, AppleHealthKit.Constants.Permissions.FlightsClimbed, AppleHealthKit.Constants.Permissions.DistanceWalkingRunning],
    write: [],
  },
};


const useHealthData = (date: Date) => {
	const [hasPermissions, setHasPermission] = useState(false);
	const [steps, setSteps] = useState(0);
	const [flights, setFlights] = useState(0);
	const [distance, setDistance] = useState(0);

  // iOS - HealthKit
  useEffect(() => {
    if (Platform.OS !== 'ios') {
      return;
    }

    AppleHealthKit.isAvailable((err, isAvailable) => {
      if (err) {
        console.log("Error checking availability");
        return;
      }
      if (!isAvailable) {
        console.log("Apple Health not available");
        return;
      }
      AppleHealthKit.initHealthKit(permissions, (err) => {
        if (err) {
          console.log("Error getting permissions");
          return;
        }
        setHasPermission(true);
      });
    });
  }, []);

  useEffect(() => {
    if (!hasPermissions) {
      return;
    }

    const options: HealthInputOptions = {
      date: date.toISOString(),
      includeManuallyAdded: false,
    };

    AppleHealthKit.getStepCount(options, (err, results) => {
      if (err) {
        console.log("Error getting the steps", err);
        return;
      }
      console.log(results.value);
      setSteps(results.value);
    });

    AppleHealthKit.getFlightsClimbed(options, (err, results) => {
      if (err) {
        console.log("Error getting the steps", err);
        return;
      }
      console.log(results.value);
      setFlights(results.value);
    });

    AppleHealthKit.getDistanceWalkingRunning(options, (err, results) => {
      if (err) {
        console.log("Error getting the steps", err);
        return;
      }
      console.log(results.value);
      setDistance(results.value);
    });
  }, [hasPermissions]);

  // Android - HealthConnect
  const readSampleData = async () => {
    // initialize the client
    console.log("Initialising Health Connect...");
    const isInitialized = await initialize();
    if (!isInitialized) {
      console.error("Failed to initialise Health Connect");
      return;
    }

    console.log("Health connect is initialised");
  
    // request permissions
    console.log("Requesting perms");
    await requestPermission([
      { accessType: 'read', recordType: 'Steps' },
      { accessType: 'read', recordType: 'Distance' },
      { accessType: 'read', recordType: 'FloorsClimbed' },
    ]);
    console.log("After permissions should have gotten")

    const timeRangeFilter: TimeRangeFilter = {
      operator: 'between',
      startTime: new Date(date.setHours(0, 0, 0, 0)).toISOString(),
      endTime: new Date(date.setHours(23, 59, 59, 999)).toISOString(),
    };
  
    // check if granted
  
    const steps = await readRecords('Steps', { timeRangeFilter });
    const totalSteps = steps.reduce((sum, cur) => sum + cur.count, 0);
    setSteps(totalSteps);
    
    
    const distance = await readRecords('Distance', { timeRangeFilter });
    const totalDistance = distance.reduce((sum, cur) => sum + cur.distance.inMeters, 0);
    setDistance(totalDistance);
    
    const floorsClimbed = await readRecords('FloorsClimbed', { timeRangeFilter });
    const totalFloors = floorsClimbed.reduce((sum, cur) => sum + cur.floors, 0);
    setFlights(totalFloors);
  };  

  useEffect(() => {
    if (Platform.OS !== 'android') {
      return;
    }
    readSampleData();
  }, [date]);

  return {
    steps, flights, distance,
  };
};

export default useHealthData;