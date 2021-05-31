import React from 'react';
import { Tabs, Tab, Button, Intent } from '@blueprintjs/core';
import { FormattedMessage as T, useIntl } from 'react-intl';
import moment from 'moment';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';

import FinancialStatementHeader from 'containers/FinancialStatements/FinancialStatementHeader';
import CashFlowStatementGeneralPanel from './CashFlowStatementGeneralPanel';

import withCashFlowStatement from './withCashFlowStatement';
import withCashFlowStatementActions from './withCashFlowStatementActions';

import { compose } from 'utils';

/**
 * Cash flow statement header.
 */
function CashFlowStatementHeader({
  // #ownProps
  onSubmitFilter,
  pageFilter,

  //#withCashFlowStatement
  isFilterDrawerOpen,

  //#withCashStatementActions
  toggleCashFlowStatementFilterDrawer,
}) {
  const { formatMessage } = useIntl();

  // filter form initial values.
  const initialValues = {
    ...pageFilter,
    fromDate: moment(pageFilter.fromDate).toDate(),
    toDate: moment(pageFilter.toDate).toDate(),
  };

  // Validation schema.
  const validationSchema = Yup.object().shape({
    dateRange: Yup.string().optional(),
    fromDate: Yup.date()
      .required()
      .label(formatMessage({ id: 'fromDate' })),
    toDate: Yup.date()
      .min(Yup.ref('fromDate'))
      .required()
      .label(formatMessage({ id: 'toDate' })),
    displayColumnsType: Yup.string(),
  });

  // Handle form submit.
  const handleSubmit = (values, { setSubmitting }) => {
    onSubmitFilter(values);
    toggleCashFlowStatementFilterDrawer(false);
    setSubmitting(false);
  };

  // Handle drawer close action.
  const handleDrawerClose = () => {
    toggleCashFlowStatementFilterDrawer(false);
  };

  return (
    <FinancialStatementHeader
      isOpen={isFilterDrawerOpen}
      drawerProps={{ onClose: handleDrawerClose }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Tabs animate={true} vertical={true} renderActiveTabPanelOnly={true}>
            <Tab
              id="general"
              title={<T id={'general'} />}
              panel={<CashFlowStatementGeneralPanel />}
            />
          </Tabs>

          <div class="financial-header-drawer__footer">
            <Button className={'mr1'} intent={Intent.PRIMARY} type={'submit'}>
              <T id={'calculate_report'} />
            </Button>
            <Button onClick={handleDrawerClose} minimal={true}>
              <T id={'cancel'} />
            </Button>
          </div>
        </Form>
      </Formik>
    </FinancialStatementHeader>
  );
}

export default compose(
  withCashFlowStatement(({ cashFlowStatementDrawerFilter }) => ({
    isFilterDrawerOpen: cashFlowStatementDrawerFilter,
  })),
  withCashFlowStatementActions,
)(CashFlowStatementHeader);
