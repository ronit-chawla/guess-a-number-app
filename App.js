import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

import StartGame from './screens/StartGame';
import GameScreen from './screens/GameScreen';
import GameOver from './screens/GameOver';

import Header from './components/Header';

const fetchFonts = () => {
	return Font.loadAsync({
		'open-sans'      : require('./assets/fonts/OpenSans-Regular.ttf'),
		'open-sans-bold' : require('./assets/fonts/OpenSans-Bold.ttf')
	});
};

export default function App() {
	const [
		userNum,
		setUserNum
	] = useState();
	const [
		guessRounds,
		setGuessRounds
	] = useState(0);
	const [
		dataLoaded,
		setDataLoaded
	] = useState(false);

	if (!dataLoaded) {
		return (
			<AppLoading
				startAsync={fetchFonts}
				onFinish={() => setDataLoaded(true)}
				onError={console.log}
			/>
		);
	}

	const configNewGame = () => {
		setGuessRounds(0);
		setUserNum(null);
	};
	const startGame = selectedNum => {
		setUserNum(selectedNum);
		setGuessRounds(0);
	};
	const gameOver = numRounds => {
		setGuessRounds(numRounds);
	};
	let content = <StartGame onStartGame={startGame} />;
	if (userNum && guessRounds <= 0) {
		content = (
			<GameScreen
				userChoice={userNum}
				onGameOver={gameOver}
			/>
		);
	} else if (guessRounds > 0) {
		content = (
			<GameOver
				rounds={guessRounds}
				num={userNum}
				onRestart={configNewGame}
			/>
		);
	}
	return (
		<SafeAreaView style={styles.screen}>
			<Header title="Guess A Number!" />
			{content}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	screen : {
		flex            : 1,
		backgroundColor : '#eee'
	}
});
