import React, { useState } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	SafeAreaView,
	Image,
} from 'react-native';
import { colors } from '../../config/Theme';

const SignUp = ({ navigation }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const styles = getStyles(colors);

	const handleSignup = () => {
		console.log('Name:', name, 'Email:', email, 'Password:', password);
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.logoContainer}>
				<Image
					source={{
						uri: 'https://static.vecteezy.com/system/resources/previews/006/735/671/non_2x/roaring-lion-logo-design-template-vector.jpg',
					}}
					style={styles.logo}
				/>
				<Text style={styles.title}>Brandsmashers Tech</Text>
				<Text style={styles.subtitle}>Create your account</Text>
			</View>

			<View style={styles.formContainer}>
				<TextInput
					style={styles.input}
					placeholder="Name"
					placeholderTextColor={colors.LIGHT_TEXT}
					value={name}
					onChangeText={setName}
				/>
				<TextInput
					style={styles.input}
					placeholder="Email"
					placeholderTextColor={colors.LIGHT_TEXT}
					keyboardType="email-address"
					value={email}
					onChangeText={setEmail}
				/>
				<TextInput
					style={styles.input}
					placeholder="Password"
					placeholderTextColor={colors.LIGHT_TEXT}
					secureTextEntry
					value={password}
					onChangeText={setPassword}
				/>
				<TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
					<Text style={styles.signupText}>Sign Up</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.footer}>
				<Text style={styles.footerText}>Already have an account?{" "}</Text>
				<TouchableOpacity onPress={() => navigation.navigate('Login')}>
					<Text style={styles.signupText}>Login</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

const getStyles = (colors: any) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: colors.BACKGROUND,
			padding: 20,
		},
		logoContainer: {
			alignItems: 'center',
			marginVertical: 40,
		},
		logo: {
			width: 100,
			height: 100,
			marginBottom: 10,
			borderRadius: 50,
			backgroundColor: colors.BACKGROUND,
		},
		title: {
			fontSize: 24,
			fontWeight: '500',
			color: colors.BLUE,
		},
		subtitle: {
			fontSize: 16,
			color: colors.LIGHT_TEXT,
			marginTop: 5,
		},
		formContainer: {
			marginTop: 20,
		},
		input: {
			backgroundColor: colors.WHITE,
			padding: 15,
			borderRadius: 10,
			marginBottom: 15,
			fontSize: 16,
			color: colors.LIGHT_TEXT,
			shadowColor: '#000',
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.1,
			shadowRadius: 4,
			elevation: 2,
            borderWidth:0.2,
            borderColor:colors.LIGHT_TEXT
		},
		signupButton: {
			backgroundColor: colors.BLUE,
			paddingVertical: 10,
			borderRadius: 10,
			alignItems: 'center',
		},
		signupText: {
			color: colors.BLUE,
			fontSize: 14,
		},
		footer: {
			marginTop: 20,
			alignItems: 'center',
            flexDirection:'row',
            alignSelf:'center'
		},
		footerText: {
			color: colors.LIGHT_TEXT,
			fontSize: 14,
		},
		loginText: {
			color: colors.BLUE,
		},
	});

export default SignUp;
