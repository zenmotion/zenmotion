import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Link } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';

export default function ForgotPassword() {
    const { colors } = useTheme();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleResetPassword = async () => {
        try {

            setMessage('As instruções para redefinir sua senha foram enviadas para seu email.');
        } catch (err) {
            setMessage('Falha ao enviar instruções. Tente novamente.');
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Image
                source={{ uri: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg' }}
                style={styles.backgroundImage}
            />
            <View style={styles.content}>
                <Text style={[styles.title, { color: colors.text.primary }]}>Redefinir Senha</Text>
                <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
                    Informe seu email para receber as instruções de redefinição
                </Text>

                {message ? (
                    <Text style={[styles.message, { color: message.includes('Falha') ? colors.error : colors.success }]}>
                        {message}
                    </Text>
                ) : null}

                <TextInput
                    style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text.primary }]}
                    placeholder="Email"
                    placeholderTextColor={colors.text.secondary}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />

                <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleResetPassword}>
                    <Text style={styles.buttonText}>Enviar Instruções</Text>
                </TouchableOpacity>

                <Link href="/login" style={styles.link}>
                    <Text style={[styles.linkText, { color: colors.primary }]}>Voltar para o Login</Text>
                </Link>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0.1,
    },
    content: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
    },
    title: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 32,
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        marginBottom: 32,
        textAlign: 'center',
    },
    input: {
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        borderWidth: 1,
    },
    button: {
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        marginBottom: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Inter_600SemiBold',
    },
    link: {
        alignItems: 'center',
    },
    linkText: {
        fontSize: 14,
        fontFamily: 'Inter_500Medium',
    },
    message: {
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
        marginBottom: 16,
        textAlign: 'center',
    },
});