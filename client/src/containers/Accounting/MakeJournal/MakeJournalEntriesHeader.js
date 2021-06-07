import React from 'react';
import classNames from 'classnames';
import { useFormikContext } from 'formik';
import { CLASSES } from 'common/classes';
import { FormattedMessage as T } from 'react-intl';
import MakeJournalEntriesHeaderFields from './MakeJournalEntriesHeaderFields';
import { PageFormBigNumber } from 'components';
import { safeSumBy } from 'utils';

export default function MakeJournalEntriesHeader() {
  const {
    values: { entries, currency_code },
  } = useFormikContext();
  const totalCredit = safeSumBy(entries, 'credit');
  const totalDebit = safeSumBy(entries, 'debit');

  const total = Math.max(totalCredit, totalDebit);

  return (
    <div className={classNames(CLASSES.PAGE_FORM_HEADER)}>
      <MakeJournalEntriesHeaderFields />

      <PageFormBigNumber
        label={<T id={'due_amount'} />}
        amount={total}
        currencyCode={currency_code}
      />
    </div>
  );
}
