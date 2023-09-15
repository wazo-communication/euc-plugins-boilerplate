import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Typography, styled } from '@mui/material';
import { connect } from 'react-redux';

import type { RootState } from '../redux/store';
import type { WDASession } from '@wazo/euc-plugins-sdk/types';

import { loadContext as loadContextAction } from '../redux/actions';

const Firstname = styled('span')(() => ({
  marginLeft: 5,
}));

type Props = {
  user: WDASession;
  loadContext: () => void;
};

function App({ user, loadContext }: Props) {
  const intl = useIntl();

  useEffect(() => {
    loadContext();
  }, []);

  return (
    <>
      <section className="intro">
        <article>
          <h1>
            {intl.formatMessage({ id: 'welcome' })}
            {user?.profile && <Firstname id="firstname">{user.profile.firstName}</Firstname>}
          </h1>
          <p>{intl.formatMessage({ id: 'introduction' })}</p>
          <a href="https://github.com/wazo-communication/euc-plugins-boilerplate" target="_blank">
            {intl.formatMessage({ id: 'introduction_button' })}
          </a>
        </article>
      </section>
    </>
  );
}

const mapState = (state: RootState) => ({
  user: state.global.context?.user as WDASession,
});

const mapActions = {
  loadContext: loadContextAction,
};

export default connect(mapState, mapActions)(App);
