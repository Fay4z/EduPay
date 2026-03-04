import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const StudentPayments = () => {
  const UPI_ID = import.meta.env.VITE_UPI_ID;
  const MERCHANT_NAME = import.meta.env.VITE_MERCHANT_NAME;

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qrMap, setQrMap] = useState({});
  const token = localStorage.getItem("token");

  const fetchPayments = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/student/payments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();
      setPayments(data);
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const generateQR = async (payment) => {
    const upiLink = `upi://pay?pa=${UPI_ID}&pn=${MERCHANT_NAME}&am=${payment.amount}&cu=INR&tn=${payment.reason}`;

    const qrImage = await QRCode.toDataURL(upiLink);

    setQrMap((prev) => ({
      ...prev,
      [payment._id]: qrImage,
    }));
  };

  const confirmPayment = async (id) => {
    await fetch(`http://localhost:3000/api/admin/payment/confirm/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchPayments();
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-700";
      case "verification_pending":
        return "bg-blue-100 text-blue-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "";
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">Loading payments...</div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Payments</h1>

      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>

        <CardContent>
          {payments.length === 0 ? (
            <p className="text-gray-500">No payments found.</p>
          ) : (
            <div className="space-y-6">
              {payments.map((payment) => (
                <div
                  key={payment._id}
                  className="border p-4 rounded-xl shadow-sm"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{payment.reason}</p>
                      <p>₹ {payment.amount}</p>
                      <p>
                        Due: {new Date(payment.dueDate).toLocaleDateString()}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-sm capitalize ${getStatusStyle(
                        payment.status,
                      )}`}
                    >
                      {payment.status}
                    </span>
                  </div>

                  {payment.status === "pending" && (
                    <div className="mt-4">
                      <button
                        onClick={() => generateQR(payment)}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                      >
                        Pay Now
                      </button>
                    </div>
                  )}

                  {qrMap[payment._id] && (
                    <div className="mt-4 text-center">
                      <img
                        src={qrMap[payment._id]}
                        alt="QR Code"
                        className="mx-auto mb-4"
                      />

                      <button
                        onClick={() => confirmPayment(payment._id)}
                        className="bg-green-600 text-white px-4 py-2 rounded"
                      >
                        I Have Paid
                      </button>
                    </div>
                  )}

                  {/* Paid Date */}
                  {payment.status === "paid" && (
                    <p className="mt-2 text-sm text-gray-500">
                      Paid on {new Date(payment.updatedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentPayments;
