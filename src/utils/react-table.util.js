/**
 * @file React Table util
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import { ReactTableDefaults } from 'react-table';

Object.assign(ReactTableDefaults, {
   defaultPageSize: 10,
   minRows: 1,
   resizable: false,
   defaultFilterMethod: (filter, row, column) => {
      const id = filter.pivotId || filter.id;

      try {
         const regex = new RegExp(filter.value);
         return regex.test(String(row[id]));
      } catch (e) {
         return false;
      }
   },
});
