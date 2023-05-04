import React, { useState } from "react";
import { User, useAuth0 } from "@auth0/auth0-react";
import { addNewProducts } from "../../services/BusinessRep.services";
import { ToastContainer } from "react-toastify";
import { notify } from "../../services/Notifications.services";
import { Params, useParams } from "react-router-dom";
import "./style.css";
import { Product } from "../../interfaces/interfaces";
import { Notify } from "../../interfaces/enums";

export const ProductsDonationForm = () => {
  const { campaignID }: Params<string> = useParams<string>();
  const { user }: User = useAuth0();
  const [productsTodonate, setProductsTodonate] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({
    donatedBy: user.email,
    donatedTo: campaignID,
  } as Product);

  const addToProductsList = (newProduct: Product) => {
    console.log(newProduct);
    newProduct.listID = Math.random().toString(36).substring(2, 9); // generate a random listID
    console.log(newProduct);

    // validation for empty fields
    if (!newProduct.productID || !newProduct.productName || !newProduct.price) {
      notify(Notify.Error, "Please fill all the fields");
      return;
    }
    setProductsTodonate([...productsTodonate, newProduct]); // add new product to the list
    // clear the input fields
    document.querySelectorAll("input").forEach((input) => (input.value = ""));
    setNewProduct({
      donatedBy: user.email,
      donatedTo: campaignID,
    } as Product);
    console.log(productsTodonate);
  };
  const handleRemove = (listID: string | undefined) => {
    if (!listID) return;
    // filter the products to remove the product with the given productID
    const newProducts = productsTodonate.filter(
      (product: Product) => product.listID !== listID
    );
    setProductsTodonate(newProducts); // set the new products list
  };

  const handleSubmit = () => {
    console.log(productsTodonate);
    addNewProducts(productsTodonate).then((added: boolean) => {
      // add products to the database
      if (added) {
        notify(Notify.Success, "Products added successfully");
        setProductsTodonate([]); // clear the products to add list view
      } else {
        notify(Notify.Error, "Something went wrong");
      }
    });
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
                setNewProduct({
                  ...newProduct,
                  productID: parseInt(o.target.value),
                });
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
                // Conversion to integer
                //
                setNewProduct({
                  ...newProduct,
                  price: parseInt(o.target.value),
                });
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
                setNewProduct({ ...newProduct, image: o.target.value });
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
                  {productsTodonate.map((product: Product) => (
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
