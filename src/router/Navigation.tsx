import { NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NewsFeed from '../screen/News/NewsFeed';
import NewsDetails from '../screen/News/NewsDetails';
export type RootStackParamList = {
	NewsFeed: undefined;
	NewsDetail: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function Navigation({navigation}) {
  return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{ headerShown: false }}
				initialRouteName={'NewsFeed'}
			>
				<Stack.Screen name="NewsFeed" component={NewsFeed} />
				<Stack.Screen name="NewsDetail" component={NewsDetails} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default Navigation;
