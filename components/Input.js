import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const Input = props => {
	return (
		<TextInput
			{...props}
			style={{ ...styles.input, ...props.style }}
		/>
	);
};

export default Input;

const styles = StyleSheet.create({
	input : {
		borderBottomColor : '#000',
		borderBottomWidth : 1,
		marginVertical    : 10,
		height            : 30
	}
});
