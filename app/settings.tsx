import { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Switch, TextInput, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@/contexts/ThemeContext';
import {
    Bell,
    Moon,
    User,
    Target,
    Footprints,
    ChevronRight,
    ChevronLeft,
    Ruler,
    Scale,
    LogOut,
    Trash2,
} from 'lucide-react-native';
import { preferencesApi, userApi, authApi } from '@/api/api';
import { router } from 'expo-router';
import { userStorage } from '@/utils/userStorage';

export default function Settings() {
    const [deleting, setDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);
    const [deleteSuccess, setDeleteSuccess] = useState<string | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
 
    const [userId, setUserId] = useState<number | null>(null);
    const [dailyCalorieGoal, setDailyCalorieGoal] = useState<number>(2000);
    const [dailyStepGoal, setDailyStepGoal] = useState<number>(10000);
    useEffect(() => {
        userStorage.getUserId().then(setUserId);
    }, []);
    useEffect(() => {
        if (userId) {
            preferencesApi.getById(userId).then(pref => {
                setDailyCalorieGoal(pref.daily_calorie_goal ?? 2000);
                setDailyStepGoal(pref.daily_step_goal ?? 10000);
                setNotifications(pref.notifications_enabled);
                setUnits(pref.preferred_units);
            }).catch(() => {
                setDailyCalorieGoal(2000);
                setDailyStepGoal(10000);
            });
        }
    }, [userId]);

    const handleDeleteProfile = async () => {
        if (!userId) return;
        setDeleting(true);
        setDeleteError(null);
        setDeleteSuccess(null);
        try {
            await userApi.delete(userId);
            setDeleteSuccess('Perfil excluído com sucesso!');
            setTimeout(() => {
                authApi.logout();
            }, 1500);
        } catch (error) {
            setDeleteError('Falha ao excluir perfil.');
        } finally {
            setDeleting(false);
        }
    };
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
        if (!userId) return;
        try {
            await preferencesApi.update(userId, {
                notifications_enabled: notifications,
                preferred_units: units,
                daily_calorie_goal: dailyCalorieGoal,
                daily_step_goal: dailyStepGoal,
            });
        } catch (error) {
            console.error('Falha ao atualizar preferências:', error);
        }
    };



    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>

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

                {/* Campo para meta diária de calorias */}
                <View style={[styles.settingItem, { backgroundColor: colors.card.background, ...colors.card.shadow }]}> 
                    <View style={styles.settingContent}>
                        <Target size={24} color={colors.primary} />
                        <Text style={[styles.settingText, { color: colors.text.primary }]}>Meta diária de calorias</Text>
                    </View>
                    <TextInput
                        style={[styles.inputHalf, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text.primary, width: 90, textAlign: 'right' }]}
                        keyboardType="numeric"
                        value={String(dailyCalorieGoal)}
                        onChangeText={text => setDailyCalorieGoal(Number(text.replace(/\D/g, '')))}
                        onBlur={updatePreferences}
                        placeholder="kcal"
                        maxLength={5}
                    />
                </View>
                {/* Campo para meta diária de passos */}
                <View style={[styles.settingItem, { backgroundColor: colors.card.background, ...colors.card.shadow }]}> 
                    <View style={styles.settingContent}>
                        <Footprints size={24} color={colors.primary} />
                        <Text style={[styles.settingText, { color: colors.text.primary }]}>Meta diária de passos</Text>
                    </View>
                    <TextInput
                        style={[styles.inputHalf, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text.primary, width: 90, textAlign: 'right' }]}
                        keyboardType="numeric"
                        value={String(dailyStepGoal)}
                        onChangeText={text => setDailyStepGoal(Number(text.replace(/\D/g, '')))}
                        onBlur={updatePreferences}
                        placeholder="passos"
                        maxLength={6}
                    />
                </View>

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

                {deleteError && (
                    <Text style={{ color: colors.error, textAlign: 'center', marginBottom: 8 }}>{deleteError}</Text>
                )}
                {deleteSuccess && (
                    <Text style={{ color: colors.success, textAlign: 'center', marginBottom: 8 }}>{deleteSuccess}</Text>
                )}
                <Modal
                    visible={showDeleteModal}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setShowDeleteModal(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={[styles.modalContent, { backgroundColor: colors.card.background }]}>  
                            <Text style={[styles.modalTitle, { color: colors.error }]}>Excluir Conta</Text>
                            <Text style={[styles.modalText, { color: colors.text.primary }]}>Tem certeza que deseja excluir sua conta? Esta ação é irreversível.</Text>
                            <View style={styles.modalActions}>
                                <TouchableOpacity
                                    style={[styles.modalButton, { backgroundColor: colors.error }]}
                                    onPress={async () => {
                                        setShowDeleteModal(false);
                                        await handleDeleteProfile();
                                    }}
                                    disabled={deleting}
                                >
                                    <Text style={styles.modalButtonText}>Excluir</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.modalButton, { backgroundColor: colors.surface }]}
                                    onPress={() => setShowDeleteModal(false)}
                                >
                                    <Text style={[styles.modalButtonText, { color: colors.text.primary }]}>Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
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
                style={[styles.deleteButton, deleting && { opacity: 0.7 }]}
                onPress={() => setShowDeleteModal(true)}
                disabled={deleting}
            >
                <Trash2 size={24} color={'white'} />
                <Text style={styles.deleteButtonText}>Excluir Conta</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.logoutButton, { backgroundColor: colors.error, marginTop: 12 }]}
                onPress={handleLogout}>
                <LogOut size={24} color="white" />
                <Text style={styles.logoutText}>Sair</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    inputHalf: {
        borderRadius: 12,
        padding: 16,
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        borderWidth: 1,
        width: '100%',
    },
    deleteButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
        marginLeft: 16,
        marginBottom: 0,
        padding: 16,
        borderRadius: 12,
        gap: 8,
        backgroundColor: '#ef4444',
    },
    deleteButtonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Inter_600SemiBold',
        letterSpacing: 0.5,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '85%',
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 8 },
        elevation: 8,
    },
    modalTitle: {
        fontSize: 22,
        fontFamily: 'Poppins_600SemiBold',
        marginBottom: 8,
    },
    modalText: {
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
        textAlign: 'center',
        marginBottom: 24,
    },
    modalActions: {
        flexDirection: 'row',
        gap: 16,
        width: '100%',
        justifyContent: 'center',
    },
    modalButton: {
        flex: 1,
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
        marginHorizontal: 4,
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Inter_600SemiBold',
    },
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
