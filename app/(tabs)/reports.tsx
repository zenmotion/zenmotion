import { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryBar, VictoryGroup } from 'victory-native';
import { ChartLine, Scale, Activity, Brain } from 'lucide-react-native';
import { healthReportApi, predictionHistoryApi, preferencesApi } from '@/api/api';
import { userStorage } from '@/utils/userStorage';

import React from 'react';

function CalorieSummary({ calorieData }: { calorieData: any[] }) {
    const last = calorieData.length > 0 ? calorieData[calorieData.length - 1] : null;
    const [goal, setGoal] = React.useState<number | null>(null);

    React.useEffect(() => {
        async function fetchGoal() {
            try {
                const userId = await userStorage.getUserId();
                if (!userId) return;
                const prefs = await preferencesApi.getById(userId);
                setGoal(prefs.daily_calorie_goal);
            } catch { }
        }
        fetchGoal();
    }, []);

    if (!last || goal === null) return null;

    const consumed = last.consumed;
    const diff = goal - consumed;
    const isAbove = consumed > goal;

    return (
        <View style={{
            margin: 16, padding: 16, borderRadius: 16, backgroundColor: isAbove ? '#ffeaea' : '#eaffea',
            borderColor: isAbove ? '#ef4444' : '#22c55e', borderWidth: 1,
        }}>
            <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 18, marginBottom: 4 }}>
                Calorias Consumidas Hoje
            </Text>
            <Text style={{ fontSize: 16 }}>
                <Text style={{ fontWeight: 'bold' }}>{consumed.toLocaleString('pt-BR')}</Text> / {goal.toLocaleString('pt-BR')} kcal
            </Text>
            <Text style={{ color: isAbove ? '#ef4444' : '#22c55e', fontSize: 15, marginTop: 4 }}>
                {isAbove
                    ? `Você excedeu a meta em ${(consumed - goal).toLocaleString('pt-BR')} kcal`
                    : `Faltam ${(goal - consumed).toLocaleString('pt-BR')} kcal para a meta`}
            </Text>
        </View>
    );
}

export default function Reports() {
    const { colors } = useTheme();
    const [activeTab, setActiveTab] = useState('progress');
    const [weightData, setWeightData] = useState([]);
    const [calorieData, setCalorieData] = useState([]);
    const [predictions, setPredictions] = useState({
        weeklyLoss: 0,
        targetWeight: 0,
        daysRemaining: 0
    });
    const [calorieGoal, setCalorieGoal] = useState<number | null>(null);

    useEffect(() => {
        loadReportData();
    }, []);

    const loadReportData = async () => {
        try {
            const userId = await userStorage.getUserId();
            if (!userId) return;
            try {
                const prefs = await preferencesApi.getById(userId);
                setCalorieGoal(prefs.daily_calorie_goal);
            } catch (e) {
                setCalorieGoal(null);
            }
            const reports = await healthReportApi.getAll();
            const userReports = reports.filter((r: any) => r.user === userId);
            const weightHistory = userReports.map((report, index) => ({
                x: index + 1,
                y: report.weight_change
            }));
            setWeightData(weightHistory);

            const calorieHistory = userReports.map((report, index) => ({
                x: index + 1,
                consumed: report.average_calories_consumed,
                burned: report.average_calories_burned
            }));
            setCalorieData(calorieHistory);

            const predictionsList = await predictionHistoryApi.getAll();
            const userPredictions = predictionsList.filter((p: any) => p.user === userId);
            if (userPredictions.length > 0) {
                const latest = userPredictions[userPredictions.length - 1];
                setPredictions({
                    weeklyLoss: latest.prediction_result.weeklyLoss,
                    targetWeight: latest.prediction_result.targetWeight,
                    daysRemaining: latest.prediction_result.daysRemaining
                });
            }
        } catch (error) {
            console.error('Erro ao carregar relatórios:', error);
        }
    };

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: colors.text.primary }]}>Relatórios</Text>
                <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
                    Acompanhe seu progresso e insights
                </Text>
            </View>

            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[
                        styles.tab,
                        activeTab === 'progress' && { backgroundColor: colors.primary },
                    ]}
                    onPress={() => setActiveTab('progress')}>
                    <Text
                        style={[
                            styles.tabText,
                            { color: activeTab === 'progress' ? 'white' : colors.text.primary },
                        ]}>
                        Progresso
                    </Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                    style={[
                        styles.tab,
                        activeTab === 'predictions' && { backgroundColor: colors.primary },
                    ]}
                    onPress={() => setActiveTab('predictions')}>
                    <Text
                        style={[
                        styles.tabText,
                        { color: activeTab === 'predictions' ? 'white' : colors.text.primary },
                        ]}>
                        Previsões
                    </Text>
                </TouchableOpacity> */}
            </View>

            {activeTab === 'progress' ? (
                <>
                    {/* Resumo de Calorias Consumidas */}
                    <CalorieSummary calorieData={calorieData} />
                    <View style={[styles.card, { backgroundColor: colors.card.background, ...colors.card.shadow }]}>
                        <View style={styles.cardHeader}>
                            <Scale size={24} color={colors.primary} />
                            <Text style={[styles.cardTitle, { color: colors.text.primary }]}>Progresso do Peso</Text>
                        </View>
                        <VictoryChart height={200} padding={{ top: 20, bottom: 30, left: 40, right: 20 }}>
                            <VictoryAxis
                                style={{
                                    axis: { stroke: colors.text.secondary },
                                    tickLabels: { fill: colors.text.secondary },
                                }}
                            />
                            <VictoryAxis
                                dependentAxis
                                style={{
                                    axis: { stroke: colors.text.secondary },
                                    tickLabels: { fill: colors.text.secondary },
                                }}
                            />
                            <VictoryLine
                                data={weightData}
                                style={{
                                    data: { stroke: colors.primary },
                                }}
                            />
                        </VictoryChart>
                    </View>

                    <View style={[styles.card, { backgroundColor: colors.card.background, ...colors.card.shadow }]}>
                        <View style={styles.cardHeader}>
                            <Activity size={24} color={colors.primary} />
                            <Text style={[styles.cardTitle, { color: colors.text.primary }]}>Balanço Calórico</Text>
                        </View>
                        <VictoryChart height={200} padding={{ top: 20, bottom: 30, left: 40, right: 20 }}>
                            <VictoryAxis
                                style={{
                                    axis: { stroke: colors.text.secondary },
                                    tickLabels: { fill: colors.text.secondary },
                                }}
                            />
                            <VictoryAxis
                                dependentAxis
                                style={{
                                    axis: { stroke: colors.text.secondary },
                                    tickLabels: { fill: colors.text.secondary },
                                }}
                            />
                            <VictoryGroup offset={10}>
                                <VictoryBar
                                    data={calorieData}
                                    x="x"
                                    y="consumed"
                                    style={{ data: { fill: colors.primary } }}
                                />
                                <VictoryBar
                                    data={calorieData}
                                    x="x"
                                    y="burned"
                                    style={{ data: { fill: colors.secondary } }}
                                />
                            </VictoryGroup>
                        </VictoryChart>
                        <View style={styles.legend}>
                            <View style={styles.legendItem}>
                                <View style={[styles.legendDot, { backgroundColor: colors.primary }]} />
                                <Text style={[styles.legendText, { color: colors.text.secondary }]}>Calorias Consumidas</Text>
                            </View>
                            <View style={styles.legendItem}>
                                <View style={[styles.legendDot, { backgroundColor: colors.secondary }]} />
                                <Text style={[styles.legendText, { color: colors.text.secondary }]}>Calorias Queimadas</Text>
                            </View>
                        </View>
                    </View>
                </>
            ) : (
                <View style={[styles.card, { backgroundColor: colors.card.background, ...colors.card.shadow }]}>
                    <View style={styles.cardHeader}>
                        <Brain size={24} color={colors.primary} />
                        <Text style={[styles.cardTitle, { color: colors.text.primary }]}>Previsões IA</Text>
                    </View>
                    <Text style={[styles.predictionText, { color: colors.text.primary }]}>
                        Com base no seu progresso atual, você deve atingir sua meta de peso em {predictions.daysRemaining} dias.
                    </Text>
                    <View style={styles.predictionStats}>
                        <View style={styles.predictionStat}>
                            <Text style={[styles.statValue, { color: colors.text.primary }]}>
                                {predictions.weeklyLoss} kg
                            </Text>
                            <Text style={[styles.statLabel, { color: colors.text.secondary }]}>Perda Semanal</Text>
                        </View>
                        <View style={styles.predictionStat}>
                            <Text style={[styles.statValue, { color: colors.text.primary }]}>
                                {predictions.targetWeight} kg
                            </Text>
                            <Text style={[styles.statLabel, { color: colors.text.secondary }]}>Peso Meta</Text>
                        </View>
                        <View style={styles.predictionStat}>
                            <Text style={[styles.statValue, { color: colors.text.primary }]}>
                                {predictions.daysRemaining} dias
                            </Text>
                            <Text style={[styles.statLabel, { color: colors.text.secondary }]}>Restantes</Text>
                        </View>
                    </View>
                </View>
            )}
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
    title: {
        fontSize: 28,
        fontFamily: 'Poppins_600SemiBold',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
    },
    tabContainer: {
        flexDirection: 'row',
        padding: 16,
        gap: 12,
    },
    tab: {
        flex: 1,
        padding: 12,
        borderRadius: 12,
        alignItems: 'center',
    },
    tabText: {
        fontSize: 16,
        fontFamily: 'Inter_500Medium',
    },
    card: {
        margin: 16,
        padding: 16,
        borderRadius: 16,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 16,
    },
    cardTitle: {
        fontSize: 18,
        fontFamily: 'Poppins_600SemiBold',
    },
    legend: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 24,
        marginTop: 16,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    legendDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    legendText: {
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
    },
    predictionText: {
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
        lineHeight: 24,
        marginBottom: 24,
    },
    predictionStats: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    predictionStat: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: 20,
        fontFamily: 'Inter_600SemiBold',
    },
    statLabel: {
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
        marginTop: 4,
    },
});