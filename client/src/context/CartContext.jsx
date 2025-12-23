/* eslint react-refresh/only-export-components: "off" */
import { createContext, useContext, useEffect, useState } from 'react';
import medusa from '../lib/medusa';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    async function init() {
      try {
        const { regions } = await medusa.store.region.list();
        const region =
          regions.find((r) => r.currency_code === 'mad') || regions[0];
        if (!region) throw new Error('No regions found');
        const { cart } = await medusa.store.cart.create({ region_id: region.id });
        setCart(cart);
      } catch (err) {
        console.error('Failed to create cart', err);
      }
    }
    init();
  }, []);

  const addItem = async (variantId, quantity = 1) => {
    if (!cart) return;
    try {
      const { cart: updated } = await medusa.store.cart.createLineItem(cart.id, {
        variant_id: variantId,
        quantity,
      });
      setCart(updated);
    } catch (err) {
      console.error('Failed to add item', err);
    }
  };

  const refreshCart = async () => {
    if (!cart) return;
    try {
      const { cart: updated } = await medusa.store.cart.retrieve(cart.id);
      setCart(updated);
    } catch (err) {
      console.error('Failed to retrieve cart', err);
    }
  };

  const assignCustomer = async (customerId) => {
    if (!cart) return;
    try {
      const { cart: updated } = await medusa.store.cart.update(cart.id, {
        customer_id: customerId,
      });
      setCart(updated);
    } catch (err) {
      console.error('Failed to assign customer to cart', err);
    }
  };

  const updateAddress = async (email, phone, shippingAddress) => {
    if (!cart) return;
    try {
      const { cart: updated } = await medusa.store.cart.update(cart.id, {
        email,
        shipping_address: {
          first_name: shippingAddress.first_name || '',
          last_name: shippingAddress.last_name || '',
          address_1: shippingAddress.address_1,
          city: shippingAddress.city,
          postal_code: shippingAddress.postal_code,
          country_code: shippingAddress.country_code || 'ma',
          phone: phone,
        },
      });
      setCart(updated);
      return updated;
    } catch (err) {
      console.error('Failed to update address', err);
      throw err;
    }
  };

  const getShippingOptions = async () => {
    if (!cart) return [];
    try {
      const { shipping_options } = await medusa.store.fulfillment.listShippingOptionsForCart(cart.id);
      return shipping_options || [];
    } catch (err) {
      console.error('Failed to fetch shipping options', err);
      return [];
    }
  };

  const addShippingMethod = async (shippingOptionId) => {
    if (!cart) return;
    try {
      const { cart: updated } = await medusa.store.cart.addShippingMethod(cart.id, {
        option_id: shippingOptionId,
      });
      setCart(updated);
      return updated;
    } catch (err) {
      console.error('Failed to add shipping method', err);
      throw err;
    }
  };

  const initializePaymentSession = async (providerId = 'manual') => {
    if (!cart) return;
    try {
      const { cart: updated } = await medusa.store.cart.createPaymentSession(cart.id, {
        provider_id: providerId,
      });
      setCart(updated);
      return updated;
    } catch (err) {
      console.error('Failed to initialize payment session', err);
      throw err;
    }
  };

  const completeCart = async () => {
    if (!cart) return;
    try {
      const { order, type } = await medusa.store.cart.complete(cart.id);
      return { order, type };
    } catch (err) {
      console.error('Failed to complete cart', err);
      throw err;
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        refreshCart,
        assignCustomer,
        updateAddress,
        getShippingOptions,
        addShippingMethod,
        initializePaymentSession,
        completeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
