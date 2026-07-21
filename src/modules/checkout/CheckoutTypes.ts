import type { AddressData } from '../../types';

/** Available delivery slot IDs */
export type DeliverySlotId = 'today' | 'tomorrow';

/** A delivery slot option */
export interface DeliverySlot {
  id: DeliverySlotId;
  title: string;
  subtitle: string;
}

/** Return type for the useCheckout hook */
export interface CheckoutHookReturnType {
  /** User name from store profile */
  userName: string;
  /** List of saved addresses from Redux */
  addresses: AddressData[];
  /** Currently selected address ID */
  selectedAddressId: string | null;
  /** Handler to select an address by ID */
  onSelectAddress: (id: string) => void;
  /** Currently selected delivery slot */
  selectedSlot: DeliverySlotId;
  /** Handler to change the delivery slot */
  onSelectSlot: (slot: DeliverySlotId) => void;
  /** Available delivery slots */
  deliverySlots: DeliverySlot[];
}
