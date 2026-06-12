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
} from 'react-native';
import PasswordCard from '../components/PasswordCard';
import { PasswordEntry } from '../types';
import { loadPasswords, savePasswords } from '../utils/storage';
import { generatePassword, assessStrength } from '../utils/passwordGenerator';

export default function VaultScreen() {
  const [passwords, setPasswords] = useState<PasswordEntry[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  // Form state
  const [service, setService] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [has2FA, setHas2FA] = useState(false);

  useEffect(() => {
    loadPasswords().then(setPasswords);
  }, []);

  const handleGeneratePassword = useCallback(() => {
    const generated = generatePassword({ length: 20, uppercase: true, digits: true, symbols: true });
    setPassword(generated);
  }, []);

  const handleAdd = useCallback(async () => {
    if (!service.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Missing Fields', 'Please fill in the service name, email/username, and password.');
      return;
    }

    const now = new Date().toISOString();
    const entry: PasswordEntry = {
      id: Date.now().toString(),
      service: service.trim(),
      email: email.trim(),
      password,
      has2FA,
      strength: assessStrength(password),
      createdAt: now,
      updatedAt: now,
    };

    const updated = [entry, ...passwords];
    setPasswords(updated);
    await savePasswords(updated);

    // Reset form
    setService('');
    setEmail('');
    setPassword('');
    setHas2FA(false);
    setModalVisible(false);
  }, [service, email, password, has2FA, passwords]);

  const handleDelete = useCallback(async (id: string) => {
    Alert.alert(
      'Delete Entry',
      'Are you sure you want to remove this password?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const updated = passwords.filter(p => p.id !== id);
            setPasswords(updated);
            await savePasswords(updated);
          },
        },
      ]
    );
  }, [passwords]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Password Vault</Text>
          <Text style={styles.subtitle}>{passwords.length} password{passwords.length !== 1 ? 's' : ''} stored</Text>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {passwords.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🔐</Text>
            <Text style={styles.emptyTitle}>No passwords yet</Text>
            <Text style={styles.emptySubtitle}>Tap + to add your first entry</Text>
          </View>
        ) : (
          passwords.map((pw) => (
            <PasswordCard
              key={pw.id}
              id={pw.id}
              service={pw.service}
              email={pw.email}
              password={pw.password}
              has2FA={pw.has2FA}
              strength={pw.strength}
              onDelete={handleDelete}
            />
          ))
        )}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Add Password Modal */}
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
              <Text style={styles.modalTitle}>Add Password</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView keyboardShouldPersistTaps="handled">
              <Text style={styles.fieldLabel}>Service / Website</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Google, GitHub"
                placeholderTextColor="#6b7280"
                value={service}
                onChangeText={setService}
                autoCapitalize="words"
              />

              <Text style={styles.fieldLabel}>Email / Username</Text>
              <TextInput
                style={styles.input}
                placeholder="you@example.com"
                placeholderTextColor="#6b7280"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Text style={styles.fieldLabel}>Password</Text>
              <View style={styles.passwordRow}>
                <TextInput
                  style={[styles.input, styles.passwordInput]}
                  placeholder="Enter or generate"
                  placeholderTextColor="#6b7280"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={false}
                  autoCapitalize="none"
                />
                <TouchableOpacity style={styles.generateBtn} onPress={handleGeneratePassword}>
                  <Text style={styles.generateBtnText}>Generate</Text>
                </TouchableOpacity>
              </View>
              {password.length > 0 && (
                <Text style={[styles.strengthHint, { color: strengthColor(assessStrength(password)) }]}>
                  Strength: {assessStrength(password)}
                </Text>
              )}

              <TouchableOpacity
                style={[styles.toggle2FA, has2FA && styles.toggle2FAActive]}
                onPress={() => setHas2FA(v => !v)}
              >
                <Text style={styles.toggle2FAText}>
                  {has2FA ? '✓ 2FA Enabled' : '2FA Not Enabled — tap to toggle'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.saveButton} onPress={handleAdd}>
                <Text style={styles.saveButtonText}>Save Password</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

function strengthColor(s: 'strong' | 'medium' | 'weak'): string {
  if (s === 'strong') return '#10b981';
  if (s === 'medium') return '#f59e0b';
  return '#ef4444';
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
  emptyState: {
    alignItems: 'center',
    marginTop: 80,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    color: '#f9fafb',
    fontSize: 18,
    fontWeight: '600',
  },
  emptySubtitle: {
    color: '#9ca3af',
    fontSize: 14,
    marginTop: 8,
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
    maxHeight: '90%',
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
  passwordRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 4,
  },
  passwordInput: {
    flex: 1,
    marginBottom: 0,
  },
  generateBtn: {
    backgroundColor: '#4f46e5',
    borderRadius: 10,
    paddingHorizontal: 14,
    justifyContent: 'center',
  },
  generateBtnText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  strengthHint: {
    fontSize: 12,
    marginBottom: 16,
    marginTop: 4,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  toggle2FA: {
    backgroundColor: '#374151',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginBottom: 20,
  },
  toggle2FAActive: {
    backgroundColor: '#6366f120',
    borderWidth: 1,
    borderColor: '#6366f1',
  },
  toggle2FAText: {
    color: '#d1d5db',
    fontSize: 14,
    fontWeight: '500',
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
