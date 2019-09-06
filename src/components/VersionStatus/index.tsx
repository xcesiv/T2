import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import styled from 'styled-components';
import TezosIcon from '../TezosIcon';

import { openLink } from '../../utils/general';
import { ms } from '../../styles/helpers';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${ms(-1)} ${ms(3)};
  background-color: ${({ theme: { colors } }) => colors.primary};
  color: ${({ theme: { colors } }) => colors.white};
  font-size: ${ms(-0.5)};
  position: absolute;
  left: 0;
  top: 92px;
  width: 100%;
`;

const WarningIcon = styled(TezosIcon)`
  font-size: ${ms(0.5)};
  margin-right: ${ms(-1.5)};
`;

const Link = styled.span`
  cursor: pointer;
  margin-left: 5px;
  text-decoration: underline;
`;

const url = 'https://galleon-wallet.tech';

interface OwnProps {
  version: string;
}

type Props = OwnProps & WithTranslation;

const VersionStatus = (props: Props) => {
  const { version, t } = props;

  return (
    <Container>
      <WarningIcon color="white" iconName="warning" />
      <span>{t('components.versionStatus.version_update', { version })}</span>
      <Link onClick={() => openLink(url)}>{url}</Link>
    </Container>
  );
};

export default withTranslation()(VersionStatus);
