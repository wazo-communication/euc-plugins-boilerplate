import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Stack, Button, Checkbox, FormControl, RadioGroup, FormControlLabel, Radio, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import { connect } from 'react-redux';

import type { RootState } from '../redux/store';

import { loadContext as loadContextAction } from '../redux/actions';

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
      <section class="intro">
        <article>
          <h1>React + Redux + MUI</h1>
          <p>{intl.formatMessage({ id: 'introduction' })}</p>
          <a href="https://github.com/wazo-communication/euc-plugins-boilerplate" target="_blank">{intl.formatMessage({ id: 'introduction_button' })}</a>
        </article>
      </section>

      <main>
        <p id="host">{host}</p>
        <h2>Form</h2>
        <h3>Textfields</h3>

        <Stack direction="row" spacing={2}>
          <TextField fullWidth id="outlined-basic" label="Textfield" variant="standard" />

          <TextField fullWidth id="filled-basic" label="Textfield (error)" variant="standard" error />
        </Stack>

        <br />

        <Stack direction="row" spacing={2}>
          <TextField fullWidth id="standard-basic" label="Textfield (disabled)" variant="standard" disabled />

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Choices</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Select"
              variant="standard"
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <div>
          <h3>Checkboxes and Radio</h3>
          <Checkbox defaultChecked />
          <Checkbox />
          <Checkbox disabled />
          <Checkbox disabled checked />
        </div>
        <br />

        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel value="female" control={<Radio />} label="WebRTC" />
            <FormControlLabel value="male" control={<Radio />} label="SIP" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>

        <h2>Basic button</h2>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" color="primary">Primary</Button>
          <Button variant="contained" color="secondary">Secondary</Button>
          <Button variant="contained" color="error">Error</Button>
        </Stack>

        <br />

        <Stack direction="row" spacing={2}>
          <Button variant="outlined" color="primary">Primary</Button>
          <Button variant="outlined" color="secondary">Secondary</Button>
          <Button variant="outlined" color="error">Error</Button>
        </Stack>
    </main>
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
