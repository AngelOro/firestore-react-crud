import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { toast } from "react-toastify";

const LinkForm = (props) => {
  const initialStateValues = {
    url: "",
    name_page: "",
    description: "",
  };

  const [values, setValues] = useState(initialStateValues);

  const validURL = (str) => {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  };

  const handleInputChange = (e) => {
    //name: name del inout y value su valor
    const { name, value } = e.target;
    setValues({ ...values, [name]: value }); //... valores actuales, alteras el input con el valor actual
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validURL(values.url)) {
      return toast("URL invalid", { type: "warning", autoClose: 1000 });
    }
    props.addOrEdit(values);
    setValues({ ...initialStateValues });
  };

  const getLinkById = async (id) => {
    const dataLink = await db.collection("links").doc(id).get();
    setValues({ ...dataLink.data() });
  };

  useEffect(() => {
    props.currentId === ""
      ? setValues({ ...initialStateValues })
      : getLinkById(props.currentId);
  }, [props.currentId]);

  return (
    <form className="card card-body" onSubmit={handleSubmit}>
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons text-secondary">insert_link</i>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="URL"
          name="url"
          onChange={handleInputChange}
          value={values.url}
        />
      </div>
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons text-secondary">create</i>
        </div>
        <input
          type="text"
          className="form-control"
          name="name_page"
          placeholder="Name"
          onChange={handleInputChange}
          value={values.name_page}
        />
      </div>
      <div className="form-group">
        <textarea
          name="description"
          rows="3"
          className="form-control"
          placeholder="Write a description"
          onChange={handleInputChange}
          value={values.description}
        ></textarea>
      </div>
      <button className="btn btn-primary btn-block">
        {props.currentId === "" ? "Save" : "Update"}
      </button>
    </form>
  );
};

export default LinkForm;
