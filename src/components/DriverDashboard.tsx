import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { Button, Card, Icon, Badge } from "./SharedUI";
import { Service, Mechanic } from "../types";
import { COLORS } from "../theme";

const SERVICES: Service[] = [
  {
    id: "1",
    title: "Oil Change",
    iconName: "Droplets",
    priceRange: "$50 - $90",
    duration: "45m",
  },
  {
    id: "2",
    title: "Brake Service",
    iconName: "Disc",
    priceRange: "$150 - $300",
    duration: "2h",
  },
  {
    id: "3",
    title: "Battery Replace",
    iconName: "Zap",
    priceRange: "$120 - $200",
    duration: "30m",
  },
  {
    id: "4",
    title: "Tire Rotation",
    iconName: "CircleDashed",
    priceRange: "$40 - $80",
    duration: "45m",
  },
];

const NEARBY_MECHANICS: Mechanic[] = [
  {
    id: "m1",
    name: "Mike S.",
    rating: 4.9,
    completedJobs: 342,
    isVerified: true,
    hourlyRate: 85,
    avatarUrl: "https://picsum.photos/100/100?random=1",
    distance: "2.3 mi",
  },
  {
    id: "m2",
    name: "Sarah J.",
    rating: 4.8,
    completedJobs: 120,
    isVerified: true,
    hourlyRate: 75,
    avatarUrl: "https://picsum.photos/100/100?random=2",
    distance: "3.1 mi",
  },
];

interface DriverDashboardProps {
  onAnalyzeImage: () => void;
}

export const DriverDashboard: React.FC<DriverDashboardProps> = ({
  onAnalyzeImage,
}) => {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.logoContainer}>
            <View style={styles.logoIcon}>
              <Icon name="Wrench" size={24} color={COLORS.revo.cream} />
            </View>
            <Text style={styles.logoText}>REVO</Text>
          </View>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: "https://picsum.photos/100/100?random=99" }}
              style={styles.profileImage}
            />
          </View>
        </View>

        <View style={styles.searchContainer}>
          <Icon
            name="Search"
            size={18}
            color={COLORS.revo.navy + "80"}
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="What service do you need?"
            placeholderTextColor={COLORS.revo.navy + "66"}
            style={styles.searchInput}
          />
        </View>
      </View>

      <View style={styles.content}>
        {/* Insurance / Promo Card */}
        <View style={styles.promoCard}>
          <View style={styles.promoContent}>
            <Text style={styles.promoTitle}>
              What our Revo{"\n"}Mechanics{"\n"}Should Know{"\n"}About Coverage
            </Text>
            <Text style={styles.promoText}>
              We provide liability protection for all REVO drivers and helpers.
              This built-in coverage gives both parties confidence.
            </Text>

            <View style={styles.promoItem}>
              <Icon name="ShieldCheck" size={18} color={COLORS.revo.red} />
              <Text style={styles.promoItemText}>
                Coverage when you're off-duty
              </Text>
            </View>
            <View style={styles.promoItem}>
              <Icon name="ShieldCheck" size={18} color={COLORS.revo.red} />
              <Text style={styles.promoItemText}>
                Coverage when you're online
              </Text>
            </View>
          </View>

          <View style={styles.promoIconBg}>
            <Icon name="Shield" size={160} color={COLORS.revo.cream + "1A"} />
          </View>
          <View style={styles.promoFooter}>
            <Text style={styles.promoFooterText}>
              IN APP{"\n"}
              <Text style={{ color: COLORS.revo.red }}>INSURANCE</Text>
            </Text>
          </View>
        </View>

        {/* AI Feature Banner */}
        <TouchableOpacity onPress={onAnalyzeImage} style={styles.aiBanner}>
          <View style={styles.aiIconBg}>
            <Icon name="Camera" size={24} color="white" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.aiTitle}>Snap & Diagnose</Text>
            <Text style={styles.aiSubtitle}>
              Use Gemini AI to identify car issues instantly.
            </Text>
          </View>
          <Icon name="ChevronRight" color={COLORS.revo.navy + "66"} />
        </TouchableOpacity>

        {/* Services Grid */}
        <View>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Services</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.servicesGrid}>
            {SERVICES.map((service) => (
              <Card key={service.id} style={styles.serviceCard}>
                <View style={styles.serviceIconBg}>
                  <Icon
                    name={service.iconName}
                    size={20}
                    color={COLORS.revo.navy}
                  />
                </View>
                <Text style={styles.serviceTitle}>{service.title}</Text>
                <Text style={styles.servicePrice}>{service.priceRange}</Text>
              </Card>
            ))}
          </View>
        </View>

        {/* Nearby Mechanics */}
        <View>
          <Text style={[styles.sectionTitle, { marginBottom: 16 }]}>
            Trusted Revivors
          </Text>
          <View style={{ gap: 16 }}>
            {NEARBY_MECHANICS.map((mechanic) => (
              <Card key={mechanic.id} style={styles.mechanicCard}>
                <Image
                  source={{ uri: mechanic.avatarUrl }}
                  style={styles.mechanicAvatar}
                />
                <View style={{ flex: 1 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <Text style={styles.mechanicName}>{mechanic.name}</Text>
                        {mechanic.isVerified && (
                          <Badge variant="blue">Elite</Badge>
                        )}
                      </View>
                      <View style={styles.ratingContainer}>
                        <Icon name="Star" size={12} color={COLORS.revo.navy} />
                        <Text style={styles.ratingText}>{mechanic.rating}</Text>
                        <Text style={styles.ratingText}>
                          ({mechanic.completedJobs} reviews)
                        </Text>
                      </View>
                      <Text style={styles.distanceText}>
                        {mechanic.distance} • 302 tasks overall
                      </Text>
                    </View>
                    <View style={{ alignItems: "flex-end" }}>
                      <Text style={styles.hourlyRate}>
                        ${mechanic.hourlyRate}
                      </Text>
                      <Text style={styles.perHour}>Per Hour</Text>
                    </View>
                  </View>
                </View>
              </Card>
            ))}
          </View>
        </View>

        {/* Active Booking Teaser */}
        <View style={styles.bookingTeaser}>
          <View style={{ padding: 32 }}>
            <Button
              variant="secondary"
              fullWidth
              style={{ paddingVertical: 16 }}
            >
              <Text style={{ fontSize: 18, fontWeight: "900" }}>
                Book a Revivor Today
              </Text>
            </Button>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 100, // Space for tab bar
    backgroundColor: COLORS.revo.cream,
  },
  header: {
    backgroundColor: COLORS.revo.cream,
    paddingHorizontal: 24,
    paddingTop: 20, // SafeArea handled by parent or SafeAreaView
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.revo.creamDark + "4D", // 30% opacity
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logoIcon: {
    backgroundColor: COLORS.revo.navy,
    padding: 8,
    borderRadius: 8,
  },
  logoText: {
    fontSize: 24,
    fontWeight: "900",
    color: COLORS.revo.navy,
    letterSpacing: -1,
  },
  profileImageContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.revo.navy,
    padding: 2,
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  searchContainer: {
    position: "relative",
    justifyContent: "center",
  },
  searchIcon: {
    position: "absolute",
    left: 12,
    zIndex: 1,
  },
  searchInput: {
    width: "100%",
    backgroundColor: "white",
    paddingLeft: 40,
    paddingRight: 16,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.revo.creamDark,
    color: COLORS.revo.navy,
    fontSize: 14,
    fontWeight: "500",
  },
  content: {
    padding: 24,
    gap: 32,
  },
  promoCard: {
    backgroundColor: COLORS.revo.navy,
    borderRadius: 16,
    padding: 24,
    position: "relative",
    overflow: "hidden",
  },
  promoContent: {
    position: "relative",
    zIndex: 10,
  },
  promoTitle: {
    fontSize: 24,
    fontWeight: "900",
    textTransform: "uppercase",
    color: COLORS.revo.cream,
    lineHeight: 24,
    marginBottom: 16,
  },
  promoText: {
    fontSize: 14,
    color: COLORS.revo.cream + "E6", // 90%
    fontWeight: "500",
    lineHeight: 20,
    marginBottom: 24,
    maxWidth: "70%",
  },
  promoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  promoItemText: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.revo.cream,
  },
  promoIconBg: {
    position: "absolute",
    right: -20,
    bottom: -20,
  },
  promoFooter: {
    position: "absolute",
    right: 16,
    bottom: 16,
  },
  promoFooterText: {
    textAlign: "right",
    fontWeight: "900",
    fontSize: 20,
    lineHeight: 20,
    color: COLORS.revo.cream,
  },
  aiBanner: {
    backgroundColor: COLORS.revo.light,
    borderWidth: 2,
    borderColor: COLORS.revo.navy + "1A",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  aiIconBg: {
    backgroundColor: COLORS.revo.red,
    padding: 12,
    borderRadius: 12,
  },
  aiTitle: {
    fontWeight: "bold",
    color: COLORS.revo.navy,
    fontSize: 16,
  },
  aiSubtitle: {
    fontSize: 12,
    color: COLORS.revo.navy + "99",
    fontWeight: "500",
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: "bold",
    color: COLORS.revo.navy,
    fontSize: 18,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  viewAll: {
    color: COLORS.revo.red,
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  serviceCard: {
    width: "47%", // Approximate for 2 columns with gap
    padding: 16,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "transparent",
  },
  serviceIconBg: {
    height: 40,
    width: 40,
    borderRadius: 8,
    backgroundColor: COLORS.revo.cream,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  serviceTitle: {
    fontWeight: "bold",
    color: COLORS.revo.navy,
    fontSize: 16,
  },
  servicePrice: {
    fontSize: 12,
    fontWeight: "bold",
    color: COLORS.revo.navy + "80",
    marginTop: 4,
  },
  mechanicCard: {
    padding: 20,
    flexDirection: "row",
    gap: 16,
    alignItems: "flex-start",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: COLORS.revo.creamDark,
  },
  mechanicAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: COLORS.revo.creamDark,
  },
  mechanicName: {
    fontWeight: "bold",
    color: COLORS.revo.navy,
    fontSize: 18,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.revo.navy + "99",
  },
  distanceText: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.revo.navy + "66",
    marginTop: 4,
  },
  hourlyRate: {
    fontWeight: "bold",
    color: COLORS.revo.navy,
    fontSize: 18,
  },
  perHour: {
    fontSize: 10,
    fontWeight: "bold",
    color: COLORS.revo.navy + "66",
    textTransform: "uppercase",
  },
  bookingTeaser: {
    backgroundColor: COLORS.revo.navy,
    borderRadius: 40,
    marginTop: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
});
