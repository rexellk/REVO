import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Card, Button, Icon, Badge } from "./SharedUI";
import { COLORS } from "../theme";

const EARNINGS_DATA = [
  { day: "Mon", amount: 120 },
  { day: "Tue", amount: 250 },
  { day: "Wed", amount: 180 },
  { day: "Thu", amount: 320 },
  { day: "Fri", amount: 290 },
  { day: "Sat", amount: 450 },
  { day: "Sun", amount: 150 },
];

export const MechanicDashboard: React.FC = () => {
  const maxAmount = Math.max(...EARNINGS_DATA.map((d) => d.amount));

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>Dashboard</Text>
            <Text style={styles.headerSubtitle}>Welcome back, Mike</Text>
          </View>
          <View style={styles.statusBadge}>
            <View style={styles.statusDotContainer}>
              <View style={styles.statusDotPing} />
              <View style={styles.statusDot} />
            </View>
            <Text style={styles.statusText}>Online</Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        {/* Stats Row */}
        <View style={styles.statsRow}>
          <Card
            style={[
              styles.statCard,
              { backgroundColor: COLORS.revo.navy, borderWidth: 0 },
            ]}
          >
            <View style={[styles.statHeader, { opacity: 0.8 }]}>
              <Icon name="DollarSign" size={16} color="white" />
              <Text style={[styles.statLabel, { color: "white" }]}>
                Weekly Earnings
              </Text>
            </View>
            <Text style={[styles.statValue, { color: "white" }]}>$1,760</Text>
          </Card>
          <Card style={styles.statCard}>
            <View style={styles.statHeader}>
              <Icon name="Wrench" size={16} color={COLORS.revo.navy + "99"} />
              <Text style={styles.statLabel}>Jobs Completed</Text>
            </View>
            <Text style={styles.statValue}>12</Text>
          </Card>
        </View>

        {/* Chart */}
        <Card style={styles.chartCard}>
          <Text style={styles.chartTitle}>Earnings Overview</Text>
          <View style={styles.chartContainer}>
            {EARNINGS_DATA.map((item, index) => (
              <View key={index} style={styles.barContainer}>
                <View style={styles.barTrack}>
                  <View
                    style={[
                      styles.bar,
                      { height: `${(item.amount / maxAmount) * 100}%` },
                    ]}
                  />
                </View>
                <Text style={styles.barLabel}>{item.day}</Text>
              </View>
            ))}
          </View>
        </Card>

        {/* New Job Request */}
        <View>
          <Text style={styles.sectionTitle}>New Requests (1)</Text>
          <Card style={styles.requestCard}>
            <View style={styles.requestHeader}>
              <Text style={styles.requestHeaderText}>Incoming Request</Text>
              <View style={styles.timerBadge}>
                <Text style={styles.timerText}>Respond in 04:59</Text>
              </View>
            </View>
            <View style={styles.requestBody}>
              <View style={styles.requestInfo}>
                <View>
                  <Text style={styles.jobTitle}>Brake Pad Replacement</Text>
                  <Text style={styles.carInfo}>
                    2018 Honda Civic • 45k miles
                  </Text>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <Text style={styles.price}>$185</Text>
                  <Text style={styles.priceLabel}>Est. Earnings</Text>
                </View>
              </View>

              <View style={styles.locationBox}>
                <Icon
                  name="MapPin"
                  size={16}
                  color={COLORS.revo.red}
                  style={{ marginTop: 2 }}
                />
                <View>
                  <Text style={styles.address}>
                    123 Mission St, San Francisco
                  </Text>
                  <Text style={styles.distance}>2.4 miles away</Text>
                </View>
              </View>

              <View style={styles.actionButtons}>
                <Button variant="outline" style={{ flex: 1 }}>
                  Decline
                </Button>
                <Button variant="primary" style={{ flex: 1 }}>
                  Accept Job
                </Button>
              </View>
            </View>
          </Card>
        </View>

        {/* Schedule */}
        <View>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Schedule</Text>
            <Icon name="Calendar" size={18} color={COLORS.revo.navy + "66"} />
          </View>
          <View style={{ gap: 12 }}>
            <View style={styles.scheduleItem}>
              <View style={styles.timeColumn}>
                <Text style={styles.timeText}>2:00</Text>
                <Text style={styles.ampmText}>PM</Text>
              </View>
              <Card
                style={[
                  styles.scheduleCard,
                  { borderLeftColor: COLORS.revo.red },
                ]}
              >
                <Text style={styles.scheduleTitle}>
                  Oil Change & Inspection
                </Text>
                <Text style={styles.scheduleSubtitle}>
                  Toyota Camry • Sarah J.
                </Text>
              </Card>
            </View>
            <View style={[styles.scheduleItem, { opacity: 0.5 }]}>
              <View style={styles.timeColumn}>
                <Text style={styles.timeText}>4:30</Text>
                <Text style={styles.ampmText}>PM</Text>
              </View>
              <Card
                style={[
                  styles.scheduleCard,
                  { borderLeftColor: COLORS.revo.navy },
                ]}
              >
                <Text style={styles.scheduleTitle}>Battery Replacement</Text>
                <Text style={styles.scheduleSubtitle}>
                  Ford F-150 • Mike T.
                </Text>
              </Card>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,
    backgroundColor: COLORS.revo.cream,
  },
  header: {
    backgroundColor: COLORS.revo.cream,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.revo.creamDark + "80",
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: COLORS.revo.navy,
    textTransform: "uppercase",
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.revo.navy + "99",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: COLORS.revo.creamDark,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusDotContainer: {
    width: 10,
    height: 10,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  statusDotPing: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 5,
    backgroundColor: "#4ade80", // green-400
    opacity: 0.75,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.success,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "bold",
    color: COLORS.revo.navy,
    textTransform: "uppercase",
  },
  content: {
    padding: 24,
    gap: 24,
  },
  statsRow: {
    flexDirection: "row",
    gap: 16,
  },
  statCard: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  statHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    color: COLORS.revo.navy + "99",
  },
  statValue: {
    fontSize: 30,
    fontWeight: "bold",
    color: COLORS.revo.navy,
  },
  chartCard: {
    padding: 24,
    height: 256,
    backgroundColor: "white",
  },
  chartTitle: {
    fontWeight: "bold",
    color: COLORS.revo.navy,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  chartContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingBottom: 8,
  },
  barContainer: {
    alignItems: "center",
    flex: 1,
    height: "100%",
    justifyContent: "flex-end",
    gap: 8,
  },
  barTrack: {
    width: 20,
    height: "85%",
    justifyContent: "flex-end",
    backgroundColor: "transparent",
  },
  bar: {
    width: "100%",
    backgroundColor: COLORS.revo.navy,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  barLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: COLORS.revo.navy,
  },
  sectionTitle: {
    fontWeight: "bold",
    color: COLORS.revo.navy,
    fontSize: 16,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  requestCard: {
    padding: 0,
    borderWidth: 2,
    borderColor: COLORS.revo.navy,
    overflow: "hidden",
    backgroundColor: "white",
  },
  requestHeader: {
    backgroundColor: COLORS.revo.navy,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  requestHeaderText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  timerBadge: {
    backgroundColor: "white",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  timerText: {
    fontSize: 12,
    fontWeight: "bold",
    color: COLORS.revo.red,
  },
  requestBody: {
    padding: 20,
  },
  requestInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  jobTitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: COLORS.revo.navy,
  },
  carInfo: {
    color: COLORS.revo.navy + "99",
    fontWeight: "500",
    fontSize: 14,
  },
  price: {
    fontWeight: "bold",
    fontSize: 20,
    color: COLORS.success,
  },
  priceLabel: {
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: COLORS.revo.navy + "66",
  },
  locationBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginBottom: 24,
    backgroundColor: COLORS.revo.cream,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.revo.creamDark,
  },
  address: {
    fontSize: 14,
    color: COLORS.revo.navy,
  },
  distance: {
    fontSize: 12,
    color: COLORS.revo.navy + "99",
    fontWeight: "500",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  scheduleItem: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  timeColumn: {
    width: 48,
    alignItems: "center",
  },
  timeText: {
    fontSize: 12,
    fontWeight: "bold",
    color: COLORS.revo.navy,
  },
  ampmText: {
    fontSize: 12,
    color: COLORS.revo.navy + "66",
    fontWeight: "bold",
  },
  scheduleCard: {
    flex: 1,
    padding: 16,
    borderLeftWidth: 4,
    backgroundColor: "white",
  },
  scheduleTitle: {
    fontWeight: "bold",
    fontSize: 14,
    color: COLORS.revo.navy,
  },
  scheduleSubtitle: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.revo.navy + "99",
  },
});
