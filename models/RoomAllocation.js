import React, { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./RoomAllocation.css";

const RoomAllocation = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [loading, setLoading] = useState(true);

  const [students, setStudents] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [allocations, setAllocations] = useState([]);

  const [formData, setFormData] = useState({
    studentId: "",
    roomId: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [studentRes, roomRes, allocationRes] = await Promise.all([
        API.get("/students"),
        API.get("/rooms"),
        API.get("/allocations"),
      ]);

      setStudents(studentRes.data.students || []);
      setRooms(roomRes.data.rooms || []);
      setAllocations(allocationRes.data.allocations || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const assignRoom = async (e) => {
    e.preventDefault();

    try {
      await API.post("/allocations", formData);

      alert("Room Allocated Successfully");

      setFormData({
        studentId: "",
        roomId: "",
      });

      fetchData();

    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="page-shell">

      <Sidebar
        onLogout={() => {
          logout();
          navigate("/");
        }}
      />

      <main className="content-area">

        <Navbar title="Room Allocation" />

        <h2>Room Allocation</h2>
        <div className="allocation-container">

  <div className="allocation-form">

    <h2>Assign Room</h2>

    <form onSubmit={assignRoom}>

      <select
        name="studentId"
        value={formData.studentId}
        onChange={handleChange}
        required
      >
        <option value="">Select Student</option>

        {students.map((student) => (
          <option key={student._id} value={student._id}>
            {student.fullName}
          </option>
        ))}

      </select>

      <select
        name="roomId"
        value={formData.roomId}
        onChange={handleChange}
        required
      >
        <option value="">Select Room</option>

        {rooms
          .filter((room) => room.status === "Available")
          .map((room) => (
            <option key={room._id} value={room._id}>
              {room.roomNumber} ({room.roomType})
            </option>
          ))}

      </select>

      <button type="submit">
        Assign Room
      </button>

    </form>

  </div>
          <div className="allocation-table">

    <h2>Allocation History</h2>

    <table>

      <thead>

        <tr>
          <th>Student</th>
          <th>Room</th>
          <th>Status</th>
          <th>Date</th>
        </tr>

      </thead>

      <tbody>

        {allocations.map((allocation) => (

          <tr key={allocation._id}>

            <td>{allocation.student?.fullName}</td>

            <td>{allocation.room?.roomNumber}</td>

            <td>{allocation.status}</td>

            <td>
              {new Date(allocation.createdAt).toLocaleDateString()}
            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

</div>

      </main>

    </div>
  );
};

export default RoomAllocation;