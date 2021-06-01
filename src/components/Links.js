import React, { useEffect, useState } from "react";
import LinkForm from "./LinkForm";
import { db } from "../firebase";
import { toast } from "react-toastify";

const Links = () => {
  const [links, setLinks] = useState([]);
  const [currentId, setCurrentId] = useState("");

  useEffect(() => {
    getLinks();
  }, []);

  const getLinks = async () => {
    db.collection("links").onSnapshot((querySnapshot) => {
      // onSnapshot esta siempre escuchando los cambios
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setLinks(docs);
    });
  };

  const addOrEdit = async (linkObject) => {
    try {
        if (currentId === "") {
            await db.collection("links").doc().set(linkObject); // doc-> genera un ID unico, es un evento async
            toast("New link added", {
              type: "success",
              autoClose: 2000,
            });
          } else {
            await db.collection("links").doc(currentId).update(linkObject);
            toast("Link updated successfully", {
              type: "info",
              autoClose: 2000,
            });
            setCurrentId("");
          }
    } catch (error) {
        console.error(error)
    }
  };

  const onDeleteLink = async (id) => {
    window.confirm("Do you want to delete this link?") &&
      (await db.collection("links").doc(id).delete());
    toast("Link removed successfully", {
      type: "success",
      autoClose: 2000,
    });
  };

  return (
    <div>
      <div className="col-md-4 p-2">
        <LinkForm {...{ addOrEdit, currentId, links }} />
      </div>
      <div className="col-md-8 p-2">
        {links.map((link) => (
          <div className="card mb-1" key={link.id}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h4>{link.name_page}</h4>
                <div>
                  <i
                    className="material-icons text-danger"
                    onClick={() => onDeleteLink(link.id)}
                  >
                    delete_sweep
                  </i>
                  <i
                    className="material-icons text-light"
                    onClick={() => setCurrentId(link.id)}
                  >
                    create
                  </i>
                </div>
              </div>
              <p>{link.description}</p>
              <a href={link.url} target="_blank" rel="noreferrer">
                Go to website
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Links;
