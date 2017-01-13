/**
 * Created by vedi on 26/12/2016.
 */

import React from 'react';
import { observer } from 'mobx-react';
import SelectField from 'material-ui/SelectField';

export default observer(({ field, listGenerator }) => (
  <div>
    <SelectField
      id={field.id}
      name={field.name}
      value={field.value}
      floatingLabelText={field.label}
      hintText={field.placeholder}
      errorText={field.error}
      disabled={field.disabled}
      onChange={(event, key, payload) => {
        event.target.value = payload;
        field.sync(event);
      }}
      onFocus={field.onFocus}
      onBlur={field.onBlur}
      autoWidth
    >
      {listGenerator()}
    </SelectField>
    <br />
  </div>)
);
