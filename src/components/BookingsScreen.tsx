import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Card, Badge, Button, Icon } from "./SharedUI";
import { COLORS } from "../theme";

export const BookingsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Bookings</Text>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            onPress={() => setActiveTab("upcoming")}
            style={[
              styles.tabButton,
              activeTab === "upcoming" ? styles.activeTab : styles.inactiveTab,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "upcoming"
                  ? styles.activeTabText
                  : styles.inactiveTabText,
              ]}
            >
              Upcoming
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab("past")}
            style={[
              styles.tabButton,
              activeTab === "past" ? styles.activeTab : styles.inactiveTab,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "past"
                  ? styles.activeTabText
                  : styles.inactiveTabText,
              ]}
            >
              History
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        {activeTab === "upcoming" ? (
          <>
            <Card style={styles.bookingCard}>
              <View style={styles.bookingHeader}>
                <Text style={styles.bookingHeaderText}>Confirmed Booking</Text>
                <Text style={styles.bookingId}>#BK-2938</Text>
              </View>
              <View style={styles.bookingBody}>
                <Text style={styles.bookingTitle}>Oil Change & Filter</Text>
                <Text style={styles.bookingSubtitle}>Toyota Camry • 2018</Text>

                <View style={styles.bookingDetails}>
                  <View style={styles.detailRow}>
                    <Icon name="Calendar" size={18} color={COLORS.revo.red} />
                    <Text style={styles.detailText}>Today, Oct 24</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Icon name="Clock" size={18} color={COLORS.revo.red} />
                    <Text style={styles.detailText}>2:00 PM - 3:00 PM</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Icon name="MapPin" size={18} color={COLORS.revo.red} />
                    <Text style={styles.detailText} numberOfLines={1}>
                      123 Mission St, San Francisco
                    </Text>
                  </View>
                </View>

                <View style={styles.actionButtons}>
                  <Button variant="outline" style={{ flex: 1 }}>
                    Reschedule
                  </Button>
                  <Button variant="primary" style={{ flex: 1 }}>
                    Track
                  </Button>
                </View>
              </View>
            </Card>

            <Card style={[styles.pendingCard, { opacity: 0.75 }]}>
              <View style={styles.cardHeader}>
                <Badge variant="warning">Pending</Badge>
                <Text style={styles.cardId}>#BK-3391</Text>
              </View>
              <Text style={styles.cardTitle}>Brake Inspection</Text>
              <Text style={styles.cardSubtitle}>Toyota Camry • 2018</Text>
              <View style={styles.cardDetails}>
                <View style={styles.detailRow}>
                  <Icon
                    name="Calendar"
                    size={16}
                    color={COLORS.revo.navy + "66"}
                  />
                  <Text style={styles.detailText}>Tomorrow, Oct 25</Text>
                </View>
              </View>
            </Card>
          </>
        ) : (
          <>
            <Card style={styles.historyCard}>
              <View style={styles.cardHeader}>
                <Badge variant="success">Completed</Badge>
                <Text style={styles.cardId}>#BK-1022</Text>
              </View>
              <Text style={styles.cardTitle}>Tire Rotation</Text>
              <Text style={styles.cardSubtitle}>Toyota Camry • 2018</Text>
              <View style={styles.historyFooter}>
                <Text style={styles.historyDate}>Sep 12, 2023</Text>
                <Text style={styles.historyPrice}>$45.00</Text>
              </View>
              <Button variant="ghost" style={styles.receiptButton}>
                <Text style={styles.receiptButtonText}>View Receipt</Text>
              </Button>
            </Card>

            <Card style={styles.historyCard}>
              <View style={styles.cardHeader}>
                <Badge variant="neutral">Cancelled</Badge>
                <Text style={styles.cardId}>#BK-0981</Text>
              </View>
              <Text style={styles.cardTitle}>Battery Replacement</Text>
              <Text style={styles.cardSubtitle}>Toyota Camry • 2018</Text>
              <View style={styles.historyFooter}>
                <Text style={styles.historyDate}>Aug 05, 2023</Text>
                <Text
                  style={[
                    styles.historyPrice,
                    { textDecorationLine: "line-through", opacity: 0.4 },
                  ]}
                >
                  $120.00
                </Text>
              </View>
            </Card>
          </>
        )}
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
    paddingTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.revo.creamDark + "80",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: COLORS.revo.navy,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.revo.creamDark,
    padding: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.revo.creamDark,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: COLORS.revo.navy,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  inactiveTab: {
    backgroundColor: "transparent",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  activeTabText: {
    color: "white",
  },
  inactiveTabText: {
    color: COLORS.revo.navy + "99",
  },
  content: {
    padding: 24,
    gap: 16,
  },
  bookingCard: {
    padding: 0,
    borderWidth: 2,
    borderColor: COLORS.revo.navy,
    overflow: "hidden",
    backgroundColor: "white",
  },
  bookingHeader: {
    backgroundColor: COLORS.revo.navy,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bookingHeaderText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  bookingId: {
    color: COLORS.revo.cream + "99",
    fontFamily: "monospace", // Or Platform.OS === 'ios' ? 'Courier' : 'monospace'
    fontSize: 12,
  },
  bookingBody: {
    padding: 20,
  },
  bookingTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: COLORS.revo.navy,
    marginBottom: 4,
  },
  bookingSubtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.revo.navy + "99",
    marginBottom: 20,
  },
  bookingDetails: {
    gap: 12,
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  detailText: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.revo.navy,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
  },
  pendingCard: {
    padding: 20,
    backgroundColor: "white",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  cardId: {
    fontSize: 12,
    color: COLORS.revo.navy + "66",
    fontWeight: "500",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.revo.navy,
  },
  cardSubtitle: {
    fontSize: 14,
    color: COLORS.revo.navy + "99",
    marginBottom: 16,
  },
  cardDetails: {
    gap: 8,
  },
  historyCard: {
    padding: 20,
    backgroundColor: "white",
  },
  historyFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  historyDate: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.revo.navy + "99",
  },
  historyPrice: {
    fontSize: 14,
    fontWeight: "900",
    color: COLORS.revo.navy,
  },
  receiptButton: {
    marginTop: 8,
    width: "100%",
    paddingVertical: 8,
  },
  receiptButtonText: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    color: COLORS.revo.navy,
  },
});
