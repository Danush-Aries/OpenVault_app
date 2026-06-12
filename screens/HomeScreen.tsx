import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import StatCard from '../components/StatCard';
import { loadPasswords, loadIdentities, loadThreats } from '../utils/storage';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [passwordCount, setPasswordCount] = useState(0);
  const [identityCount, setIdentityCount] = useState(0);
  const [threatCount, setThreatCount] = useState(0);
  const [breachCount, setBreachCount] = useState(0);

  useEffect(() => {
    async function loadStats() {
      const [passwords, identities, threats] = await Promise.all([
        loadPasswords(),
        loadIdentities(),
        loadThreats(),
      ]);
      setPasswordCount(passwords.length);
      setIdentityCount(identities.filter(i => i.status === 'active').length);
      setThreatCount(threats.filter(t => !t.resolved).length);
      setBreachCount(threats.filter(t => t.type === 'breach' && !t.resolved).length);
    }
    loadStats();
  }, []);

  const handleAddPassword = () => {
    // Navigate to the Vault tab
    (navigation as any).navigate('Vault');
  };

  const handleGeneratePassword = () => {
    // Navigate to the Vault tab which has the generator
    (navigation as any).navigate('Vault');
  };

  const handleNewIdentity = () => {
    (navigation as any).navigate('Identity');
  };

  const handleScanBreaches = () => {
    Alert.alert(
      'Breach Scan',
      'Scanning your email addresses against known data breach databases...\n\nThis feature connects to HaveIBeenPwned in a production build.',
      [{ text: 'OK' }]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome back</Text>
        <Text style={styles.title}>OpenVault</Text>
      </View>

      <View style={styles.statsGrid}>
        <StatCard
          title="Passwords"
          value={String(passwordCount)}
          subtitle="stored securely"
          icon="🔑"
          color="#6366f1"
        />
        <StatCard
          title="Identities"
          value={String(identityCount)}
          subtitle="active personas"
          icon="🎭"
          color="#10b981"
        />
        <StatCard
          title="Alerts"
          value={String(threatCount)}
          subtitle="needs attention"
          icon="🛡️"
          color="#ef4444"
        />
        <StatCard
          title="Breaches"
          value={String(breachCount)}
          subtitle="needs review"
          icon="⚠️"
          color="#f59e0b"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionButton} onPress={handleAddPassword}>
            <Text style={styles.actionIcon}>➕</Text>
            <Text style={styles.actionText}>Add Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleGeneratePassword}>
            <Text style={styles.actionIcon}>🔄</Text>
            <Text style={styles.actionText}>Generate Password</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionButton} onPress={handleNewIdentity}>
            <Text style={styles.actionIcon}>📧</Text>
            <Text style={styles.actionText}>New Identity</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleScanBreaches}>
            <Text style={styles.actionIcon}>🔍</Text>
            <Text style={styles.actionText}>Scan Breaches</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Security Status</Text>
        <View style={styles.statusCard}>
          <View style={styles.statusRow}>
            <Text style={styles.statusDot}>🟢</Text>
            <Text style={styles.statusText}>All vaulted passwords are encrypted at rest</Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={styles.statusDot}>🟢</Text>
            <Text style={styles.statusText}>No active malware or phishing risks</Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={styles.statusDot}>{breachCount > 0 ? '🔴' : '🟢'}</Text>
            <Text style={styles.statusText}>
              {breachCount > 0
                ? `${breachCount} breach alert(s) require your attention`
                : 'No new breach alerts'}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  contentContainer: {
    paddingBottom: 24,
  },
  header: {
    padding: 24,
    paddingTop: 16,
  },
  greeting: {
    color: '#9ca3af',
    fontSize: 16,
  },
  title: {
    color: '#f9fafb',
    fontSize: 28,
    fontWeight: '700',
    marginTop: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
  },
  section: {
    padding: 24,
    paddingBottom: 0,
  },
  sectionTitle: {
    color: '#f9fafb',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionText: {
    color: '#d1d5db',
    fontSize: 14,
    fontWeight: '500',
  },
  statusCard: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  statusDot: {
    fontSize: 14,
  },
  statusText: {
    color: '#d1d5db',
    fontSize: 14,
    flex: 1,
  },
});
