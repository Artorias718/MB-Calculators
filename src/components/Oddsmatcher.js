import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Alert } from 'react-bootstrap';

const RealTimeCalculator = () => {
  // Stati per i valori inseriti dall'utente
  const [backStake, setBackStake] = useState('');
  const [backOdds, setBackOdds] = useState('');
  //const [bookieCommission, setBookieCommission] = useState(0);
  const [layOdds, setLayOdds] = useState('');
  const [layCommission, setLayCommission] = useState(4.5);
  const [layStake, setLayStake] = useState(0);
  const [liability, setLiability] = useState(0);
  const [profit, setProfit] = useState(null);
  const [rating, setRating] = useState(null);
  const [bookmakerProfit, setBookmakerProfit] = useState(null);
  const [exchangeProfit, setExchangeProfit] = useState(null);
  const [layProfit, setlayProfit] = useState(null);

  // Calcola lay stake, liability e profitto in tempo reale
  useEffect(() => {
    if (backStake && backOdds && layOdds && layCommission) {
      const backStakeNum = parseFloat(backStake);
      const backOddsNum = parseFloat(backOdds);
      const layOddsNum = parseFloat(layOdds);
      const layCommissionNum = parseFloat(layCommission) / 100;
      //const bookieCommissionNum = parseFloat(bookieCommission) / 100;

      // Calcolo della lay stake
      const calculatedLayStake = (backOddsNum / (layOddsNum - layCommissionNum)) * backStake;

      setLayStake(calculatedLayStake.toFixed(2));

      // Calcolo della liability
      const calculatedLiability = (calculatedLayStake * (layOddsNum - 1)).toFixed(2);
      setLiability(calculatedLiability);

      // Calcolo del profitto se vince il bookmaker
      //const bookieProfit = backStakeNum * (backOddsNum - 1) * (1 - bookieCommissionNum);
      const bookieProfit = backStakeNum * (backOddsNum - 1);

      const exchangeLoss = parseFloat(calculatedLiability);
      setBookmakerProfit((bookieProfit - exchangeLoss).toFixed(2));

      // Calcolo del profitto se vince l'exchange
      const exchangeProfitValue = (calculatedLayStake * (1 - layCommissionNum)).toFixed(2);
      const bookmakerLoss = backStakeNum;
      setExchangeProfit((exchangeProfitValue - bookmakerLoss).toFixed(2));

      // Calcolo del profitto netto
      const layProfit = calculatedLayStake * (1 - layCommissionNum);
      setlayProfit(layProfit.toFixed(2));

      const profitValue = (backStakeNum * (backOddsNum - 1)) - exchangeLoss;
      setProfit(profitValue.toFixed(2));

      // Calcolo del rating 
      const calculatedRating = ((backStakeNum + profitValue) / (backStakeNum)) * 100;

      //const calculatedRating = (calculatedLiability - (calculatedLiability*layCommissionNum))/backStake * 100;


      setRating(calculatedRating.toFixed(2));
    }
  }, [backStake, backOdds, layOdds, layCommission]);

  return (
    <div style={{ width: '50%', margin: '0 auto' }}>
      <h3 className="mb-3 text-light bg-dark p-3">Oddsmatcher</h3>

      <Form>
        {/* Dropdown per Bet Type e Mode */}
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="betType">
              <Form.Label>Bet Type</Form.Label>
              <Form.Control as="select" defaultValue="Normal">
                <option value="Normal">Normal</option>
                <option value="Free Bet">Free Bet</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="mode">
              <Form.Label>Mode</Form.Label>
              <Form.Control as="select" defaultValue="Simple">
                <option value="Simple">Simple</option>
                <option value="Advanced">Advanced</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        {/* Sezione Back Stake */}
        <div className="p-3 mb-4" style={{ backgroundColor: '#75c2fd', borderRadius: '8px' }}>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="backStake">
                <Form.Label>Book Stake </Form.Label>
                <Form.Control
                  type="number"
                  value={backStake}
                  onChange={(e) => setBackStake(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="backOdds">
                <Form.Label>Book Odds</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  value={backOdds}
                  onChange={(e) => setBackOdds(e.target.value)}
                />
              </Form.Group>
            </Col>
            {/* <Col>
              <Form.Group controlId="bookieCommission">
                <Form.Label>Book Commission (%)</Form.Label>
                <Form.Control
                  type="number"
                  step="0.1"
                  placeholder="0"
                  value={bookieCommission}
                  onChange={(e) => setBookieCommission(e.target.value)}
                />
              </Form.Group>
            </Col> */}
          </Row>
        </div>

        {/* Sezione Lay Odds */}
        <div className="p-3 mb-4" style={{ backgroundColor: '#fac9d1', borderRadius: '8px' }}>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="layOdds">
                <Form.Label>Lay Odds</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  value={layOdds}
                  onChange={(e) => setLayOdds(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="layCommission">
                <Form.Label>Lay Commission (%)</Form.Label>
                <Form.Control
                  type="number"
                  step="0.1"
                  placeholder="0"
                  value={layCommission}
                  onChange={(e) => setLayCommission(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
        </div>

        {/* Display dei risultati calcolati */}
        <div className="text-center">
          {layStake > 0 && (
            <p className="text-info">
              You could lay <strong>{layStake}</strong> at odds of {layOdds} and your Liability will be <strong>{liability}</strong>.
            </p>
          )}

          {profit !== null && (
            <h4>
              Your profit will be <strong style={{ color: profit < 0 ? 'red' : 'green' }}>{profit}</strong>.
            </h4>
          )}

          {rating && (
            <p className="text-muted">
              Rating <strong>{rating}%</strong>.
            </p>
          )}
        </div>

        {/* Riepilogo vincite e perdite */}
        {backStake && backOdds && layOdds && layStake > 0 && (
          <Row className="mt-4">
            <Col>
              <div className="p-3" style={{ backgroundColor: '#e3f2fd', borderRadius: '8px' }}>
                <h5>If Bookmaker (Back) bet wins</h5>
                <p>Bookmaker: <strong style={{ color: 'green' }}>+{(backStake * backOdds - backStake).toFixed(2)}</strong></p>
                <p>Exchange: <strong style={{ color: 'red' }}>-{liability}</strong></p>
                Total: <strong style={{ color: bookmakerProfit < 0 ? 'red' : 'green' }}>{bookmakerProfit}</strong>
              </div>
            </Col>
            <Col>
              <div className="p-3" style={{ backgroundColor: '#fde2e2', borderRadius: '8px' }}>
                <h5>If Exchange (Lay) bet wins</h5>
                <p>Bookmaker: <strong style={{ color: 'red' }}>-{(parseFloat(backStake) || 0).toFixed(2)}</strong></p>
                <p>Exchange: <strong style={{ color: 'green' }}>+{layProfit}</strong></p>
                Total: <strong style={{ color: bookmakerProfit < 0 ? 'red' : 'green' }}>{bookmakerProfit}</strong>
              </div>
            </Col>
          </Row>
        )}
      </Form>
    </div>
  );
};

export default RealTimeCalculator;
