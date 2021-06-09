import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';

import TitleText from './TitleText';

import Colors from '../constants/colors';

const Header = ({ title }) => {
	return (
		<View
			style={{
				...styles.headerBase,
				...Platform.select({
					ios: styles.headerIos,
					android: styles.headerAndroid
				})
			}}
		>
			<TitleText style={styles.headerTitle}>
				{title}
			</TitleText>
		</View>
	);
};

export default Header;

const styles = StyleSheet.create({
	headerBase    : {
		width          : '100%',
		height         : 100,
		paddingTop     : 36,
		alignItems     : 'center',
		justifyContent : 'center'
	},
	headerIos     : {
		backgroundColor   : '#fff',
		borderBottomColor : '#ccc',
		borderBottomWidth : 1
	},
	headerAndroid : {
		backgroundColor : Colors.primary
	},
	headerTitle   : {
		marginVertical : 10,
		fontSize       : 20,
		color          :
			Platform.OS === 'android'
				? '#fff'
				: Colors.primary
	}
});
