// import React, { useState } from "react";
import React from "react";
import './about.css'

export default function About(props) {

    //We created a button in ABoutJS to toggle style of various sections and boxes below using mystyle and mystyle2..BUt in video 18 we removed this seperate button so to use only one master button to control black theme..
    // const [myStyle, setMyStyle] = useState({
    //     color: 'black',
    //     backgroundColor: 'white'
    // })
    // const [myStyle2, setMyStyle2] = useState({
    //     color: 'white',
    //     backgroundColor: 'black'
    // })
    // const [btnText, setBtnText] = useState("Enable Dark Mode")

    // let toggleStyle = () => {
    //     if (myStyle.color === 'black') {
    //         setMyStyle({
    //             color: 'white',
    //             backgroundColor: 'black'
    //         })
    //         setMyStyle2({
    //             color: 'black',
    //             backgroundColor: 'white',
    //         })
    //         setBtnText("Enable Light Mode")
    //     }
    //     else {
    //         setMyStyle({
    //             color: 'black',
    //             backgroundColor: 'white',
    //         })
    //         setMyStyle2({
    //             color: 'white',
    //             backgroundColor: 'black'
    //         })
    //         setBtnText("Enable Dark Mode")
    //     }
    // }
    return (
        <>
            <section>
                <div className="image" style={{ color: props.mode === 'light' ? 'black' : 'white', backgroundColor: props.mode === 'light' ? 'white' : 'black'}}>
                    <img src="https://cdn.pixabay.com/photo/2017/08/26/23/37/business-2684758__340.png" alt="logo"/>
                </div>

                <div className="content" style={{ color: props.mode === 'light' ? 'black' : 'white', backgroundColor: props.mode === 'light' ? 'white' : 'black'}}>
                    <h2>About Us</h2>
                    <p style={{ color: props.mode === 'light' ? 'black' : 'white', backgroundColor: props.mode === 'light' ? 'white' : 'black'}}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis aspernatur voluptas inventore ab voluptates nostrum minus illo laborum harum laudantium earum ut, temporibus fugiat sequi explicabo facilis unde quos corporis!</p>
                    <ul className="links">
                        <li style={{ color: props.mode === 'light' ? 'white' : 'black', backgroundColor: props.mode === 'light' ? 'black' : 'white'}}>Observe!</li>
                        <div className="vertical-line"></div>
                        <li style={{ color: props.mode === 'light' ? 'white' : 'black', backgroundColor: props.mode === 'light' ? 'black' : 'white'}}>Analyze!</li>
                        <div className="vertical-line"></div>
                        <li style={{ color: props.mode === 'light' ? 'white' : 'black', backgroundColor: props.mode === 'light' ? 'black' : 'white'}}>Code!</li>
                    </ul>
                    <ul className="icons">
                        <li>
                            <a href="https://mobile.twitter.com/vantage47" target="blank" ><i className="fa fa-twitter"></i></a>
                        </li>
                        <li>
                            <a href="https://github.com/omsingh228" target="blank"><i className="fa fa-github"></i></a>
                        </li>
                        <li>
                            <a href="https://wa.me/+918421472006?text=Hello!" target="blank"><i className="fa fa-whatsapp"></i></a>
                        </li>
                    </ul>
                </div>
            </section>
            {/* <div className="center">
                <button onClick={toggleStyle} className="btn btn-primary my-3">
                    {btnText}
                </button>
            </div> */}
        </>
    );
}
