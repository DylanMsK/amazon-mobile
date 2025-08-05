import rufusIcon from "@/assets/images/rufus.png";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const CustomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const [tabBarWidth, setTabBarWidth] = useState(0);
  const tabWidth = tabBarWidth / state.routes.length;
  const translateX = useSharedValue(state.index * tabWidth);

  const indicatorPadding = 20;
  const indicatorWidth =
    tabWidth > indicatorPadding * 2
      ? tabWidth - indicatorPadding * 2
      : tabWidth;
  useEffect(() => {
    translateX.value = withTiming(state.index * tabWidth + indicatorPadding, {
      duration: 200,
    });
  }, [state.index, tabWidth, translateX]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View
      className="flex-row bg-white relative border-t border-gray-200"
      onLayout={(e) => setTabBarWidth(e.nativeEvent.layout.width)}
    >
      <Animated.View
        className="absolute top-0 left-0 z-10 rounded-full bg-dark h-1"
        style={[{ width: indicatorWidth }, indicatorStyle]}
      />

      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            onLongPress={onLongPress}
            className="flex-1 items-center justify-center py-2 pb-safe"
            android_ripple={null}
            style={{ opacity: 1 }}
          >
            {options.tabBarIcon && route.name !== "rufus" ? (
              <>
                {options.tabBarIcon({
                  focused: isFocused,
                  color: isFocused ? "black" : "#8E8E93",
                  size: 24,
                })}
                <Text
                  style={{
                    color: isFocused ? "black" : "#8E8E93",
                    fontSize: 12,
                    marginTop: 4,
                  }}
                >
                  {typeof options.tabBarLabel === "function"
                    ? options.tabBarLabel({
                        focused: isFocused,
                        color: isFocused ? "black" : "#8E8E93",
                        position: "below-icon",
                        children: route.name,
                      })
                    : options.tabBarLabel || options.title || route.name}
                </Text>
              </>
            ) : (
              <>
                <Image source={rufusIcon} className="size-6" />
                <Text
                  style={{
                    color: isFocused ? "black" : "#8E8E93",
                    fontSize: 12,
                    marginTop: 4,
                  }}
                >
                  Rufus
                </Text>
              </>
            )}
          </Pressable>
        );
      })}
    </View>
  );
};

export default CustomTabBar;
