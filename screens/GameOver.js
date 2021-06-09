import React from 'react';
import {
	StyleSheet,
	View,
	Image,
	Text,
	ScrollView,
	useWindowDimensions
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import TitleText from '../components/TitleText';
import BodyText from '../components/BodyText';
import Colors from '../constants/colors';
import MainButton from '../components/MainButton';

const GameOver = ({ rounds, num, onRestart }) => {
	const styles = stylesFn(useWindowDimensions());
	return (
		<ScrollView>
			<View style={styles.screen}>
				<TitleText>Game Over!</TitleText>
				<View style={styles.imgContainer}>
					<Image
						source={require('../assets/success.png')}
						fadeDuration={1000}
						// source={{
						// 	uri :
						// 		'https://images.unsplash.com/photo-1522506209496-4536d9020ec4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80'
						// }}
						style={styles.img}
					/>
				</View>
				<BodyText style={styles.resultText}>
					Computer guessed your number{' '}
					<Text style={styles.highlight}>
						'{num}'
					</Text>{' '}
					in{' '}
					<Text style={styles.highlight}>
						{rounds}
					</Text>{' '}
					rounds
				</BodyText>
				<MainButton onPress={onRestart}>
					<MaterialCommunityIcons
						name="restart"
						size={40}
						color="black"
					/>
				</MainButton>
			</View>
		</ScrollView>
	);
};
export default GameOver;

const stylesFn = ({
	width  : screenWidth,
	height : screenHeight
}) => {
	return StyleSheet.create({
		screen       : {
			flex            : 1,
			justifyContent  : 'center',
			alignItems      : 'center',
			paddingVertical : 10
		},
		img          : {
			width  : '100%',
			height : '100%'
		},
		imgContainer : {
			borderRadius   : screenWidth * 0.7 / 2,
			borderColor    : '#000',
			borderWidth    : 2,
			width          : screenWidth * 0.7,
			height         : screenWidth * 0.7,
			overflow       : 'hidden',
			marginVertical : screenHeight / 30
		},
		highlight    : {
			color : Colors.primary
		},
		resultText   : {
			textAlign : 'center',
			fontSize  : screenHeight < 400 ? 60 : 20,
			color     : '#000'
		}
	});
};
