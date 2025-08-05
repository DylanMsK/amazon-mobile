import CustomTabBar from "@/components/navigation/CustomTabBar";
import { StyledTabs } from "@/components/navigation/tab";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

const Layout = () => {
  return (
    <StyledTabs
      headerClassName="bg-dark"
      screenOptions={{
        headerTintColor: "#ffffff",
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "home" : "home-outline"} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "person" : "person-outline"} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "cart" : "cart-outline"} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: "More",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "menu" : "menu-outline"} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="rufus"
        options={{
          title: "Rufus",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "person" : "person-outline"} color={color} size={size} />
          ),
        }}
      />
    </StyledTabs>
  );
};

export default Layout;
