import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const mockIdentities = [
  {
    id: '1',
    name: 'Personal',
    email: 'personal@example.com',
    type: 'email',
    status: 'active',
  },
  {
    id: '2',
    name: 'Work',
    email: 'work@company.com',
    type: 'email',
    status: 'active',
  },
  {
    id: '3',
    name: 'Shopping',
    email: 'temp-abc123@tempmail.com',
    type: 'temp-email',
    status: 'active',
  },
];

export default function IdentityScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Identities</Text>
        <Text style={styles.subtitle}>Manage your personas & temp emails</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personas</Text>
          {mockIdentities.filter(i => i.type === 'email').map((identity) => (
            <View key={identity.id} style={styles.identityCard}>
              <View style={styles.identityHeader}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {identity.name.charAt(0)}
                  </Text>
                </View>
                <View style={styles.identityInfo}>
                  <Text style={styles.identityName}>{identity.name}</Text>
                  <Text style={styles.identityEmail}>{identity.email}</Text>
                </View>
                <View style={[styles.badge, styles.badgeActive]}>
                  <Text style={styles.badgeText}>Active</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Temporary Emails</Text>
          {mockIdentities.filter(i => i.type === 'temp-email').map((identity) => (
            <View key={identity.id} style={styles.identityCard}>
              <View style={styles.identityHeader}>
                <View style={[styles.avatar, styles.avatarTemp]}>
                  <Text style={styles.avatarText}>📧</Text>
                </View>
                <View style={styles.identityInfo}>
                  <Text style={styles.identityName}>{identity.name}</Text>
                  <Text style={styles.identityEmail}>{identity.email}</Text>
                </View>
                <TouchableOpacity style={styles.copyButton}>
                  <Text style={styles.copyButtonText}>Copy</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createButtonText}>+ Create New Identity</Text>
        </TouchableOpacity>

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
    padding: 24,
    paddingBottom: 8,
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
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#9ca3af',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  identityCard: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  identityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarTemp: {
    backgroundColor: '#10b981',
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  identityInfo: {
    flex: 1,
    marginLeft: 12,
  },
  identityName: {
    color: '#f9fafb',
    fontSize: 16,
    fontWeight: '600',
  },
  identityEmail: {
    color: '#9ca3af',
    fontSize: 14,
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeActive: {
    backgroundColor: '#10b98120',
  },
  badgeText: {
    color: '#10b981',
    fontSize: 12,
    fontWeight: '600',
  },
  copyButton: {
    backgroundColor: '#374151',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  copyButtonText: {
    color: '#d1d5db',
    fontSize: 12,
    fontWeight: '600',
  },
  createButton: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#374151',
    borderStyle: 'dashed',
  },
  createButtonText: {
    color: '#6366f1',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomPadding: {
    height: 24,
  },
});