import React, { useMemo } from 'react';

import { FullscreenExitOutlined, CloseOutlined } from '@ant-design/icons';
import { tokenAmount } from '@thorchain/asgardex-token';
import { Row } from 'antd';

import { MAX_VALUE } from 'redux/app/const';
import { TxStatus, TxResult, TxTypes } from 'redux/app/types';

import { BINANCE_TX_BASE_URL } from 'helpers/apiHelper';
import { getTickerFormat } from 'helpers/stringHelper';

import Button from '../../uielements/button';
import CoinData from '../../uielements/coins/coinData';
import StepBar from '../../uielements/stepBar';
import Trend from '../../uielements/trend';
import TxTimer from '../../uielements/txTimer';
import { StyledModal, ModalContent } from './confirmModal.style';

type Props = {
  txStatus: TxStatus;
  txResult: TxResult;
  onClose?: () => void;
  onFinish?: () => void;
};

const ConfirmModal: React.FC<Props> = (props): JSX.Element => {
  const { txStatus, txResult, onClose, onFinish } = props;
  const {
    modal,
    status,
    value,
    hash,
    startTime,
    txData,
    type: txType,
  } = txStatus;
  const { sourceAsset, sourceAmount, targetAsset, targetAmount, slip } = txData;
  const txURL = BINANCE_TX_BASE_URL + hash;

  const source = getTickerFormat(sourceAsset);
  const target = getTickerFormat(targetAsset);
  const refunded = txType === TxTypes.SWAP && txResult.type === 'refund';

  // check if tx has completed or not
  const isCompleted: boolean = useMemo(() => {
    if (txType === TxTypes.STAKE || txType === TxTypes.CREATE) {
      return !status;
    } else if (txType === TxTypes.WITHDRAW || txType === TxTypes.SWAP) {
      return txResult.status === true && !status;
    }
    return false;
  }, [status, txType, txResult.status]);

  const modalTitle: string = useMemo(() => {
    if (txType === TxTypes.SWAP) {
      if (!isCompleted) return 'YOU ARE SWAPPING';
      if (refunded) return 'TOKEN REFUNDED';
      return 'YOU SWAPPED';
    } else if (txType === TxTypes.CREATE) {
      if (!isCompleted) return 'CREATING POOL';
      return 'POOL CREATED';
    } else if (txType === TxTypes.STAKE) {
      if (!isCompleted) return 'YOU ARE ADDING';
      return 'YOU ADDED';
    } else if (txType === TxTypes.WITHDRAW) {
      if (!isCompleted) return 'YOU ARE WITHDRAWING';
      return 'YOU WITHDRAWN';
    }
    return '';
  }, [txType, isCompleted, refunded]);

  const closeIcon = status ? (
    <FullscreenExitOutlined style={{ color: '#fff' }} />
  ) : (
    <CloseOutlined style={{ color: '#fff' }} />
  );

  // in swap tx, should display exact swapped amount
  const outputAmount =
    txType === TxTypes.SWAP && txResult.status
      ? tokenAmount(txResult?.amount)
      : targetAmount;

  const hasSourceAmount = !sourceAmount.amount().isEqualTo(0);
  const hasOutputAmount = !outputAmount.amount().isEqualTo(0);
  const hasAmount = hasSourceAmount && hasOutputAmount;

  const renderContent = () => {
    return (
      <ModalContent>
        <Row className="modal-content">
          <div className="timer-container">
            <TxTimer
              status={status}
              value={value}
              maxValue={MAX_VALUE}
              maxSec={45}
              startTime={startTime}
              refunded={refunded}
            />
          </div>
          <div className="asset-data-container">
            {hasAmount && <StepBar size={50} />}
            <div className="asset-pair">
              {hasSourceAmount && (
                <CoinData asset={source} assetValue={sourceAmount} />
              )}
              {hasOutputAmount && (
                <CoinData asset={target} assetValue={outputAmount} />
              )}
            </div>
          </div>
        </Row>
        <Row className="modal-info-container">
          {!!slip && <Trend amount={slip} />}
          <div className="modal-actions-container">
            <div className="modal-actions-col">
              {isCompleted && (
                <Button className="view-btn" color="success" onClick={onFinish}>
                  FINISH
                </Button>
              )}
              {!!hash && (
                <a href={txURL} target="_blank" rel="noopener noreferrer">
                  VIEW TRANSACTION
                </a>
              )}
            </div>
          </div>
        </Row>
      </ModalContent>
    );
  };

  return (
    <StyledModal
      title={modalTitle}
      visible={modal}
      closeIcon={closeIcon}
      onCancel={onClose}
      footer={null}
    >
      {renderContent()}
    </StyledModal>
  );
};

export default ConfirmModal;
