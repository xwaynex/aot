"use client";
import React, { useEffect, useState } from "react";
import { useTrackOrdersQuery } from "../../api/apiSlice";
import MyGoogleMap from "@/app/components/myGoogleMap";
import Layout from "../../shared/Layout3";
import map from "../../../../public/map.png";
import guyy from "../../../assets/guy.png";
import protect from "../../../assets/protect.png";
import sms from "../../../assets/sms.png";
import triple from "../../../assets/triple.png";
import Image from "next/image";

const page = () => {
  const { data, error } = useTrackOrdersQuery();
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    if (data && data.status && data.data) {
      setOrderData(data.data);
    }
    if (error) {
      console.error("Error tracking orders:", error);
    }
  }, [data, error]);

  return (
    <Layout>
      <div className=" bg-white w-full  text-black h-auto">
        <div className=" bg-white w-[auto]  flex mt-[55px]">
          <div className="mr-auto w-full ">
            <h1 className="text-black text-[32px] ">Tracking</h1>
          </div>
        </div>

        <div className=" grid grid-cols-12 gap-3 w-[98%] h-[70%] mt-10">
          <div
            className="h-screen col-span-7 flex flex-col  w-full h-auto bg-image bg-cover bg-center "
            // style={{
            //   backgroundImage: `url(${map.src})`,
            // }}
          >
            <div className="flex-grow">
              <MyGoogleMap />
            </div>
          </div>

          <div className="col-span-5 flex flex-col flex-grow h-screen ">
            <div className="flex-grow flex flex-col gap-9">
              <div>
                <h1 className="text-[24px] font-bold">
                  Arriving in 15 Minutes
                </h1>
              </div>

              <div>
                <h1 className="text-[16px]">
                  Suzuki, Red, <span className="font-bold">BEN193US</span>
                </h1>
              </div>

              {/*icons */}
              <div className="grid space-between grid-cols-12">
                <div className="col-span-4 w-[60px] h-[60px] rounded-full bg-[#D4D4D4] grid place-content-center">
                  <Image src={guyy} alt="" width="" height="" />
                </div>
                <div className="col-span-4 w-[60px] h-[60px] rounded-full bg-[#D4D4D4] grid place-content-center">
                  <Image src={protect} alt="" width="" height="" />
                </div>
                <div className="col-span-4 w-[60px] h-[60px] rounded-full bg-[#D4D4D4] grid place-content-center">
                  <Image src={sms} alt="" width="" height="" />
                </div>
              </div>

              <div className="border border-[#d4d4d4]"></div>

              <div className="flex flex-col gap-3">
                <h1 className="text-[24px] font-bold">Goods</h1>
                <h1 className="text-[16px]">Apple Airpods (1)</h1>
              </div>
              <div className="flex flex-col gap-3">
                <h1 className="text-[24px] font-bold">Recipient</h1>
                <h1 className="text-[16px]">Tobias Isaac </h1>
              </div>
            </div>

            <div>
              {orderData && (
                <div>
                  <h2>Order Details</h2>
                  <p>Order ID: {orderData.id}</p>
                  <p>Vehicle: {orderData.vehicle}</p>
                  <p>Item: {orderData.item}</p>
                  <p>From: {orderData.from}</p>
                  <p>To: {orderData.to}</p>
                  <p>Cost: {orderData.cost}</p>
                  <p>Date: {orderData.date}</p>
                </div>
              )}
            </div>

            <div className="footer w-full  grid mb-36 place-content-center">
              <button className="  grid grid-cols-12 items-center  bottom-2 m-3 rounded-lg border bg-[#d4d4d4] py-3 px-20 text-[16px] text-center">
                <h1 className="col-span-11 text-black font-bold">
                  Cancel Pickup
                </h1>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default page;
