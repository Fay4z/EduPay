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

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:3000/api/admin/dashboard-stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();
        console.log(data);
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats", error);
      }
    };

    fetchStats();
  }, []);

  console.log("hello");
  if (!stats) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Overview</h2>
        <p className="text-muted-foreground text-sm">
          Quick summary of your school's financial status.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Students" value={stats.totalStudents} />
        <StatCard
          title="Total Fees Collected"
          value={`₹ ${stats.totalFees.toLocaleString()}`}
        />
        <StatCard
          title="Pending Payments"
          value={`₹ ${stats.pendingPayments.toLocaleString()}`}
        />
        <StatCard
          title="This Month Revenue"
          value={`₹ ${stats.monthlyRevenue.toLocaleString()}`}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
