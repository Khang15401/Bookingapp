export const userColumns = [
  // { field: "_id", headerName: "ID", width: 200 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
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
    headerName: "Country",
    width: 100,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 160,
  },
];
export const hotelColumns = [
  // { field: "_id", headerName: "ID", width: 260 },
  {
    field: "name",
    headerName: "Name",
    width: 200,
  },
  {
    field: "type",
    headerName: "Type",
    width: 180,
  },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "city",
    headerName: "City",
    width: 180,
  },
];

export const roomColumns = [
  // { field: "_id", headerName: "ID", width: 260 },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "desc",
    headerName: "Description",
    width: 300,
  },
  {
    field: "price",
    headerName: "Price",
    width: 180,
  },
  {
    field: "maxPeople",
    headerName: "Max People",
    width: 100,
  },
];

export const orderColumns = [
  // { field: "_id", headerName: "ID", width: 250 },
  {
    field: "userName",
    headerName: "Name",
    width: 170,
  },
  {
    field: "nameHotel",
    headerName: "Hotel",
    width: 200,
  },
  {
    field: "city",
    headerName: "City",
    width: 150,
  },
  {
    field: "rooms",
    headerName: "Room",
    width: 100,
  },
  {
    field: "price",
    headerName: "Price",
    width: 150,
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
  },
];

export const serviceColumns = [
  // { field: "_id", headerName: "ID", width: 250 },
  {
    field: "servicename",
    headerName: "Name",
    width: 220,
  },
  {
    field: "introduction",
    headerName: "introdution",
    width: 600,
  },
  {
    field: "serviceprice",
    headerName: "Price",
    width: 100,
  },
];
