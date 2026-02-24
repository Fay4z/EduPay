"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [payments, setPayments] = useState([]);
  const [paymentForm, setPaymentForm] = useState({
    amount: "",
    reason: "",
    dueDate: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rollNumber: "",
    className: "",
    password: "",
  });

  const token = localStorage.getItem("token");

  const fetchStudents = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/admin/students", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Failed to fetch students", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await fetch(`http://localhost:3000/api/admin/students/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });
      } else {
        await fetch("http://localhost:3000/api/admin/students", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });
      }

      resetForm();
      fetchStudents();
    } catch (error) {
      console.error("Error saving student", error);
    }
  };

  const handleEdit = (student) => {
    setEditingId(student._id);
    setFormData({
      name: student.name,
      email: student.email,
      rollNumber: student.rollNumber,
      className: student.className,
    });
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/api/admin/students/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchStudents();
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: "",
      email: "",
      rollNumber: "",
      className: "",
      password: "",
    });
  };
  const fetchPayments = async (studentId) => {
    const res = await fetch(
      `http://localhost:3000/api/admin/students/${studentId}/payments`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await res.json();
    setPayments(data);
  };

  const togglePayment = async (id) => {
    await fetch(`http://localhost:3000/api/admin/payments/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchPayments(selectedStudent._id);
  };
  const handleAssignPayment = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:3000/api/admin/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        studentId: selectedStudent._id,
        reason: paymentForm.reason,
        amount: paymentForm.amount,
        dueDate: paymentForm.dueDate,
      }),
    });

    setPaymentForm({ amount: "", dueDate: "", reason: "" });
    fetchPayments(selectedStudent._id);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-lg font-semibold mb-4">
          {editingId ? "Edit Student" : "Add Student"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          <Input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            name="rollNumber"
            placeholder="Roll Number"
            value={formData.rollNumber}
            onChange={handleChange}
            required
          />
          <Input
            name="className"
            placeholder="Class"
            value={formData.className}
            onChange={handleChange}
            required
          />

          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <div className="sm:col-span-2 lg:col-span-4 flex gap-3">
            <Button type="submit">
              {editingId ? "Update Student" : "Add Student"}
            </Button>

            {editingId && (
              <Button type="button" variant="secondary" onClick={resetForm}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-lg font-semibold mb-4">Students List</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="border-b">
              <tr>
                <th className="py-2">Name</th>
                <th>Email</th>
                <th>Roll No</th>
                <th>Class</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id} className="border-b">
                  <td className="py-2">{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.rollNumber}</td>
                  <td>{student.className}</td>
                  <td className="text-right space-x-2">
                    <Button size="sm" onClick={() => handleEdit(student)}>
                      Edit
                    </Button>

                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => {
                        setSelectedStudent(student);
                        fetchPayments(student._id);
                      }}
                    >
                      Payments
                    </Button>

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(student._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}

              {students.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {selectedStudent && (
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">
            Payments for {selectedStudent.name}
          </h2>

          <form onSubmit={handleAssignPayment} className="flex gap-3 mb-6">
            <Input
              type="number"
              placeholder="Amount"
              value={paymentForm.amount}
              onChange={(e) =>
                setPaymentForm({ ...paymentForm, amount: e.target.value })
              }
              required
            />

            <Input
              type="text"
              placeholder="Reason (e.g., Tuition Fee - Jan)"
              value={paymentForm.reason}
              onChange={(e) =>
                setPaymentForm({ ...paymentForm, reason: e.target.value })
              }
              required
            />

            <Input
              type="date"
              value={paymentForm.dueDate}
              onChange={(e) =>
                setPaymentForm({ ...paymentForm, dueDate: e.target.value })
              }
              required
            />

            <Button type="submit">Assign</Button>
          </form>

          <table className="w-full text-sm">
            <thead className="border-b">
              <tr>
                <th>Amount</th>
                <th>Reason</th>
                <th>Due Date</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p._id} className="border-b text-center">
                  <td>₹{p.amount}</td>
                  <td>{p.reason}</td>
                  <td>{new Date(p.dueDate).toLocaleDateString()}</td>
                  <td>{p.status}</td>
                  <td>
                    <Button size="sm" onClick={() => togglePayment(p._id)}>
                      Toggle
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Students;
