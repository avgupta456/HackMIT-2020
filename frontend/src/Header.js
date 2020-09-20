import React from "react";

import { Divider } from "@material-ui/core";

import Typist from "react-typist";
import TypistLoop from "react-typist-loop";

import "./Header.css";
import "./Header.scss";

export default function Header() {
  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <hr />
      <p className='header'>Viewpoint.ai</p>
      <div className='fix_height'>
        <TypistLoop interval={1000}>
          {[
            "Learn from Bill Gates",
            "Click a tile to get started",
            "Ask a question to Elon Musk",
            "Chat with Michael Jordan",
            "Hear from Steve Jobs",
          ].map((text) => (
            <Typist key={text} cursor={{ blink: true }} className='subheader'>
              {text}
              <Typist.Delay ms={1500} />
              <Typist.Backspace count={text.length} />
            </Typist>
          ))}
        </TypistLoop>
      </div>
      <br />
      <Divider />
      <br />
    </div>
  );
}
