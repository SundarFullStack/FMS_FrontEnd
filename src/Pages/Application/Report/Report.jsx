import React, { useState, useContext,useEffect } from "react";
import { Link } from "react-router-dom";
import "./report.css";
import { FaSearchDollar } from "react-icons/fa";
import Table from "react-bootstrap/Table";
import { GrClearOption } from "react-icons/gr";
import DateTimePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import DataTable from "react-data-table-component";
import { LoginContext } from "../../../Components/Context/ContextProvider";
import API_URL from "../../../../Config/GlobalUrl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

// DATA TABLE CUSTOM CSS STYLES

const customStyles = {
  headRow: {
    style: {
      backgroundColor: "green",
      color: "white",
    },
  },
  headCells: {
    style: {
      fontSize: "16px",
      fontWeight: "600",
    },
  },
  cells: {
    style: {
      fontSize: "15px",
    },
  },
};

//DATE TIME PICKER STYLES

const StyledDatePicker = styled(DateTimePicker)`
  margin-top: 15px;
  border-radius: 5%;
  border-bottom: 2px solid green;
  border-left: none;
  border-right: none;
  border-top: none;
  width: 100%;
  display: block;
  outline: none;
`;

const Report = () => {
  const [SelectedStartDate, setSelectedStartDate] = useState(new Date());
  const [SelectedEndDate, setSelectedEndDate] = useState(new Date());
    const { loginData, setLoginData } = useContext(LoginContext);
    const { UserId, setUserId } = useContext(LoginContext);
    const [OrderDetails, setOrderDetails] = useState([]);

    // console.log("UserId",UserId)
    // console.log("OrderDate",OrderDetails[0].OrderDate)
    // console.log("OrderPrice",OrderDetails[0].OrderPrice)
    // console.log("OrderId",OrderDetails[0]._doc.OrderId)

    

  const handleSearchFunc = async (e) => {
    e.preventDefault();
    console.log(SelectedStartDate, SelectedEndDate);
    try {
      if (!SelectedStartDate || !SelectedEndDate) {
        toast.error("Please ensure to fill all fields");
      } else {
        const response = await axios.post(`${API_URL}/report/getBillReport`, {
          startDate: SelectedStartDate,
          endDate: SelectedEndDate,
          UserId:UserId
        });

        if (response.status == 200) {
          toast.success(response.data.message);
        //   console.log("order", response.data.OrderDetails);
        //     console.log("Cart", response.data.CartDetails);
            setOrderDetails(response.data.OrderDetails)
            // setCartDetails(response.data.CartDetails)
        } else if(response.status==201){
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log("Error Occurred:", error);
    }
  };

  const handleClearFunc = (e) => {
    e.preventDefault()
    setSelectedStartDate(new Date());
    setSelectedEndDate(new Date());
  };

  //REACT DATA TABLE COLUMNS AND ROWS

  const Column = [
    {
      name: "OrderId",
      selector: (row) => row._doc.OrderId,
      sortable: true,
    },
    {
      name: "Product Name",
      selector: (row) => row._doc.productName,
      sortable: true,
    },
    {
      name: "Product Price",
      selector: (row) => row._doc.productPrice,
      sortable: true,
    },
    {
      name: "Product Quantity",
      selector: (row) => row._doc.productQuantity,
      sortable: true,
    },
    {
      name: "Order Date",
      selector: (row) => row.OrderDate,
      sortable: true,
    },
    {
      name: "Total Cost",
      selector: (row) => row.OrderPrice,
      sortable: true,
    }
   
  ];

  //DATA TABLE SEARCH FILTER OPERATIONS

  const [searchText, setSearchText] = useState("");

  const handleFilterChange = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const filterData = (item) => {
    return Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchText)
    );
  };

  const filteredData = OrderDetails.filter(filterData);

     // API for validating current user using login token

  const DashboardValid = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("UserInfo"));

      // console.log("UserFront", user);
      if (user) {
        const headers = {
          Authorization: user,
          "Content-Type": "application/json",
        };

        let response = await axios.get(`${API_URL}/validUser`, { headers });

        if (response.status == 200) {
          // console.log("homename",response.data.UserData.name);
          setLoginData(response.data.UserData.name);
        } else if (response.status == 201) {
          navigator("/");
        }
      }
    } catch (error) {
      console.log("Error Occurred:", error);
    }
  };
  useEffect(() => {
    DashboardValid();
  
  });

  return (
    <>
      {loginData ? (
        <>
          <div className="report-container">
            <div className="header-card">
              <div className="report-header">
                <h4 className="report-header-content">Billing Report</h4>
              </div>
              <div className="row">
                {/* Product Code */}
                {/* <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12">
              <div className="input-cover">
              <select
                className="input-style"
                value={productCode || ""}
                    onChange={handleProdCode}
                    
              >
                <option value="" disabled>Select Product Code</option>
                {productCodeList.map((code, index) => (
                  <option key={ index+1} value={code}>{code}</option>
                ))}
              </select>
            </div>
          </div> */}
                {/* Billing Start Date */}

                <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12">
                  <div className="input-cover">
                    <div className="DateTimePicker" id="input-cover">
                      <StyledDatePicker
                        selected={SelectedStartDate}
                        onChange={(date) => setSelectedStartDate(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="d MMMM, yyyy h:mm aa"
                        timeCaption="Time"
                        placeholderText="Select Start Date"
                        popperPlacement="bottom"
                      />
                    </div>
                  </div>
                </div>
                {/* Billing End Date */}
                <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12">
                  <div className="input-cover" id="input-cover">
                    <div className="DateTimePicker">
                      <StyledDatePicker
                        selected={SelectedEndDate}
                        onChange={(date) => setSelectedEndDate(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="d MMMM, yyyy h:mm aa"
                        timeCaption="Time"
                        placeholderText="Select End Date"
                        popperPlacement="bottom"
                      />
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12">
                  <div className="report-header-card-buttons">
                    <div className="report-card-search-btn">
                      <button
                        className="btn btn-success"
                        style={{
                          backgroundColor: "green",
                          margin: "0px 10px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onClick={handleSearchFunc}
                      >
                        <FaSearchDollar style={{ marginRight: "8px" }} /> Search
                      </button>
                    </div>
                    <div className="report-card-clear-btn">
                      <button
                        className="btn btn-danger"
                        style={{
                          margin: "0px 10px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onClick={handleClearFunc}
                      >
                        <GrClearOption style={{ marginRight: "8px" }} /> Clear
                      </button>
                    </div>
                  </div>
                </div>
              </div>
                      </div>
                      <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition:Bounce
              />
          </div>

          {/* Data Table */}
          <div className="report-container">
            <div className="row" style={{ marginTop: "20px" }}>
              <div className="col-md-12 col-xl-12 col-lg-12 col-xs-12">
                <div className="table-responsive">
                  {/* SEARCH FILTER */}
                  <div className="searchFilter">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchText}
                      onChange={handleFilterChange}
                    />
                  </div>
                  {/* DATA TABLE */}

                  <DataTable
                    columns={Column}
                    data={filteredData}
                    customStyles={customStyles}
                    pagination
                    paginationPerPage={5}
                    paginationComponentOptions={{
                      noRowsPerPage: true,
                    }}
                    noDataComponent={<div>No matching records found</div>}
                  ></DataTable>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="login-navigator-container">
            <div className="login-navigator-cover">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <h3 className="location-navigator-content">
                    {" "}
                    Please kindly login for getting home page access...
                  </h3>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 button-cover">
                  <Link to="/Login" className="submit-link">
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Report;
