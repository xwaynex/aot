"use client";
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
  useLoadScript,
  DistanceMatrixService,
  GoogleMap,
} from "@react-google-maps/api"; // Import DistanceMatrixService and GoogleMap
import MyGoogleMap from "@/app/components/myGoogleMap";
import PlacesAutocompleteComponent from "@/app/components/PlacesAutocomplete";
// import usePlacesAutocomplete, {
//   // getGeocode,
//   // getLatLng,
// } from "use-places-autocomplete"; // react-places-autocomplete
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import {
  useCreateAnOrderMutation,
  usePayForOrderMutation,
} from "../../api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  updateField,
  resetForm,
  updateCoordinates,
} from "../../../store/slice/pickUpDetailsSlice";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import Layout from "../../shared/Layout3";
import map from "../../../../public/map.png";
import triple from "../../../assets/triple.png";
import Image from "next/image";
import delv1 from "../../../assets/delv1.png";
import delv2 from "../../../assets/delv2.png";
import delv3 from "../../../assets/delv3.png";
import dine from "../../../assets/dine.png";
import car from "../../../assets/car.png";
import truck from "../../../assets/truck.png";
import cash from "../../../assets/cash.png";
import wallet from "../../../assets/wallet.png";
import cc from "../../../assets/cc.png";

const page = () => {
  const [uiState, setUiState] = useState("home");

  const [selected, setSelected] = useState(null);

  const [pickUpDropDown, setPickUpDropDown] = useState(false);
  const [deliveryDropDown, setDeliveryDropDown] = useState(false);
  // const [selectedAddress, setSelectedAddress] = useState('');

  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [senderAddress, setSenderAddress] = useState(""); // Define senderAddress
  const [recipientAddress, setRecipientAddress] = useState(""); // Define recipientAddress

  const [createAnOrderMutation] = useCreateAnOrderMutation();
  const [payForOrder] = usePayForOrderMutation();

  const [paymentDetails, setPaymentDetails] = useState({
    cardId: 12,
    payment_method: "card",
    order_id: 23,
    save_card: true,
  });

  const [bodyParameters, setBodyParameters] = useState({
    sender_name: "",
    sender_phone_number: "",
    item_category: "",
    quantity: "",
    delivery_description: "",
    recipient_name: "",
    recipient_phone_number: "",
    recipient_address: "",
    sender_address: "",
    origin: {
      latitude: 0,
      longitude: 0,
    },
    destination: {
      latitude: 0,
      longitude: 0,
    },
    selected_vehicle: null,
    estimated_time: null,
  });
  console.log("Bodypara", bodyParameters);

  /* const calculateDistance = () => {
    const directionsService = new window.google.maps.DirectionsService();
    const distanceMatrixService =
      new window.google.maps.DistanceMatrixService();

    const request = {
      origin,
      destination,
      travelMode: "DRIVING",
    };

    directionsService.route(request, (response, status) => {
      if (status === "OK") {
        const { routes } = response;
        const route = routes[0];
        setDistance(route.legs[0].distance.text);
        setDuration(route.legs[0].duration.text);

        const distanceMatrixRequest = {
          origins: [route.legs[0].start_address],
          destinations: [route.legs[0].end_address],
        };

        distanceMatrixService.getDistanceMatrix(
          distanceMatrixRequest,
          (distanceResponse, distanceStatus) => {
            if (distanceStatus === "OK") {
              const element = distanceResponse.rows[0].elements[0];
              setDistance(element.distance.text);
              setDuration(element.duration.text);
            }
          }
        );
      }
    });
  }; */

  const handleRequestClick = () => {
    // Toggle the state when the button is clicked
    setUiState("requestPickup");
  };

  /*  const handleBackClick = () => {
    // Switch to the previous state when the back button is clicked
    if (uiState === "requestPickup") {
      setUiState("home");
    } else if (uiState === "proceedToPay") {
      setUiState("requestPickup");
    }
  }; */

  /**
   * TODO: Update to use setBodyParameters()
   * @param {*} e Input event
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (
      // name === "sender_phone_number" ||
      // name === "quantity" ||
      // name === "recipient_phone_number"
      ["recipient_phone_number", "quantity", "sender_phone_number"].includes(
        name
      )
    ) {
      // dispatch(updateField({ field: name, value: parseInt(value, 10) })); // Convert to integer
      setBodyParameters((prevState) => ({
        ...prevState,
        [name]: value, // parseInt(value, 10) // Temporary solution
      }));
    } else {
      // dispatch(updateField({ field: name, value }));
      setBodyParameters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleProceedToPay = async () => {
    try {
      const response = await createAnOrderMutation({
        body: bodyParameters, // Make sure to pass the body as an object
      });
      console.log("Order created successfully:", response);
      setUiState("proceedToPay");
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  /* const handleProceedToPay = () => {
    // dispatch(
    //   updateField({
    //     field: type === "sender" ? "sender_address" : "recipient_address",
    //     value: selectedAddress,
    //   })
    // );

    // Assuming `form` contains the data you want to send
    createAnOrder(bodyParameters)
      // .unwrap()
      .then((response) => {
        console.log("Data sent successfully!", response);
        dispatch(resetForm());
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });

    setUiState("proceedToPay");
  }; */

  const handlePayForOrder = async () => {
    try {
      const response = await payForOrder(
        paymentDetails.order_id,
        paymentDetails
      );
      console.log("Payment successful:", response);
    } catch (error) {
      console.error("Error making payment:", error);
    }

    if (uiState === "requestPickup") {
      setUiState("home");
    } else if (uiState === "proceedToPay") {
      setUiState("requestPickup");
    }
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({
      ...paymentDetails,
      [name]: value,
    });
  };

  //Google map api configuration\
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: useMemo(() => ["places"], []),
  });

  //GoogleMapsDistanceCalculator

  // const handleInputChange = (e) => {
  //   // Handle input changes if needed
  // };

  const handleSenderSelect = (address, coordinates) => {
    setSenderAddress(address); // Update senderAddress
    setBodyParameters((prevState) => ({
      ...prevState,
      sender_address: address, // Update sender address
      origin: coordinates, // Update origin coordinates
    }));
  };

  const handleRecipientSelect = (address, coordinates) => {
    setRecipientAddress(address); // Update recipientAddress
    setBodyParameters((prevState) => ({
      ...prevState,
      recipient_address: address, // Update recipient address
      destination: coordinates, // Update destination coordinates
    }));
  };

  const handleVehicleSelect = (vehicle) => {
    setBodyParameters((prevState) => ({
      ...prevState,
      selected_vehicle: vehicle,
      estimated_time: null,
    }));
    
    if (vehicle && bodyParameters.origin && bodyParameters.destination) {
      const mode = vehicle === "bike" ? "BICYCLING" : "DRIVING"; // Adjust mode for truck if needed
      const origin = new google.maps.LatLng(
        bodyParameters.origin.latitude,
        bodyParameters.origin.longitude
      );
      const destination = new google.maps.LatLng(
        bodyParameters.destination.latitude,
        bodyParameters.destination.longitude
      );

      const service = new google.maps.DistanceMatrixService();

      service.getDistanceMatrix(
        {
          origins: [origin],
          destinations: [destination],
          travelMode: google.maps.TravelMode[mode],
          unitSystem: google.maps.UnitSystem.IMPERIAL,
        },
        (response, status) => {

          if (status === "OK") {
          if (response.rows[0].elements[0].status === "OK") {
            const duration = response.rows[0].elements[0].duration.text;
            setBodyParameters((prevState) => ({
              ...prevState,
              estimated_time: duration,
            }));
          } else if (response.rows[0].elements[0].status === "ZERO_RESULTS") {
            setBodyParameters((prevState) => ({
              ...prevState,
              estimated_time: "No route found",
            }));
          } else {
            console.error("Error calculating estimated time:", response.rows[0].elements[0].status);
          }
        } else {
          console.error("Error calculating estimated time:", status);
        }
        
        }
      );
    }
  };

  /* const PlacesAutocomplete = ({ type }) => {
    const {
      ready,
      value,
      setValue,
      suggestions: { status, data },
      clearSuggestions,
    } = usePlacesAutocomplete({
      debounce: 500,
    });

    const handleInput = (e) => {
      // Update the keyword of the input element
      setValue(e.target.value);

    };

    const handleSelect = async (address) => {
      console.log("Selected address:", address);

      setValue(address, false);
      clearSuggestions();

      const results = await getGeocode({ address });
      const { lat, lng } = getLatLng(results[0]);

      // if (type === "sender") {
      //   setBodyParameters((prevState) => ({
      //     ...prevState,
      //     sender_address: address,
      //     origin: { latitude: lat, longitude: lng },
      //   }));

      // } else if (type === "recipient") {
      //   setBodyParameters((prevState) => ({
      //     ...prevState,
      //     recipient_address: address,
      //     destination: { latitude: lat, longitude: lng }, // Update destination coordinates
      //   }));

      // }
    };

    return (
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          // disabled={!ready}
          className="combobox_input"
          placeholder="Enter address"
        />
        {status === "OK" && (
          <ComboboxPopover>
            <ComboboxList>
              {data.map((suggestion) => (
                <ComboboxOption key={suggestion.place_id} value={suggestion.description} />
              ))}
            </ComboboxList>
          </ComboboxPopover>
        )}
      </Combobox>
    );
  }; */

  // Check if the script has loaded successfully
  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps...";

  return (
    <Layout>
      {uiState === "requestPickup" && (
        // New UI
        <div>
          <div className=" bg-white w-full  text-black h-auto">
            <div className=" bg-white w-[auto]  flex mt-[55px]">
              <div className="mr-auto w-full ">
                <h1 className="text-black text-[32px] ">Request Pickup</h1>
              </div>
            </div>

            <div className=" grid grid-cols-12 gap-3 w-[95%] h-[70%] mt-10">
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
                <div className="flex-grow flex py-3 flex-col gap-9">
                  <div className="flex flex-col gap-3">
                    <div className="w-full px-5 grid grid-cols-12 flex space py-2 px-5 rounded-sm around bg-[#d4d4d4]">
                      <div className="col-span-1">
                        <Image alt="" src={delv1} />
                      </div>
                      <div className="col-span-11 flex justify-between font-bold">
                        <h1>Pickup Details</h1>
                        <p
                          className="text-[24px] text-[#FF7D00] cursor-pointer"
                          onClick={() => {
                            setPickUpDropDown(!pickUpDropDown);
                          }}
                        >
                          +
                        </p>
                      </div>

                      {pickUpDropDown && (
                        <div className="w-full">
                          <label htmlFor="sender_name">Sender Name:</label>
                          <input
                            type="text"
                            id="sender_name"
                            name="sender_name"
                            value={bodyParameters.sender_name}
                            onChange={handleInputChange}
                          />
                          <br />
                          <label htmlFor="sender_phone_number">
                            Phone Number:
                          </label>
                          <input
                            type="tel"
                            id="sender_phone_number"
                            name="sender_phone_number"
                            value={bodyParameters.sender_phone_number}
                            onChange={handleInputChange}
                          />
                          <br />
                          <label htmlFor="item_category">Item Category:</label>
                          <input
                            type="text"
                            id="item_category"
                            name="item_category"
                            value={bodyParameters.item_category}
                            onChange={handleInputChange}
                          />
                          <br />
                          <label htmlFor="quantity">Quantity:</label>
                          <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={bodyParameters.quantity}
                            onChange={handleInputChange}
                          />
                        </div>
                      )}

                      {/* <p className='text-[24px] text-[#FF7D00]' onClick={pickUpDetails}>+</p></div> */}
                    </div>

                    <div className="w-full px-5 grid grid-cols-12 flex space py-2 px-5 rounded-sm around bg-[#d4d4d4]">
                      <div className="col-span-1">
                        <Image alt="" src={delv2} />
                      </div>
                      <div className="col-span-11 flex justify-between font-bold">
                        <h1>Delivery Details</h1>

                        <p
                          className="text-[24px] text-[#FF7D00] cursor-pointer"
                          onClick={() => {
                            setDeliveryDropDown(!deliveryDropDown);
                          }}
                        >
                          +
                        </p>
                      </div>

                      {deliveryDropDown && (
                        <div className="w-full">
                          {/* Add input fields for delivery details */}
                          <label htmlFor="delivery_description">
                            Delivery Description:
                          </label>
                          <input
                            type="text"
                            id="delivery_description"
                            name="delivery_description"
                            value={bodyParameters.delivery_description}
                            onChange={handleInputChange}
                          />
                          <br />
                          <label htmlFor="recipient_name">
                            Recipient Name:
                          </label>
                          <input
                            type="text"
                            id="recipient_name"
                            name="recipient_name"
                            value={bodyParameters.recipient_name}
                            onChange={handleInputChange}
                          />
                          <br />
                          <div className="places_container">
                            <label htmlFor="recipient_address">
                              Recipient Address:
                            </label>

                            <PlacesAutocompleteComponent
                              value={recipientAddress} // Use recipientAddress as value
                              onChange={(e) =>
                                setRecipientAddress(e.target.value)
                              } // Update recipientAddress on change
                              onSelect={handleRecipientSelect}
                            />
                            {/* <PlacesAutocomplete
                              type="recipient"
                              id="recipient_address"
                              name="recipient_address"
                              // value={bodyParameters.recipient_address}
                              // onChange={(e) => {
                              //   console.log('e', e)
                              // }}
                            /> */}
                          </div>
                          <br />
                          <label htmlFor="recipient_phone_number">
                            Recepient Phone Number:
                          </label>
                          <input
                            type="tel"
                            title="Phone number must be in the format: +1234567890."
                            id="recipient_phone_number"
                            name="recipient_phone_number"
                            value={bodyParameters.recipient_phone_number}
                            onChange={handleInputChange}
                          />
                          <br />
                          <div className="places_container">
                            <label htmlFor="sender_address">
                              Senders Address:
                            </label>

                            <PlacesAutocompleteComponent
                              value={senderAddress} // Use senderAddress as value
                              onChange={(e) => setSenderAddress(e.target.value)} // Update senderAddress on change
                              onSelect={handleSenderSelect}
                            />
                            {/* <PlacesAutocomplete
                              type="sender"
                              id="sender_address"
                              name="sender_address"
                              // value={bodyParameters.sender_address}
                              onChange={(e) => {
                                console.log('e', e)
                              }}
                            /> */}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="w-full px-5 grid grid-cols-12 flex space py-2 px-5 rounded-sm around bg-[#d4d4d4]">
                      <div className="col-span-1">
                        <Image alt="" src={delv3} />
                      </div>
                      <div className="col-span-11 flex justify-between font-bold">
                        <h1>Select delivery vehicle</h1>
                        <p className="text-[24px] text-[#FF7D00]"></p>
                      </div>
                    </div>
                  </div>

                  {/*icons */}
                  {/* <div className="grid place-content-center grid-cols-auto gap-2">
                    <div className="flex place-content-center gap-2">
                      <div
                        className="col-span-4 h-[120px] w-[90px] border bg-[#ff7d00] grid place-content-center cursor-pointer"
                        onClick={() => {
                          setBodyParameters((prevState) => ({
                            ...prevState,
                            selected_vehicle: 'bike'
                          }))
                        }}
                      >
                        <Image src={dine} alt="" width="" height="" />
                        <h1 className="text-center text-white">Bike</h1>
                      </div>

                      <div
                        className="col-span-4 h-[120px] w-[90px] border border-[#ff7d00] grid place-content-center cursor-pointer"
                        onClick={() => {
                          setBodyParameters((prevState) => ({
                            ...prevState,
                            selected_vehicle: 'car'
                          }))
                        }}
                      >
                        <Image src={car} alt="" width="" height="" />
                        <h1 className="text-center text-[#ff7d00]">car</h1>
                      </div>

                      <div
                        className="col-span-4 h-[120px] w-[90px] border border-[#ff7d00] grid place-content-center cursor-pointer"
                        onClick={() => {
                          setBodyParameters((prevState) => ({
                            ...prevState,
                            selected_vehicle: 'truck'
                          }))
                        }}
                      >
                        <Image src={truck} alt="" width="" height="" />
                        <h1 className="text-center text-[#ff7d00]">truck</h1>
                      </div>

                      {distance && duration && (
                        <div>
                          <p>Distance: {distance}</p>
                          <p>Duration: {duration}</p>
                        </div>
                      )}
                    </div>
                  </div> */}

                  <div className="flex gap-2 justify-center">
                    <div
                      className={`flex place-content-center gap-2 col-span-4 h-[99px] w-[88px] border cursor-pointer ${
                        bodyParameters.selected_vehicle === "bike"
                          ? "bg-[#ff7d00]"
                          : ""
                      }`}
                      onClick={() => handleVehicleSelect("bike")}
                    >
                      <Image src={dine} alt="" width="" height="" />
                      <h1 className="text-center text-white">Bike</h1>
                    </div>

                    <div
                      className={`flex place-content-center gap-2 col-span-4 h-[99px] w-[88px] border cursor-pointer ${
                        bodyParameters.selected_vehicle === "car"
                          ? "bg-[#ff7d00]"
                          : ""
                      }`}
                      onClick={() => handleVehicleSelect("car")}
                    >
                      <Image src={car} alt="" width="" height="" />
                      <h1 className="text-center text-[#ff7d00]">Car</h1>
                    </div>

                    <div
                      className={`flex place-content-center gap-2 col-span-4 h-[99px] w-[88px] border cursor-pointer ${
                        bodyParameters.selected_vehicle === "truck"
                          ? "bg-[#ff7d00]"
                          : ""
                      }`}
                      onClick={() => handleVehicleSelect("truck")}
                    >
                      <Image src={truck} alt="" width="" height="" />
                      <h1 className="text-center text-[#ff7d00]">Truck</h1>
                    </div>
                  </div>
                  <div>
                    <h2>Estimated Time: {bodyParameters.estimated_time}</h2>
                  </div>
                </div>
                {/* {vehicles.map((vehicle) => (
                        <div
                          key={vehicle}
                          className={`h-[120px] w-[90px] border ${
                            selectedVehicle === vehicle ? "bg-[#ff7d00]" : ""
                          } grid place-content-center`}
                          onClick={() => handleVehicleClick(vehicle)}
                        >
                          <Image
                            src={
                              vehicle === "bike"
                                ? dine
                                : vehicle === "car"
                                ? car
                                : truck
                            }
                            alt=""
                            width=""
                            height=""
                          />
                          <h1
                            className={`text-center ${
                              selectedVehicle === vehicle
                                ? "text-white"
                                : "text-[#ff7d00]"
                            }`}
                          >
                            {vehicle.charAt(0).toUpperCase() + vehicle.slice(1)}
                          </h1>
                        </div>
                      ))}
  */}
                <div className="footer w-full  grid mb-36 place-content-center">
                  <button
                    onClick={handleProceedToPay}
                    className="  grid grid-cols-12 items-center  bottom-2 m-3 rounded-lg border bg-[#ff7d00] py-3 px-20 text-[16px] text-white text-center"
                  >
                    <h1 className="col-span-11">Proceed to Pay</h1>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {uiState === "home" && (
        <div className=" bg-white w-[100%]  text-black h-auto">
          <div className=" bg-white w-[auto]  sticky top-0 flex mt-[55px]">
            <div className="mr-auto w-full ">
              <h1 className="text-black text-[32px] ">Home</h1>
            </div>
          </div>

          <div className="w-screen h-screen mt-10">
            <div
              className="h-screen flex flex-col  w-[800px] h-[700px] bg-image bg-cover bg-center "
              style={{
                backgroundImage: `url(${map.src})`,
              }}
            >
              <div className="flex-grow"></div>
              <div className="footer w-full  grid place-content-center">
                <button
                  onClick={handleRequestClick}
                  className="  grid grid-cols-12 items-center  bottom-2 m-3 rounded-lg border bg-[#FF7D00] p-5 text-[16px] text-white text-center"
                >
                  <Image src={triple} className="col-span-1" />
                  <h1 className="col-span-11">Continue with google</h1>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {uiState === "proceedToPay" && (
        // New UI
        <div>
          <div className=" bg-white w-full  text-black h-auto">
            <div className=" bg-white w-[auto]  flex mt-[55px]">
              <div className="mr-auto w-full ">
                <h1 className="text-black text-[32px] ">Request Pickup</h1>
              </div>
            </div>

            <div className=" grid grid-cols-12 gap-3 w-[95%] h-[70%] mt-10">
              <div
                className="h-screen col-span-7 flex flex-col  w-full h-auto bg-image bg-cover bg-center "
                style={{
                  backgroundImage: `url(${map.src})`,
                }}
              >
                <div className="flex-grow"></div>
              </div>

              <div className="col-span-5 flex flex-col flex-grow h-screen ">
                <div className="flex-grow flex py-3 flex-col gap-9">
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => {
                        setUiState("requestPickup");
                      }}
                    >
                      Back
                    </button>
                    <div className="flex flex-col text-center gap-5 font-bold">
                      <h1 className="text-[22px]">Payment</h1>
                      <h1 className="text-[18px]">
                        Select your prefered Payment Method
                      </h1>
                    </div>

                    <div className="flex flex-col gap-5 my-5 text-[14px] font-light">
                      <div className="grid grid-cols-12 gap-3 justify-center items-center">
                        <div className="col-span-1">
                          {" "}
                          <Image src={cash} alt="" width="" height="" />
                        </div>
                        <div className="col-span-11 flex justify-between">
                          <h1>Cash On Delivery</h1>
                          <div>
                            <input
                              type="radio"
                              className="outline-none border-transparent"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="w-full border border-2-black my-1"></div>
                      <div className="grid grid-cols-12 gap-3 justify-center items-center">
                        <div className="col-span-1">
                          {" "}
                          <Image src={wallet} alt="" width="" height="" />
                        </div>
                        <div className="col-span-11 flex justify-between">
                          <h1>Wallet</h1>
                          <div>
                            <input
                              type="radio"
                              className="outline-none border-transparent"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="w-full border border-2-black my-1"></div>
                      <div className="grid grid-cols-12 gap-3 justify-center items-center">
                        <div className="col-span-1">
                          {" "}
                          <Image src={cc} alt="" width="" height="" />
                        </div>
                        <div className="col-span-11 flex justify-between">
                          <h1>Credit/Debit Card</h1>
                          <div>
                            <input
                              type="radio"
                              className="outline-none border-transparent"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="w-full border border-2-black mt-9 font-bold"></div>
                      <div className="col-span-11 flex justify-between">
                        <h1 className="font-bold">Total</h1>
                        <div>
                          <p className="font-bold">#2,000</p>
                        </div>
                      </div>
                      <div>
                        <h1>Payment Details</h1>
                        <div>
                          <label>
                            Card ID:
                            <input
                              type="number"
                              name="cardId"
                              value={paymentDetails.cardId}
                              onChange={handlePaymentChange}
                            />
                          </label>
                        </div>
                        <div>
                          <label>
                            Payment Method:
                            <select
                              name="payment_method"
                              value={paymentDetails.payment_method}
                              onChange={handlePaymentChange}
                            >
                              <option value="cash-on-delivery">
                                Cash on Delivery
                              </option>
                              <option value="cash-on-pickup">
                                Cash on Pickup
                              </option>
                              <option value="card">Card</option>
                              <option value="wallet">Wallet</option>
                            </select>
                          </label>
                        </div>
                        <div>
                          <label>
                            Order ID:
                            <input
                              type="number"
                              name="order_id"
                              value={paymentDetails.order_id}
                              onChange={handlePaymentChange}
                            />
                          </label>
                        </div>
                        <div>
                          <label>
                            Save Card:
                            <input
                              type="checkbox"
                              name="save_card"
                              checked={paymentDetails.save_card}
                              onChange={handlePaymentChange}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/*icons */}
                </div>

                <div className="footer w-full grid mb-36 place-content-center">
                  <button
                    onClick={handlePayForOrder}
                    className="grid grid-cols-12 items-center bottom-2 m-3 rounded-lg border bg-[#ff7d00] py-3 px-20 text-[16px] text-white text-center"
                  >
                    <h1 className="col-span-11">Proceed</h1>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default page;
