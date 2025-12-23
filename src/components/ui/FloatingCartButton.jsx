import React from 'react';
import { ShoppingCart, X } from 'phosphor-react';
import { useCart } from '../../context/CartContext';
import { Drawer } from './Drawer';
import { DrawerLink } from './DrawerLink';

const sectionTitleStyle = {
    padding: '0 0 16px 0',
    color: '#55286F',
    fontWeight: '500',
    fontSize: '24px',
};

export function FloatingCartButton() {
    const [cartOpen, setCartOpen] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);
    const { cart, refreshCart } = useCart();

    React.useEffect(() => {
        if (cartOpen) {
            refreshCart();
        }
    }, [cartOpen, refreshCart]);

    const itemCount = cart?.items?.length || 0;

    return (
        <>
            {/* Floating Cart Button - Hide when drawer is open */}
            {!cartOpen && (
                <button
                    onClick={() => setCartOpen(true)}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={{
                        position: 'fixed',
                        bottom: '24px',
                        right: '24px',
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        border: '1px solid rgba(166, 141, 206, 0.4)',
                        background: '#55286F',
                        boxShadow: isHovered
                            ? '0 12px 40px rgba(85, 40, 111, 0.3), 0 8px 24px rgba(183, 155, 212, 0.2)'
                            : '0 8px 24px rgba(85, 40, 111, 0.2), 0 4px 12px rgba(183, 155, 212, 0.15)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 9998,
                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                        transform: isHovered ? 'translateY(-4px) scale(1.05)' : 'translateY(0) scale(1)',
                    }}
                    aria-label="Open cart"
                >
                    <div style={{ position: 'relative' }}>
                        <ShoppingCart size={28} weight="duotone" style={{ color: '#FFFFFF' }} />
                        {itemCount > 0 && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '-8px',
                                    right: '-8px',
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #E6C5B9 0%, #E8A598 100%)',
                                    border: '2px solid #FFFFFF',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '11px',
                                    fontWeight: '600',
                                    color: '#55286F',
                                    fontFamily: 'Epilogue, sans-serif',
                                }}
                            >
                                {itemCount}
                            </div>
                        )}
                    </div>
                </button>
            )}

            {/* Cart Drawer */}
            <Drawer side="bottom" open={cartOpen} onClose={() => setCartOpen(false)}>
                {/* Header with title and close button */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 'var(--space-3)'
                }}>
                    <div style={sectionTitleStyle}>Panier</div>
                    <button
                        onClick={() => setCartOpen(false)}
                        style={{
                            all: 'unset',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: '#E1D7F3',
                            border: '1px solid rgba(166, 141, 206, 0.4)',
                            transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#55286F';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(85, 40, 111, 0.2)';
                            e.currentTarget.querySelector('svg').style.color = '#FFFFFF';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#E1D7F3';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                            e.currentTarget.querySelector('svg').style.color = '#55286F';
                        }}
                        aria-label="Close cart"
                    >
                        <X size={24} weight="bold" style={{ color: '#55286F', transition: 'color 0.2s ease' }} />
                    </button>
                </div>

                {/* Cart items */}
                {cart?.items?.length ? (
                    cart.items.map((item) => (
                        <DrawerLink
                            key={item.id}
                            href={`/products/${item.variant?.product_id || ''}`}
                        >
                            {item.title} x{item.quantity}
                        </DrawerLink>
                    ))
                ) : (
                    <span style={{ color: '#A68DCE', fontSize: '14px' }}>
                        Panier vide
                    </span>
                )}
                <div
                    style={{
                        marginTop: 'var(--space-4)',
                        marginBottom: 'var(--space-3)',
                        height: '0.2px',
                        background: '#A68DCE',
                    }}
                />
                <DrawerLink href="/checkout">Voir le panier</DrawerLink>
            </Drawer>
        </>
    );
}
