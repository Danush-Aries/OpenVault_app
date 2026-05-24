import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface PasswordCardProps {
  service: string;
  email: string;
  has2FA: boolean;
  strength: 'strong' | 'medium' | 'weak';
}

export default function PasswordCard({ service, email, has2FA, strength }: PasswordCardProps) {
  const getStrengthColor = () => {
    switch (strength) {
      case 'strong': return '#10b981';
      case 'medium': return '#f59e0b';
      case 'weak': return '#ef4444';
    }
  };

  const getStrengthLabel = () => {
    switch (strength) {
      case 'strong': return 'Strong';
      case 'medium': return 'Medium';
      case 'weak': return 'Weak';
    }
  };

  const getServiceIcon = (serviceName: string) => {
    const icons: Record<string, string> = {
      Google: '🔍',
      GitHub: '🐙',
      Twitter: '🐦',
      Netflix: '🎬',
      Amazon: '📦',
    };
    return icons[serviceName] || '🔐';
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.serviceInfo}>
          <Text style={styles.icon}>{getServiceIcon(service)}</Text>
          <View>
            <Text style={styles.service}>{service}</Text>
            <Text style={styles.email}>{email}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.copyButton}>
          <Text style={styles.copyText}>Copy</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <View style={styles.badgeContainer}>
          {has2FA && (
            <View style={styles.badge2FA}>
              <Text style={styles.badge2FAText}>2FA</Text>
            </View>
          )}
          <View style={[styles.strengthBadge, { backgroundColor: getStrengthColor() + '20' }]}>
            <View style={[styles.strengthDot, { backgroundColor: getStrengthColor() }]} />
            <Text style={[styles.strengthText, { color: getStrengthColor() }]}>
              {getStrengthLabel()}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.viewButton}>
          <Text style={styles.viewButtonText}>View</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 32,
    marginRight: 12,
  },
  service: {
    color: '#f9fafb',
    fontSize: 16,
    fontWeight: '600',
  },
  email: {
    color: '#9ca3af',
    fontSize: 14,
    marginTop: 2,
  },
  copyButton: {
    backgroundColor: '#374151',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  copyText: {
    color: '#d1d5db',
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badgeContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  badge2FA: {
    backgroundColor: '#6366f120',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badge2FAText: {
    color: '#6366f1',
    fontSize: 12,
    fontWeight: '700',
  },
  strengthBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  strengthDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  strengthText: {
    fontSize: 12,
    fontWeight: '600',
  },
  viewButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  viewButtonText: {
    color: '#6366f1',
    fontSize: 14,
    fontWeight: '500',
  },
});