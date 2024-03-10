import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./home.css";
import { ImBin2 } from "react-icons/im";
import { LoginContext } from "../../../Components/Context/ContextProvider";
import axios from "axios";
import API_URL from "../../../../Config/GlobalUrl";
import DropdownFilter from "../../../Components/DropdownFilter/DropdownFilter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const navigator = useNavigate();
  const [nameList, setNameList] = useState([]);
  const { UserId, setUserId } = useContext(LoginContext);
  const { loginData, setLoginData } = useContext(LoginContext);
  const { prodName, setProdName } = useContext(LoginContext);
  const [price, setPrice] = useState(null);
  const [qty, setQty] = useState(null);
  const [cartDetails, setCartDetails] = useState([]);
  const [totalCost, setTotalCost] = useState(null);

    // console.log("UserId", UserId);

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };
  const handleQtyChange = (e) => {
    setQty(e.target.value);
  };


  // API for fetching all cart details

  const fetchCartDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/home/getCartDetails/${UserId}`);

      if (response.status == 200) {
        // console.log(response.data.data);
        setCartDetails(response.data.data);
        let costCopy = 0;

        response.data.data.map((item, index) => {
          costCopy += item.multiPrice;
        })
          // console.log(costCopy);
          setTotalCost(costCopy);
      }
    } catch (error) {
      console.log("Error Occurred:", error);
    }
  };

  // API For Handling onSubmit event functionality (Insert Cart item details in cart table)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!prodName || !price || !qty) {
        toast.error("Please Provide all fields for add item to cart");
      } else {
        const response = await axios.post(`${API_URL}/home/cartInsert`, {
          productName: prodName,
          productPrice: price,
          productQuantity: qty,
          UserId:UserId
        });

        if (response.status == 200) {
          setTimeout(() => {
            toast.success(response.data.message);
          }, 1000);
          fetchCartDetails();
          setProdName(null);
          setPrice(null);
          setQty(null);
        }
      }
    } catch (error) {
      console.log("Error Occurred:", error);
    }
  };

  // API Triggering for fetching all product names from product collection

  const fetchProductNames = async () => {
    try {
      const response = await axios.get(`${API_URL}/home/getProduct`);

      if (response.status == 200) {
        const namesArray = response.data.data.map((obj) => obj.itemName);
        setNameList(namesArray);
        // console.log("namesArray",namesArray)
      }
    } catch (error) {
      console.log("Error Occurred:", error);
    }
  };
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


  // Function for deleting cart items

  const handleDeleteFunc = async (itemId) => {
    // console.log(itemId);
    try {
      const response = await axios.post(`${API_URL}/home/deleteCartItem`, {
        id: itemId,
      });

      if (response.status == 200) {
        toast.success(response.data.message);
        fetchCartDetails();
      }
    } catch (error) {
      console.log("Error Occurred:", error);
    }
  };

  // Function for handling generate bill functionalities

  const handeleGenBillFunc = async () => {
    
    try {

      const response = await axios.post(`${API_URL}/home/genBillCopy`, {
        totalPrice: totalCost,
        UserId:UserId
      })
      
      if (response.status == 200) {
        toast.success(response.data.message);
        fetchCartDetails();


      }
      
    } catch (error) {
      console.log("Error Occured:", error);
}
  }

  useEffect(() => {
    DashboardValid();
    setTimeout(()=>{
      fetchProductNames();
      fetchCartDetails();
    },1000)
  }, [loginData]);

  return (
    <>
      {loginData ? (
        <>
          <div className="home-container">
            <div className="home-header">
              <h3>Farmer Super Market Billing System</h3>
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <div className="home-content-form">
                  <form onSubmit={handleSubmit}>
                    <div className="form-header">
                      <h4>Add Products</h4>
                    </div>
                    {/* Dropdown Filter */}
                    <DropdownFilter data={nameList} />
                    {/* Price Input */}
                    <div className="form-group">
                      <label className="input-label">Product Price</label>
                      <input
                        type="number"
                        className="input-style"
                        value={price || ""}
                        onChange={handlePriceChange}
                        placeholder="0.00"
                        required
                      />
                    </div>
                    {/* Quantity Input */}
                    <div className="form-group">
                      <label className="input-label">Product Quantity</label>
                      <input
                        type="number"
                        className="input-style"
                        value={qty || ""}
                        onChange={handleQtyChange}
                        placeholder="0"
                        required
                      />
                    </div>

                    <button
                      className="btn btn-success"
                      style={{
                        backgroundColor: "green",
                        width: "100%",
                        margin: "10px 0px",
                      }}
                      type="submit"
                    >
                      Add To Cart
                    </button>
                  </form>
                </div>
              </div>
              <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                <div className="container">
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th
                            colSpan={6}
                            className="text-center card-header"
                            style={{ backgroundColor: "#4ab55d" }}
                          >
                            Cart Details
                          </th>
                        </tr>
                        <tr>
                          <th>S.NO</th>
                          <th>Product Name</th>
                          <th>Product Price</th>
                          <th>Product Quantity</th>
                          <th>Total Price</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartDetails.map((item, index) => (
                          <tr key={index + 1}>
                            <td>{index + 1}</td>
                            <td>{item.productName}</td>
                            <td>{item.productPrice}</td>
                            <td>{item.productQuantity}</td>
                            <td>{item.productQuantity * item.productPrice}</td>
                            <td>
                              <div className="cart-details-delete-button">
                                <span
                                  style={{
                                    color: "#dc3545",
                                    cursor: "pointer",
                                  }}
                                >
                                  <ImBin2
                                    onClick={() => handleDeleteFunc(item._id)}
                                  />
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="generate-bill-cover">
                    <h4 className="generate-bill-price">
                      Total Cost = {totalCost}
                    </h4>
                    {/* Generate Bill Button */}

                    <div className="cart-btn-cover">
                      <button className="btn btn-danger" onClick={handeleGenBillFunc}>Generate Bill</button>
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

export default Home;
