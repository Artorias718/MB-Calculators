import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const Casino = () => {
  // Stati per i valori inseriti dall'utente
  const [redStake, setRedStake] = useState('');
  const [blackStake, setBlackStake] = useState(0);
  const [greenStake, setGreenStake] = useState(0);
  
  // Calcola gli importi da scommettere sul nero e sul verde in tempo reale
  useEffect(() => {
    if (redStake) {
      const redStakeNum = parseFloat(redStake);

      // Calcolo della scommessa sul nero e sul verde
      const calculatedBlackStake = (redStakeNum / 1) * 1; // Assume che la vincita sul nero è equivalente
      const calculatedGreenStake = (redStakeNum / 35) * 1; // Assume che la vincita sul verde sia 35 volte

      setBlackStake(calculatedBlackStake.toFixed(2));
      setGreenStake(calculatedGreenStake.toFixed(2));
    }
  }, [redStake]);

  return (
    <div style={{ width: '50%', margin: '0 auto' }}>
      <h3 className="mb-3 text-light bg-dark p-3">Casino Roulette Stake Calculator</h3>

      <Form>
        {/* Sezione Red Stake */}
        <div className="p-3 mb-4" style={{ backgroundColor: '#75c2fd', borderRadius: '8px' }}>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="redStake">
                <Form.Label>Red Stake</Form.Label>
                <Form.Control
                  type="number"
                  value={redStake}
                  onChange={(e) => setRedStake(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
        </div>

        {/* Display dei risultati calcolati */}
        <div className="text-center">
          {redStake && (
            <>
              <p className="text-info">
                To balance your bet on red, you should bet <strong>{blackStake}</strong> on black and <strong>{greenStake}</strong> on green.
              </p>
            </>
          )}
        </div>
      </Form>
    </div>
  );
};

export default Casino;
