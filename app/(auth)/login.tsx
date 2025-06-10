import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Link, router } from 'expo-router';
import { authApi } from '@/api/api';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            await authApi.login(email, password);
            router.replace('/(tabs)');
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: 'https://images.pexels.com/photos/4325478/pexels-photo-4325478.jpeg' }}
                style={styles.backgroundImage}
            />
            <View style={styles.content}>
                <Text style={styles.title}>Bem-Vindo ZenMotion</Text>
                <Text style={styles.subtitle}>Your journey to wellness begins here</Text>

                {error ? <Text style={styles.error}>{error}</Text> : null}

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>

                <Link href="/register" style={styles.link}>
                    <Text style={styles.linkText}>Don't have an account? Sign up</Text>
                </Link>

                <Link href="/forgot-password" style={styles.link}>
                    <Text style={styles.linkText}>Forgot password?</Text>
                </Link>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
        color: '#1e293b',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        color: '#64748b',
        marginBottom: 32,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#f8fafc',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    button: {
        backgroundColor: '#6366f1',
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
        color: '#6366f1',
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