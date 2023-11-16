export const userColumns = [
  // { field: "_id", headerName: "ID", width: 200 },
  {
    field: "user",
    headerName: "Khách hàng",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
            alt="avatar"
          />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "country",
    headerName: "Quốc gia",
    width: 100,
  },
  {
    field: "city",
    headerName: "Thành phố",
    width: 100,
  },
  {
    field: "phone",
    headerName: "Điện thoại",
    width: 160,
  },
];

export const staffColumns = [
  // { field: "_id", headerName: "ID", width: 200 },
  {
    field: "user",
    headerName: "Đối tác",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
            alt="avatar"
          />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "country",
    headerName: "Quốc gia",
    width: 100,
  },
  {
    field: "phone",
    headerName: "Điện thoại",
    width: 160,
  },
];
export const hotelColumns = [
  // { field: "_id", headerName: "ID", width: 260 },
  {
    field: "name",
    headerName: "Tên khách sạn",
    width: 200,
  },
  {
    field: "type",
    headerName: "Loại",
    width: 180,
  },
  {
    field: "title",
    headerName: "Tiêu đề",
    width: 230,
  },
  {
    field: "city",
    headerName: "Thành phố",
    width: 180,
  },
];

export const roomColumns = [
  // { field: "_id", headerName: "ID", width: 260 },
  {
    field: "title",
    headerName: "Tiêu đề",
    width: 230,
  },
  {
    field: "desc",
    headerName: "Giới thiệu",
    width: 300,
  },
  {
    field: "price",
    headerName: "Giá",
    width: 180,
  },
  {
    field: "maxPeople",
    headerName: "Số người tối đa",
    width: 100,
  },
];

export const orderColumns = [
  // { field: "_id", headerName: "ID", width: 250 },
  {
    field: "userName",
    headerName: "Tên khách hàng",
    width: 170,
  },
  {
    field: "nameHotel",
    headerName: "Tên khách sạn",
    width: 200,
  },
  {
    field: "city",
    headerName: "Thành phố",
    width: 150,
  },
  {
    field: "rooms",
    headerName: "Phòng",
    width: 100,
  },
  {
    field: "price",
    headerName: "Giá",
    width: 150,
  },
  {
    field: "status",
    headerName: "Tình trạng",
    width: 150,
  },
];

export const serviceColumns = [
  // { field: "_id", headerName: "ID", width: 250 },
  {
    field: "servicename",
    headerName: "Tên dịch vụ",
    width: 220,
  },
  {
    field: "introduction",
    headerName: "Giới thiệu",
    width: 600,
  },
  {
    field: "serviceprice",
    headerName: "Giá",
    width: 100,
  },
];

export const reviewColumns = [
  // { field: "_id", headerName: "ID", width: 250 },
  {
    field: "userName",
    headerName: "Tên khách hàng",
    width: 100,
  },
  {
    field: "nameHotel",
    headerName: "Tên khách sạn",
    width: 160,
  },
  {
    field: "positive",
    headerName: "Đánh giá tốt",
    width: 300,
  },
  // {
  //   field: "negative",
  //   headerName: "Negative",
  //   width: 300,
  // },
  {
    field: "rating",
    headerName: "Điểm",
    width: 80,
  },
  {
    field: "timeReview",
    headerName: "Thời gian đánh giá",
    width: 200,
  },
];
