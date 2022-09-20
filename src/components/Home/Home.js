import React, { useState, useEffect } from "react";
import "./Home.css";
import top from "../images/top.png";
import mid from "../images/mid.png";
import bottom from "../images/bottom.png";
import logo from "../images/Logo.png";
import mainlogo from "../images/mainlogo.png";
// import {Link} from 'react-router-dom'

const Home = () => {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [toggle1, setToggle1] = useState(true);
  const [toggle2, setToggle2] = useState(true);

  useEffect(() => {
    // console.log(input)
    // console.log(data)
    fetch(
      `https://staging.staging.b2brain.com/search/autocomplete_org_all/?q=${input}`
    )
      .then((res) => res.json())
      .then((result) => {
        //  console.log(result)
        setData(result);
      });
  }, [input]);

  const getdata = (e) => {
    setInput(e.target.value);
  };

  const removeData = () => {
    setInput("");
    setData([]);
  };

  return (
    <>
      <div className="home">
        {/* searchbar--- */}
        <div className="left_section">
          <h4>
            {" "}
            <img src={mainlogo} alt="" /> B2Brain
          </h4>

          <div className="leftbar">
            <div className="option">
              <i className="bi bi-house-door "></i>
              <h6>Dashboard</h6>
            </div>
            <div className="option">
              <i className="bi bi-star"></i>
              <h6>Intel</h6>
            </div>
            <div className="option">
              <i className="bi bi-gear"></i>
              <h6>Leads</h6>
            </div>

            {toggle1 === true ? (
              <div className="option" onClick={(e) => setToggle1(!toggle1)}>
                {" "}
                <i className="bi bi-file-earmark-text"></i>
                <h6>Accounts</h6>
                <div className="toggle">
                  <i className="bi bi-chevron-compact-down right_icon"></i>
                </div>
              </div>
            ) : (
              <div className="option" onClick={(e) => setToggle1(!toggle1)}>
                {" "}
                <i className="bi bi-file-earmark-text"></i>
                <h6>Accounts</h6>
                <div className="toggle">
                  <i className="bi bi-chevron-compact-up right_icon"></i>
                  <div className="toggle_content   toggle1">
                    <div className="toggle_option">Manage all</div>
                    <div className="toggle_option">Track New Account</div>
                    <div className="toggle_option">Bulk Import</div>
                  </div>
                </div>
              </div>
            )}

            {toggle2 === true ? (
              <div className="option" onClick={(e) => setToggle2(!toggle2)}>
                <i className="bi bi-gear"></i>
                <h6>Preferences</h6>
                <div className="toggle">
                  <i className="bi bi-chevron-compact-down right_icon"></i>
                </div>
              </div>
            ) : (
              <div className="option" onClick={(e) => setToggle2(!toggle2)}>
                <i className="bi bi-gear"></i>
                <h6>Preferences</h6>
                <div className="toggle">
                  <i className="bi bi-chevron-compact-up right_icon"></i>
                  <div className="toggle_content">
                    <div className="toggle_option">Product Focus </div>
                    <div className="toggle_option">Intel Preferences</div>
                    <div className="toggle_option">Lead Persona</div>
                  </div>
                </div>
              </div>
            )}

            <div className="option">
              <i className="bi bi-paperclip"></i>
              <h6>Integration</h6>
            </div>
            <div className="option">
              <i className="bi bi-microsoft-teams"></i>
              <h6>Teams</h6>
            </div>
            <div className="option">
              <i className="bi bi-chat-square"></i>
              <h6>Help/Support</h6>
            </div>
          </div>
        </div>
        <div className="right_section">
          <nav className="nav">
            <div className="nav_icon">
              {input.length === 0 ? (
                <i className="bi bi-search" style={{ fontSize: "1.5rem" }}></i>
              ) : (
                <i
                  className="bi bi-x-lg"
                  style={{ fontSize: "1.5rem" }}
                  onClick={removeData}
                ></i>
              )}
            </div>
            <input
              type="text"
              name=""
              id=""
              value={input}
              placeholder="Search by account name or website"
              onChange={getdata}
            />
            <div className="nav_logo">
              <div className="logo1">
                <i className="bi bi-bell  " style={{ fontSize: "1rem" }}></i>
              </div>
              <div className="logo2">
                <img src={logo} alt="" />
              </div>
            </div>
          </nav>

          {input === "" ? (
            <div className="right_bottom">
              <img src={top} alt="" className="right_bottom_images" />
              <img src={mid} alt="" className="right_bottom_images" />
              <img src={bottom} alt="" className="right_bottom_images" />
            </div>
          ) : (
            <div className="search_results">
              {data
                ? data.map((items, index) => {
                    return (
                      <div className="search_result" key={index}>
                        {/* {items.logo = "" ?"hello" : <img style={{width:"100px",height:"100px", color:"green"}} src={items.logo} alt="" />} */}
                        <h4 className="logo">{items.company.charAt(0)}</h4>

                        <div className="company_name">{items.company}</div>
                        <button
                          onClick={(e) => {
                            console.log(
                              "Company Name:- " +
                                items.company +
                                "\n" +
                                "Slug:- " +
                                items.slug +
                                "\n" +
                                "Logo:- " +
                                (items.logo ? items.logo : "No logo") +
                                "\n" +
                                "Website:- " +
                                items.website
                            );
                          }}
                        >
                          {" "}
                          Track{" "}
                        </button>
                      </div>
                    );
                  })
                : "loading..."}
            </div>
          )}
        </div>{" "}
        {/* <div className="side_right">
      <h4>Quick Actions</h4>
      <h6 className="option">Track new account</h6>
      <h6 className="option">Bulk track accounts</h6>
      <h6 className="option">Manage accounts</h6>
  </div> */}
      </div>
    </>
  );
};

export default Home;
