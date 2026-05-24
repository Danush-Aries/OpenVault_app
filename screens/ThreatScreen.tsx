import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import StatCard from '../components/StatCard';

const mockThreats = [
  {
    id: '1',
    type: 'phishing',
    severity: 'high',
    source: 'email@fake-bank.com',
    description: 'Suspicious login attempt detected',
    time: '2 hours ago',
  },
  {
    id: '2',
    type: 'breach',
    severity: 'medium',
    source: 'HaveIBeenPwned',
    description: 'Your email found in data breach',
    time: '1 day ago',
  },
];

export default function ThreatScreen() {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#9ca3af';
    }
  };

  const getThreatIcon = (type: string) => {
    switch (type) {
      case 'phishing': return '🎣';
      case 'breach': return '💀';
      case 'malware': return '🦠';
      default: return '⚠️';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Threat Monitor</Text>
        <Text style={styles.subtitle}>Real-time security monitoring</Text>
      </View>

      <View style={styles.statsRow}>
        <StatCard
          title="Blocked"
          value="127"
          subtitle="this month"
          icon="🚫"
          color="#10b981"
        />
        <StatCard
          title="Alerts"
          value="2"
          subtitle="pending"
          icon="⚠️"
          color="#f59e0b"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Alerts</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {mockThreats.map((threat) => (
            <View key={threat.id} style={styles.threatCard}>
              <View style={styles.threatHeader}>
                <Text style={styles.threatIcon}>
                  {getThreatIcon(threat.type)}
                </Text>
                <View style={styles.threatInfo}>
                  <Text style={styles.threatType}>
                    {threat.type.charAt(0).toUpperCase() + threat.type.slice(1)}
                  </Text>
                  <Text style={styles.threatTime}>{threat.time}</Text>
                </View>
                <View style={[
                  styles.severityBadge,
                  { backgroundColor: getSeverityColor(threat.severity) + '20' }
                ]}>
                  <Text style={[
                    styles.severityText,
                    { color: getSeverityColor(threat.severity) }
                  ]}>
                    {threat.severity.toUpperCase()}
                  </Text>
                </View>
              </View>
              <Text style={styles.threatDescription}>{threat.description}</Text>
              <Text style={styles.threatSource}>From: {threat.source}</Text>
            </View>
          ))}
          <View style={styles.bottomPadding} />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  title: {
    color: '#f9fafb',
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    color: '#9ca3af',
    fontSize: 14,
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 24,
  },
  section: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    color: '#9ca3af',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  threatCard: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  threatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  threatIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  threatInfo: {
    flex: 1,
  },
  threatType: {
    color: '#f9fafb',
    fontSize: 16,
    fontWeight: '600',
  },
  threatTime: {
    color: '#9ca3af',
    fontSize: 12,
    marginTop: 2,
  },
  severityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  severityText: {
    fontSize: 10,
    fontWeight: '700',
  },
  threatDescription: {
    color: '#d1d5db',
    fontSize: 14,
    marginBottom: 8,
  },
  threatSource: {
    color: '#6b7280',
    fontSize: 12,
  },
  bottomPadding: {
    height: 24,
  },
});