import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Clipboard,
} from 'react-native';
import { Identity } from '../types';
import { loadIdentities, saveIdentities } from '../utils/storage';

export default function IdentityScreen() {
  const [identities, setIdentities] = useState<Identity[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newType, setNewType] = useState<'email' | 'temp-email'>('email');

  useEffect(() => {
    loadIdentities().then(setIdentities);
  }, []);

  const handleCopy = useCallback((email: string) => {
    Clipboard.setString(email);
    Alert.alert('Copied', `"${email}" copied to clipboard.`);
  }, []);

  const handleCreate = useCallback(async () => {
    if (!newName.trim() || !newEmail.trim()) {
      Alert.alert('Missing Fields', 'Please enter both a name and email address.');
      return;
    }

    const identity: Identity = {
      id: Date.now().toString(),
      name: newName.trim(),
      email: newEmail.trim(),
      type: newType,
      status: 'active',
      createdAt: new Date().toISOString(),
    };

    const updated = [...identities, identity];
    setIdentities(updated);
    await saveIdentities(updated);

    setNewName('');
    setNewEmail('');
    setNewType('email');
    setModalVisible(false);
  }, [newName, newEmail, newType, identities]);

  const handleDelete = useCallback(async (id: string) => {
    Alert.alert(
      'Remove Identity',
      'Are you sure you want to remove this identity?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            const updated = identities.filter(i => i.id !== id);
            setIdentities(updated);
            await saveIdentities(updated);
          },
        },
      ]
    );
  }, [identities]);

  const personas = identities.filter(i => i.type === 'email');
  const tempEmails = identities.filter(i => i.type === 'temp-email');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Identities</Text>
        <Text style={styles.subtitle}>Manage your personas & temp emails</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Personas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personas</Text>
          {personas.length === 0 ? (
            <Text style={styles.emptyText}>No personas yet</Text>
          ) : (
            personas.map((identity) => (
              <TouchableOpacity
                key={identity.id}
                style={styles.identityCard}
                onLongPress={() => handleDelete(identity.id)}
                delayLongPress={600}
              >
                <View style={styles.identityHeader}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{identity.name.charAt(0).toUpperCase()}</Text>
                  </View>
                  <View style={styles.identityInfo}>
                    <Text style={styles.identityName}>{identity.name}</Text>
                    <Text style={styles.identityEmail}>{identity.email}</Text>
                  </View>
                  <View style={[styles.badge, styles.badgeActive]}>
                    <Text style={styles.badgeText}>Active</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>

        {/* Temp Emails */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Temporary Emails</Text>
          {tempEmails.length === 0 ? (
            <Text style={styles.emptyText}>No temp emails yet</Text>
          ) : (
            tempEmails.map((identity) => (
              <TouchableOpacity
                key={identity.id}
                style={styles.identityCard}
                onLongPress={() => handleDelete(identity.id)}
                delayLongPress={600}
              >
                <View style={styles.identityHeader}>
                  <View style={[styles.avatar, styles.avatarTemp]}>
                    <Text style={styles.avatarText}>📧</Text>
                  </View>
                  <View style={styles.identityInfo}>
                    <Text style={styles.identityName}>{identity.name}</Text>
                    <Text style={styles.identityEmail}>{identity.email}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.copyButton}
                    onPress={() => handleCopy(identity.email)}
                  >
                    <Text style={styles.copyButtonText}>Copy</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>

        <TouchableOpacity style={styles.createButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.createButtonText}>+ Create New Identity</Text>
        </TouchableOpacity>

        <Text style={styles.hint}>Long-press any identity to remove it</Text>

        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Create Identity Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <View style={styles.modalSheet}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>New Identity</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.fieldLabel}>Display Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Shopping, Work"
              placeholderTextColor="#6b7280"
              value={newName}
              onChangeText={setNewName}
              autoCapitalize="words"
            />

            <Text style={styles.fieldLabel}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="alias@example.com"
              placeholderTextColor="#6b7280"
              value={newEmail}
              onChangeText={setNewEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.fieldLabel}>Type</Text>
            <View style={styles.typeRow}>
              <TouchableOpacity
                style={[styles.typeBtn, newType === 'email' && styles.typeBtnActive]}
                onPress={() => setNewType('email')}
              >
                <Text style={[styles.typeBtnText, newType === 'email' && styles.typeBtnTextActive]}>
                  Persona
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.typeBtn, newType === 'temp-email' && styles.typeBtnActive]}
                onPress={() => setNewType('temp-email')}
              >
                <Text style={[styles.typeBtnText, newType === 'temp-email' && styles.typeBtnTextActive]}>
                  Temp Email
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleCreate}>
              <Text style={styles.saveButtonText}>Create Identity</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
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
    marginTop: 16,
  },
  sectionTitle: {
    color: '#9ca3af',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  emptyText: {
    color: '#4b5563',
    fontSize: 14,
    fontStyle: 'italic',
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
  hint: {
    color: '#4b5563',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
  },
  bottomPadding: {
    height: 24,
  },
  // Modal
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalSheet: {
    backgroundColor: '#1f2937',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    color: '#f9fafb',
    fontSize: 20,
    fontWeight: '700',
  },
  modalClose: {
    color: '#9ca3af',
    fontSize: 20,
  },
  fieldLabel: {
    color: '#9ca3af',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#374151',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#f9fafb',
    fontSize: 16,
    marginBottom: 16,
  },
  typeRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  typeBtn: {
    flex: 1,
    backgroundColor: '#374151',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
  },
  typeBtnActive: {
    backgroundColor: '#6366f120',
    borderWidth: 1,
    borderColor: '#6366f1',
  },
  typeBtnText: {
    color: '#9ca3af',
    fontSize: 14,
    fontWeight: '600',
  },
  typeBtnTextActive: {
    color: '#6366f1',
  },
  saveButton: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
