import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";
import { Stack } from "expo-router";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CartProvider>
        <WishlistProvider>
          <SafeAreaView className="flex-1" edges={["top"]}>
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            />
            <Toast/>
          </SafeAreaView>
        </WishlistProvider>
      </CartProvider>
    </GestureHandlerRootView>
  );
}
