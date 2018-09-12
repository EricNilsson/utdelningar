import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import SidebarSearch from './SidebarSearch';
import SidebarPortfolio from './SidebarPortfolio';
import { H1 } from '../../theme/typo';
import Loading from '../../images/loading-2.svg';

const Side = styled.div`
  background-color: ${props => props.theme.grey};
  border-right: 1px solid ${props => props.theme.border};
  width: 30rem;
  position: fixed;
  font-size: 1.2rem;
  top: 0;
  bottom: 0;
  left: 0;
  padding: 2.5rem;
  overflow-y: scroll;
`;

const Load = styled.div`
  position: absolute;
  z-index: 99;
  margin: auto;
  padding: 1rem 0;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  text-align: center;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.75);
  img {
    width: 7rem;
    display: inline-block;
    height: 1.7rem;
    position: absolute;
    left: 0;
    bottom: auto;
    right: 0;
    margin: auto;
    top: 50%;
    top: 49%;
    transform: translateY(-50%);
  }
`;

class Sidebar extends Component {
  renderSum() {
    if (Object.keys(this.state.portfolio).length !== 0) {
      const sum = this.state.portfolio.map(item => item.value).reduce((prev, next) => prev + next);
      return sum;
    }
  }

  render() {
    return (
      <Side>
        <H1>Utdelningskalender</H1>
        <SidebarPortfolio />
        <SidebarSearch />
        {this.props.loading && (
          <Load>
            <img src={Loading} alt="loading" />
          </Load>
        )}
      </Side>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.portfolioReducer.loading,
  };
}

export default connect(mapStateToProps)(Sidebar);
