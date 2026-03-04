import { useState, useContext } from "react";
import QRCode from "qrcode";
import { AuthContext } from "@/context/AuthContext";

const StudentPaymentPage = () => {
  const UPI_ID = import.meta.env.VITE_UPI_ID;
  const MERCHANT_NAME = import.meta.env.VITE_MERCHANT_NAME;

  const { user } = useContext(AuthContext);
  const [amount, setAmount] = useState("");
  const [qr, setQr] = useState("");
  const [paymentId, setPaymentId] = useState(null);
  const [message, setMessage] = useState("");

  const createPayment = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("/api/payments/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        amount,
        reason: "Tuition Fees",
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage("Payment creation failed");
      return;
    }

    setPaymentId(data._id);

    const upiLink = `upi://pay?pa=${UPI_ID}&pn=${MERCHANT_NAME}&am=${amount}&cu=INR&tn=Fee Payment`;

    const qrImage = await QRCode.toDataURL(upiLink);
    setQr(qrImage);
  };

  const confirmPayment = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`/api/payments/confirm/${paymentId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      setMessage("Payment submitted for verification ✅");
    } else {
      setMessage("Error submitting payment");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Pay Fees</h2>

      <input
        type="number"
        placeholder="Enter Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 rounded w-full mb-3"
      />

      <button
        onClick={createPayment}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Generate QR
      </button>

      {qr && (
        <div className="mt-6 text-center">
          <img src={qr} alt="QR Code" className="mx-auto mb-4" />

          <button
            onClick={confirmPayment}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            I Have Paid
          </button>
        </div>
      )}

      {message && (
        <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
      )}
    </div>
  );
};

export default StudentPaymentPage;
