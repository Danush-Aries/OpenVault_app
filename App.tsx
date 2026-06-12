import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './screens/HomeScreen';
import VaultScreen from './screens/VaultScreen';
import IdentityScreen from './screens/IdentityScreen';
import ThreatScreen from './screens/ThreatScreen';

const Tab = createBottomTabNavigator();

function TabIcon({ name, focused }: { name: string; focused: boolean }) {
  const icons: Record<string, string> = {
    Home: '🏠',
    Vault: '🔐',
    Identity: '🎭',
    Threats: '🛡️',
  };
  return (
    <View style={styles.iconContainer}>
      <Text style={[styles.icon, focused && styles.iconFocused]}>
        {icons[name] || '•'}
      </Text>
    </View>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => (
              <TabIcon name={route.name} focused={focused} />
            ),
            tabBarActiveTintColor: '#6366f1',
            tabBarInactiveTintColor: '#9ca3af',
            tabBarStyle: styles.tabBar,
            tabBarLabelStyle: styles.tabLabel,
            headerStyle: styles.header,
            headerTitleStyle: styles.headerTitle,
          })}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Dashboard' }}
          />
          <Tab.Screen
            name="Vault"
            component={VaultScreen}
            options={{ title: 'Password Vault' }}
          />
          <Tab.Screen
            name="Identity"
            component={IdentityScreen}
            options={{ title: 'Identities' }}
          />
          <Tab.Screen
            name="Threats"
            component={ThreatScreen}
            options={{ title: 'Threat Monitor' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#1f2937',
    borderTopColor: '#374151',
    borderTopWidth: 1,
    paddingTop: 8,
    paddingBottom: 8,
    height: 70,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 24,
    opacity: 0.6,
  },
  iconFocused: {
    opacity: 1,
  },
  header: {
    backgroundColor: '#1f2937',
    shadowColor: 'transparent',
    elevation: 0,
  },
  headerTitle: {
    color: '#f9fafb',
    fontSize: 20,
    fontWeight: '700',
  },
});
