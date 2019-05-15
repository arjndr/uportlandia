import React from "react";
import styled from "styled-components";
import i18next from "i18next";

import isMobile from "../../utils/isMobile";

class Debug extends React.Component {
  state = {
    language: i18next.language || "",
    liteqr: false
  }
  componentDidMount() {
    const liteqr = sessionStorage.getItem("uPortlandia_liteqr");
    if(liteqr)
      this.setState({ liteqr });
  }
  isEnglish = () => this.state.language.indexOf("en") === 0
  isSpanish = () => this.state.language.indexOf("es") === 0
  changeLang = lang => ev => {
    if(ev.target.checked) {
      sessionStorage.setItem("uPortlandia_lng", lang);
      this.setState({ language: lang });
    }
  }
  resetLang = () => {
    sessionStorage.removeItem("uPortlandia_lng");
  }
  toggleLiteQR = ev => {
    if(ev.target.checked) {
      sessionStorage.setItem("uPortlandia_liteqr", true);
      this.setState({ liteqr: true });
    } else {
      sessionStorage.removeItem("uPortlandia_liteqr");
      this.setState({ liteqr: false });
    }
  }
  render() {
    const { liteqr } = this.state;
    return (<Main>
        <h1>User Agent</h1>
        <p>{navigator.userAgent}</p>
        <br />
        Is Mobile: {isMobile() ? "yes" : "no"}
        <hr />

        <h1>Language</h1>
        <label>
          <input type="radio" name="lang" checked={this.isEnglish()} onChange={this.changeLang("en")} />
          English
        </label>
        <label>
          <input type="radio" name="lang" checked={this.isSpanish()} onChange={this.changeLang("es")} />
          Español
        </label>
        <br/>
        <br/>
        <div>
          <button onClick={this.resetLang}>Reset Language</button>
        </div>
        <hr />
        <label>
          <input type="checkbox" checked={liteqr} onChange={this.toggleLiteQR} />
          Use lightweight QR codes
        </label>
    </Main>);
  }
}

const Main = styled.main`
  padding: 20px;
  h1 {
    font-weight: 600;
    font-size: 1.25rem;
    margin: 10px 0;
  }
  label {
    font-weight: 600;
    margin-right: 10px;
  }
`;

export default Debug;