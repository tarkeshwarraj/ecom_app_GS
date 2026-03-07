import { View, Text, TouchableOpacity,StyleSheet} from "react-native";
import React from "react";
import { ProductCardProps } from "@/constants/types";
import { Link } from "expo-router";
import { Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants";

export default function ProductCard({ product }: ProductCardProps) {
  const isLiked = false; // This should be dynamic based on user preferences or state
  return (
    <Link href={`/product/${product._id}`} asChild>
      <TouchableOpacity className="w-[46%] bg-white rounded-lg p-4 mr-4 mb-4 overflow-hidden">
        <View className="relative h-56 w-full bg-gray-100">
          <Image
            source={{
              uri:
                product.images?.[0] ||
                "https://via.placeholder.com/300x300?text=No+Image",
            }}
            className="w-full h-full"
            contentFit="cover"
          />
          {/* favourite icon */}
          <TouchableOpacity
            className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-sm"
            onPress={(e) => {
              e.stopPropagation();
            }}
          >
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              size={20}
              color={isLiked ? COLORS.accent : COLORS.primary}
              className="absolute top-2 right-2"
            />
          </TouchableOpacity>
          {/* is Featured */}
          {product.isFeatured && (
            <View className="absolute top-2 left-2 z-10 px-2 py-1 bg-primary rounded">
              <Text className="text-white text-xs font-bold">Featured</Text>
            </View>
          )}
        </View>
      {/* product info */}
        <View style={styles.card}>
          <View style={styles.option}>
            <Ionicons name='star' size={14} color='#FFD700' />
            <Text className="text-secondary text-xs ml-1" >4.6</Text>
            <Text className="text-primary font-medium text-[5px] mb-1">{product.name}</Text>
          </View>
          <View className="flex-row items-center">
            <Text className="text-primary font-bold text-base">${product.price.toFixed(2)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
}


const styles = StyleSheet.create(
  {
    card:{
      padding: 10,
    },
    option:{
      flexDirection:'row',
      alignItems:'center',
      marginBottom:5,
    }
  }
)