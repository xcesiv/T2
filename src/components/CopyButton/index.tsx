import React, { useState } from 'react';
import { clipboard } from 'electron';
import styled from 'styled-components';
import ContentCopy from '@material-ui/icons/FileCopyOutlined';
import { Tooltip, Button, IconButton } from '@material-ui/core';
import { withTranslation, WithTranslation } from 'react-i18next';

const Container = styled(Button)<{ realcolor: string }>`
  &&& {
    padding: 0;
    font-size: 14px;
    color: ${({ realcolor, theme: { colors } }) => colors[realcolor]};
    &.MuiButton-textSecondary:hover {
      background-color: transparent;
    }
    .MuiButton-startIcon {
      margin-right: 5px;
    }
  }
`;

const IconButtonWrapper = styled(IconButton)<{ realcolor: string }>`
  &&& {
    color: ${({ realcolor, theme: { colors } }) => colors[realcolor]};
    margin-left: 5px;
  }
`;

const CopyIconWrapper = styled(ContentCopy)`
  &&& {
    width: 19px;
    height: 19px;
  }
`;

interface OwnProps {
  text: string;
  title?: string;
  color: string;
}

type Props = OwnProps & WithTranslation;

function CopyButton(props: Props) {
  const { text, title, color, t } = props;

  const [isShowed, setIsShowed] = useState(false);

  function copyToClipboard() {
    try {
      clipboard.writeText(text);
      setIsShowed(true);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Tooltip
      open={isShowed}
      title={t('components.copyIcon.copied')}
      leaveDelay={500}
      placement="top-end"
      onClose={() => setIsShowed(false)}
      PopperProps={{
        popperOptions: {
          modifiers: {
            offset: {
              enabled: true,
              offset: '50px, 0px'
            }
          }
        }
      }}
    >
      {title ? (
        <Container
          realcolor={color}
          startIcon={<CopyIconWrapper />}
          disableRipple={true}
          onClick={() => copyToClipboard()}
        >
          {title}
        </Container>
      ) : (
        <IconButtonWrapper size="small" realcolor={color} onClick={() => copyToClipboard()}>
          <CopyIconWrapper />
        </IconButtonWrapper>
      )}
    </Tooltip>
  );
}

export default withTranslation()(CopyButton);