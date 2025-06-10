import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Switch, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@/contexts/ThemeContext';
import {
    Bell,
    Moon,
    User,
    Target,
    ChevronRight,
    ChevronLeft,
    Ruler,
    Scale,
    LogOut,
} from 'lucide-react-native';
import { preferencesApi, userApi, authApi } from '@/api/api';
import { router } from 'expo-router';

export default function Settings() {
    const { colors, isDark, toggleTheme } = useTheme();
    const navigation = useNavigation();
    const [notifications, setNotifications] = useState(true);
    const [units, setUnits] = useState<'metric' | 'imperial'>('metric');

    const handleLogout = async () => {
        try {
            await authApi.logout();
            router.replace('/login');
        } catch (error) {
            console.error('Falha ao sair:', error);
        }
    };

    const updatePreferences = async () => {
        try {
            await preferencesApi.update(1, {
                notifications_enabled: notifications,
                preferred_units: units,
            });
        } catch (error) {
            console.error('Falha ao atualizar preferências:', error);
        }
    };

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>

            {/* Botão de Voltar */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <ChevronLeft size={20} color={colors.text.primary} />
                <Text style={[styles.backButtonText, { color: colors.text.primary }]}>Voltar</Text>
            </TouchableOpacity>

            <View style={styles.header}>
                <Text style={[styles.title, { color: colors.text.primary }]}>Configurações</Text>
                <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
                    Personalize sua experiência
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Conta</Text>
                <TouchableOpacity
                    style={[styles.settingItem, { backgroundColor: colors.card.background, ...colors.card.shadow }]}>
                    <View style={styles.settingContent}>
                        <User size={24} color={colors.primary} />
                        <Text style={[styles.settingText, { color: colors.text.primary }]}>Configurações do Perfil</Text>
                    </View>
                    <ChevronRight size={24} color={colors.text.secondary} />
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Preferências</Text>

                <View style={[styles.settingItem, { backgroundColor: colors.card.background, ...colors.card.shadow }]}>
                    <View style={styles.settingContent}>
                        <Bell size={24} color={colors.primary} />
                        <Text style={[styles.settingText, { color: colors.text.primary }]}>Notificações</Text>
                    </View>
                    <Switch
                        value={notifications}
                        onValueChange={(value) => {
                            setNotifications(value);
                            updatePreferences();
                        }}
                        trackColor={{ false: colors.border, true: colors.primary }}
                        thumbColor="white"
                    />
                </View>

                <View style={[styles.settingItem, { backgroundColor: colors.card.background, ...colors.card.shadow }]}>
                    <View style={styles.settingContent}>
                        <Moon size={24} color={colors.primary} />
                        <Text style={[styles.settingText, { color: colors.text.primary }]}>Modo Escuro</Text>
                    </View>
                    <Switch
                        value={isDark}
                        onValueChange={toggleTheme}
                        trackColor={{ false: colors.border, true: colors.primary }}
                        thumbColor="white"
                    />
                </View>

                <View style={[styles.settingItem, { backgroundColor: colors.card.background, ...colors.card.shadow }]}>
                    <View style={styles.settingContent}>
                        <Ruler size={24} color={colors.primary} />
                        <Text style={[styles.settingText, { color: colors.text.primary }]}>Unidades</Text>
                    </View>
                    <TouchableOpacity
                        style={[styles.unitToggle, { backgroundColor: colors.surface }]}
                        onPress={() => {
                            setUnits(units === 'metric' ? 'imperial' : 'metric');
                            updatePreferences();
                        }}>
                        <Text style={[styles.unitText, { color: colors.text.primary }]}>
                            {units === 'metric' ? 'Métrico' : 'Imperial'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Dados</Text>
                <TouchableOpacity
                    style={[styles.settingItem, { backgroundColor: colors.card.background, ...colors.card.shadow }]}>
                    <View style={styles.settingContent}>
                        <Scale size={24} color={colors.primary} />
                        <Text style={[styles.settingText, { color: colors.text.primary }]}>Exportar Dados</Text>
                    </View>
                    <ChevronRight size={24} color={colors.text.secondary} />
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={[styles.logoutButton, { backgroundColor: colors.error }]}
                onPress={handleLogout}>
                <LogOut size={24} color="white" />
                <Text style={styles.logoutText}>Sair</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginTop: 16,
        marginBottom: -16,
    },
    backButtonText: {
        fontSize: 16,
        fontFamily: 'Inter_600SemiBold',
        marginLeft: 4,
    },
    header: {
        padding: 24,
        paddingTop: 32,
    },
    title: {
        fontSize: 28,
        fontFamily: 'Poppins_600SemiBold',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
    },
    section: {
        padding: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: 'Poppins_600SemiBold',
        marginBottom: 16,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
    },
    settingContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    settingText: {
        fontSize: 16,
        fontFamily: 'Inter_500Medium',
    },
    unitToggle: {
        padding: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    unitText: {
        fontSize: 14,
        fontFamily: 'Inter_500Medium',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 16,
        padding: 16,
        borderRadius: 12,
        gap: 8,
    },
    logoutText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Inter_600SemiBold',
    },
});
