import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows, hotelColumns } from "../../datatablesource";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import useFetch1 from "../../hooks/useFetch1";
import useFetch2 from "../../hooks/useFetch2";

const Datatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState([]);
  
  const managerHotel =JSON.parse( localStorage.getItem("user"));
  const managerHotelId = managerHotel.hotelId;
  // console.log(managerHotelId);
  const staffRole = managerHotel.role;
  console.log(staffRole);
  const { data, loading, error } = useFetch(`/${path}`);
  // console.log(data);
  const { data1, loading1, error1 } = useFetch1(`/${path}/filter/${managerHotelId}`);
  console.log(data1)

  const { data2, loading2, error2 } = useFetch2(`/${path}/room/${managerHotelId}`);
  console.log(data2)


  // useEffect(() => {
  //   setList(data);
  // }, [data]);

  // useEffect(() => {
  //   if (path === 'rooms') {
  //     setList(data2);
  //   } else {
  //     setList(data1);
  //   }
  // }, [data1, data2, path]);


  // useEffect(() => {
  //   if (path === 'rooms' && Array.isArray(data2)) {
  //     setList(data2);
  //   } else {
  //     setList(Array.isArray(data1) ? data1 : (data1 ? [data1] : []));
  //   }
  // }, [data1, data2, path]);

  useEffect(() => {
    if (staffRole === 'staff') {
      if (path === 'rooms' && Array.isArray(data2)) {
        setList(data2);
      } else {
        setList(Array.isArray(data1) ? data1 : (data1 ? [data1] : []));
      }
    } else if (staffRole === 'admin') {
      setList(data); // Sử dụng `useEffect` thứ nhất cho admin
    }
  }, [data, data2, data1, path, staffRole]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/${path}/${id}`);
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
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Xóa
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {/* {path} */}
        {path === "rooms" ? "Phòng" : path === "hotels" ? "Khách sạn" : path === "orders" ? "Đơn đặt phòng" : path === "services" ? "Dịch vụ" : path}
        {path !== "orders" && (
          <Link to={`/${path}/new`} className="link">
            Thêm mới
          </Link>
        )}
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
