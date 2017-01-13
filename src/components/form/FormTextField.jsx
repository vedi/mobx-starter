/**
 * Created by vedi on 26/12/2016.
 */

import React from 'react';
import { observer } from 'mobx-react';
import TextField from 'material-ui/TextField';

export default observer(({ field, fieldExtra, type }) => (
  <div>
    <TextField
      type={(fieldExtra && fieldExtra.inputType) || type || 'text'}
      id={field.id}
      name={field.name}
      value={field.value}
      floatingLabelText={field.label}
      hintText={field.placeholder}
      errorText={field.error}
      disabled={field.disabled}
      onChange={field.onChange}
      onFocus={field.onFocus}
      onBlur={field.onBlur}
    /><br />
  </div>
));
