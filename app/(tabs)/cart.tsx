import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import { ScrollView } from "react-native-gesture-handler";
import CartItems from "@/components/CartItems";

export default function Cart() {
  const { cartItems, cartTotal, removeFromCart, updateQuantity } = useCart();
  const router = useRouter();
  const shipping = 2.00;
  const total = cartTotal + shipping;

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top']}>
      <Header title="My Cart" showBack/>
      {cartItems.length > 0 ? (
        <>
          <ScrollView className="flex-1 px-4 mt-4" showsVerticalScrollIndicator={false}>
            {cartItems.map((item, index) => (
              <CartItems key={index} item={item} onRemove={()=> removeFromCart(item.id, item.size)}
              onUpdateQuantity={(q)=> updateQuantity(item.id, q, item.size)}/>
            ))}
          </ScrollView>
          <View className="p-4 bg-surface rounded-t-3xl">
            
            {/* Subtotal */}
            <View className="flex-row justify-between mb-2">
              <Text className="text-secondary">Subtotal</Text>
              <Text className="text-primary font-bold">${cartTotal.toFixed(2)}</Text>
            </View>

            {/* Shipping */}
            <View className="flex-row justify-between mb-2">
              <Text className="text-secondary">Shipping</Text>
              <Text className="text-primary font-bold">${shipping.toFixed(2)}</Text>
            </View>

            {/* Border */}
            <View className="border-t border-gray-200 my-4" />

            {/* Total */}
            <View className="flex-row justify-between mb-6">
              <Text className="text-lg font-bold text-primary">Total</Text>
              <Text className="text-lg font-bold text-primary">${total.toFixed(2)}</Text>
            </View>

            {/* Checkout Button */}
            <TouchableOpacity 
              className="bg-primary py-4 rounded-full items-center shadow-lg"
              onPress={() => router.push('/checkout') }><Text className="text-white font-bold text-base">Checkout</Text>
              </TouchableOpacity>
          </View>
        </>
      ):(
        <View className="flex-1 items-center justify-center">
          <Text className="text-secondary text-lg">Your cart is empty.</Text>
          <TouchableOpacity onPress={()=>router.push('/')} className="mt-4">
            <Text className="text-primary font-bol">Start Shopping</Text>
          </TouchableOpacity>
        </View>
      )
      }
    </SafeAreaView>
  );
}
