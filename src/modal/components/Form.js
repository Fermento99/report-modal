import React, { useRef, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  padding: 1em;
  border-bottom: ${props => props.bottomBorder ? props.bottomBorder : 'none'};
`;

const OuterContainer = styled.div`
  width: 100%;
`;

const Button = styled.button`
  border: #123 solid 1px;
  padding: .7em;
  width: 6em;
  margin-left: 1em !important;
  color: ${props => props.dark ? '#fff' : '#666'};
  background-color: ${props => props.dark ? '#123' : '#fff'};
`;

const Row = styled.div`
  height: 3em;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${props => props.justify ? props.justify : 'flex-start'};

  > :not(:first-child) {
    margin-left: .5em;
  }
`;

const Label = styled.p`
  min-width: 10em;
`;

const Select = styled.select`
  border: #000 solid 1px;
  background-color: #fff;
  padding: .7em;
  width: ${props => props.width ? props.width : '100%'};
`;

const Input = styled.input`
  border: #000 solid 1px;
  padding: .7em;
  width: ${props => props.width ? props.width : '100%'};
`;

function shleduleRow(type, timeRef, dayRef) {
  switch (type) {
    case 'date': return (<>
      <Label>Date</Label>
      <Input type='date' width='10em' ref={dayRef} />
      <p>at</p>
      <Input type='time' width='10em' ref={timeRef} />
    </>);
    case 'daily': return (<>
      <Label>Everyday at</Label>
      <Input type='time' width='10em' ref={timeRef} />
    </>);
    case 'weekly': return (<>
      <Label>Every</Label>
      <Select width='10em' ref={dayRef}>
        <option value='monday'>Monday</option>
        <option value='tuesday'>Tuesday</option>
        <option value='wednesday'>Wednesday</option>
        <option value='thursday'>Thursday</option>
        <option value='friday'>Friday</option>
        <option value='saturday'>Saturday</option>
        <option value='sunday'>Sunday</option>
      </Select>
      <p>at</p>
      <Input type='time' width='10em' ref={timeRef} />
    </>);
    default: return (<></>);
  }
}

function Form({ callback }) {
  const [format, setFormat] = useState('excel');
  const [shledule, setShledule] = useState('no-repeat');
  const timeRef = useRef();
  const dayRef = useRef();
  const reportNameRef = useRef();
  const emailRef = useRef();

  return (
    <OuterContainer>
      <Container bottomBorder='#000 solid 1px'>
        <Row>
          <Label>Report Name</Label>
          <Input type='text' placeholder='Sherablee Report' ref={reportNameRef} />
        </Row>
        <Row>
          <Label>Format</Label>
          <Row>
            <label><input type='radio' name='format' checked={format === 'excel'} onChange={() => setFormat('excel')} />Excel</label>
            <label><input type='radio' name='format' checked={format === 'csv'} onChange={() => setFormat('csv')} />CSV</label>
          </Row>
        </Row>
        <Row>
          <Label>E-mail to</Label>
          <Input type='email' placeholder='client@company.com' ref={emailRef} />
        </Row>
        <Row>
          <Label>Schedule</Label>
          <Row>
            <label><input type='radio' name='shledule' checked={shledule === 'no-repeat'} onChange={() => setShledule('no-repeat')} />No Repeat</label>
            <label><input type='radio' name='shledule' checked={shledule === 'date'} onChange={() => setShledule('date')} />Specific Date</label>
            <label><input type='radio' name='shledule' checked={shledule === 'daily'} onChange={() => setShledule('daily')} />Daily</label>
            <label><input type='radio' name='shledule' checked={shledule === 'weekly'} onChange={() => setShledule('weekly')} />Weekly</label>
          </Row>
        </Row>
        <Row>
          {shleduleRow(shledule, timeRef, dayRef)}
        </Row>
      </Container>
      <Container>
        <Row justify='flex-end'>
          <Button onClick={() => callback({ message: 'cancel' })}>Cancel</Button>
          <Button onClick={
            () => callback({
              shledule,
              format,
              email: emailRef.current?.value,
              reportName: reportNameRef.current?.value,
              time: timeRef.current?.value,
              day: dayRef.current?.value
            })
          } dark>Ok</Button>
        </Row>
      </Container>
    </OuterContainer>
  );
}

export default Form;