import React from 'react';
import {
	View,
	StyleSheet,
	TouchableOpacity,
	Image,
	Text,
	Dimensions,
	ScrollView,
	Linking,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../config/Theme';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

export default function NewsDetails({ navigation }) {
	const route = useRoute();
	const { data } = route.params;
	const styles = getStyles(colors);

	return (
		<ScrollView style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity
					onPress={() => navigation.goBack()}
					style={styles.icon}
				>
					<AntDesign name="arrowleft" size={24} color={colors.TEXT} />
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => Linking.openURL(data.url)}
					style={styles.icon}
				>
					<MaterialCommunityIcons
						name="share"
						size={24}
						color={colors.DARK_TEXT}
					/>
				</TouchableOpacity>
			</View>

			<Image style={styles.thumbnail} source={{ uri: data.urlToImage }} />
			<View style={styles.content} >
				<Text style={styles.title}>{data.title}</Text>
				<Text style={styles.author}>~ {data.author || 'Unknown Author'}</Text>

				<View style={styles.descriptionContainer}>
					<Text style={styles.descriptionHeader}>Summary:</Text>
					<Text style={styles.description}>{data.description}</Text>
				</View>

				<View style={styles.contentContainer}>
					<Text style={styles.contentHeader}>Details:</Text>
					<Text style={styles.contentText}>{data.content}</Text>
				</View>
			</View>
		</ScrollView>
	);
}

const getStyles = (colors: any) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: colors.BACKGROUND,
		},
		header: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			paddingHorizontal: 10,
			paddingVertical: 5,
			backgroundColor: colors.WHITE,
		},
		icon: {
			padding: 10,
		},
		thumbnail: {
			height: height / 3,
			width: width - 30,
			marginHorizontal: 15,
			marginVertical: 10,
			borderRadius: 10,
		},
		content: {
			padding: 15,
		},
		title: {
			fontSize: 22,
			fontWeight: '600',
			color: colors.TEXT,
			marginBottom: 10,
		},
		author: {
			fontSize: 14,
			fontWeight: '400',
			color: colors.LIGHT_TEXT,
			textAlign: 'right',
			marginBottom: 15,
		},
		descriptionContainer: {
			marginBottom: 15,
			backgroundColor: colors.BACKGROUND,
			borderRadius: 8,
		},
		descriptionHeader: {
			fontSize: 16,
			fontWeight: '500',
			color: colors.DARK_TEXT,
			marginBottom: 5,
		},
		description: {
			fontSize: 14,
			color: colors.DARK_TEXT,
			lineHeight: 22,
		},
		contentContainer: {
			marginBottom: 20,
		},
		contentHeader: {
			fontSize: 16,
			fontWeight: '500',
			color: colors.DARK_TEXT,
			marginBottom: 5,
		},
		contentText: {
			fontSize: 14,
			color: colors.LIGHT_TEXT,
			lineHeight: 20,
		},
		readMoreButton: {
			backgroundColor: colors.BLUE,
			paddingVertical: 10,
			borderRadius: 8,
			alignItems: 'center',
			marginTop: 10,
		},
		readMoreText: {
			color: colors.WHITE,
			fontSize: 16,
			fontWeight: '500',
		},
	});
