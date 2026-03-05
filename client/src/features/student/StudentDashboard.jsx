import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const StatCard = ({ title, value }) => (
  <Card className="rounded-2xl shadow-sm">
    <CardHeader>
      <CardTitle className="text-sm font-medium text-muted-foreground">
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-3xl font-semibold">{value}</p>
    </CardContent>
  </Card>
);

const StudentDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:3000/api/student/dashboard-stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch student stats", error);
      }
    };

    fetchStats();
  }, []);

  if (!stats) {
    return (
      <div className="p-6 text-center text-gray-500">Loading payments...</div>
    );
  }
  console.log(stats);
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          Student Overview
        </h2>
        <p className="text-muted-foreground text-sm">
          Quick summary of your payment status.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Payments" value={stats.totalPayments} />

        <StatCard
          title="Total Amount"
          value={`Rs. ${stats.totalAmount.toLocaleString()}`}
        />

        <StatCard
          title="Paid Amount"
          value={`Rs. ${stats.paidAmount.toLocaleString()}`}
        />

        <StatCard
          title="Unpaid Amount"
          value={`Rs. ${stats.unpaidAmount.toLocaleString()}`}
        />
      </div>
    </div>
  );
};

export default StudentDashboard;
