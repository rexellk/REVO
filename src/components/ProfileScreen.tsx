import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { UserRole } from "../types";
import { Card, Button, Icon } from "./SharedUI";
import { COLORS } from "../theme";

interface ProfileScreenProps {
  role: UserRole;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ role }) => {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={styles.profileInfo}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: "https://picsum.photos/200/200?random=99" }}
              style={styles.avatar}
            />
          </View>
          <Text style={styles.name}>
            {role === UserRole.DRIVER ? "Alex Thompson" : "Mike Stevenson"}
          </Text>
          <Text style={styles.role}>
            {role === UserRole.DRIVER
              ? "Premium Member"
              : "Master Mechanic • ASE Certified"}
          </Text>
          <View style={styles.editButtonContainer}>
            <Button variant="outline" style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </Button>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        {role === UserRole.MECHANIC && (
          <Card style={styles.verificationCard}>
            <View style={styles.verificationContent}>
              <View style={styles.shieldContainer}>
                <Icon name="Shield" size={20} color="white" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.verificationTitle}>
                  Verification Status
                </Text>
                <Text style={styles.verificationSubtitle}>
                  Verified • Level 3
                </Text>
              </View>
            </View>
          </Card>
        )}

        <View>
          <Text style={styles.sectionTitle}>
            {role === UserRole.DRIVER ? "My Garage" : "Professional"}
          </Text>
          <Card style={styles.menuCard}>
            {role === UserRole.DRIVER ? (
              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  <Icon name="Car" size={20} color={COLORS.revo.navy + "99"} />
                  <Text style={styles.menuItemText}>My Vehicles</Text>
                </View>
                <Icon
                  name="ChevronRight"
                  size={18}
                  color={COLORS.revo.navy + "4D"}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  <Icon
                    name="FileText"
                    size={20}
                    color={COLORS.revo.navy + "99"}
                  />
                  <Text style={styles.menuItemText}>Certifications</Text>
                </View>
                <Icon
                  name="ChevronRight"
                  size={18}
                  color={COLORS.revo.navy + "4D"}
                />
              </TouchableOpacity>
            )}
            <View style={styles.divider} />
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <Icon
                  name="CreditCard"
                  size={20}
                  color={COLORS.revo.navy + "99"}
                />
                <Text style={styles.menuItemText}>Payment Methods</Text>
              </View>
              <Icon
                name="ChevronRight"
                size={18}
                color={COLORS.revo.navy + "4D"}
              />
            </TouchableOpacity>
          </Card>
        </View>

        <View>
          <Text style={styles.sectionTitle}>Account</Text>
          <Card style={styles.menuCard}>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <Icon
                  name="Settings"
                  size={20}
                  color={COLORS.revo.navy + "99"}
                />
                <Text style={styles.menuItemText}>Settings</Text>
              </View>
              <Icon
                name="ChevronRight"
                size={18}
                color={COLORS.revo.navy + "4D"}
              />
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <Icon name="LogOut" size={20} color={COLORS.revo.red} />
                <Text style={[styles.menuItemText, { color: COLORS.revo.red }]}>
                  Log Out
                </Text>
              </View>
            </TouchableOpacity>
          </Card>
        </View>

        <Text style={styles.versionText}>Version 2.4.0 (Build 2039)</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,
    backgroundColor: COLORS.revo.cream,
    minHeight: "100%",
  },
  header: {
    backgroundColor: COLORS.revo.cream,
    padding: 24,
    paddingBottom: 32,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.revo.creamDark + "80",
  },
  profileInfo: {
    alignItems: "center",
  },
  avatarContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: COLORS.revo.creamDark,
    marginBottom: 16,
    borderWidth: 4,
    borderColor: "white",
    padding: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 48,
  },
  name: {
    fontSize: 24,
    fontWeight: "900",
    color: COLORS.revo.navy,
    marginBottom: 4,
  },
  role: {
    color: COLORS.revo.navy + "99",
    fontWeight: "500",
    fontSize: 14,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  editButtonContainer: {
    flexDirection: "row",
  },
  editButton: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    backgroundColor: "white",
    height: "auto",
  },
  editButtonText: {
    fontSize: 12,
    fontWeight: "bold",
    color: COLORS.revo.navy,
    textTransform: "uppercase",
  },
  content: {
    padding: 24,
    gap: 24,
  },
  verificationCard: {
    padding: 16,
    backgroundColor: COLORS.revo.navy,
    borderWidth: 0,
  },
  verificationContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  shieldContainer: {
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 8,
    borderRadius: 20,
  },
  verificationTitle: {
    fontWeight: "bold",
    color: "white",
    fontSize: 16,
  },
  verificationSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "900",
    color: COLORS.revo.navy + "66",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 12,
    marginLeft: 4,
  },
  menuCard: {
    padding: 0,
    backgroundColor: "white",
    overflow: "hidden",
  },
  menuItem: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  menuItemText: {
    fontWeight: "bold",
    color: COLORS.revo.navy,
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.revo.creamDark + "80",
  },
  versionText: {
    textAlign: "center",
    fontSize: 10,
    fontWeight: "bold",
    color: COLORS.revo.navy + "4D",
    marginTop: 8,
    textTransform: "uppercase",
    letterSpacing: 2,
  },
});
