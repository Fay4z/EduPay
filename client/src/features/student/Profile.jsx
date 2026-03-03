// import { useContext } from "react";
// import { AuthContext } from "@/context/AuthContext";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

// const Profile = () => {
//   const { userEmail, logout } = useContext(AuthContext);
//   const role = localStorage.getItem("role");

//   if (!userEmail) {
//     return (
//       <div className="p-6 text-center text-gray-500">No user logged in.</div>
//     );
//   }

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6">My Profile</h1>

//       <Card className="rounded-2xl shadow-md">
//         <CardHeader>
//           <CardTitle>Student Information</CardTitle>
//         </CardHeader>

//         <CardContent className="space-y-4">
//           <div>
//             <p className="text-sm text-gray-500">Email</p>
//             <p className="font-medium">{userEmail}</p>
//           </div>

//           <div>
//             <p className="text-sm text-gray-500">Role</p>
//             <p className="font-medium capitalize">{role}</p>
//           </div>

//           <div className="pt-6 flex gap-3">
//             <Button variant="outline">Edit Profile</Button>

//             <Button variant="destructive" onClick={logout}>
//               Logout
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Profile;

import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="p-6 text-center text-gray-500">No user logged in.</div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle>Student Information</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="font-medium">{user.name || "Not Available"}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{user.email}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Role</p>
            <p className="font-medium capitalize">{user.role}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">School</p>
            <p className="font-medium">{user.school || "Not Assigned"}</p>
          </div>

          <div className="pt-6 flex gap-3">
            <Button variant="outline">Edit Profile</Button>

            <Button variant="destructive" onClick={logout}>
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
