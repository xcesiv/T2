import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { TezosWalletUtil } from 'conseiljs';
import Button from '@material-ui/core/Button';
import { clipboard } from 'electron';

import CustomTextArea from '../../../components/CustomTextArea';
import { getSelectedKeyStore } from '../../../utils/general';
import { RootState } from '../../../types/store';
import { publicKeyThunk } from '../../duck/thunks';

import { Container, MainContainer, ButtonContainer, InvokeButton, SnackbarWrapper } from './style';

const Sign = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isLoading, selectedParentHash, isLedger } = useSelector(
    (rootState: RootState) => rootState.app,
    shallowEqual
  );
  const { identities } = useSelector((rootState: RootState) => rootState.wallet, shallowEqual);
  const [message, setMessage] = useState('');
  const [result, setResult] = useState('');
  const isDisabled = isLoading || !message;

  async function onSign() {
    const keyStore = getSelectedKeyStore(
      identities,
      selectedParentHash,
      selectedParentHash,
      isLedger
    );
    try {
      const publicKey = dispatch(publicKeyThunk(keyStore.publicKey));
      // TODO: show warning if publicKey !== keyStore.publicKey
    } catch {
      // TODO: show waning
    }

    const op = await TezosWalletUtil.signText(keyStore, message);
    setResult(op);
  }

  function copyToClipboard() {
    try {
      clipboard.writeText(result);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Container>
      <MainContainer>
        <CustomTextArea label={t('general.nouns.message')} onChange={val => setMessage(val)} />
        {/* TODO: result area with copy button */}
        {/* TODO: warning area */}
      </MainContainer>
      <ButtonContainer>
        <InvokeButton buttonTheme="primary" disabled={isDisabled} onClick={onSign}>
          {t('general.verbs.sign')}
        </InvokeButton>
      </ButtonContainer>
      <SnackbarWrapper
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={!!result}
        onClose={() => setResult('')}
        message={result}
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={() => copyToClipboard()}>
              {t('general.verbs.copy')}
            </Button>
            <Button color="secondary" size="small" onClick={() => setResult('')}>
              {t('general.nouns.ok')}
            </Button>
          </React.Fragment>
        }
      />
    </Container>
  );
};

export default Sign;