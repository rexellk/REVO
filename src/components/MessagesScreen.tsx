import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Icon } from "./SharedUI";
import { COLORS } from "../theme";

export const MessagesScreen: React.FC = () => {
  const messages = [
    {
      id: 1,
      name: "Mike S.",
      role: "Mechanic",
      avatar: "https://picsum.photos/100/100?random=1",
      lastMessage:
        "I'm about 10 minutes away. Traffic is a bit heavy on Main St.",
      time: "2m ago",
      unread: 2,
      isOnline: true,
    },
    {
      id: 2,
      name: "Sarah Jenkins",
      role: "Service Advisor",
      avatar: "https://picsum.photos/100/100?random=2",
      lastMessage: "Did the oil change solve the noise issue you were hearing?",
      time: "1d ago",
      unread: 0,
      isOnline: false,
    },
    {
      id: 3,
      name: "Revo Support",
      role: "Support",
      avatar: "https://picsum.photos/100/100?random=3",
      lastMessage: "Your refund for the cancelled booking has been processed.",
      time: "3d ago",
      unread: 0,
      isOnline: false,
    },
  ];

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <View style={styles.searchContainer}>
          <Icon
            name="Search"
            size={18}
            color={COLORS.revo.navy + "66"}
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search conversations..."
            placeholderTextColor={COLORS.revo.navy + "4D"}
            style={styles.searchInput}
          />
        </View>
      </View>

      <View style={styles.listContainer}>
        {messages.map((msg) => (
          <TouchableOpacity key={msg.id} style={styles.messageItem}>
            <View style={styles.avatarContainer}>
              <Image source={{ uri: msg.avatar }} style={styles.avatar} />
              {msg.isOnline && <View style={styles.onlineIndicator} />}
            </View>
            <View style={styles.messageContent}>
              <View style={styles.messageHeader}>
                <Text numberOfLines={1} style={styles.name}>
                  {msg.name}
                </Text>
                <Text style={styles.time}>{msg.time}</Text>
              </View>
              <Text
                numberOfLines={1}
                style={[
                  styles.lastMessage,
                  msg.unread > 0 ? styles.unreadMessage : styles.readMessage,
                ]}
              >
                {msg.lastMessage}
              </Text>
            </View>
            {msg.unread > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadText}>{msg.unread}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
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
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.revo.creamDark,
    color: COLORS.revo.navy,
    fontSize: 14,
    fontWeight: "500",
  },
  listContainer: {
    paddingHorizontal: 8,
  },
  messageItem: {
    padding: 16,
    flexDirection: "row",
    gap: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.revo.creamDark + "4D",
    alignItems: "center",
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: "white",
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    backgroundColor: "#22c55e", // green-500
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 7,
  },
  messageContent: {
    flex: 1,
    justifyContent: "center",
  },
  messageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 4,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    color: COLORS.revo.navy,
    flex: 1,
    marginRight: 8,
  },
  time: {
    fontSize: 12,
    fontWeight: "bold",
    color: COLORS.revo.navy + "66",
  },
  lastMessage: {
    fontSize: 14,
  },
  unreadMessage: {
    fontWeight: "bold",
    color: COLORS.revo.navy,
  },
  readMessage: {
    fontWeight: "500",
    color: COLORS.revo.navy + "99",
  },
  unreadBadge: {
    backgroundColor: COLORS.revo.red,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  unreadText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});
