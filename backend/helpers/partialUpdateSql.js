/**
 * Generate a selective update query based on a requst body:
 *
 * - table: where to make the query
 * - items: the list of columns you want to update
 * - key: the column that we query by (e.g. username, handle, id)
 * - id: current record ID
 *
 * Returns object containing a DB query as a string and an array of string values to be updated to
 *
 */

function sqlPartialUpdate(table, items, key, id) {
  let idx = 1;
  let columns = [];

  // filter out keys start with "_", e.g _token
  for (let key in items) {
    if (key.startsWith('_')) {
      delete items[key];
    }
  }

  for (let column in items) {
    columns.push(`${column}=$${idx}`);
    idx += 1;
  }

  // build a query
  //conver the colmns to a string concat with ','
  let cols = columns.join(', ');
  let query = `UPDATE ${table} SET ${cols} WHERE ${key}=$${idx} RETURNING *`;

  let values = Object.values(items);
  values.push(id);
  return { query, values };
}

module.exports = sqlPartialUpdate;
