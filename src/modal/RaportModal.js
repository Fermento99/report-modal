import React from 'react';
import Form from './components/Form';
import Header from './components/Header';
import styled from 'styled-components';

const Modal = styled.div`
  position: relative;
  top: 30px;
  left: 30px;
  width: 700px;
  box-shadow: 0 0 10px #000;
`;

function RaportModal({ callback }) {
  return (
    <Modal>
      <Header>Export Report</Header>
      <Form callback={callback} />
    </Modal>
  );
}

export default RaportModal;