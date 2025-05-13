import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { getAuth, GoogleAuthProvider, signInWithCredential } from '@react-native-firebase/auth';
import { getApp } from '@react-native-firebase/app';

// Cấu hình Google Signin
GoogleSignin.configure({
  webClientId: '276209684810-5ohim8g8vl4mrcijg2ssvfsb0bu930ch.apps.googleusercontent.com',
});

export const googleSignIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const { idToken } = await GoogleSignin.signIn();

    const auth = getAuth(getApp());
    const credential = GoogleAuthProvider.credential(idToken);
    const userCredential = await signInWithCredential(auth, credential);

    return userCredential.user;
  } catch (error) {
    console.error('Google Sign-In error:', error);
    throw error;
  }
};
