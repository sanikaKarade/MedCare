"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react"

export interface CartItem {
  id: string
  name: string
  price: number
  image: string | null
  quantity: number
  prescription: boolean
}

interface CartContextType {
  cart: CartItem[]

  addToCart: (
    item: Omit<CartItem, "quantity">
  ) => void

  removeFromCart: (id: string) => void

  updateQuantity: (
    id: string,
    quantity: number
  ) => void

  clearCart: () => void

  totalItems: number

  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(
  undefined
)

export function CartProvider({
  children,
}: {
  children: ReactNode
}) {
  const [cart, setCart] = useState<CartItem[]>([])

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")

    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  // Save cart whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  // Add product to cart
  const addToCart = (
    item: Omit<CartItem, "quantity">
  ) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem.id === item.id
      )

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              }
            : cartItem
        )
      }

      return [
        ...prevCart,
        {
          ...item,
          quantity: 1,
        },
      ]
    })
  }

  // Remove product
  const removeFromCart = (id: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.id !== id)
    )
  }

  // Update quantity
  const updateQuantity = (
    id: string,
    quantity: number
  ) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity,
            }
          : item
      )
    )
  }

  // Empty cart
  const clearCart = () => {
    setCart([])
  }

  // Total number of products
  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  )

  // Total cart value
  const totalPrice = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    )
  }

  return context
}