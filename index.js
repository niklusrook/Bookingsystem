const stripe = Stripe('pk_test_51NWlnFIOO4N7HXyXrnDENX24js7NLkDEfbJOkpDBqB1UaCgBkoFKhUyE5FyEaW2IlGgEHI8WKxRHvmbeUyv6oOr300fdb5vYTb');

const appearance = { /* appearance */ };
const options = {
  layout: {
    type: 'tabs',
    defaultCollapsed: false,
  }
};
const elements = stripe.elements({ clientSecret, appearance });
const paymentElement = elements.create('payment', options);
paymentElement.mount('#payment-element');