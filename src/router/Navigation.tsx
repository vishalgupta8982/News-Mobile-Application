import { NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NewsFeed from '../screen/News/NewsFeed';
import NewsDetails from '../screen/News/NewsDetails';
import Login from '../screen/Authentication/Login';
import SignUp from '../screen/Authentication/SignUp';
export type RootStackParamList = {
	NewsFeed: undefined;
	NewsDetail: undefined;
	Login: undefined;
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
				<Stack.Screen name="Login" component={Login} />
				<Stack.Screen name="SignUp" component={SignUp} />
				<Stack.Screen name="NewsDetail" component={NewsDetails} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default Navigation;
