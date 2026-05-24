import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: string;
  color: string;
}

export default function StatCard({ title, value, subtitle, icon, color }: StatCardProps) {
  return (
    <View style={[styles.card, { borderLeftColor: color }]}>
      <View style={styles.header}>
        <Text style={styles.icon}>{icon}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    fontSize: 20,
    marginRight: 8,
  },
  title: {
    color: '#9ca3af',
    fontSize: 14,
    fontWeight: '500',
  },
  value: {
    color: '#f9fafb',
    fontSize: 32,
    fontWeight: '700',
  },
  subtitle: {
    color: '#6b7280',
    fontSize: 12,
    marginTop: 4,
  },
});