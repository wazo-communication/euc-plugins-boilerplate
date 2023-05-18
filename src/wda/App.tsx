import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Typography, styled } from '@mui/material';
import { connect } from 'react-redux';

import type { RootState } from '../redux/store';
import type { WDASession } from '@wazo/euc-plugins-sdk/types';

import { loadContext as loadContextAction } from '../redux/actions';

const Title = styled(Typography)(() => ({
  textAlign: 'center'
}));

const SubTitle = styled(Typography)(() => ({
  textAlign: 'center',
  marginTOp: 50,
}));

type Props = {
  user: WDASession,
  loadContext: () => void,
}

function App({ user, loadContext }: Props) {
  const intl = useIntl();

  useEffect(() => {
    loadContext();
  }, []);

  return (
    <>
      <Title variant="h1">{intl.formatMessage({ id: 'welcome' })}</Title>
      {user && user.profile && (
        <SubTitle variant="h2">{user.profile.firstName}</SubTitle>
      )}
    </>
  )
}

const mapState = (state: RootState) => ({
  user: (state.global.context?.user as WDASession),
});

const mapActions = {
  loadContext: loadContextAction,
};

export default connect(mapState, mapActions)(App);
