import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Platform, ScrollView } from 'react-native';
import { Link, router } from 'expo-router';
import { authApi } from '@/api/api';
import { useTheme } from '@/contexts/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useEffect } from 'react';

export default function Login() {
    const { colors } = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const checkLoggedIn = async () => {
            const user = await AsyncStorage.getItem('user');
            if (user) {
                router.replace('/(tabs)');
            }
        };
        checkLoggedIn();
    }, []);

    const handleLogin = async () => {
        try {
            const user = await authApi.login(email, password);
            await AsyncStorage.setItem('user', JSON.stringify(user));
            router.replace('/(tabs)');
        } catch (err) {
            setError('Email ou senha inválidos');
        }
    };

    return (
        <ScrollView
            contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}
            keyboardShouldPersistTaps="handled"
        >
            <Image
                source={{ uri: 'https://images.pexels.com/photos/4325478/pexels-photo-4325478.jpeg' }}
                style={styles.backgroundImage}
                resizeMode="cover"
            />
            <View style={styles.content}>
                <Text style={[styles.title, { color: colors.text.primary }]}>Bem-vindo de volta!</Text>
                <Text style={[styles.subtitle, { color: colors.text.secondary }]}>Entre para continuar sua jornada ZenMotion</Text>

                {error ? <Text style={styles.error}>{error}</Text> : null}

                <TextInput
                    style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text.primary }]}
                    placeholder="Email"
                    placeholderTextColor={colors.text.secondary}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />

                <TextInput
                    style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text.primary }]}
                    placeholder="Senha"
                    placeholderTextColor={colors.text.secondary}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>

                <Link href="/register" style={styles.link}>
                    <Text style={[styles.linkText, { color: colors.primary }]}>Não tem uma conta? Cadastre-se</Text>
                </Link>

                {/* <Link href="/forgot-password" style={styles.link}>
                    <Text style={[styles.linkText, { color: colors.primary }]}>Esqueceu a senha?</Text>
                </Link> */}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0.1,
    },
    content: {
        padding: 20,
        paddingHorizontal: 24,
        paddingTop: Platform.OS === 'ios' ? 80 : 60,
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
        marginBottom: 8,
    },
    linkText: {
        fontSize: 14,
        fontFamily: 'Inter_500Medium',
    },
    error: {
        color: '#ef4444',
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
        marginBottom: 16,
        textAlign: 'center',
    },
});