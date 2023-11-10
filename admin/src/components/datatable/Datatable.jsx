import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows, hotelColumns } from "../../datatablesource";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import useFetch1 from "../../hooks/useFetch1";
import useFetch2 from "../../hooks/useFetch2";
import useFetch3 from "../../hooks/useFetch3";

const Datatable = ({ columns }) => {
  const location = useLocation();
  // const path = location.pathname.split("/")[1];
  // console.log(path);
  // const path2 = location.pathname.split("/")[2];
  // console.log(path2)

  const path = location.pathname.slice(1); // Bỏ dấu '/' ở đầu nếu có
  console.log(path);

  // const path2 = location.pathname.split("/").slice(1).join("/");
  // console.log(path2);
  const [list, setList] = useState([]);

  const managerHotel = JSON.parse(localStorage.getItem("user"));
  const managerHotelId = managerHotel.hotelId;
  // console.log(managerHotelId);
  const staffRole = managerHotel.role;
  console.log(staffRole);
  const { data, loading, error } = useFetch(`/${path}`);
  console.log(data);

  const staffUsers = data.filter((user) => user.role === "staff");
  console.log(staffUsers);
  const nonAdminUsers = data.filter((item) => item.isAdmin === false);
  console.log(nonAdminUsers);

  const { data2, loading2, error2 } = useFetch2(
    `/${path}/room/${managerHotelId}`
  );
  console.log(data2);

  const { data1, loading1, error1 } = useFetch1(
    `/${path}/filter/${managerHotelId}`
  );
  console.log(data1);

  // useEffect(() => {
  //   if (staffRole === 'staff') {
  //     if (path === 'rooms' && Array.isArray(data2)) {
  //       setList(data2);
  //     } else {
  //       setList(Array.isArray(data1) ? data1 : (data1 ? [data1] : []));
  //     }
  //   } else if (staffRole === 'admin') {
  //     setList(data); // Sử dụng `useEffect` thứ nhất cho admin
  //   }
  // }, [data, data2, data1, path, staffRole]);

  // useEffect(() => {
  //   if (staffRole === 'staff') {
  //     if (path === 'rooms' && Array.isArray(data2)) {
  //       setList(data2);
  //     } else {
  //       setList(Array.isArray(data1) ? data1 : (data1 ? [data1] : []));
  //     }
  //   } else if (staffRole === 'admin') {
  //     if (path === 'users') {
  //       setList(data);
  //     } else if (path === 'users/staff') {
  //       setList(data3);
  //     }
  //   }
  // }, [data, data2, data, data3, path, staffRole]);

  useEffect(() => {
    if (staffRole === "staff") {
      if (path === "rooms" && Array.isArray(data2)) {
        setList(data2);
      } else {
        setList(Array.isArray(data1) ? data1 : data1 ? [data1] : []);
      }
    } else if (staffRole === "admin") {
      if (path === "users") {
        setList(nonAdminUsers);
      } else if (path === "users/staff") {
        setList(staffUsers);
      } else if (path === "reviews") {
        // Thêm điều kiện cho path là "reviews"
        setList(data);
      }
    }
  }, [data, data1, data2, path, staffRole]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/${path}/${id}`);
      setList(list.filter((item) => item._id !== id));
    } catch (err) {}
  };

  const handleDeleteRoom = async (id) => {
    try {
      await axios.delete(`/${path}/${id}/${managerHotelId}`);
      setList(list.filter((item) => item._id !== id));
    } catch (err) {}
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/${path}/${params.row._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">Xem</div>
            </Link>

            {/* {path !== "reviews"  && path !== "users" && (
              <div
                className="deleteButton"
                onClick={() => handleDelete(params.row._id)}
              >
                Xóa
              </div>
            )} */}

            {path !== "reviews" && path !== "users" && path !== "rooms" && path !== "users/staff" && (
              <div
                className="deleteButton"
                onClick={() => handleDelete(params.row._id)}
              >
                Xóa
              </div>
            )}

            {path === "rooms" && (
              <div
                className="deleteButton"
                onClick={() => handleDeleteRoom(params.row._id)}
              >
                Xóa
              </div>
            )}
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {/* {path} */}
        {path === "rooms"
          ? "Phòng"
          : path === "hotels"
          ? "Khách sạn"
          : path === "orders"
          ? "Đơn đặt phòng"
          : path === "services"
          ? "Dịch vụ"
          : path === "users"
          ? "Người dùng"
          : path === "users/staff"
          ? "Đối tác"
          : path === "reviews"
          ? "Đánh giá"
          : path}
        {/* {path !== "orders" && path !== "reviews" &&(
          <Link to={`/${path}/new`} className="link">
            Thêm mới
          </Link>
        )} */}

        {/* {(staffRole !== "admin" ||
          (staffRole === "admin" &&
            ![
              "hotels",
              "rooms",
              "orders",
              "reviews",
              "users",
              "users/staff",
            ].includes(path))) && (
          <Link to={`/${path}/new`} className="link">
            Thêm mới
          </Link>
        )} */}
        {staffRole !== "admin" &&
          ((staffRole === "admin" &&
            ![
              "hotels",
              "rooms",
              "orders",
              "reviews",
              "users",
              "users/staff",
            ].includes(path)) ||
            staffRole !== "staff" ||
            path !== "orders") && (
            <Link to={`/${path}/new`} className="link">
              Thêm mới
            </Link>
          )}

        {/* {(staffRole !== "staff" || path !== "orders") && (
          <Link to={`/${path}/new`} className="link">
            Thêm mới
          </Link>
        )} */}
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(rows) => rows._id}
      />
    </div>
  );
};

export default Datatable;
