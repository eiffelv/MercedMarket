async function cancelOrder(orderId) {
    try {
      const response = await fetch('/order/cancelOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        // Include credentials if the cookies are HttpOnly or domain-based cookies
        credentials: 'include',  
        body: JSON.stringify({ order_id: orderId })
      });
  
      if (!response.ok) {
        // If the response is not okay, parse the error message
        alert('Failed to cancel order');
      }
  
      const data = await response.json();
      window.location.reload();
      return data;
    } catch (error) {
      alert('Error canceling order:' + error.message);
    }
  }
  