import React, { Children } from 'react';
import moment from 'moment';
import classnames from 'classnames';
import LoadingIndicator from 'components/LoadingIndicator';

export default function FinancialSheet({
  companyTitle,
  sheetType,
  date,
  children,
  accountingBasis,
  name,
  loading,
  className,
}) {
  const formattedDate = moment(date).format('DD MMMM YYYY')
  const nameModifer = name ? `financial-sheet--${name}` : '';

  return (
    <div className={classnames('financial-sheet', nameModifer, className)}>
      <LoadingIndicator loading={loading}>
        <h1 class="financial-sheet__title">{ companyTitle }</h1>
        <h6 class="financial-sheet__sheet-type">{ sheetType }</h6>
        <div class="financial-sheet__date">From { formattedDate } | To { formattedDate }</div>

        <div class="financial-sheet__table">
          { children }
        </div>

        <div class="financial-sheet__accounting-basis">
          { accountingBasis }
        </div>

        <div class="financial-sheet__basis">
          Accounting Basis: Accural
        </div>
      </LoadingIndicator>
    </div>
  );
}