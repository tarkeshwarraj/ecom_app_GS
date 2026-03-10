import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCart } from "@/context/CartContext";
import { Product } from "@/constants/types";
import { useWishlist, WishlistProvider } from "@/context/WishlistContext";
import { dummyProducts } from "@/assets/assets";
import { COLORS } from "@/constants";
import { Image } from "react-native";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import Toast from "react-native-toast-message";

const { width } = Dimensions.get("window");

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [product, setProduct] = React.useState<Product | null>(null);
  const [loading, setLoading] = React.useState(true);
  const { addToCart, cartItems, itemCount } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = React.useState<string | null>("M");
  const [activeImageIndex, setActiveImageIndex] = React.useState(0);

  const fetchProduct = async () => {
    const foundProduct = dummyProducts.find((p) => p._id === id);
    if (foundProduct) {
      setProduct(foundProduct);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator
          size="large"
          color={COLORS.primary}
          className="mt-10"
        />
      </SafeAreaView>
    );
  }

  if (!product) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text className="text-primary text-lg">Product not found</Text>
      </SafeAreaView>
    );
  }

  const isLiked = isInWishlist(product._id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      Toast.show({
        type: 'info',
        text1: 'Please select a size',
        text2: 'Please select a size before adding to cart',
      });
      return;
    }

    addToCart(product, selectedSize || '');
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {/*  Image Carousel */}
        <View className="relative h-[450] bg-gray-100 mb-6">
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={(e) => {
              const slide = Math.ceil(
                e.nativeEvent.contentOffset.x /
                  e.nativeEvent.layoutMeasurement.width,
              );
              setActiveImageIndex(slide);
            }}
          >
            {product.images.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={{ width: width, height: 450 }}
                resizeMode="cover"
              />
            ))}
          </ScrollView>
          <View className="absolute top-12 left-4 right-4 flex-row justify-between items-center z-10">
            <TouchableOpacity
              onPress={() => router.back()}
              className="w-10 h-10 bg-white/80 rounded-full items-center justify-center"
            >
              <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => toggleWishlist(product)}
              className="w-10 h-10 bg-white/80 rounded-full items-center justify-center"
            >
              <Ionicons
                name={isLiked ? "heart" : "heart-outline"}
                size={24}
                color={isLiked ? COLORS.accent : COLORS.primary}
              />
            </TouchableOpacity>
          </View>
          {/* Pagination Dots */}
          <View className="absolute bottom-4 left-0 right-0 flex-row justify-center gap-2">
            {product.images.map((_, index) => (
              <View
                key={index}
                className={`h-2 rounded-full ${index === activeImageIndex ? "w-6 bg-primary" : "w-2 bg-gray-300"}`}
              />
            ))}
          </View>
        </View>

        {/* Product info */}
        <View className="px-5">
            {/* Title & Rating */}
            <View className="flex-row justify-between items-start mb-2">
                <Text className="text-2xl font-bold text-primary flex-1 mr-4">
                    {product.name}
                </Text>
                <View className="flex-row justify-between items-start mb-2">
                    <Ionicons name='star' size={14} color='#FFD700' />
                    <Text className="text-sm font-bold ml-1">4.5</Text>
                    <Text className="text-xs text-secondary ml-1">(85)</Text>
                </View>
            </View> 
            {/* Price */}
            <Text className="text-xl font-bold text-primary mb-4">${product.price.toFixed(2)}</Text>
            {/* Sizes */}   
            {product.sizes && product.sizes.length > 0 && (
                    <>
                    <Text className="text-base font-bold text-primary mb-3">
                        Size
                    </Text>
                    <View className="flex-row gap-3 mb-6 flex-wrap">
                        {product.sizes.map((size) => (
                            <TouchableOpacity key={size} onPress={() => setSelectedSize(size)} className={`w-12 h-12 rounded-full items-center justify-center border ${selectedSize === size ? 'border-primary' : 'bg-white border-gray-100'}`}>
                                <Text className={`text-sm font-medium ${selectedSize === size ? 'text-white' : 'text-primary'}`}>{size}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    </>
                )}
            {/* Description */}
            <Text className="text-base font-bold text-primary mb-3">
                Description
            </Text>
            <Text className="text-base text-secondary mb-6">    
                {product.description}
            </Text>
        </View>
      </ScrollView>

      {/* Footer */}
      <View className="flex-row gap-4 px-5">
        <TouchableOpacity onPress={handleAddToCart} className="flex-row bg-primary rounded-full px-5 py-3 items-center justify-center flex-1">
            <Ionicons name='bag-outline' size={20} color='white' className="mr-2" />
            <Text className="text-white font-bold text-lg">Add to Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/(tabs)/cart")} className="flex-row bg-accent rounded-full px-5 py-3 items-center justify-center flex-1">
            <Ionicons name='bag-check-outline' size={20} color='white' className="mr-2" />
            <Text className="text-white font-bold text-lg">Buy Now</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}
