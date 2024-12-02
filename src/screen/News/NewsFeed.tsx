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
		item.title != '[Removed]' && (
			<TouchableOpacity
				onPress={() => navigation.navigate('NewsDetail', { data: item })}
				style={styles.articleContainer}
			>
				<Image source={{ uri: item.urlToImage }} style={styles.thumbnail} />
				<View style={styles.textContainer}>
					<Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
						{item.title}
					</Text>
					<Text numberOfLines={3} ellipsizeMode="tail" style={styles.summary}>
						{item.description}
					</Text>
				</View>
			</TouchableOpacity>
		);

	return (
		<View style={styles.mainContainer}>
			{loading && (
				<ActivityIndicator size={34} color={colors.RED} style={styles.loader} />
			)}
			{news && (
				<View style={styles.container}>
					<Text style={styles.head}>Top news</Text>
					<FlatList
						data={news}
						keyExtractor={(item) => item.publishedAt}
						renderItem={renderArticle}
						refreshControl={
							<RefreshControl
								refreshing={refreshing}
								onRefresh={handleRefresh}
							/>
						}
						initialNumToRender={5}
						maxToRenderPerBatch={10}
						updateCellsBatchingPeriod={50}
						windowSize={5}
						removeClippedSubviews={true}
						getItemLayout={(data, index) => ({
							length: 120,
							offset: 120 * index,
							index,
						})}
					/>
				</View>
			)}
		</View>
	);
};

const getStyles = (colors: any) =>
	StyleSheet.create({
		mainContainer: {
			flex: 1,
			backgroundColor: colors.BACKGROUND,
			justifyContent: 'center',
		},
		container: { flex: 1 },
		head: {
			fontSize: 24,
			fontWeight: '500',
			color: colors.TEXT,
			padding: 10,
			backgroundColor: colors.WHITE,
		},
		articleContainer: {
			flexDirection: 'row',
			marginVertical: 3,
			backgroundColor: colors.WHITE,
			borderRadius: 8,
			overflow: 'hidden',
			elevation: 3,
			shadowColor: '#000',
			shadowOpacity: 0.1,
			shadowRadius: 5,
			shadowOffset: { width: 0, height: 2 },
			paddingHorizontal: 10,
			alignItems: 'center',
		},
		thumbnail: {
			width: 80,
			height: 80,
			borderRadius: 20,
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
			fontSize: 12,
			color: colors.LIGHT_TEXT,
		},
		loader: {
			position: 'absolute',
			zIndex: 1,
			left: '46%',
		},
	});

export default NewsFeed;
