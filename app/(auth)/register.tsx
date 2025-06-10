import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { Link, router } from 'expo-router';
import { authApi } from '@/api/api';
import { useTheme } from '@/contexts/ThemeContext';

export default function Register() {
    const { colors } = useTheme();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        birth_date: '',
        gender: 'O',
        height_cm: '',
        weight_kg: '',
    });
    const [error, setError] = useState('');

    const handleRegister = async () => {
        try {
            await authApi.register({
                ...formData,
                height_cm: Number(formData.height_cm),
                weight_kg: Number(formData.weight_kg),
            });
            router.replace('/login');
        } catch (err) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
            <Image
                source={{ uri: 'https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg' }}
                style={styles.backgroundImage}
            />
            <View style={styles.content}>
                <Text style={[styles.title, { color: colors.text.primary }]}>Crie sua conta</Text>
                <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
                    Join ZenMotion and start your wellness journey
                </Text>

                {error ? <Text style={styles.error}>{error}</Text> : null}

                <TextInput
                    style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text.primary }]}
                    placeholder="Full Name"
                    placeholderTextColor={colors.text.secondary}
                    value={formData.name}
                    onChangeText={(text) => setFormData({ ...formData, name: text })}
                />

                <TextInput
                    style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text.primary }]}
                    placeholder="Email"
                    placeholderTextColor={colors.text.secondary}
                    value={formData.email}
                    onChangeText={(text) => setFormData({ ...formData, email: text })}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />

                <TextInput
                    style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text.primary }]}
                    placeholder="Password"
                    placeholderTextColor={colors.text.secondary}
                    value={formData.password}
                    onChangeText={(text) => setFormData({ ...formData, password: text })}
                    secureTextEntry
                />

                <TextInput
                    style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text.primary }]}
                    placeholder="Birth Date (YYYY-MM-DD)"
                    placeholderTextColor={colors.text.secondary}
                    value={formData.birth_date}
                    onChangeText={(text) => setFormData({ ...formData, birth_date: text })}
                />

                <View style={styles.row}>
                    <TextInput
                        style={[styles.inputHalf, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text.primary }]}
                        placeholder="Height (cm)"
                        placeholderTextColor={colors.text.secondary}
                        value={formData.height_cm}
                        onChangeText={(text) => setFormData({ ...formData, height_cm: text })}
                        keyboardType="numeric"
                    />

                    <TextInput
                        style={[styles.inputHalf, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text.primary }]}
                        placeholder="Weight (kg)"
                        placeholderTextColor={colors.text.secondary}
                        value={formData.weight_kg}
                        onChangeText={(text) => setFormData({ ...formData, weight_kg: text })}
                        keyboardType="numeric"
                    />
                </View>

                <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Create Account</Text>
                </TouchableOpacity>

                <Link href="/login" style={styles.link}>
                    <Text style={[styles.linkText, { color: colors.primary }]}>Already have an account? Sign in</Text>
                </Link>
            </View>
        </ScrollView>
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
        padding: 24,
        paddingTop: 60,
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
    row: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 16,
    },
    inputHalf: {
        flex: 1,
        borderRadius: 12,
        padding: 16,
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