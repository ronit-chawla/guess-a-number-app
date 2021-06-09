import React, { useState, useEffect } from 'react';
import {
	Button,
	StyleSheet,
	View,
	TouchableWithoutFeedback,
	Keyboard,
	Alert,
	ScrollView,
	KeyboardAvoidingView,
	useWindowDimensions
} from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import NumContainer from '../components/NumContainer';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

import Colors from '../constants/colors';

const StartGame = ({ onStartGame }) => {
	const styles = stylesFn(useWindowDimensions());
	const [
		enteredVal,
		setEnteredVal
	] = useState('');
	const [
		confirmed,
		setConfirmed
	] = useState(false);
	const [
		num,
		setNum
	] = useState();
	const inputHandler = val => {
		setEnteredVal(val.replace(/[^0-9]/g, ''));
	};
	const resetInput = () => {
		setEnteredVal('');
		setConfirmed(false);
	};
	const confirmInput = () => {
		const chosenNumber = parseInt(enteredVal);
		if (
			isNaN(chosenNumber) ||
			chosenNumber <= 0 ||
			chosenNumber > 99
		) {
			Alert.alert(
				'Invalid number!',
				'Number has to be a number between 1 and 99.',
				[
					{
						text    : 'Okay',
						style   : 'cancel',
						onPress : resetInput
					}
				]
			);
		} else {
			setConfirmed(true);
			setNum(chosenNumber);
			Keyboard.dismiss();
		}
	};

	let confirmedOutput;
	if (confirmed) {
		confirmedOutput = (
			<Card style={styles.summaryContainer}>
				<BodyText>You Selected</BodyText>
				<NumContainer>{num}</NumContainer>
				<MainButton
					onPress={() => onStartGame(num)}
					primary
				>
					START GAME
				</MainButton>
			</Card>
		);
	}
	return (
		<ScrollView>
			<KeyboardAvoidingView
				behavior="position"
				keyboardVerticalOffset={30}
			>
				<TouchableWithoutFeedback
					onPress={Keyboard.dismiss}
				>
					<View style={styles.screen}>
						<TitleText style={styles.title}>
							Start a New Game!
						</TitleText>

						<Card style={styles.inputContainer}>
							<BodyText>
								Enter a Number!
							</BodyText>
							<Input
								style={styles.input}
								blurOnSubmit
								autoCapitalize="none"
								autoCorrect={false}
								keyboardType="number-pad"
								maxLength={2}
								onChangeText={inputHandler}
								value={enteredVal}
							/>

							<View style={styles.btnGroup}>
								<View style={styles.btn}>
									<Button
										title="RESET"
										color={
											Colors.secondary
										}
										onPress={resetInput}
									/>
								</View>
								<View style={styles.btn}>
									<Button
										title="CONFIRM"
										color={
											Colors.primary
										}
										onPress={
											confirmInput
										}
									/>
								</View>
							</View>
						</Card>
						{confirmedOutput}
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</ScrollView>
	);
};

export default StartGame;

const stylesFn = ({ width: screenWidth }) => {
	return StyleSheet.create({
		screen           : {
			flex       : 1,
			padding    : 10,
			alignItems : 'center'
		},
		inputContainer   : {
			width      : screenWidth / 1.5,
			maxWidth   : '80%',
			minWidth   : 300,
			alignItems : 'center'
		},
		btnGroup         : {
			flexDirection     : 'row',
			width             : '100%',
			justifyContent    : 'space-between',
			paddingHorizontal : 15
		},
		title            : {
			fontSize       : 25,
			marginVertical : 15
		},
		input            : {
			minWidth  : 50,
			fontSize  : 20,
			textAlign : 'center'
		},
		summaryContainer : {
			marginTop  : 20,
			alignItems : 'center'
		},
		text             : {
			fontFamily : 'open-sans'
		},
		btn              : screenWidth / 4
	});
};
