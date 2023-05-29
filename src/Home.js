import "./style.css";
import { SearchOutlined } from "@ant-design/icons";
import { message } from "antd";
//img
import sunn from "./assets/imgs/sunn.png";
import wind from "./assets/imgs/wind.png";
import humidity from "./assets/imgs/humidity.png";
import clouds from "./assets/imgs/clouds.png";
import rain from "./assets/imgs/rain.png";
//
import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [data, SetData] = useState({
    celsius: 10,
    name: "Ha Noi",
    humidity: 10,
    speed: 2,
    img: clouds,
  });
  const [name, SetName] = useState("");

  const handlecick = () => {
    // console.log(name);
    if (name !== "") {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=4140a55d8559edcfaa8e2c990c6cb77d&units=metric`
        )
        .then((res) => {
          console.log(res.data);
          let imagePath = "";
          if ((res.data.weather[0].main = "Clouds")) {
            imagePath = clouds;
          } else if ((res.data.weather[0].main = "Rain")) {
            imagePath = rain;
          } else {
            imagePath = sunn;
          }

          SetData({
            ...data,
            celsius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
            img: imagePath,
          });
          console.log(data.imagePath);
        })
        .catch((err) => {
          message.error("Không có dữ liệu");
        });
    }
  };
  return (
    <div className="container">
      <div className="weather">
        <div className="search">
          <input
            className="share-txt"
            type="text"
            placeholder="Enter city name....."
            onChange={(e) => {
              SetName(e.target.value);
            }}
          />
          <button className="share-btn" onClick={handlecick}>
            <SearchOutlined />
          </button>
        </div>
        <div className="winfo">
          <img
            className="icon"
            style={{
              height: "120px",
              margin: "30px auto",
            }}
            src={data.img}
            alt="#"
          />
          <h1>{data.celsius}°C</h1>
          <h2>{data.name}</h2>
        </div>
        <div className="details">
          <div className="col">
            <img
              style={{
                height: "50px",
              }}
              src={wind}
              alt="#"
            />
            <div className="wind">
              <p>{data.speed}km/h</p>
              <p>Sức gió</p>
            </div>
          </div>
          <div className="col">
            <img
              style={{
                height: "50px",
              }}
              src={humidity}
              alt="#"
            />
            <div className="humidity">
              <p>{data.humidity}%</p>
              <p>Độ ẩm</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
