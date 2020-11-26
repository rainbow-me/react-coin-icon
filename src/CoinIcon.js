import React, { useMemo } from "react";
import { StyleSheet, View } from "react-primitives";
import FallbackIcon from "./FallbackIcon";
import * as CoinIcons from "./icons";

const sx = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});

const CoinIcon = ({
  color = "#3A3D51",
  fallbackRenderer = FallbackIcon,
  forceFallback,
  shadowColor,
  size = 32,
  style,
  symbol,
  ...props
}) => {
  const formattedSymbol = useMemo(
    () =>
      symbol
        ? symbol.charAt(0).toUpperCase() + symbol.slice(1).toLowerCase()
        : "",
    [symbol]
  );

  const circleProps = useMemo(
    () => ({
      borderRadius: size / 2,
      height: size,
      width: size,
    }),
    [size]
  );

  const shadowProps = useMemo(() => {
    const isSmall = size < 30;

    return {
      shadowColor: shadowColor || color,
      shadowOffset: {
        height: isSmall ? 3 : 4,
        width: 0,
      },
      shadowOpacity: isSmall ? 0.2 : 0.3,
      shadowRadius: isSmall ? 4.5 : 6,
    };
  }, [color, shadowColor, size]);

  const CoinIconElement = forceFallback
    ? fallbackRenderer
    : CoinIcons[formattedSymbol] || fallbackRenderer;

  return (
    <View {...circleProps} style={[sx.container, style]}>
      <CoinIconElement
        {...circleProps}
        {...shadowProps}
        color={color}
        symbol={formattedSymbol}
        {...props}
      />
    </View>
  );
};

const arePropsEqual = (prev, next) =>
  prev.color === next.color &&
  prev.size === next.size &&
  prev.symbol === next.symbol;

export default React.memo(CoinIcon, arePropsEqual);
