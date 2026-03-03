import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const StudentPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem("token");

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

    fetchPayments();
  }, []);

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
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b text-left">
                    <th className="py-3">Reason</th>
                    <th className="py-3">Amount</th>
                    <th className="py-3">Due Date</th>
                    <th className="py-3">Paid On</th>
                    <th className="py-3">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment._id} className="border-b">
                      <td className="py-3">{payment.reason}</td>

                      <td className="py-3 font-medium">₹ {payment.amount}</td>

                      <td className="py-3">
                        {new Date(payment.dueDate).toLocaleDateString()}
                      </td>

                      <td className="py-3">
                        {payment.status === "paid"
                          ? new Date(payment.updatedAt).toLocaleDateString()
                          : "-"}
                      </td>

                      <td className="py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-sm capitalize ${
                            payment.status === "paid"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentPayments;
