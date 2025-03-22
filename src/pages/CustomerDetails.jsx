import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../utils/axiosConfig';

export default function CustomerDetails() {
  const { id } = useParams(); 
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axiosInstance.get(`/customers/${id}`);
        setCustomer(response.data);
      } catch (error) {
        console.error('Error fetching customer:', error);
        setError('Failed to fetch customer details');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id]);

  if (loading) {
    return <div className="p-6 text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  if (!customer) {
    return <div className="p-6 text-center text-gray-500">Customer not found.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Customer Details</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p><strong>ID:</strong> {customer.id}</p>
        <p><strong>Name:</strong> {customer.name}</p>
        <p><strong>Email:</strong> {customer.email}</p>
      </div>
    </div>
  );
}