import React, { useState, useRef, useEffect } from 'react';
import {
	StyleSheet,
	View,
	Alert,
	ScrollView,
	useWindowDimensions
} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { AntDesign } from '@expo/vector-icons';

import Card from '../components/Card';
import MainButton from '../components/MainButton';
import NumContainer from '../components/NumContainer';
import TitleText from '../components/TitleText';
import BodyText from '../components/TitleText';

const generateRandomBetween = (min, max, exclude) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	const rndNum =
		Math.floor(Math.random() * (max - min)) + min;
	if (rndNum === exclude) {
		return generateRandomBetween(min, max, exclude);
	}
	return rndNum;
};
const ListItem = ({ val, numOfRound, styles }) => (
	<View style={styles.listItem}>
		<BodyText style={styles.listContent}>
			#{numOfRound}{' '}
		</BodyText>
		<BodyText style={styles.listContent}>
			{val}
		</BodyText>
	</View>
);

const GameScreen = ({ userChoice, onGameOver }) => {
	const styles = stylesFn(useWindowDimensions());

	const initialGuess = useState(
		generateRandomBetween(1, 100, userChoice)
	);
	const [
		currentGuess,
		setCurrentGuess
	] = initialGuess;
	const [
		guesses,
		setGuesses
	] = useState([
		initialGuess
	]);
	const min = useRef(1);
	const max = useRef(100);

	useEffect(
		() => {
			if (currentGuess === userChoice) {
				onGameOver(guesses.length);
			}
		},
		[
			currentGuess,
			userChoice,
			onGameOver
		]
	);

	const nextGuessHandler = direction => {
		const choice = parseInt(userChoice);
		if (parseInt(currentGuess) === choice) {
			onGameOver(guesses.length);
			return;
		}
		if (
			(direction === 'lower' &&
				currentGuess < choice) ||
			(direction === 'higher' &&
				currentGuess > choice)
		) {
			Alert.alert(
				"Don't lie!!!",
				'You know that you are giving a wrong hint:(',
				[
					{ text: 'Sorry!', style: 'cancel' }
				]
			);
			return;
		}
		if (direction === 'lower') {
			max.current = currentGuess;
		} else {
			min.current = currentGuess + 1;
		}
		const nextNum = generateRandomBetween(
			min.current,
			max.current,
			currentGuess
		);
		setCurrentGuess(nextNum);
		setGuesses(guesses => [
			nextNum,
			...guesses
		]);
	};
	const items = guesses.map((g, i) => (
		<ListItem
			val={g}
			numOfRound={guesses.length - i}
			styles={styles}
			key={g}
		/>
	));
	if (useWindowDimensions().height < 500) {
		return (
			<View style={styles.screen}>
				<TitleText>Computer's Guess</TitleText>
				<View style={styles.control}>
					<MainButton
						onPress={() =>
							nextGuessHandler('lower')}
					>
						<AntDesign
							name="arrowdown"
							size={24}
							color="black"
						/>
					</MainButton>
					<NumContainer>
						{currentGuess}
					</NumContainer>
					<MainButton
						onPress={() =>
							nextGuessHandler('higher')}
					>
						<AntDesign
							name="arrowup"
							size={24}
							color="black"
						/>
					</MainButton>
				</View>
				<View style={styles.listContainer}>
					<ScrollView
						contentContainerStyle={styles.list}
					>
						{items}
					</ScrollView>
				</View>
			</View>
		);
	}
	return (
		<View style={styles.screen}>
			<TitleText>Computer's Guess</TitleText>
			<NumContainer>{currentGuess}</NumContainer>

			<Card style={styles.btnGroup}>
				<MainButton
					onPress={() =>
						nextGuessHandler('lower')}
				>
					<AntDesign
						name="arrowdown"
						size={24}
						color="black"
					/>
				</MainButton>
				<MainButton
					onPress={() =>
						nextGuessHandler('higher')}
				>
					<AntDesign
						name="arrowup"
						size={24}
						color="black"
					/>
				</MainButton>
			</Card>
			{/* <FlatList
				data={guesses}
				renderItem={d => (
					<View key={d.item}>
						<BodyText style={styles.guess}>
							{d.item}
						</BodyText>
					</View>
				)}
			/> */}
			<View style={styles.listContainer}>
				<ScrollView
					contentContainerStyle={styles.list}
				>
					{items}
				</ScrollView>
			</View>
		</View>
	);
};

export default GameScreen;

const stylesFn = ({
	width  : screenWidth,
	height : screenHeight
}) => {
	return StyleSheet.create({
		screen        : {
			flex       : 1,
			padding    : 10,
			alignItems : 'center'
		},
		btnGroup      : {
			flexDirection  : 'row',
			justifyContent : 'space-around',
			marginTop      : screenHeight > 600 ? 20 : 10,
			width          : 400,
			maxWidth       : '90%'
		},
		listItem      : {
			borderColor     : '#ccc',
			padding         : 15,
			marginVertical  : 10,
			backgroundColor : '#fff',
			borderWidth     : 2,
			flexDirection   : 'row',
			justifyContent  : 'space-around',
			width           : '60%'
		},
		listContainer : {
			width : screenWidth > 500 ? '60%' : '80%',
			flex  : 1
		},
		list          : {
			alignItems     : 'center',
			justifyContent : 'flex-end',
			flexGrow       : 1
		},
		listContent   : {
			color : '#000'
		},
		control       : {
			flexDirection  : 'row',
			justifyContent : 'space-around',
			alignItems     : 'center',
			width          : '80%'
		}
	});
};
