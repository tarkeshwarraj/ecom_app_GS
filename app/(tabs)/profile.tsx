import { View, Text, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import { dummyUser } from '@/assets/assets'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import { ScrollView } from 'react-native-gesture-handler'
import { COLORS } from '@/constants'
import { Ionicons } from '@expo/vector-icons'
import { PROFILE_MENU } from '@/constants'


export default function Profile() {

  const {user} = {user: dummyUser}
  const router = useRouter;
  const handleLogout = async () => {
    router.replace("/sign-in");
    
  }
  return (
    <SafeAreaView className='flex-1 bg-surface' edges={["top"]}>
      <Header title="profile"/>
      <ScrollView className='flex-1 px-4' contentContainerStyle={!user ? {flex: 1, justifyContent: 'center', alignItems: 'center'} : {paddingTop: 16}}>
        {!user ? (
          // Guest User Screen
          <View className='items-center w-full'>
            <View>
              <Ionicons name="person-circle-outline" size={40} color={COLORS.secondary}/>
            </View>
            <Text className='text-primary font-bold text-xl mb-2'>Guest User</Text>
            <Text className='text-secondary text-base mb-8 text-center w-3/4 px-4' >Log in to View your profile, orders, and address.</Text>
            <TouchableOpacity onPress={()=>router.push('/sign-in')} className='bg-primary w-3/5 py-3 rounded-full items-center shadow-lgss' >
            <Text>Login / Sign Up</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* User Profile */}
            <View className=' items-center mb-'>
              
                <View className='mb-3' >
                  <Image source={{uri: user.imageUrl}} className='size-20 border-2 border-white shadow-sm rounded-full'/>
                </View>
                <Text>{user.firstName + " " + user.lastName}</Text>
                <Text className='text-secondary text-sm' >{user.emailAddresses[0].emailAddress}</Text>
            
          {/* Admin Pannel Button if user is admin */}
          {user.publicMetadata?.role === "admin" && (
            <TouchableOpacity onPress={()=> router.push('/admin')} className='mt-4 bg-primary px-6 py-2 rounded-full'>
              <Text className='text-white font-bold'>
                Admin Panel
              </Text>
            </TouchableOpacity>
          )}

          </View>

          {/* Menu */}
          <View className='bg-white rounded-xl border border-gray-100/75 p-2 mb-4'>
            {PROFILE_MENU.map((item, index) => (
              <TouchableOpacity key={item.id} className={`flex-row items-center p-4 ${index !== PROFILE_MENU.length -1 ? 'border-b border-gray-100' : ''}`} onPress={()=> router.push(item.route as any)}>
                <View>
                  <Ionicons name={item.icon as any} size={20} color={COLORS.primary}/>
                </View>
                <Text className='flex-1 text-primary font-medium'>{item.title}</Text>
                <Ionicons name='chevron-forward' size={20} color={COLORS.secondary} />
              </TouchableOpacity>
            ))}
          </View>

          {/* Logout Button */}
          <TouchableOpacity className='flex-row items-center justify-center p-4' onPress={handleLogout}>
            <Text className="text-red-500 font-bold ml-2" >Log out</Text>
          </TouchableOpacity>

          </>
        )}

      </ScrollView>
    </SafeAreaView>
  )
}