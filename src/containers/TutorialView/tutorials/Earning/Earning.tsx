import React from 'react';
import * as H from 'history';
import { withRouter, Link, RouteComponentProps } from 'react-router-dom';
import { Row, Col } from 'antd';

import { ContentWrapper } from './Earning.style';
import Centered from '../../../../components/utility/centered';
import Label from '../../../../components/uielements/label';
import Button from '../../../../components/uielements/button';
import TooltipIcon from '../../../../components/uielements/tooltipIcon';
import InputForm from '../../../../components/uielements/inputForm';
import Selection from '../../../../components/uielements/selection';

import {
  orbBlueIcon,
  arrowTwoIcon,
  arrowGreenIcon,
} from '../../../../components/icons';

import { formatNumber, formatCurrency } from '../../../../helpers/formatHelper';
import { data, getVr, getSS, getVss, getWr, getWt } from './data';
import { TutorialContent } from '../../types';

type ComponentProps = {
  view?: string;
  history: H.History;
};

type Props = RouteComponentProps & ComponentProps;

type State = {
  rValue: number;
  tValue: number;
  wss: number;
};

const { R, T, WR, WT, VWR, Pr, Pt, SS } = data;

class Earning extends React.Component<Props, State> {
  static readonly defaultProps: Partial<Props> = {
    view: TutorialContent.INTRO,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      rValue: 200000,
      tValue: 400000,
      wss: 0,
    };
  }

  handleChangeRValue = (value: number | undefined) => {
    this.setState({
      rValue: value || 0,
    });
  };

  handleChangeTValue = (value: number | undefined) => {
    this.setState({
      tValue: value || 0,
    });
  };

  handleChangeWssValue = (value: number | undefined) => {
    this.setState({
      wss: value || 0,
    });
  };

  renderFlow = (view: TutorialContent) => {
    const { rValue, tValue, wss } = this.state;
    const Vr = formatCurrency(getVr(rValue));
    const Vt = Vr;
    const ss = `${Math.round(getSS(wss))}%`;
    const ssValue = `${SS}%`;
    const Vss = formatCurrency(getVss(wss));
    const VssValue = formatCurrency((getVr(rValue) * 2 * SS) / 100);

    const Wr = getWr(wss);
    const Wt = getWt(wss);
    const rValuePrice = Wr * Pr;
    const tValuePrice = Wt * Pt;

    return (
      <div className="earning-flow-wrapper">
        <Centered>
          <Label size="large" color="normal" weight="bold">
            RUNE
          </Label>
          <Label size="large" color="normal" weight="bold">
            :
          </Label>
          <Label size="large" color="normal" weight="bold">
            BOLT
          </Label>
        </Centered>
        <Label
          className="header-label"
          size="normal"
          color="normal"
          weight="bold"
        >
          POOL
        </Label>
        <div className="earning-flow-diagram">
          {view === TutorialContent.INTRO && (
            <img src={arrowTwoIcon} alt="arrow-green" />
          )}
          {view === TutorialContent.PLAY && (
            <img
              className="reverse-image"
              src={arrowGreenIcon}
              alt="arrow-green"
            />
          )}
          <img src={orbBlueIcon} alt="arrow-green" />
          {view === TutorialContent.INTRO && (
            <img src={arrowTwoIcon} alt="arrow-green" />
          )}
          {view === TutorialContent.PLAY && (
            <img src={arrowGreenIcon} alt="arrow-yello" />
          )}
        </div>
        <Centered>
          <Label size="large" color="normal" weight="bold">
            {view === TutorialContent.INTRO && formatNumber(R + rValue)}
            {view === TutorialContent.PLAY && formatNumber(WR - Wr)}
          </Label>
          <Label size="large" color="normal" weight="bold">
            :
          </Label>
          <Label size="large" color="normal" weight="bold">
            {view === TutorialContent.INTRO && formatNumber(T + tValue)}
            {view === TutorialContent.PLAY && formatNumber(WT - Wt)}
          </Label>
        </Centered>
        <Centered>
          <Label size="large" color="normal">
            {view === TutorialContent.INTRO && Vr}
            {view === TutorialContent.PLAY && formatCurrency(VWR - rValuePrice)}
          </Label>
          <Label size="large" color="normal" />
          <Label size="large" color="normal">
            {view === TutorialContent.INTRO && Vt}
            {view === TutorialContent.PLAY && formatCurrency(VWR - tValuePrice)}
          </Label>
        </Centered>
        <div className="center-text">
          <Label size="large" color="normal" weight="bold">
            {view === TutorialContent.INTRO && ssValue}
            {view === TutorialContent.PLAY && ss}
          </Label>
        </div>
        <div className="center-text description-label">
          <Label size="big" color="normal">
            YOUR POOL SHARE
          </Label>
        </div>
        <Centered>
          <Label />
          <Label size="large" color="normal" weight="bold">
            {view === TutorialContent.INTRO && VssValue}
            {view === TutorialContent.PLAY && Vss}
          </Label>
          <Label className="contains-tooltip" />
        </Centered>
        <div className="center-text description-label">
          <Label size="big" color="normal">
            YOUR ASSET SHARE
          </Label>
        </div>
      </div>
    );
  };

  renderButtons = () => {
    const { history } = this.props;

    const goBack = () => history.goBack();

    return (
      <Row className="bottom-nav-button">
        <Button color="primary" typevalue="ghost" onClick={goBack}>
          back
        </Button>
      </Row>
    );
  };

  renderIntro = () => {
    const { rValue, tValue } = this.state;

    return (
      <div className="earning-play-wrapper">
        <div className="token-wrapper">
          <InputForm
            title="Add earnings:"
            type="rune"
            value={rValue}
            onChange={this.handleChangeRValue}
            step={10000}
          />
          <TooltipIcon
            text="This simulates daily trading - which you can't control."
            placement="rightTop"
          />
        </div>
        {this.renderFlow(TutorialContent.INTRO)}
        <div className="token-wrapper">
          <InputForm
            title="Add earnings:"
            type="bolt"
            value={tValue}
            onChange={this.handleChangeTValue}
            step={20000}
            reverse
          />
          <TooltipIcon
            className="token-receiver-tooltip"
            text="Earnings accrue on both sides of the pool."
            placement="rightTop"
          />
        </div>
      </div>
    );
  };

  renderPlay = () => {
    const { wss } = this.state;
    const Wr = getWr(wss);
    const Wt = getWt(wss);
    const rValuePrice = formatCurrency(Wr * Pr);
    const tValuePrice = formatCurrency(Wt * Pt);

    return (
      <div className="earning-play-wrapper">
        <div className="token-wrapper">
          <InputForm title="Withdraw share:" type="%" value={wss} />
          <Selection onSelect={this.handleChangeWssValue} />
          <InputForm title="PAYOUT:" type="rune" value={Wr} step={1000} />
          <Label className="payout-price-label" color="gray">
            {rValuePrice} (USD)
          </Label>
        </div>
        {this.renderFlow(TutorialContent.PLAY)}
        <div className="token-wrapper-right">
          <InputForm
            title="PAYOUT:"
            type="bolt"
            value={Wt}
            step={1000}
            reverse
          />
          <Label className="payout-price-label align-right" color="gray">
            {tValuePrice} (USD)
          </Label>
        </div>
      </div>
    );
  };

  render() {
    const { view } = this.props;

    return (
      <ContentWrapper className="tutorial-swap-wrapper">
        <Row>
          <Col span={4} className="intro-text">
            <Label size="normal" weight="bold" color="normal">
              EARNINGS
            </Label>
            <Label size="small" color="dark">
              When people trade across a pool you own a share of, earnings are
              captured.
            </Label>
            <Label size="small" color="dark">
              Earnings are proportional to depth of the pool, and daily volume.
            </Label>
            <Label size="small" color="dark">
              You can withdraw your earnings at any time.
            </Label>
            {view === TutorialContent.INTRO && (
              <Link to="/tutorial/pool/earn/play">
                <Button className="try-btn" typevalue="outline">
                  try
                </Button>
              </Link>
            )}
            {view === TutorialContent.PLAY && (
              <>
                <Label size="small" color="dark">
                  Since anyone can <strong>stake</strong> alongside you, you own
                  a share of the pool which adjusts if people join or leave.
                </Label>
                <Label size="small" color="dark">
                  As trades happen the asset balances will change, but your
                  share won’t.
                </Label>
                <Label size="small" color="dark">
                  Asset values may also change whilst you stake. You can
                  withdraw your assets plus any earnings at any time.
                </Label>
              </>
            )}
          </Col>
          <Col span={20} className="tutorial-content">
            <Row className="tutorial-flow">
              {view === TutorialContent.INTRO && this.renderIntro()}
              {view === TutorialContent.PLAY && this.renderPlay()}
            </Row>
            {this.renderButtons()}
          </Col>
        </Row>
      </ContentWrapper>
    );
  }
}

export default withRouter(Earning);