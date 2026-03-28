import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { UserRole, Screen } from "./src/types";
import { DriverDashboard } from "./src/components/DriverDashboard";
import { MechanicDashboard } from "./src/components/MechanicDashboard";
import { AIChatBot } from "./src/components/AIChatBot";
import { ImageAnalyzer } from "./src/components/ImageAnalyzer";
import { MessagesScreen } from "./src/components/MessagesScreen";
import { BookingsScreen } from "./src/components/BookingsScreen";
import { ProfileScreen } from "./src/components/ProfileScreen";
import { Icon } from "./src/components/SharedUI";
import { COLORS } from "./src/theme";

function AppContent() {
  const insets = useSafeAreaInsets();
  const [userRole, setUserRole] = useState<UserRole>(UserRole.DRIVER);
  const [currentScreen, setCurrentScreen] = useState<Screen>(
    Screen.DRIVER_HOME
  );
  const [showImageAnalyzer, setShowImageAnalyzer] = useState(false);

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.DRIVER_HOME:
        return (
          <DriverDashboard onAnalyzeImage={() => setShowImageAnalyzer(true)} />
        );
      case Screen.MECHANIC_HOME:
        return <MechanicDashboard />;
      case Screen.MESSAGES:
        return <MessagesScreen />;
      case Screen.BOOKINGS:
        return <BookingsScreen />;
      case Screen.PROFILE:
        return <ProfileScreen role={userRole} />;
      default:
        return (
          <DriverDashboard onAnalyzeImage={() => setShowImageAnalyzer(true)} />
        );
    }
  };

  const TabBar = () => {
    const isActive = (screen: Screen) => currentScreen === screen;
    const isHomeActive =
      currentScreen === Screen.DRIVER_HOME ||
      currentScreen === Screen.MECHANIC_HOME;

    return (
      <View
        style={[
          styles.tabBar,
          { paddingBottom: insets.bottom > 0 ? insets.bottom : 16 },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            setCurrentScreen(
              userRole === UserRole.DRIVER
                ? Screen.DRIVER_HOME
                : Screen.MECHANIC_HOME
            );
          }}
          style={styles.tabItem}
        >
          <Icon
            name="Home"
            size={24}
            color={isHomeActive ? COLORS.revo.red : COLORS.revo.navy + "99"}
            style={{ marginBottom: 4 }}
          />
          <Text
            style={[
              styles.tabLabel,
              {
                color: isHomeActive ? COLORS.revo.red : COLORS.revo.navy + "99",
              },
            ]}
          >
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setCurrentScreen(Screen.MESSAGES)}
          style={styles.tabItem}
        >
          <Icon
            name="MessageSquare"
            size={24}
            color={
              isActive(Screen.MESSAGES)
                ? COLORS.revo.red
                : COLORS.revo.navy + "99"
            }
            style={{ marginBottom: 4 }}
          />
          <Text
            style={[
              styles.tabLabel,
              {
                color: isActive(Screen.MESSAGES)
                  ? COLORS.revo.red
                  : COLORS.revo.navy + "99",
              },
            ]}
          >
            Messages
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setCurrentScreen(Screen.BOOKINGS)}
          style={styles.tabItem}
        >
          <Icon
            name="Wrench"
            size={24}
            color={
              isActive(Screen.BOOKINGS)
                ? COLORS.revo.red
                : COLORS.revo.navy + "99"
            }
            style={{ marginBottom: 4 }}
          />
          <Text
            style={[
              styles.tabLabel,
              {
                color: isActive(Screen.BOOKINGS)
                  ? COLORS.revo.red
                  : COLORS.revo.navy + "99",
              },
            ]}
          >
            Bookings
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setCurrentScreen(Screen.PROFILE)}
          style={styles.tabItem}
        >
          <Icon
            name="User"
            size={24}
            color={
              isActive(Screen.PROFILE)
                ? COLORS.revo.red
                : COLORS.revo.navy + "99"
            }
            style={{ marginBottom: 4 }}
          />
          <Text
            style={[
              styles.tabLabel,
              {
                color: isActive(Screen.PROFILE)
                  ? COLORS.revo.red
                  : COLORS.revo.navy + "99",
              },
            ]}
          >
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const DemoRoleSwitcher = () => (
    <TouchableOpacity
      onPress={() => {
        const newRole =
          userRole === UserRole.DRIVER ? UserRole.MECHANIC : UserRole.DRIVER;
        setUserRole(newRole);
        setCurrentScreen(
          newRole === UserRole.DRIVER
            ? Screen.DRIVER_HOME
            : Screen.MECHANIC_HOME
        );
      }}
      style={[styles.roleSwitcher, { top: insets.top + 8 }]}
    >
      <Text style={styles.roleSwitcherText}>
        Switch to {userRole === UserRole.DRIVER ? "Mechanic" : "Driver"}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.revo.cream} />

      {/* Main Content */}
      <View style={{ flex: 1, paddingTop: insets.top }}>{renderScreen()}</View>

      {/* Navigation */}
      <TabBar />

      {/* Floating Elements */}
      <DemoRoleSwitcher />
      <AIChatBot />

      {/* Modals */}
      {showImageAnalyzer && (
        <ImageAnalyzer onClose={() => setShowImageAnalyzer(false)} />
      )}
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.revo.cream,
  },
  tabBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.revo.cream,
    borderTopWidth: 2,
    borderTopColor: COLORS.revo.navy,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
  },
  tabItem: {
    alignItems: "center",
    width: 64,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  roleSwitcher: {
    position: "absolute",
    right: 16,
    backgroundColor: COLORS.revo.navy,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    opacity: 0.8,
    zIndex: 100,
    borderWidth: 1,
    borderColor: COLORS.revo.cream,
  },
  roleSwitcherText: {
    color: COLORS.revo.cream,
    fontSize: 10,
    fontWeight: "bold",
  },
});
