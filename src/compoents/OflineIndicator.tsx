import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { colors } from '../config/Theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const OfflineIndicator = () => {
	const [isConnected, setIsConnected] = useState(true);
	const styles = getStyles(colors);

	useEffect(() => {
		const unsubscribe = NetInfo.addEventListener((state) => {
			setIsConnected(state.isConnected);
		});
		return () => unsubscribe();
	}, []);

	return (
		!isConnected && (
			<View style={styles.offlineContainer}>
				<MaterialCommunityIcons
					name="wifi-off"
					size={18}
					color={colors.WHITE}
				/>
				<Text style={styles.offlineText}> No Internet Connection</Text>
			</View>
		)
	);
};

const getStyles = (colors: any) =>
	StyleSheet.create({
		offlineContainer: {
			backgroundColor: colors.BLACK,
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			justifyContent: 'center',
			alignItems: 'center',
			zIndex: 1,
			padding: 5,
			flexDirection: 'row',
		},
		offlineText: {
			color: colors.WHITE,
			fontSize: 14,
		},
	});

export default OfflineIndicator;
