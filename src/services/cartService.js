export const createCheckoutSession = async (cartItems, userId) => {
    try {
      // For portfolio/demo purposes - simulate successful checkout
      // In a real app, this would create a Stripe session
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Return mock session data
      return {
        id: 'cs_demo_' + Date.now(),
        url: `${window.location.origin}/success?session_id=demo_session&user_id=${userId}`
      };
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw error;
    }
  };