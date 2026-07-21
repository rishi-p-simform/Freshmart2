import { StyleSheet } from 'react-native';
import { Colors, scale, ThemeMode } from '../../../theme';

export const styleSheet = (theme: ThemeMode) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: Colors[theme]?.background
    },
    centeredContainer: {
      flex: 1,
      backgroundColor: Colors[theme]?.background,
      justifyContent: 'center',
      alignItems: 'center'
    },
    headerIconLeft: {
      position: 'absolute',
      left: scale(16),
      width: scale(36),
      height: scale(36),
      borderRadius: scale(10),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors[theme]?.surface,
      zIndex: 10,
      shadowColor: Colors[theme]?.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 4
    },
    headerIconRight: {
      position: 'absolute',
      right: scale(16),
      width: scale(36),
      height: scale(36),
      borderRadius: scale(10),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors[theme]?.surface,
      zIndex: 10,
      shadowColor: Colors[theme]?.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 4
    },
    imageView: {
      width: '100%',
      height: scale(280),
      position: 'relative'
    },
    image: {
      width: '100%',
      height: '100%'
    },
    discountBadge: {
      position: 'absolute',
      backgroundColor: Colors[theme]?.orange,
      paddingHorizontal: scale(10),
      paddingVertical: scale(6),
      borderRadius: scale(20),
      right: scale(16),
      bottom: scale(24)
    },
    discountText: {
      color: Colors[theme]?.solidWhite,
      fontWeight: '700'
    },
    content: {
      flex: 1,
      marginTop: -scale(16),
      backgroundColor: Colors[theme]?.surface,
      borderTopLeftRadius: scale(20),
      borderTopRightRadius: scale(20),
      paddingHorizontal: scale(16),
      paddingTop: scale(16),
      gap: scale(12)
    },
    scrollContent: {
      paddingBottom: scale(100),
      gap: scale(16)
    },
    productTitleSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: scale(8)
    },
    productTitleView: {
      flex: 1
    },
    productName: {
      color: Colors[theme]?.text
    },
    tagsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: scale(4),
      marginTop: scale(4)
    },
    ratingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: scale(2)
    },
    secondaryText: {
      color: Colors[theme]?.gray
    },
    stockTag: {
      paddingHorizontal: scale(10),
      paddingVertical: scale(6),
      borderRadius: scale(8),
      alignSelf: 'flex-start'
    },
    inStockTag: {
      backgroundColor: Colors[theme]?.palette.success[50]
    },
    outStockTag: {
      backgroundColor: Colors[theme]?.palette.error[50]
    },
    inStockText: {
      color: Colors[theme]?.green,
      fontWeight: '700'
    },
    outStockText: {
      color: Colors[theme]?.error,
      fontWeight: '700'
    },
    priceRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: scale(8)
    },
    priceText: {
      color: Colors[theme]?.text
    },
    mrpText: {
      color: Colors[theme]?.gray,
      textDecorationLine: 'line-through'
    },
    unitText: {
      color: Colors[theme]?.orange,
      fontWeight: '700'
    },
    aboutSection: {
      gap: scale(6)
    },
    aboutTitle: {
      color: Colors[theme]?.text
    },
    aboutDescription: {
      color: Colors[theme]?.gray,
      lineHeight: scale(18)
    },
    addToCartSection: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: Colors[theme]?.surface,
      paddingHorizontal: scale(16),
      paddingTop: scale(12),
      borderTopWidth: 1,
      borderTopColor: Colors[theme]?.palette.gray[100]
    },
    addToCartView: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: scale(12)
    },
    counterWrapper: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors[theme]?.background,
      borderRadius: scale(10),
      borderWidth: 1,
      borderColor: Colors[theme]?.palette.gray[200],
      height: scale(44)
    },
    btnContainer: {
      flex: 1,
      height: scale(44)
    }
  });

export default styleSheet;
