import { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@/contexts/ThemeContext';
import { Target, Plus, Check, Flag, Calendar, ChevronLeft } from 'lucide-react-native';
import { goalApi } from '@/api/api';
import { userStorage } from '@/utils/userStorage';
import GoalModal from '@/components/GoalModal';

type GoalType = {
    id: number;
    goal_type: string;
    target_value: number;
    current_value: number;
    deadline: string;
    is_completed: boolean;
};

export default function Goals() {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const [goals, setGoals] = useState<GoalType[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        loadGoals();
    }, []);

    const loadGoals = async () => {
        try {
            const userId = await userStorage.getUserId();
            if (!userId) return;
            const response = await goalApi.getAll();
            const userGoals = response.filter((goal: any) => goal.user === userId);
            setGoals(userGoals);
        } catch (error) {
            console.error('Erro ao carregar metas:', error);
            Alert.alert('Erro', 'Não foi possível carregar as metas');
        }
    };

    const handleCompleteGoal = async (goalId: number, isCompleted: boolean) => {
        try {
            await goalApi.update(goalId, { is_completed: !isCompleted });
            loadGoals();
        } catch (error) {
            console.error('Erro ao atualizar meta:', error);
            Alert.alert('Erro', 'Não foi possível atualizar a meta');
        }
    };

    const handleDeleteGoal = async (goalId: number) => {
        try {
            await goalApi.delete(goalId);
            loadGoals();
        } catch (error) {
            console.error('Erro ao excluir meta:', error);
            Alert.alert('Erro', 'Não foi possível excluir a meta');
        }
    };

    const getProgress = (current: number, target: number) => {
        return target > 0 ? (current / target) * 100 : 0;
    };

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            timeZone: 'UTC'
        };
        return new Date(dateString).toLocaleDateString('pt-BR', options);
    };

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Botão de Voltar */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <ChevronLeft size={20} color={colors.text.primary} />
                <Text style={[styles.backButtonText, { color: colors.text.primary }]}>Voltar</Text>
            </TouchableOpacity>

            <View style={styles.header}>
                <Text style={[styles.title, { color: colors.text.primary }]}>Metas</Text>
                <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
                    Acompanhe seu progresso e conquiste seus objetivos
                </Text>
            </View>

            <View style={styles.goalsList}>
                {goals.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Target size={48} color={colors.text.secondary} />
                        <Text style={[styles.emptyText, { color: colors.text.secondary }]}>
                            Nenhuma meta cadastrada
                        </Text>
                        <Text style={[styles.emptySubtext, { color: colors.text.secondary }]}>
                            Clique no botão + para adicionar uma nova meta
                        </Text>
                    </View>
                ) : (
                    goals.map((goal) => (
                        <View
                            key={goal.id}
                            style={[styles.goalCard, {
                                backgroundColor: colors.card.background,
                                ...colors.card.shadow,
                                borderLeftWidth: 4,
                                borderLeftColor: goal.is_completed ? '#4CAF50' : colors.primary
                            }]}
                        >
                            <View style={styles.goalHeader}>
                                <View style={styles.goalTitleContainer}>
                                    <Flag size={20} color={goal.is_completed ? '#4CAF50' : colors.primary} />
                                    <Text style={[styles.goalTitle, { color: colors.text.primary }]}>{goal.goal_type}</Text>
                                </View>
                                <View style={styles.goalActions}>
                                    <TouchableOpacity
                                        onPress={() => handleCompleteGoal(goal.id, goal.is_completed)}
                                        style={[styles.actionButton, goal.is_completed && styles.completedButton]}
                                    >
                                        {goal.is_completed ? (
                                            <Check size={16} color="#fff" />
                                        ) : null}
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.progressContainer}>
                                <View style={[styles.progressBar, { backgroundColor: colors.surface }]}>
                                    <View
                                        style={[styles.progressFill, {
                                            width: `${Math.min(getProgress(goal.current_value, goal.target_value), 100)}%`,
                                            backgroundColor: goal.is_completed ? '#4CAF50' : colors.primary
                                        }]}
                                    />
                                </View>
                                <Text style={[styles.progressText, { color: colors.text.secondary }]}>
                                    {Math.round(getProgress(goal.current_value, goal.target_value))}% concluído
                                </Text>
                            </View>

                            <View style={styles.goalDetails}>
                                <View style={styles.detailItem}>
                                    <Text style={[styles.detailLabel, { color: colors.text.secondary }]}>Atual</Text>
                                    <Text style={[styles.detailValue, { color: colors.text.primary }]}>{goal.current_value}</Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <Text style={[styles.detailLabel, { color: colors.text.secondary }]}>Meta</Text>
                                    <Text style={[styles.detailValue, { color: colors.text.primary }]}>{goal.target_value}</Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <Calendar size={16} color={colors.text.secondary} />
                                    <Text style={[styles.detailValue, { color: colors.text.primary, marginLeft: 4 }]}>
                                        {formatDate(goal.deadline)}
                                    </Text>
                                </View>
                            </View>

                            {goal.is_completed && (
                                <View style={[styles.completedBadge, { backgroundColor: '#4CAF50' }]}>
                                    <Check size={14} color="#fff" />
                                    <Text style={styles.completedText}>Concluída</Text>
                                </View>
                            )}
                        </View>
                    ))
                )}
            </View>

            <TouchableOpacity
                style={[styles.addButton, { backgroundColor: colors.primary }]}
                onPress={() => setIsModalVisible(true)}>
                <Plus size={24} color="white" />
                <Text style={styles.addButtonText}>Nova Meta</Text>
            </TouchableOpacity>

            <GoalModal
                isVisible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onSave={loadGoals}
            />
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
    goalsList: {
        padding: 16,
    },
    emptyContainer: {
        alignItems: 'center',
        padding: 40,
        borderRadius: 12,
        backgroundColor: 'rgba(0,0,0,0.02)',
        marginTop: 20,
    },
    emptyText: {
        fontSize: 16,
        fontFamily: 'Inter_600SemiBold',
        marginTop: 16,
        textAlign: 'center',
    },
    emptySubtext: {
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
        marginTop: 8,
        textAlign: 'center',
        opacity: 0.8,
    },
    goalCard: {
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        position: 'relative',
        overflow: 'hidden',
    },
    goalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    goalTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    goalTitle: {
        fontSize: 16,
        fontFamily: 'Inter_600SemiBold',
        marginLeft: 8,
    },
    goalActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    completedButton: {
        backgroundColor: '#4CAF50',
        borderColor: '#4CAF50',
    },
    progressContainer: {
        marginVertical: 12,
    },
    progressBar: {
        height: 8,
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 4,
    },
    progressFill: {
        height: '100%',
        borderRadius: 4,
    },
    progressText: {
        fontSize: 12,
        fontFamily: 'Inter_500Medium',
        textAlign: 'right',
    },
    goalDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailLabel: {
        fontSize: 12,
        fontFamily: 'Inter_500Medium',
        marginRight: 4,
    },
    detailValue: {
        fontSize: 14,
        fontFamily: 'Inter_600SemiBold',
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 16,
        padding: 16,
        borderRadius: 12,
        gap: 8,
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Inter_600SemiBold',
    },
    completedBadge: {
        position: 'absolute',
        top: 12,
        right: 12,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    completedText: {
        color: 'white',
        fontSize: 12,
        fontFamily: 'Inter_600SemiBold',
        marginLeft: 4,
    },
});
