/**
 * Example: Using Authentication in Your Components
 * 
 * This file shows how to:
 * - Access user information
 * - Fetch user-specific data
 * - Handle loading and error states
 * - Use database utilities with RLS
 */

import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { fetchUserData, insertUserData, updateUserData, deleteUserData } from '../utils/db';

export function ExampleUserProfile() {
  const { user, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Not logged in</div>;

  return (
    <div>
      <h1>Welcome, {user.email}</h1>
      <p>User ID: {user.id}</p>
      <p>Signed up: {new Date(user.created_at).toLocaleDateString()}</p>
    </div>
  );
}

export function ExampleOrdersList() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      loadOrders();
    }
  }, [authLoading, isAuthenticated]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError('');

      // Fetch all orders for the current user
      // Note: user_id is automatically filtered via RLS
      const userOrders = await fetchUserData('orders', {
        order: { column: 'created_at', ascending: false },
        limit: 50,
      });

      setOrders(userOrders);
    } catch (err) {
      setError(err.message);
      console.error('Error loading orders:', err);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) return <div>Loading auth...</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Your Orders</h2>

      {error && (
        <div style={{ color: 'red', marginBottom: '1rem' }}>
          Error: {error}
        </div>
      )}

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.product_name}</td>
                <td>{order.quantity}</td>
                <td>${order.total_amount}</td>
                <td>{order.status}</td>
                <td>{new Date(order.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button onClick={loadOrders} disabled={loading} style={{ marginTop: '1rem' }}>
        {loading ? 'Refreshing...' : 'Refresh'}
      </button>
    </div>
  );
}

export function ExampleCreateOrder() {
  const { isAuthenticated } = useAuth();
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!productName || !quantity) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);

      // Create new order
      // Note: user_id is automatically added by insertUserData
      const newOrder = await insertUserData('orders', {
        product_name: productName,
        quantity: parseInt(quantity),
        total_amount: quantity * 100, // Example: $100 per item
        status: 'pending',
      });

      setSuccess(`Order created! Order ID: ${newOrder.id}`);
      setProductName('');
      setQuantity(1);
    } catch (err) {
      setError(err.message);
      console.error('Error creating order:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <div>Please sign in to create orders</div>;
  }

  return (
    <form onSubmit={handleCreateOrder} style={{ padding: '2rem' }}>
      <h2>Create New Order</h2>

      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
      {success && <div style={{ color: 'green', marginBottom: '1rem' }}>{success}</div>}

      <div style={{ marginBottom: '1rem' }}>
        <label>
          Product Name:
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="e.g., Blue Widget"
            disabled={loading}
            style={{ marginLeft: '0.5rem' }}
          />
        </label>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>
          Quantity:
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            disabled={loading}
            style={{ marginLeft: '0.5rem' }}
          />
        </label>
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Order'}
      </button>
    </form>
  );
}

export function ExampleUpdateOrder() {
  const { isAuthenticated } = useAuth();
  const [orderId, setOrderId] = useState('');
  const [newStatus, setNewStatus] = useState('pending');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleUpdateOrder = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!orderId) {
      setError('Please enter an order ID');
      return;
    }

    try {
      setLoading(true);

      // Update order status
      // Note: updateUserData automatically checks ownership via user_id
      await updateUserData('orders', orderId, {
        status: newStatus,
      });

      setSuccess(`Order ${orderId} updated to ${newStatus}`);
      setOrderId('');
    } catch (err) {
      setError(err.message);
      console.error('Error updating order:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <div>Please sign in</div>;
  }

  return (
    <form onSubmit={handleUpdateOrder} style={{ padding: '2rem' }}>
      <h2>Update Order Status</h2>

      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
      {success && <div style={{ color: 'green', marginBottom: '1rem' }}>{success}</div>}

      <div style={{ marginBottom: '1rem' }}>
        <label>
          Order ID:
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Paste order UUID"
            disabled={loading}
            style={{ marginLeft: '0.5rem' }}
          />
        </label>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>
          New Status:
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            disabled={loading}
            style={{ marginLeft: '0.5rem' }}
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </label>
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Updating...' : 'Update Order'}
      </button>
    </form>
  );
}

export function ExampleDeleteOrder() {
  const { isAuthenticated } = useAuth();
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleDeleteOrder = async (e) => {
    e.preventDefault();
    
    if (!confirm('Are you sure you want to delete this order?')) {
      return;
    }

    setError('');
    setSuccess('');

    if (!orderId) {
      setError('Please enter an order ID');
      return;
    }

    try {
      setLoading(true);

      // Delete order
      // Note: deleteUserData automatically checks ownership via user_id
      await deleteUserData('orders', orderId);

      setSuccess(`Order ${orderId} deleted`);
      setOrderId('');
    } catch (err) {
      setError(err.message);
      console.error('Error deleting order:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <div>Please sign in</div>;
  }

  return (
    <form onSubmit={handleDeleteOrder} style={{ padding: '2rem' }}>
      <h2>Delete Order</h2>

      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
      {success && <div style={{ color: 'green', marginBottom: '1rem' }}>{success}</div>}

      <div style={{ marginBottom: '1rem' }}>
        <label>
          Order ID:
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Paste order UUID"
            disabled={loading}
            style={{ marginLeft: '0.5rem' }}
          />
        </label>
      </div>

      <button type="submit" disabled={loading} style={{ color: 'white', backgroundColor: 'red' }}>
        {loading ? 'Deleting...' : 'Delete Order'}
      </button>
    </form>
  );
}
