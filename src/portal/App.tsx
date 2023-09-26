import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Typography, styled } from '@mui/material';
import { connect } from 'react-redux';

import type { RootState } from '../redux/store';

import { loadContext as loadContextAction } from '../redux/actions';

const Title = styled(Typography)(() => ({
  textAlign: 'center'
}));

const SubTitle = styled(Typography)(() => ({
  textAlign: 'center',
  marginTOp: 50,
}));

type Props = {
  host: string | null,
  loadContext: () => void,
}

function App({ host, loadContext }: Props) {
  const intl = useIntl();

  useEffect(() => {
    loadContext();
  }, []);

  return (
    <>
      <Title variant="h1">{intl.formatMessage({ id: 'welcome' })}</Title>
      {host && (
        <SubTitle id="host" variant="h2">{host}</SubTitle>
      )}
    </>
  )
}

const mapState = (state: RootState) => ({
  host: (state.global.context?.app.extra as { instance: { host: string } })?.instance?.host,
});

const mapActions = {
  loadContext: loadContextAction,
};

export default connect(mapState, mapActions)(App);
