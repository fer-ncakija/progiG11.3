import React, { useEffect } from "react";
import "./DodajSastanak.css";
import {useState} from 'react'
import { Link } from 'react-router-dom'

function DodajSastanak(){
    return(
        <div className="box">
            <form>
                <div className="inputs">
                    <div className="input">
                        <input
                            name="naziv"
                            placeholder="Naziv sastanka"
                        />
                    </div>
                    <div className="input">
                        <input
                            name="datum"
                            type="date"
                            placeholder="Datum"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default DodajSastanak;