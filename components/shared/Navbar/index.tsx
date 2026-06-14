"use client";

import { useNavbar } from "@/src/hooks";

// Component_D is a desktop component
// Component_M is a mobile component

import Logo_D from "./desktop/Logo_D";
import Cart_D from "./desktop/Cart_D";
import CoinButton_D from "./desktop/CoinButton_D";
import AuthLink_D from "./desktop/AuthLink_D";
import MarketplaceButton_D from "./desktop/MarketplaceButton_D";
import TopUpModal from "@/components/ui/TopUpModal";
import MenuToggle_M from "./mobile/MenuToggle_M";
import CartButton_M from "./mobile/CartButton_M";
import MarketplaceButton_M from "./mobile/MarketplaceButton_M";
import AuthLink_M from "./mobile/AuthLink_M";

export default function Navbar() {
  const {
    isMenuOpen,
    setIsMenuOpen,
    isTopUpOpen,
    setIsTopUpOpen,
    isCartDropdownOpen,
    setIsCartDropdownOpen,
    isMobileCartOpen,
    setIsMobileCartOpen,
    coins,
    isLoading,
    isCheckingOut,
    isLoggedIn,
    cartRef,
    cartItems,
    removeFromCart,
    totalItems,
    totalPrice,
    clearCart,
    isMarketplacePage,
    isDashboardPage,
    handleCheckout,
    userCoins,
    isCoinEnough,
  } = useNavbar();

  const hasCartItems = totalItems > 0;

  return (
    <>
      {/* DESKTOP NAVBAR */}
      <nav className="fixed flex items-center justify-between backdrop-blur-md gap-2 top-0 h-22 md:h-24 w-screen px-4 md:px-8 z-70">
        <Logo_D />
        <div className="flex gap-4 items-center">
          <div className="hidden md:flex">
            <Cart_D
              cartRef={cartRef}
              isCartDropdownOpen={isCartDropdownOpen}
              setIsCartDropdownOpen={setIsCartDropdownOpen}
              isMobileCartOpen={isMobileCartOpen}
              setIsMobileCartOpen={setIsMobileCartOpen}
              totalItems={totalItems}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              totalPrice={totalPrice}
              clearCart={clearCart}
              isLoading={isLoading}
              userCoins={userCoins}
              isCoinEnough={isCoinEnough}
              isCheckingOut={isCheckingOut}
              handleCheckout={handleCheckout}
              isMarketplacePage={isMarketplacePage}
            />
          </div>

          <div className="hidden md:flex">
            <MarketplaceButton_D isMarketplacePage={isMarketplacePage} />
          </div>

          <CoinButton_D
            isLoading={isLoading}
            coins={coins}
            onOpenTopUp={() => setIsTopUpOpen(true)}
          />

          <div className="hidden sm:flex">
            <AuthLink_D
              isLoading={isLoading}
              isDashboardPage={isDashboardPage}
              isLoggedIn={isLoggedIn}
            />
          </div>
        </div>
      </nav>

      {/* MOBILE NAVBAR */}
      <nav className="lg:hidden fixed bottom-5 left-5 flex flex-col-reverse gap-3 z-80">
        <MenuToggle_M
          isMenuOpen={isMenuOpen}
          hasCartItems={hasCartItems}
          totalItems={totalItems}
          onToggle={() => setIsMenuOpen(!isMenuOpen)}
        />

        <CartButton_M
          isMenuOpen={isMenuOpen}
          onOpenCart={() => {
            setIsMobileCartOpen(true);
            setIsMenuOpen(false);
          }}
          hasCartItems={hasCartItems}
          totalItems={totalItems}
        />

        <MarketplaceButton_M
          isMenuOpen={isMenuOpen}
          isMarketplacePage={isMarketplacePage}
        />

        <AuthLink_M
          isLoading={isLoading}
          isDashboardPage={isDashboardPage}
          isLoggedIn={isLoggedIn}
          isMenuOpen={isMenuOpen}
        />
      </nav>

      <TopUpModal isOpen={isTopUpOpen} onClose={() => setIsTopUpOpen(false)} />
    </>
  );
}
