import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { getAuth } from '@react-native-firebase/auth';
import { getApp } from '@react-native-firebase/app';

export const EmailVerificationScreen = ({ navigation }) => {
  const [isSending, setIsSending] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  const auth = getAuth(getApp());

  const sendVerificationEmail = async () => {
    setIsSending(true);
    try {
      if (auth.currentUser) {
        await auth.currentUser.sendEmailVerification();
        setVerificationSent(true);
        Alert.alert('Đã gửi', 'Một email xác thực đã được gửi đến hộp thư của bạn. Vui lòng kiểm tra.');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể gửi email xác thực. Vui lòng thử lại sau.');
      console.error('Lỗi gửi email xác thực:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleContinue = () => {
    Alert.alert(
      'Đã kiểm tra email?',
      'Bạn đã xác minh địa chỉ email của mình chưa?',
      [
        { text: 'Chưa', style: 'cancel' },
        {
          text: 'Rồi',
          onPress: async () => {
            try {
              await auth.currentUser?.reload();
              if (auth.currentUser?.emailVerified) {
                navigation.navigate('Home');
              } else {
                Alert.alert(
                  'Chưa xác minh',
                  'Email của bạn vẫn chưa được xác minh. Vui lòng kiểm tra hộp thư đến.'
                );
              }
            } catch (error) {
              console.error('Lỗi khi reload user:', error);
              Alert.alert('Lỗi', 'Không thể kiểm tra trạng thái xác minh.');
            }
          },
        },
      ]
    );
  };

  const handleBackToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Xác thực Email</Text>
      <Text style={styles.instruction}>
        Một email xác thực đã được gửi đến địa chỉ email của bạn.
        Vui lòng kiểm tra hộp thư đến và nhấp vào liên kết để xác minh tài khoản.
      </Text>
      {!verificationSent && (
        <Button
          title={isSending ? 'Đang gửi...' : 'Gửi lại email xác thực'}
          onPress={sendVerificationEmail}
          disabled={isSending}
        />
      )}
      <Button title="Tiếp tục" onPress={handleContinue} />
      <Button title="Quay lại Đăng nhập" onPress={handleBackToLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  instruction: {
    textAlign: 'center',
    marginBottom: 20,
  },
});
