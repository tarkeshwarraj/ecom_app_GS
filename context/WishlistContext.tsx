import { Product, WishlistContextType } from '@/constants/types';
import { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import { dummyWishlist } from '@/constants/dummyData';


const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export const WishlistProvider = ({ children }: { children: ReactNode }) => {

    // In a real application, the wishlist would likely be fetched from an API when the user logs in or visits their profile. For this example, we'll just use some dummy data.
    const [wishlist, setWishlist] = useState<Product[]>([])
    // In a real application, you would likely want to have some loading state while fetching the wishlist from the server. For this example, we'll just use a simple boolean.
    const [loading, setLoading] = useState(false);

    const fetchWishlist = async () => {
        setLoading(true)
        setWishlist(dummyWishlist);
        setLoading(false);
    }

    // In a real application, this would involve an API call to add/remove the product from the user's wishlist on the server. For this example, we'll just update the local state.
    const toggleWishlist = async (product: Product) => {
        const exists = wishlist.find((p) => p._id === product._id);
        setWishlist((prev) => {
            if (exists) {
                return prev.filter((p) => p._id !== product._id);
            }
            return [...prev, product];
        })
    }

    // In a real application, this would likely involve checking the user's wishlist on the server to see if the product is included. For this example, we'll just check the local state.
    const isInWishlist = (productID: string) => {
        return wishlist.some((p) => p._id === productID);
    }

    useEffect(() => {
        fetchWishlist();
    },[]);

    return (
        <WishlistContext.Provider value={{ wishlist, loading, isInWishlist, toggleWishlist }} >
            {children}
        </WishlistContext.Provider>
    )
}

// Custom hook to use the WishlistContext   
export function useWishlist() {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error('useWishlist must be used within a Wishlist Provider');
    }
    return context;
}