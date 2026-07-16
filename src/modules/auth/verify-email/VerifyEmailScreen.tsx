import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import Animated, { BounceIn, FadeInDown, FadeInUp, ZoomIn } from 'react-native-reanimated';
import { CustomButton, Text } from '../../../components';
import { Strings } from '../../../constants';
import { useTheme } from '../../../hooks';
import { Colors } from '../../../theme';
import OTPInput from './otp-input/OTPInput';
import useVerifyEmail from './useVerifyEmail';
import { styleSheet } from './VerifyEmailStyles';

const VerifyEmailHeader = ({ style, themeColors }: { style: any, themeColors: any }) => (
  <Animated.View style={style.headerContainer} entering={ZoomIn.duration(500)}>
    <LinearGradient
      style={style.gradientStyle}
      colors={themeColors.gradients.light}
      start={{ x: 0.44, y: 0.0 }}
      end={{ x: 0.56, y: 1.0 }}
    />
    <Text style={style.icon}>📧</Text>
    <Animated.View style={style.exclamation} entering={BounceIn.delay(400).springify()}>
      <Text style={style.whiteText}>!</Text>
    </Animated.View>
  </Animated.View>
);

const VerifyEmailScreen: React.FC = () => {
  const { styles, theme } = useTheme(styleSheet);
  const { code, setCode, onSubmit, onResend, onOpenEmail, timer, isLoading, email } = useVerifyEmail();
  const themeColors = Colors[theme];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>

        <VerifyEmailHeader style={styles} themeColors={themeColors} />

        <Animated.View entering={FadeInDown.delay(100).duration(400)}>
          <Text style={styles.title} variant="titleMedium">{Strings.Auth.verifyEmailSentTo}</Text>
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(200).duration(400)}>
          <Text style={styles.subtitle} variant="bodyMedium">
            <Text style={styles.boldEmail}>{email || 'your email'}</Text>
          </Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(300).duration(400)}>
          <Text style={styles.enterCodeText}>{Strings.Auth.verifyEmailEnterCode}</Text>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(400).duration(400)} style={styles.codeContainer}>
          <OTPInput
            length={6}
            value={code}
            onChange={setCode}

          />
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(500).duration(400)}>
          <TouchableOpacity style={styles.resendContainer} onPress={onResend} disabled={timer > 0}>
            <Text style={styles.resendText}>
              {Strings.Auth.verifyEmailResendIn} <Text style={styles.resendTimer}>{timer > 0 ? `00:${timer < 10 ? `0${timer}` : timer}` : 'Now'}</Text>
            </Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(600).duration(400)}>
          <CustomButton
            title={Strings.Auth.verifyEmailVerifyContinue}
            onPress={onSubmit}
            loading={isLoading}
            disabled={code.length !== 6 || isLoading}
          />
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(700).duration(400)}>
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>{Strings.Auth.verifyEmailOr}</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity style={styles.magicLinkContainer} onPress={onOpenEmail}>
            <View style={styles.magicLinkIcon}>
              <Ionicons name="link-outline" size={24} color={themeColors.primary} />
            </View>
            <View style={styles.magicLinkTextContainer}>
              <Text style={styles.magicLinkTitle}>{Strings.Auth.verifyEmailMagicLink}</Text>
              <Text style={styles.magicLinkSubtitle}>{Strings.Auth.verifyEmailMagicLinkSub}</Text>
            </View>
          </TouchableOpacity>

          <CustomButton
            title={Strings.Auth.verifyEmailOpenApp}
            onPress={onOpenEmail}
            variant="outline"
          />
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default VerifyEmailScreen;
