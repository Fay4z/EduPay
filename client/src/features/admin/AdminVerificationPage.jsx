import { useEffect, useState } from "react";

const AdminVerificationPage = () => {
  const [payments, setPayments] = useState([]);
  const token = localStorage.getItem("token");

  const fetchPayments = async () => {
    const res = await fetch(
      "http://localhost:3000/api/admin/payments/pending",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await res.json();
    if (res.ok) {
      setPayments(data);
    }
  };

  const approvePayment = async (id) => {
    await fetch(`http://localhost:3000/api/admin/payments/approve/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchPayments();
  };

  const rejectPayment = async (id) => {
    await fetch(`http://localhost:3000/api/admin/payments/reject/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchPayments();
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Payment Verification</h2>

      {payments.length === 0 ? (
        <p>No verfication pending payments</p>
      ) : (
        <div className="space-y-4">
          {payments.map((payment) => (
            <div key={payment._id} className="border p-4 rounded shadow">
              <p>
                <strong>Student:</strong> {payment.student.name}
              </p>
              <p>
                <strong>Email:</strong> {payment.student.email}
              </p>
              <p>
                <strong>Amount:</strong> ₹{payment.amount}
              </p>

              <div className="mt-3 space-x-3">
                <button
                  onClick={() => approvePayment(payment._id)}
                  className="bg-green-600 text-white px-4 py-1 rounded"
                >
                  Approve
                </button>

                <button
                  onClick={() => rejectPayment(payment._id)}
                  className="bg-red-600 text-white px-4 py-1 rounded"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminVerificationPage;
