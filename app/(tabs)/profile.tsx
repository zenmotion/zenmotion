import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { User, Mail, Calendar, Ruler, Scale, Pencil, Save, Settings, Bell, Moon, ChevronRight, LogOut, Target } from 'lucide-react-native';
import { userApi, authApi, preferencesApi } from '@/api/api';
import { userStorage } from '@/utils/userStorage';
import { router } from 'expo-router';

export default function Profile() {
    const { colors, isDark, toggleTheme } = useTheme();
    const [isEditing, setIsEditing] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const [units, setUnits] = useState<'metric' | 'imperial'>('metric');
    const [userData, setUserData] = useState({
        id: 0,
        name: '',
        email: '',
        birth_date: '',
        height_cm: '',
        weight_kg: '',
        gender: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        setLoading(true);
        setError(null);
        try {
            const userId = await userStorage.getUserId();
            if (!userId) {
                router.replace('/login');
                return;
            }

            const user = await userApi.getById(userId);
            setUserData({
                ...userData,
                ...user,
                height_cm: user.height_cm?.toString() || '',
                weight_kg: user.weight_kg?.toString() || '',
            });
        } catch (err) {
            setError('Erro ao carregar dados do perfil.');
            console.error('Erro ao buscar usuário:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setError(null);
        setSuccess(null);
        
        if (!userData.name.trim()) {
            setError('Nome é obrigatório.');
            return;
        }
        
        if (!userData.email.trim()) {
            setError('Email é obrigatório.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userData.email)) {
            setError('Email inválido.');
            return;
        }

        try {
            await userApi.update(userData.id, {
                name: userData.name,
                email: userData.email,
                birth_date: userData.birth_date,
                height_cm: userData.height_cm ? parseInt(userData.height_cm as string) : undefined,
                weight_kg: userData.weight_kg ? parseInt(userData.weight_kg as string) : undefined,
                gender: userData.gender as 'M' | 'F' | 'O',
            });
            setSuccess('Perfil atualizado com sucesso!');
            setIsEditing(false);
        } catch (error) {
            setError('Falha ao atualizar perfil.');
            console.error('Erro ao salvar perfil:', error);
        }
    };

    const handleLogout = () => {
        Alert.alert(
            'Confirmar Logout',
            'Tem certeza que deseja sair?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { 
                    text: 'Sair', 
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await authApi.logout();
                            await userStorage.clearUser();
                            router.replace('/login');
                        } catch (error) {
                            try {
                                await userStorage.clearUser();
                                router.replace('/login');
                            } catch (storageError) {
                                router.replace('/login');
                            }
                        }
                    }
                }
            ]
        );
    };

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <View style={styles.profileHeader}>
                        <Image
                            source={{
                                uri: userData.name
                                    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&size=120&background=cccccc&color=fff`
                                    : userData.id
                                        ? `https://ui-avatars.com/api/?name=User${userData.id}&size=120&background=cccccc&color=fff`
                                        : 'https://ui-avatars.com/api/?name=User&size=120&background=cccccc&color=fff'
                            }}
                            style={styles.profileImage}
                        />
                        <TouchableOpacity
                            style={[styles.editButton, { backgroundColor: colors.primary }]}
                            onPress={() => setIsEditing(!isEditing)}>
                            {isEditing ? (
                                <Save size={20} color="white" />
                            ) : (
                                <Pencil size={20} color="white" />
                            )}
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={[styles.settingsButton, { backgroundColor: colors.surface }]}
                        onPress={() => router.push('/settings')}>
                        <Settings size={24} color={colors.primary} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.content}>
                {loading && (
                    <Text style={{ color: colors.text.secondary, textAlign: 'center', marginVertical: 16 }}>
                        Carregando perfil...
                    </Text>
                )}
                {error && (
                    <Text style={{ color: colors.error, textAlign: 'center', marginVertical: 8 }}>
                        {error}
                    </Text>
                )}
                {success && (
                    <Text style={{ color: colors.success, textAlign: 'center', marginVertical: 8 }}>
                        {success}
                    </Text>
                )}

                <View style={[styles.section, { backgroundColor: colors.card.background,  }]}>
                    <View style={styles.sectionHeader}>
                        <User size={24} color={colors.primary} />
                        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
                            Informações Pessoais
                        </Text>
                    </View>

                    <View style={styles.field}>
                        <Text style={[styles.label, { color: colors.text.secondary }]}>Nome</Text>
                        {isEditing ? (
                            <TextInput
                                style={[styles.input, { 
                                    backgroundColor: colors.surface, 
                                    borderColor: colors.border, 
                                    color: colors.text.primary 
                                }]}
                                value={userData.name}
                                onChangeText={(text) => setUserData({ ...userData, name: text })}
                                placeholder="Digite seu nome"
                                placeholderTextColor={colors.text.secondary}
                            />
                        ) : (
                            <Text style={[styles.value, { color: colors.text.primary }]}>
                                {userData.name || 'Não informado'}
                            </Text>
                        )}
                    </View>

                    <View style={styles.field}>
                        <Text style={[styles.label, { color: colors.text.secondary }]}>Email</Text>
                        {isEditing ? (
                            <TextInput
                                style={[styles.input, { 
                                    backgroundColor: colors.surface, 
                                    borderColor: colors.border, 
                                    color: colors.text.primary 
                                }]}
                                value={userData.email}
                                onChangeText={(text) => setUserData({ ...userData, email: text })}
                                keyboardType="email-address"
                                placeholder="Digite seu email"
                                placeholderTextColor={colors.text.secondary}
                            />
                        ) : (
                            <Text style={[styles.value, { color: colors.text.primary }]}>
                                {userData.email || 'Não informado'}
                            </Text>
                        )}
                    </View>

                    <View style={styles.field}>
                        <Text style={[styles.label, { color: colors.text.secondary }]}>Data de Nascimento</Text>
                        {isEditing ? (
                            <TextInput
                                style={[styles.input, { 
                                    backgroundColor: colors.surface, 
                                    borderColor: colors.border, 
                                    color: colors.text.primary 
                                }]}
                                value={userData.birth_date}
                                onChangeText={(text) => setUserData({ ...userData, birth_date: text })}
                                placeholder="AAAA-MM-DD"
                                placeholderTextColor={colors.text.secondary}
                            />
                        ) : (
                            <Text style={[styles.value, { color: colors.text.primary }]}> 
                                {userData.birth_date ? new Date(userData.birth_date).toLocaleDateString('pt-BR') : 'Não informado'}
                            </Text>
                        )}
                    </View>
                </View>

                <View style={[styles.section, { backgroundColor: colors.card.background,  }]}>
                    <View style={styles.sectionHeader}>
                        <Scale size={24} color={colors.primary} />
                        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
                            Medidas Corporais
                        </Text>
                    </View>

                    <View style={styles.field}>
                        <Text style={[styles.label, { color: colors.text.secondary }]}>Altura (cm)</Text>
                        {isEditing ? (
                            <TextInput
                                style={[styles.input, { 
                                    backgroundColor: colors.surface, 
                                    borderColor: colors.border, 
                                    color: colors.text.primary 
                                }]}
                                value={userData.height_cm}
                                onChangeText={(text) => setUserData({ ...userData, height_cm: text })}
                                keyboardType="numeric"
                                placeholder="Ex: 175"
                                placeholderTextColor={colors.text.secondary}
                            />
                        ) : (
                            <Text style={[styles.value, { color: colors.text.primary }]}>
                                {userData.height_cm ? `${userData.height_cm} cm` : 'Não informado'}
                            </Text>
                        )}
                    </View>

                    <View style={styles.field}>
                        <Text style={[styles.label, { color: colors.text.secondary }]}>Peso (kg)</Text>
                        {isEditing ? (
                            <TextInput
                                style={[styles.input, { 
                                    backgroundColor: colors.surface, 
                                    borderColor: colors.border, 
                                    color: colors.text.primary 
                                }]}
                                value={userData.weight_kg}
                                onChangeText={(text) => setUserData({ ...userData, weight_kg: text })}
                                keyboardType="numeric"
                                placeholder="Ex: 70"
                                placeholderTextColor={colors.text.secondary}
                            />
                        ) : (
                            <Text style={[styles.value, { color: colors.text.primary }]}>
                                {userData.weight_kg ? `${userData.weight_kg} kg` : 'Não informado'}
                            </Text>
                        )}
                    </View>
                </View>

                <View style={styles.section1}>
                    <TouchableOpacity
                        style={[styles.settingItem, { backgroundColor: colors.card.background,  }]}
                        onPress={() => router.push('/goals')}
                    >
                        <View style={styles.settingContent}>
                            <Target size={24} color={colors.primary} />
                            <Text style={[styles.settingText, { color: colors.text.primary }]}>Metas</Text>
                        </View>
                        <ChevronRight size={24} color={colors.text.secondary} />
                    </TouchableOpacity>
                </View>

                {isEditing && (
                    <TouchableOpacity
                        style={[styles.saveButton, { backgroundColor: colors.primary }]}
                        onPress={handleSave}>
                        <Text style={styles.saveButtonText}>Salvar Alterações</Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity
                    style={[styles.logoutButton, { backgroundColor: colors.error }]}
                    onPress={handleLogout}>
                    <LogOut size={20} color="white" />
                    <Text style={styles.logoutText}>Sair</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 24,
        paddingTop: 48,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    profileHeader: {
        alignItems: 'center',
        position: 'relative',
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    editButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        padding: 16,
    },
    section1: {
        paddingVertical: 8,
    },
    section: {
        padding: 16,
        borderRadius: 16,
        marginBottom: 16,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        gap: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: 'Poppins_600SemiBold',
    },
    field: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontFamily: 'Inter_500Medium',
        marginBottom: 8,
    },
    value: {
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
    },
    input: {
        borderRadius: 8,
        padding: 12,
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        borderWidth: 1,
    },
    settingsButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
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
    toggle: {
        width: 52,
        height: 32,
        borderRadius: 16,
        padding: 2,
    },
    toggleKnob: {
        width: 28,
        height: 28,
        borderRadius: 14,
    },
    unitToggle: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        gap: 8,
    },
    unitText: {
        fontSize: 14,
        fontFamily: 'Inter_500Medium',
    },
    saveButton: {
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 8,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Inter_600SemiBold',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderRadius: 12,
        gap: 8,
        marginTop: 16,
    },
    logoutText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Inter_600SemiBold',
    },
});