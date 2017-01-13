/**
 * Created by vedi on 26/12/2016.
 */

import React from 'react';
import { observer } from 'mobx-react';
import { RaisedButton } from 'material-ui';
import { red500 } from 'material-ui/styles/colors';

export default observer(({ form, submitOptions = {} }) => (
  <div>
    <RaisedButton label="Submit" onClick={() => form.submit(submitOptions)} />
    <div style={{ color: red500 }}>{form.error}</div>
  </div>
));
