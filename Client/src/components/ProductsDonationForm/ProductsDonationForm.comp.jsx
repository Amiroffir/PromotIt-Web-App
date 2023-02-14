import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { addNewProducts } from "../../services/BusinessRep.services";
import { ToastContainer } from "react-toastify";
import { notify } from "../../services/Notifications.services";
import { useParams } from "react-router-dom";
import "./style.css";

export const ProductsDonationForm = () => {
  const { campaignID } = useParams();
  console.log(campaignID);
  const { user } = useAuth0();
  const [productsTodonate, setProductsTodonate] = useState([]);
  const [newProduct, setNewProduct] = useState({
    listID: "",
    productID: "",
    productName: "",
    price: "",
    donatedBy: user.email,
    donatedTo: campaignID,
    Image: "",
  });

  const addToProductsList = (newProduct) => {
    newProduct.listID = Math.random().toString(36).substring(2, 9); // generate a random listID
    console.log(newProduct);

    // validation for empty fields
    if (!newProduct.productID || !newProduct.productName || !newProduct.price) {
      notify("error", "Please fill all the fields");
      return;
    }
    setProductsTodonate([...productsTodonate, newProduct]); // add new product to the list
    // clear the input fields
    document.querySelectorAll("input").forEach((input) => (input.value = ""));
    setNewProduct({ ...newProduct, productID: "", productName: "", price: "" });
    console.log(productsTodonate);
  };
  const handleRemove = (listID) => {
    // filter the products to remove the product with the given productID
    const newProducts = productsTodonate.filter(
      (product) => product.listID !== listID
    );
    setProductsTodonate(newProducts); // set the new products list
  };

  const handleSubmit = () => {
    console.log(productsTodonate);
    let added = addNewProducts(productsTodonate); // add products to the database
    if (added) {
      notify("success", "Products added successfully");
      setProductsTodonate([]); // clear the products to add list view
    } else {
      notify("error", "Something went wrong");
    }
  };

  return (
    <>
      <div className="donations-container">
        <div className="donations-container__left">
          <div className="input">
            <input
              className="form-control"
              type="text"
              name="productID"
              placeholder="Product ID"
              required
              onChange={(o) => {
                setNewProduct({ ...newProduct, productID: o.target.value });
              }}
            />
          </div>
          <div className="input">
            <input
              className="form-control"
              type="text"
              name="productName"
              placeholder="Product Name"
              required
              onChange={(o) => {
                setNewProduct({ ...newProduct, productName: o.target.value });
              }}
            />
          </div>
          <div className="input">
            <input
              className="form-control"
              type="decimal"
              name="price"
              placeholder="Value($)"
              required
              onChange={(o) => {
                setNewProduct({ ...newProduct, price: o.target.value });
              }}
            />
          </div>
          <div className="input">
            <input
              className="form-control"
              type="text"
              name="Image"
              placeholder="Image URL"
              onChange={(o) => {
                setNewProduct({ ...newProduct, Image: o.target.value });
              }}
            />
          </div>
          <div>
            <button
              onClick={() => addToProductsList(newProduct)}
              className="btn add-product-btn"
            >
              Add To List
            </button>
          </div>
        </div>
        <div className="donations-container__right">
          <ToastContainer />
          {productsTodonate && ( // if productsTodonate is not empty
            <div className="prd-toAdd-tbl">
              <table className="table table-striped ">
                <thead>
                  <tr>
                    <th scope="col">Product ID</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Value($)</th>
                    <th scope="col"> </th>
                  </tr>
                </thead>
                <tbody>
                  {productsTodonate.map((product) => (
                    <tr key={product.productID}>
                      <td>{product.productID}</td>
                      <td>{product.productName}</td>
                      <td>{product.price}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleRemove(product.listID)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {productsTodonate.length > 0 && ( // if productsTodonate is not empty}
            <button
              onClick={() => handleSubmit()}
              className="btn add-product-btn"
            >
              Donate
            </button>
          )}
        </div>
      </div>
    </>
  );
};
