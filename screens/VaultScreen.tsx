import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import PasswordCard from '../components/PasswordCard';

const mockPasswords = [
  { id: '1', service: 'Google', email: 'user@gmail.com', has2FA: true, strength: 'strong' as const },
  { id: '2', service: 'GitHub', email: 'dev@user.com', has2FA: true, strength: 'strong' as const },
  { id: '3', service: 'Twitter', email: 'user123', has2FA: false, strength: 'medium' as const },
  { id: '4', service: 'Netflix', email: 'user@email.com', has2FA: false, strength: 'weak' as const },
  { id: '5', service: 'Amazon', email: 'shop@user.com', has2FA: true, strength: 'strong' as const },
];

export default function VaultScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Password Vault</Text>
          <Text style={styles.subtitle}>{mockPasswords.length} passwords stored</Text>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {mockPasswords.map((password) => (
          <PasswordCard
            key={password.id}
            service={password.service}
            email={password.email}
            has2FA={password.has2FA}
            strength={password.strength}
          />
        ))}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
  },
  list: {
    flex: 1,
    paddingHorizontal: 16,
  },
  bottomPadding: {
    height: 24,
  },
});