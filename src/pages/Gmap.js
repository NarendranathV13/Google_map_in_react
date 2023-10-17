/* eslint-disable no-undef */
import React, { useState, useRef } from "react";
import { GoogleMap, useJsApiLoader, Marker, Autocomplete, DirectionsRenderer } from "@react-google-maps/api";

const Gmap = () => {
    const [map, setMap] = useState((null))//to access google map pan functions
    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');
    const [direction, setDirection] = useState(null);
    const startRef = useRef();
    const endRef = useRef();
    const center = {
        lat: 11.0168,
        lng: 76.9558
    };
    const Calculate = async () => {
        if (startRef.current.value === '' || endRef.current.value === '') {
            return;
        }

        const directionService = new google.maps.DirectionsService();
        const directionResult = await directionService.route({
            origin: startRef.current.value,
            destination: endRef.current.value,
            travelMode: google.maps.TravelMode.DRIVING
        });
        setDirection(directionResult);
        setDistance(directionResult.routes[0].legs[0].distance.text);
        setDuration(directionResult.routes[0].legs[0].duration.text);
    };

    const ClearField = () => {
        setDirection(null);
        setDistance('');
        setDuration('');
        startRef.current.value = '';
        endRef.current.value = '';
    }
    const { isLoading } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyAyc5ZUajJHyx1k8TIiaVZUI5qnDwPKkss",
        libraries: ['places'],
      })
    return (
        <>
            <div className="container">
                <div className="row justify-content-center mt-4">
                    <div className="card col-lg-8">
                        <div className="card-body">
                            <div className="row mb-3">
                                <div className="col-lg-4">
                                    <Autocomplete>
                                        <input type="text" className="form-control" placeholder="Start point" aria-label="Start point" ref={startRef} />
                                    </Autocomplete>

                                </div>
                                <div className="col-lg-4">
                                    <Autocomplete>
                                        <input type="text" className="form-control" placeholder="End point" aria-label="End point" ref={endRef} />
                                    </Autocomplete>
                                </div>
                                <div className="col-lg-2 d-grid">
                                    <button type="submit" className="btn btn-danger" onClick={Calculate}>Calculate</button>
                                </div>
                                <div className="col-lg-2 d-grid">
                                    <button type="submit" className="btn btn-danger" onClick={ClearField}>Clear</button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-4">
                                    <h4>Distance: {distance}</h4>
                                </div>
                                <div className="col-lg-4">
                                    <h4>Duration: {duration}</h4>
                                </div>
                                <div className="col-lg-4 ">
                                    <button type="button" className="btn btn-warning" onClick={() => map.panTo(center)}>Re-center</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className=" container d-flex justify-content-center mt-3">
                    <GoogleMap
                        mapContainerStyle={{ width: "100%", height: "600px" }}
                        center={center}
                        zoom={15}
                        onLoad={(map) => {
                            setMap(map);
                        }}
                    >
                        <Marker position={center} />
                        {direction && <DirectionsRenderer directions={direction} />}

                    </GoogleMap>
         
            </div>
        </>

    );
}

export default Gmap;
