import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import StatCard from '../components/StatCard';
import { ThreatAlert } from '../types';
import { loadThreats, saveThreats } from '../utils/storage';

export default function ThreatScreen() {
  const [threats, setThreats] = useState<ThreatAlert[]>([]);

  useEffect(() => {
    loadThreats().then(setThreats);
  }, []);

  const getSeverityColor = (severity: string): string => {
    switch (severity) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#9ca3af';
    }
  };

  const getThreatIcon = (type: string): string => {
    switch (type) {
      case 'phishing': return '🎣';
      case 'breach': return '💀';
      case 'malware': return '🦠';
      default: return '⚠️';
    }
  };

  const handleResolve = useCallback(async (id: string) => {
    Alert.alert(
      'Resolve Alert',
      'Mark this threat as resolved?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Resolve',
          onPress: async () => {
            const updated = threats.map(t =>
              t.id === id ? { ...t, resolved: true } : t
            );
            setThreats(updated);
            await saveThreats(updated);
          },
        },
      ]
    );
  }, [threats]);

  const handleDismissAll = useCallback(async () => {
    Alert.alert(
      'Dismiss All',
      'Mark all alerts as resolved?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Dismiss All',
          onPress: async () => {
            const updated = threats.map(t => ({ ...t, resolved: true }));
            setThreats(updated);
            await saveThreats(updated);
          },
        },
      ]
    );
  }, [threats]);

  const activeThreats = threats.filter(t => !t.resolved);
  const resolvedThreats = threats.filter(t => t.resolved);
  const blockedThisMonth = 127; // Static display value

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Threat Monitor</Text>
        <Text style={styles.subtitle}>Real-time security monitoring</Text>
      </View>

      <View style={styles.statsRow}>
        <StatCard
          title="Blocked"
          value={String(blockedThisMonth)}
          subtitle="this month"
          icon="🚫"
          color="#10b981"
        />
        <StatCard
          title="Alerts"
          value={String(activeThreats.length)}
          subtitle="pending"
          icon="⚠️"
          color="#f59e0b"
        />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Active Alerts</Text>
          {activeThreats.length > 0 && (
            <TouchableOpacity onPress={handleDismissAll}>
              <Text style={styles.dismissAll}>Dismiss All</Text>
            </TouchableOpacity>
          )}
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {activeThreats.length === 0 ? (
            <View style={styles.allClearCard}>
              <Text style={styles.allClearIcon}>✅</Text>
              <Text style={styles.allClearTitle}>All Clear</Text>
              <Text style={styles.allClearSubtitle}>No active threats detected</Text>
            </View>
          ) : (
            activeThreats.map((threat) => (
              <View key={threat.id} style={styles.threatCard}>
                <View style={styles.threatHeader}>
                  <Text style={styles.threatIcon}>{getThreatIcon(threat.type)}</Text>
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
                <TouchableOpacity
                  style={styles.resolveButton}
                  onPress={() => handleResolve(threat.id)}
                >
                  <Text style={styles.resolveButtonText}>Mark Resolved</Text>
                </TouchableOpacity>
              </View>
            ))
          )}

          {resolvedThreats.length > 0 && (
            <View style={styles.resolvedSection}>
              <Text style={styles.resolvedTitle}>
                {resolvedThreats.length} resolved alert{resolvedThreats.length !== 1 ? 's' : ''}
              </Text>
            </View>
          )}

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
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#9ca3af',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  dismissAll: {
    color: '#6366f1',
    fontSize: 14,
    fontWeight: '600',
  },
  allClearCard: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
  },
  allClearIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  allClearTitle: {
    color: '#f9fafb',
    fontSize: 18,
    fontWeight: '700',
  },
  allClearSubtitle: {
    color: '#9ca3af',
    fontSize: 14,
    marginTop: 6,
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
    marginBottom: 10,
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
    marginBottom: 6,
  },
  threatSource: {
    color: '#6b7280',
    fontSize: 12,
    marginBottom: 12,
  },
  resolveButton: {
    backgroundColor: '#374151',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  resolveButtonText: {
    color: '#10b981',
    fontSize: 13,
    fontWeight: '600',
  },
  resolvedSection: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  resolvedTitle: {
    color: '#4b5563',
    fontSize: 13,
  },
  bottomPadding: {
    height: 24,
  },
});
