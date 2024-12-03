import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	FlatList,
	Image,
	StyleSheet,
	ActivityIndicator,
	RefreshControl,
	TouchableOpacity,
} from 'react-native';
import { fetchNews } from '../../api/apis';
import { colors } from '../../config/Theme';
import { useDispatch, useSelector } from 'react-redux';
import { setNews } from '../../redux/slices/NewsSlice';
import NetInfo from '@react-native-community/netinfo';

const NewsFeed = ({ navigation }) => {
	const [loading, setLoading] = useState(false);
	const [refreshing, setRefreshing] = useState(false);
	const dispatch = useDispatch();
	const news = useSelector((state) => state.news.news);
	const styles = getStyles(colors);

	const getNews = async () => {
		try {
			const response = await fetchNews();
			if (response) {
				dispatch(setNews(response.data.articles));
			}
		} catch (error) {
			console.error('Error fetching news:', error.message);
		} finally {
			setLoading(false);
		}
	};

	const handleRefresh = async () => {
		setRefreshing(true);
		await getNews();
		setRefreshing(false);
	};

	useEffect(() => {
		const checkConnection = async () => {
			const state = await NetInfo.fetch();
			if (state.isConnected) {
				setLoading(true);
				getNews();
			}
		};
		checkConnection();
	}, []);

	const renderArticle = ({ item }) =>
		item.title !== '[Removed]' && (
			<TouchableOpacity
				onPress={() => navigation.navigate('NewsDetail', { data: item })}
				style={styles.articleContainer}
			>
				<Image source={{ uri: item.urlToImage }} style={styles.thumbnail} />
				<View style={styles.textContainer}>
					<Text numberOfLines={1} style={styles.title}>
						{item.title}
					</Text>
					<Text numberOfLines={2} style={styles.summary}>
						{item.description}
					</Text>
				</View>
			</TouchableOpacity>
		);

	return (
		<View style={styles.mainContainer}>
			{loading && (
				<ActivityIndicator
					size="large"
					color={colors.BLUE}
					style={styles.loader}
				/>
			)}
			{news && (
				<View style={styles.container}>
					<View style={styles.header}>
						<Text style={styles.head}>Top News</Text>
						<TouchableOpacity onPress={() => navigation.navigate('Login')}>
							<Text style={styles.login}>Login</Text>
						</TouchableOpacity>
					</View>
					<FlatList
						data={news}
						keyExtractor={(item) => item.publishedAt}
						renderItem={renderArticle}
						refreshControl={
							<RefreshControl
								refreshing={refreshing}
								onRefresh={handleRefresh}
								tintColor={colors.BLUE}
							/>
						}
					/>
				</View>
			)}
		</View>
	);
};

const getStyles = (colors) =>
	StyleSheet.create({
		mainContainer: {
			flex: 1,
			backgroundColor: colors.BACKGROUND,
		},
		container: { flex: 1 },
		header: {
			paddingVertical: 15,
			paddingHorizontal: 20,
			backgroundColor: colors.WHITE,
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			marginBottom: 4,
		},
		head: {
			fontSize: 20,
			fontWeight: '500',
			color: colors.TEXT,
		},
		login: {
			color: colors.BLUE,
			fontSize: 16,
			fontWeight: '500',
		},
		articleContainer: {
			flexDirection: 'row',
			marginVertical: 4,
			marginHorizontal: 10,
			backgroundColor: colors.WHITE,
			borderRadius: 10,
			overflow: 'hidden',
			shadowColor: '#000',
			shadowOpacity: 0.1,
			shadowRadius: 4,
			shadowOffset: { width: 0, height: 2 },
			elevation: 3,
		},
		thumbnail: {
			width: 100,
			height: 100,
			borderTopLeftRadius: 10,
			borderBottomLeftRadius: 10,
			backgroundColor: colors.BACKGROUND,
		},
		textContainer: {
			flex: 1,
			padding: 10,
			justifyContent: 'center',
		},
		title: {
			fontSize: 16,
			fontWeight: '500',
			marginBottom: 5,
			color: colors.TEXT,
		},
		summary: {
			fontSize: 14,
			color: colors.LIGHT_TEXT,
		},
		loader: {
			marginTop: 20,
			position:'absolute',
			left:'45%',
			zIndex:1,
			top:"45%"
		},
	});

export default NewsFeed;
