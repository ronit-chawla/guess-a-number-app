import React from 'react';
import { StyleSheet, Text } from 'react-native';

const BodyText = ({ children, style }) => {
	return (
		<Text style={{ ...styles.title, ...style }}>
			{children}
		</Text>
	);
};

export default BodyText;

const styles = StyleSheet.create({
	title : {
		fontFamily : 'open-sans-bold',
		fontSize   : 18
	}
});
