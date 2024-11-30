import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';

function PaymentHistory() {
  const { user } = useContext(AuthContext);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const token = localStorage.getItem('access-token');
        const response = await fetch(`http://localhost:5000/payments/${user?.email}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPaymentHistory(data);
        } else {
          console.error('Error fetching payment history:', await response.json());
        }
      } catch (error) {
        console.error('Error fetching payment history:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchPaymentHistory();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">Payment History</h1>
      {paymentHistory.length === 0 ? (
        <div className="text-center bg-white shadow-lg p-6 rounded-lg">
          <p className="text-lg text-gray-600">No payment history found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="table-auto w-full text-left border-collapse">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-3 text-sm font-medium uppercase">Date</th>
                <th className="px-6 py-3 text-sm font-medium uppercase">Transaction ID</th>
                <th className="px-6 py-3 text-sm font-medium uppercase">Amount</th>
                <th className="px-6 py-3 text-sm font-medium uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment, index) => (
                <tr
                  key={payment.transactionId}
                  className={`${
                    index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50'
                  } hover:bg-gray-200`}
                >
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {new Date(payment.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{payment.transactionId}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">${payment.price.toFixed(2)}</td>
                  <td
                    className={`px-6 py-4 text-sm font-semibold ${
                      payment.status === 'Success'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {payment.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default PaymentHistory;
