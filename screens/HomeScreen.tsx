import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import StatCard from '../components/StatCard';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome back</Text>
        <Text style={styles.title}>PrivacyVault OS</Text>
      </View>

      <View style={styles.statsGrid}>
        <StatCard
          title="Passwords"
          value="24"
          subtitle="stored securely"
          icon="🔑"
          color="#6366f1"
        />
        <StatCard
          title="Identities"
          value="3"
          subtitle="active personas"
          icon="🎭"
          color="#10b981"
        />
        <StatCard
          title="Threats"
          value="0"
          subtitle="blocked today"
          icon="🛡️"
          color="#ef4444"
        />
        <StatCard
          title="Breach Alerts"
          value="2"
          subtitle="需要关注"
          icon="⚠️"
          color="#f59e0b"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionRow}>
          <View style={styles.actionButton}>
            <Text style={styles.actionIcon}>➕</Text>
            <Text style={styles.actionText}>Add Password</Text>
          </View>
          <View style={styles.actionButton}>
            <Text style={styles.actionIcon}>🔄</Text>
            <Text style={styles.actionText}>Generate Password</Text>
          </View>
        </View>
        <View style={styles.actionRow}>
          <View style={styles.actionButton}>
            <Text style={styles.actionIcon}>📧</Text>
            <Text style={styles.actionText}>New Identity</Text>
          </View>
          <View style={styles.actionButton}>
            <Text style={styles.actionIcon}>🔍</Text>
            <Text style={styles.actionText}>Scan Breaches</Text>
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
});