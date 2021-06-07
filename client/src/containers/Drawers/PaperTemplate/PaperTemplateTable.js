import React, { useMemo } from 'react';
import { formatMessage } from 'services/intl';
import { DataTable, Money } from 'components';

export default function DrawerTemplateTable({ tableData, currencyCode }) {
  const columns = useMemo(
    () => [
      {
        Header: formatMessage({ id: 'description' }),
        accessor: 'description',
        disableSortBy: true,
        width: 150,
      },
      {
        Header: formatMessage({ id: 'rate' }),
        accessor: 'rate',
        accessor: ({ rate }) => <Money amount={rate} currency={currencyCode} />,
        disableSortBy: true,
        width: 80,
      },
      {
        Header: formatMessage({ id: 'qty' }),
        accessor: 'quantity',
        disableSortBy: true,
        width: 50,
      },
      {
        Header: formatMessage({ id: 'Total' }),
        accessor: ({ total }) => (
          <Money amount={total} currency={currencyCode} />
        ),
        disableSortBy: true,
        width: 70,
      },
    ],
    [],
  );
  return (
    <div className="template__table">
      <DataTable columns={columns} data={tableData} />
    </div>
  );
}
