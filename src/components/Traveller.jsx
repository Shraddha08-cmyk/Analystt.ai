import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Pagination,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const Traveller = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedCards, setExpandedCards] = useState({});

  useEffect(() => {
    fetch(
      `https://jsonplaceholder.typicode.com/users?_page=${currentPage}&_limit=3`
    )
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [currentPage]);

  const handleChangePage = (event, page) => {
    setCurrentPage(page);
  };

  const handleToggleCard = (userId) => {
    setExpandedCards((prevExpandedCards) => ({
      ...prevExpandedCards,
      [userId]: !prevExpandedCards[userId],
    }));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        alignItems: "center",
      }}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        userData.map((user) => (
          <Card
            key={user.id}
            style={{
              height: expandedCards[user.id] ? "100vh" : "25vh",
              borderRadius: 10,
              width: "90vw",
              margin: 10,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 50,
            }}
          >
            <CardContent>
              <Typography
                component={"div"}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "13%",
                }}
              >
                <p style={{ fontSize: "15px" }}>{user.company.name}</p>
                <Typography component={"div"}>
                  <Typography style={{ fontSize: "14px", fontWeight: 900 }}>
                    Contact
                  </Typography>
                  <p style={{ fontSize: "15px" }}>{user.name}</p>
                </Typography>
                <Typography component={"div"}>
                  <Typography style={{ fontSize: "14px", fontWeight: 900 }}>
                    City
                  </Typography>
                  <p style={{ fontSize: "15px" }}>{user.address.city}</p>
                </Typography>
                <Typography component={"div"}>
                  <Typography style={{ fontSize: "14px", fontWeight: 900 }}>
                    State
                  </Typography>
                  <p style={{ fontSize: "15px" }}>No Data</p>
                </Typography>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "red",
                    borderRadius: "50px",
                    textTransform: "capitalize",
                  }}
                  onClick={() => handleToggleCard(user.id)}
                >
                  {expandedCards[user.id] ? "Hide Details" : "View Details"}
                </Button>
              </Typography>
              {expandedCards[user.id] && (
                <Card style={{ borderRadius: 10 }}>
                  <CardContent style={{ textAlign: "left" }}>
                    <Typography style={{ fontSize: "14px", fontWeight: 900 }}>
                      Description
                    </Typography>
                    <p style={{ fontSize: "15px" }}>
                      {user.company.catchPhrase}
                    </p>
                    <div style={{ display: "flex", gap: "20%" }}>
                      <div>
                        <Typography
                          style={{ fontSize: "14px", fontWeight: 900 }}
                        >
                          ContactPerson
                        </Typography>
                        <p style={{ fontSize: "15px" }}>{user.name}</p>
                        <Typography
                          style={{ fontSize: "14px", fontWeight: 900 }}
                        >
                          Designation
                        </Typography>
                        <p style={{ fontSize: "15px" }}>No Data</p>
                        <Typography
                          style={{ fontSize: "14px", fontWeight: 900 }}
                        >
                          Emails
                        </Typography>
                        <p style={{ fontSize: "15px" }}>{user.email}</p>
                        <Typography
                          style={{ fontSize: "14px", fontWeight: 900 }}
                        >
                          Phones
                        </Typography>
                        <p style={{ fontSize: "15px" }}>{user.phone}</p>
                      </div>
                      <div>
                        <Typography
                          style={{ fontSize: "14px", fontWeight: 900 }}
                        >
                          Address
                        </Typography>
                        <p style={{ fontSize: "15px" }}>
                          {user.name}
                          {user.address.street}
                          {user.address.suite}
                          {user.address.zipcode}
                        </p>
                        <Typography
                          style={{ fontSize: "14px", fontWeight: 900 }}
                        >
                          City
                        </Typography>
                        <p style={{ fontSize: "15px" }}>{user.address.city}</p>
                        <Typography
                          style={{ fontSize: "14px", fontWeight: 900 }}
                        >
                          State
                        </Typography>
                        <p style={{ fontSize: "15px" }}>No Data</p>
                        <Typography
                          style={{ fontSize: "14px", fontWeight: 900 }}
                        >
                          Country
                        </Typography>
                        <p style={{ fontSize: "15px" }}>No Data</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        ))
      )}
      <Pagination
        count={4}
        variant="outlined"
        shape="rounded"
        page={currentPage}
        onChange={handleChangePage}
        color="secondary"
      />
    </div>
  );
};

export default Traveller;
