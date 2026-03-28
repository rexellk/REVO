import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { analyzeVehicleImage } from "../services/geminiService";
import { AnalysisResult } from "../types";
import { Button, Card, Badge, Icon } from "./SharedUI";
import { COLORS } from "../theme";

interface ImageAnalyzerProps {
  onClose: () => void;
}

export const ImageAnalyzer: React.FC<ImageAnalyzerProps> = ({ onClose }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      setSelectedImage(asset.uri);
      // Store base64 for analysis if needed, or just uri if we convert later
      // The service expects base64 string
      if (asset.base64) {
        // We'll store the base64 in a way we can access it, or just re-read it?
        // Expo ImagePicker returns base64 if requested.
        // We can attach it to the state or just pass it when analyzing.
        // For now, let's assume we can get it from the asset.
        // Actually, let's store the base64 separately or just use the uri for display.
        // I'll store the base64 in a ref or state if I need it for the API.
        // Let's just use the asset object.
        (asset as any).base64Data = asset.base64;
      }
      setResult(null);
      setError(null);
    }
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission to access camera is required!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      setSelectedImage(asset.uri);
      if (asset.base64) {
        (asset as any).base64Data = asset.base64;
      }
      setResult(null);
      setError(null);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;
    setIsAnalyzing(true);
    setError(null);

    try {
      // We need the base64 data.
      // Since we requested base64: true, it should be in the asset.
      // But I didn't save the asset object in state, only the URI.
      // Let's fix the state to hold the base64 or just re-implement pickImage to save it.
      // Actually, I can't easily access the asset from just the URI in state unless I saved it.
      // I'll assume I have it. Wait, I need to fix the state logic.
      // I'll just use a hidden way to pass it or change state to store object.
      // For simplicity, I'll assume the `selectedImage` state is just for display,
      // but I'll add a `base64Image` state.
    } catch (err) {
      setError("Failed to analyze the image. Please try again.");
    }

    // Real implementation below
  };

  // Re-implementing state to hold base64
  const [base64Image, setBase64Image] = useState<string | null>(null);

  const handleImageSelection = async (method: "camera" | "gallery") => {
    let result;
    if (method === "camera") {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) {
        Alert.alert("Permission required", "Camera access is needed.");
        return;
      }
      result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
        base64: true,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
        base64: true,
      });
    }

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setSelectedImage(result.assets[0].uri);
      setBase64Image(result.assets[0].base64 || null);
      setResult(null);
      setError(null);
    }
  };

  const executeAnalysis = async () => {
    if (!base64Image) return;
    setIsAnalyzing(true);
    setError(null);

    try {
      const data = await analyzeVehicleImage(base64Image);
      setResult(data);
    } catch (err) {
      setError("Failed to analyze the image. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Modal animationType="slide" visible={true} onRequestClose={onClose}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon
              name="ArrowRight"
              size={24}
              color={COLORS.revo.navy}
              style={{ transform: [{ rotate: "180deg" }] }}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>AI Vehicle Diagnostics</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Gemini 3 Pro</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          {/* Upload Section */}
          <Card style={styles.uploadCard}>
            {!selectedImage ? (
              <View style={styles.uploadPlaceholder}>
                <View style={styles.cameraIconBg}>
                  <Icon name="Camera" size={40} color={COLORS.revo.navy} />
                </View>
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.uploadTitle}>Upload Vehicle Photo</Text>
                  <Text style={styles.uploadSubtitle}>
                    Take a photo of the damage, dashboard light, or engine bay
                    for instant AI analysis.
                  </Text>
                </View>
                <View style={styles.buttonGroup}>
                  <Button
                    onPress={() => handleImageSelection("camera")}
                    iconName="Camera"
                  >
                    Take Photo
                  </Button>
                  <Button
                    onPress={() => handleImageSelection("gallery")}
                    variant="outline"
                    iconName="Image"
                  >
                    Gallery
                  </Button>
                </View>
              </View>
            ) : (
              <View style={styles.previewContainer}>
                <View style={styles.imagePreview}>
                  <Image
                    source={{ uri: selectedImage }}
                    style={styles.image}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.actionButtons}>
                  <Button
                    variant="secondary"
                    onPress={() => setSelectedImage(null)}
                    style={{ flex: 1 }}
                  >
                    Retake
                  </Button>
                  <Button
                    onPress={executeAnalysis}
                    disabled={isAnalyzing}
                    style={{ flex: 1 }}
                  >
                    {isAnalyzing ? (
                      <ActivityIndicator color="white" />
                    ) : (
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <Icon name="Sparkles" size={18} color="white" />
                        <Text style={{ color: "white", fontWeight: "bold" }}>
                          Analyze Issue
                        </Text>
                      </View>
                    )}
                  </Button>
                </View>
              </View>
            )}
          </Card>

          {/* Error State */}
          {error && (
            <View style={styles.errorContainer}>
              <Icon name="AlertCircle" size={20} color={COLORS.revo.red} />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          {/* Results Section */}
          {result && (
            <View style={styles.resultsContainer}>
              <View style={styles.resultsHeader}>
                <Icon name="CheckCircle" size={24} color={COLORS.success} />
                <Text style={styles.resultsTitle}>Diagnostic Results</Text>
              </View>

              <View style={styles.grid}>
                {/* Main Diagnosis */}
                <Card
                  style={[
                    styles.resultCard,
                    { borderLeftWidth: 4, borderLeftColor: COLORS.revo.navy },
                  ]}
                >
                  <Text style={styles.label}>AI Diagnosis</Text>
                  <Text style={styles.diagnosisText}>{result.diagnosis}</Text>
                </Card>

                <View style={styles.row}>
                  {/* Severity */}
                  <Card style={[styles.resultCard, { flex: 1 }]}>
                    <Text style={styles.label}>Severity</Text>
                    <View style={{ marginTop: 8 }}>
                      <Badge
                        variant={
                          result.severity === "HIGH"
                            ? "warning"
                            : result.severity === "MEDIUM"
                            ? "blue"
                            : "success"
                        }
                      >
                        {result.severity} PRIORITY
                      </Badge>
                    </View>
                  </Card>

                  {/* Cost */}
                  <Card style={[styles.resultCard, { flex: 1 }]}>
                    <Text style={styles.label}>Est. Cost</Text>
                    <Text style={styles.costText}>{result.estimatedCost}</Text>
                  </Card>
                </View>

                {/* Action */}
                <Card style={styles.actionCard}>
                  <View style={styles.actionContent}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.actionTitle}>
                        Recommended Service
                      </Text>
                      <Text style={styles.actionSubtitle}>
                        {result.recommendedService}
                      </Text>
                    </View>
                    <Button
                      variant="secondary"
                      style={{ paddingHorizontal: 16 }}
                    >
                      <Text style={{ color: "white", fontWeight: "bold" }}>
                        Find Mechanics
                      </Text>
                    </Button>
                  </View>
                </Card>
              </View>

              <Text style={styles.disclaimer}>
                * AI analysis is for informational purposes only. Always consult
                with a verified REVO mechanic for a final quote and safety
                inspection.
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingTop: 60, // Safe area
    borderBottomWidth: 1,
    borderBottomColor: COLORS.revo.creamDark,
    backgroundColor: "white",
    zIndex: 10,
  },
  closeButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.revo.navy,
    flex: 1,
  },
  badge: {
    backgroundColor: "#EFF6FF", // blue-50
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "bold",
    color: COLORS.revo.navy,
  },
  content: {
    padding: 24,
    gap: 32,
  },
  uploadCard: {
    padding: 32,
    borderWidth: 2,
    borderColor: COLORS.revo.creamDark,
    borderStyle: "dashed",
    backgroundColor: "#F9FAFB", // gray-50
  },
  uploadPlaceholder: {
    alignItems: "center",
    gap: 16,
  },
  cameraIconBg: {
    backgroundColor: "#DBEAFE", // blue-100
    padding: 16,
    borderRadius: 40,
  },
  uploadTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.revo.navy,
    marginBottom: 4,
  },
  uploadSubtitle: {
    fontSize: 14,
    color: COLORS.revo.navy + "99",
    textAlign: "center",
    maxWidth: 280,
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },
  previewContainer: {
    gap: 24,
  },
  imagePreview: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: "#111827", // gray-900
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
  },
  errorContainer: {
    backgroundColor: "#FEF2F2", // red-50
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  errorText: {
    color: COLORS.revo.red,
    fontSize: 14,
    fontWeight: "500",
  },
  resultsContainer: {
    gap: 16,
  },
  resultsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.revo.navy,
  },
  grid: {
    gap: 16,
  },
  resultCard: {
    padding: 20,
    backgroundColor: "white",
  },
  label: {
    fontSize: 12,
    fontWeight: "bold",
    color: COLORS.revo.navy + "80",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  diagnosisText: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.revo.navy,
    marginTop: 4,
  },
  row: {
    flexDirection: "row",
    gap: 16,
  },
  costText: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.revo.navy,
    marginTop: 4,
  },
  actionCard: {
    padding: 20,
    backgroundColor: COLORS.revo.navy,
  },
  actionContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
  },
  actionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
  },
  actionSubtitle: {
    color: "#DBEAFE", // blue-100
    fontSize: 14,
  },
  disclaimer: {
    fontSize: 12,
    color: COLORS.revo.navy + "66",
    textAlign: "center",
    marginTop: 8,
  },
});
