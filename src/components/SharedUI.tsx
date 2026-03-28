import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  StyleProp,
} from "react-native";
import * as Lucide from "lucide-react-native";
import { COLORS } from "../theme";

// --- Icons ---
export const Icon = ({
  name,
  size = 20,
  color = COLORS.revo.navy,
  style,
}: {
  name: string;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}) => {
  const LucideIcon = (Lucide as any)[name];
  if (!LucideIcon) return null;
  return <LucideIcon size={size} color={color} style={style} />;
};

// --- Button ---
interface ButtonProps {
  onPress?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost";
  fullWidth?: boolean;
  iconName?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  fullWidth = false,
  iconName,
  onPress,
  disabled,
  style,
}) => {
  const getBackgroundColor = () => {
    if (disabled) return "#ccc";
    switch (variant) {
      case "primary":
        return COLORS.revo.navy;
      case "secondary":
        return COLORS.revo.red;
      case "outline":
        return "transparent";
      case "danger":
        return COLORS.revo.red;
      case "ghost":
        return "transparent";
      default:
        return COLORS.revo.navy;
    }
  };

  const getTextColor = () => {
    if (disabled) return "#666";
    switch (variant) {
      case "primary":
        return COLORS.revo.cream;
      case "secondary":
        return "white";
      case "outline":
        return COLORS.revo.navy;
      case "danger":
        return "white";
      case "ghost":
        return COLORS.revo.navy;
      default:
        return COLORS.revo.cream;
    }
  };

  const getBorder = () => {
    if (variant === "outline")
      return { borderWidth: 2, borderColor: COLORS.revo.navy };
    return {};
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.buttonBase,
        {
          backgroundColor: getBackgroundColor(),
          width: fullWidth ? "100%" : undefined,
          opacity: disabled ? 0.5 : 1,
        },
        getBorder(),
        style,
      ]}
    >
      {iconName && (
        <Icon
          name={iconName}
          size={18}
          color={getTextColor()}
          style={{ marginRight: 8 }}
        />
      )}
      <Text style={[styles.buttonText, { color: getTextColor() }]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

// --- Card ---
export const Card: React.FC<{
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}> = ({ children, style }) => (
  <View style={[styles.card, style]}>{children}</View>
);

// --- Input ---
interface InputProps {
  label?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  style?: StyleProp<ViewStyle>;
  multiline?: boolean;
  numberOfLines?: number;
}

export const Input: React.FC<InputProps> = ({ label, style, ...props }) => (
  <View style={[styles.inputContainer, style]}>
    {label && <Text style={styles.inputLabel}>{label}</Text>}
    <TextInput
      style={styles.input}
      placeholderTextColor={COLORS.revo.navy + "66"} // 40% opacity
      {...props}
    />
  </View>
);

// --- Badge ---
export const Badge: React.FC<{
  children: React.ReactNode;
  variant?: "success" | "warning" | "neutral" | "blue";
}> = ({ children, variant = "neutral" }) => {
  const getStyle = () => {
    switch (variant) {
      case "success":
        return { bg: "#DCFCE7", text: "#166534" }; // green-100, green-800
      case "warning":
        return { bg: "#FFEDD5", text: "#9A3412" }; // orange-100, orange-800
      case "neutral":
        return { bg: COLORS.revo.creamDark, text: COLORS.revo.navy };
      case "blue":
        return { bg: COLORS.revo.navy, text: "white" };
      default:
        return { bg: COLORS.revo.creamDark, text: COLORS.revo.navy };
    }
  };

  const { bg, text } = getStyle();

  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      <Text style={[styles.badgeText, { color: text }]}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonBase: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 14,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  card: {
    backgroundColor: COLORS.revo.light,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.revo.creamDark + "80", // 50% opacity
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  inputContainer: {
    gap: 6,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.revo.navy,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  input: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.revo.creamDark,
    backgroundColor: "white",
    color: COLORS.revo.navy,
    fontSize: 16,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});
