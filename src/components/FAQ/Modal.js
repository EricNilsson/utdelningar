import React from 'react';
import PropTypes from 'prop-types';

import { ModalContainer, Close, H2 } from './ModalStyle';

class Modal extends React.PureComponent {
  static propTypes = {
    handleClick: PropTypes.func,
  };

  render() {
    return (
      <ModalContainer>
        <aside onClick={this.props.handleClick} />
        <div>
          <Close onClick={this.props.handleClick}>✖</Close>
          <H2>
            Vanliga frågor och svar
            <span role="img" aria-label="emoji hum">
              🤔
            </span>
          </H2>

          <p>
            <strong>
              Sparas min data?
              <br />
            </strong>
            Din portfölj sparas bara i din webbläsares{' '}
            <a
              rel="nofollow"
              href="https://www.w3schools.com/html/html5_webstorage.asp"
              target="blank"
            >
              Localstorage
            </a>
            , detta för att du ska slippa skapa ett konto. Kortfattat, det är bara du och din
            webbläsare som kan se din portfölj. Vill du se portföljen i både din dator, andra
            datorer och telefoner så måste du skapa den i respektive enhet.
          </p>
          <p>
            <strong>
              Hur hämtas aktiedata?
              <br />
            </strong>
            Aktiedata hämtas från Avanza varje gång du lägger till en ny aktie i din portfölj. Inte
            när du justerar antalet av respektive innehav. Så för att uppdatera din portföljdata,
            klicka på knappen "Uppdatera aktiekurser"
          </p>
          <p>
            <strong>
              Utdelningen stämmer inte/saknas?
              <br />
            </strong>
            Då all utdelningsdata hämtas från Avanza för det nuvarande året, kan det ibland hända
            att data inte stämmer (splittar av bolag) eller att Avanza inte har datan (amerikanska
            aktier). Då finns möjligheten att editera utdelningar för respektive aktie genom att
            klicka på den lilla pennan bredvid ditt innehav.
          </p>
          <p>
            <strong>
              Varför funkar inte ...XXX?
              <br />
            </strong>
            Detta är en webbapp som jag byggt främst för att göra mitt eget aktieinvesterande ännu
            lite roligare. Med det sagt så tar jag mer än gärna emot konstruktiv kritik, må det vara
            funktionalitet eller utformning av webbappen. Skicka ett mail till{' '}
            <a href="mailto:dick@pigment.se">dick@pigment.se</a> eller kontakta mig på{' '}
            <a rel="nofollow" href="https://twitter.com/dicktornfeldt" target="blank">
              {' '}
              Twitter.
            </a>
          </p>
        </div>
      </ModalContainer>
    );
  }
}

export default Modal;
