import {View, Text} from 'react-native';
import SVG, { Circle, CircleProps } from 'react-native-svg';
import Animated, {useSharedValue, useAnimatedProps, withTiming, withSpring} from 'react-native-reanimated'
import {useEffect} from 'react';
import { AntDesign } from '@expo/vector-icons';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type RingProgressProps = {
	radius?: number;
	strokeWidth?: number;
	progress: number;
};

const color = 'teal'

const RingProgress = ({radius = 100, strokeWidth = 35, progress}: RingProgressProps) => {

	const innerRadius = radius - strokeWidth / 2;
	const circumference = 2 * Math.PI * innerRadius;

	const fill = useSharedValue(0);

	useEffect(() => {
		fill.value = withTiming(progress, { duration: 1500 });
	}, [progress]);

	const animatedProps = useAnimatedProps(() =>({
		strokeDasharray: [circumference * fill.value, circumference]
	}))

	const circleDefaultProps: CircleProps = {
		cx: radius,
		cy: radius,
		r: innerRadius,
		strokeWidth: strokeWidth,
		stroke: color, 
		strokeLinecap: "round",
		originX: radius,
		originY: radius,
		rotation: "-90"
	}

	return (
		<View style={{width: radius * 2, height: radius * 2, alignSelf: 'center'}}>
			<SVG>
				{/* Background */}
				<Circle {...circleDefaultProps} opacity={0.2} />
				{/* Foreground */}
				<AnimatedCircle animatedProps={animatedProps} {...circleDefaultProps} />
			</SVG>
			<AntDesign name="arrowright" size={strokeWidth * 0.8} color="black" style={{ position: "absolute", alignSelf: "center", top: strokeWidth * 0.1 }} />
		</View>
	);
};

export default RingProgress;