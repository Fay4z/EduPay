import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const StatCard = ({ title, value }) => {
  return (
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
};

const AdminDashboard = () => {
  const stats = {
    totalStudents: 120,
    totalFees: 250000,
    pendingPayments: 45000,
    monthlyRevenue: 80000,
  };
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
          value={`Rs. ${stats.totalFees.toLocaleString()}`}
        />
        <StatCard
          title="Pending Payments"
          value={`Rs. ${stats.pendingPayments.toLocaleString()}`}
        />
        <StatCard
          title="This Month Revenue"
          value={`Rs. ${stats.monthlyRevenue.toLocaleString()}`}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
