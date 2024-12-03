import {
	View,
	StyleSheet,
	TouchableOpacity,
	Image,
	Text,
	Dimensions,
	ScrollView,
    Linking
} from 'react-native';
import React from 'react';
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
		<ScrollView>
			<View style={styles.mainCont}>
				<View style={styles.header}>
					<TouchableOpacity
						onPress={() => navigation.goBack()}
						style={styles.icon}
					>
						<AntDesign name="arrowleft" size={22} color={colors.TEXT} />
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => Linking.openURL(data.url)}
						style={styles.icon}
					>
						<MaterialCommunityIcons
							name="share"
							size={22}
							color={colors.TEXT}
						/>
					</TouchableOpacity>
				</View>
				<View style={styles.newsDetail}>
					<Image style={styles.thumbNail} source={{ uri: data.urlToImage }} />
					<View style={styles.newsDetailText}>
						<Text style={styles.author}>~{data.author}</Text>
						<Text style={styles.title}>{data.title}</Text>
						<Text style={styles.description}>{data.description}</Text>
						<Text style={styles.description}>{data.content}</Text>
					</View>
				</View>
			</View>
		</ScrollView>
	);
}

const getStyles = (colors:any) =>
	StyleSheet.create({
		mainCont: {
			flex: 1,
		},
		header: {
			padding: 15,
			backgroundColor: colors.WHITE,
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
		},
		icon: { alignItems: 'center', justifyContent: 'center' },
		newsDetailText: {
			padding: 10,
		},
		thumbNail: {
			height: height / 3,
			width: width,
			objectFit:'cover'
		},
		author: {
			fontSize: 14,
			color: colors.LIGHT_TEXT,
			textAlign: 'right',
		},
		title: {
			fontSize: 20,
			color: colors.TEXT,
			fontWeight: '500',
			marginVertical: 10,
		},
		description: {
			fontSize: 14,
			color: colors.LIGHT_TEXT,
			marginBottom: 5,
			lineHeight: 20,
		},
	});
