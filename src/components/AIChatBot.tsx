import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { sendChatMessage } from "../services/geminiService";
import { ChatMessage } from "../types";
import { Icon } from "./SharedUI";
import { COLORS } from "../theme";

export const AIChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "model",
      text: "Hi! I'm RevoBot. Ask me about car maintenance, strange noises, or booking a mechanic.",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputText.trim() || isThinking) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      text: inputText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsThinking(true);

    try {
      const responseText = await sendChatMessage(messages, userMsg.text);

      const modelMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "model",
        text: responseText,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, modelMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <TouchableOpacity onPress={() => setIsOpen(true)} style={styles.fab}>
          <Icon name="Sparkles" size={24} color={COLORS.revo.cream} />
          <Text style={styles.fabText}>Ask AI</Text>
        </TouchableOpacity>
      )}

      {/* Chat Modal */}
      <Modal
        visible={isOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsOpen(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalContainer}
        >
          <View style={styles.chatWindow}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.headerLeft}>
                <View style={styles.botIconBg}>
                  <Icon name="Bot" size={20} color={COLORS.revo.cream} />
                </View>
                <View>
                  <Text style={styles.headerTitle}>RevoBot</Text>
                  <Text style={styles.headerSubtitle}>
                    Powered by Gemini 3 Pro
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => setIsOpen(false)}
                style={styles.closeButton}
              >
                <Icon name="X" size={20} color="white" />
              </TouchableOpacity>
            </View>

            {/* Messages Area */}
            <FlatList
              ref={flatListRef}
              data={messages}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.messagesList}
              renderItem={({ item }) => (
                <View
                  style={[
                    styles.messageRow,
                    item.role === "user" ? styles.userRow : styles.modelRow,
                  ]}
                >
                  <View
                    style={[
                      styles.messageBubble,
                      item.role === "user"
                        ? styles.userBubble
                        : styles.modelBubble,
                    ]}
                  >
                    <Text
                      style={[
                        styles.messageText,
                        item.role === "user"
                          ? styles.userText
                          : styles.modelText,
                      ]}
                    >
                      {item.text}
                    </Text>
                  </View>
                </View>
              )}
              ListFooterComponent={
                isThinking ? (
                  <View style={styles.thinkingContainer}>
                    <ActivityIndicator size="small" color={COLORS.revo.navy} />
                  </View>
                ) : null
              }
            />

            {/* Input Area */}
            <View style={styles.inputArea}>
              <View style={styles.inputContainer}>
                <TextInput
                  value={inputText}
                  onChangeText={setInputText}
                  placeholder="Type your question..."
                  placeholderTextColor={COLORS.revo.navy + "66"}
                  style={styles.input}
                  editable={!isThinking}
                  onSubmitEditing={handleSend}
                />
                <TouchableOpacity
                  onPress={handleSend}
                  disabled={!inputText.trim() || isThinking}
                  style={[
                    styles.sendButton,
                    (!inputText.trim() || isThinking) &&
                      styles.sendButtonDisabled,
                  ]}
                >
                  <Icon name="Send" size={18} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 100, // Above tab bar
    right: 16,
    backgroundColor: COLORS.revo.navy,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    gap: 8,
    borderWidth: 2,
    borderColor: COLORS.revo.cream,
  },
  fabText: {
    color: COLORS.revo.cream,
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  chatWindow: {
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: "80%",
    overflow: "hidden",
  },
  header: {
    backgroundColor: COLORS.revo.navy,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  botIconBg: {
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 8,
    borderRadius: 8,
  },
  headerTitle: {
    color: COLORS.revo.cream,
    fontWeight: "900",
    fontSize: 14,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    color: COLORS.revo.cream + "B3", // 70%
    fontSize: 10,
    fontWeight: "500",
  },
  closeButton: {
    padding: 8,
  },
  messagesList: {
    padding: 16,
    gap: 16,
  },
  messageRow: {
    flexDirection: "row",
    width: "100%",
  },
  userRow: {
    justifyContent: "flex-end",
  },
  modelRow: {
    justifyContent: "flex-start",
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 14,
    borderRadius: 16,
  },
  userBubble: {
    backgroundColor: COLORS.revo.navy,
    borderTopRightRadius: 4,
  },
  modelBubble: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: COLORS.revo.creamDark,
    borderTopLeftRadius: 4,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  userText: {
    color: "white",
  },
  modelText: {
    color: COLORS.revo.navy,
  },
  thinkingContainer: {
    padding: 16,
    alignItems: "flex-start",
  },
  inputArea: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.revo.creamDark,
    backgroundColor: "white",
    paddingBottom: Platform.OS === "ios" ? 32 : 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.revo.cream,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: COLORS.revo.navy,
    borderWidth: 1,
    borderColor: COLORS.revo.creamDark,
  },
  sendButton: {
    backgroundColor: COLORS.revo.red,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});
