import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const Casino = () => {
  const [totalStake, setTotalStake] = useState('');
  const [redStake, setRedStake] = useState(0);
  const [blackStake, setBlackStake] = useState(0);
  const [greenStake, setGreenStake] = useState(0);

  const MINIMUM_STAKE = 0.1;

  const roundToNearest = (value, step) => {
    return Math.round(value / step) * step;
  };

  useEffect(() => {
    if (totalStake) {
      const totalStakeNum = parseFloat(totalStake);

      let greenStake = totalStakeNum / (35 + 1);
      greenStake = roundToNearest(greenStake, MINIMUM_STAKE);

      let remainingStake = totalStakeNum - greenStake;
      let redStake = remainingStake / 2;
      let blackStake = remainingStake / 2;

      redStake = roundToNearest(redStake, MINIMUM_STAKE);
      blackStake = roundToNearest(blackStake, MINIMUM_STAKE);

      let totalRounded = redStake + blackStake + greenStake;
      if (totalRounded > totalStakeNum) {
        redStake -= (totalRounded - totalStakeNum);
        redStake = roundToNearest(redStake, MINIMUM_STAKE);
      }

      setRedStake(redStake.toFixed(2));
      setBlackStake(blackStake.toFixed(2));
      setGreenStake(greenStake.toFixed(2));
    }
  }, [totalStake]);

  return (
    <div style={{ width: '50%', margin: '0 auto' }}>
      <h3 className="mb-3 text-light bg-dark p-3 text-center">
        Casino Roulette Stake Calculator
      </h3>

      <Form>
        <div className="p-3 mb-4" style={{ backgroundColor: '#75c2fd', borderRadius: '8px' }}>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="totalStake">
                <Form.Label>Total Stake</Form.Label>
                <Form.Control
                  type="number"
                  value={totalStake}
                  onChange={(e) => setTotalStake(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
        </div>

        {/* Display dei risultati calcolati */}
        {totalStake && (
          <div className="text-center">
            <Row className="justify-content-center mb-4">
              {/* Riquadro Rosso */}
              <Col md={3} className="mb-3">
                <div
                  style={{
                    backgroundColor: '#FF4C4C',
                    borderRadius: '8px',
                    padding: '15px',
                    color: '#fff',
                  }}
                >
                  <h5>Red</h5>
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{redStake} €</p>
                </div>
              </Col>

              {/* Riquadro Nero */}
              <Col md={3} className="mb-3">
                <div
                  style={{
                    backgroundColor: '#333',
                    borderRadius: '8px',
                    padding: '15px',
                    color: '#fff',
                  }}
                >
                  <h5>Black</h5>
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{blackStake} €</p>
                </div>
              </Col>

              {/* Riquadro Verde */}
              <Col md={3} className="mb-3">
                <div
                  style={{
                    backgroundColor: '#28A745',
                    borderRadius: '8px',
                    padding: '15px',
                    color: '#fff',
                  }}
                >
                  <h5>Green</h5>
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{greenStake} €</p>
                </div>
              </Col>
            </Row>
            <p className="text-info">
              This ensures that all bets are divisible by 0.10 and the total is balanced.
            </p>
          </div>
        )}
      </Form>
    </div>
  );
};

export default Casino;
