import {
  Html,
  Button,
  Head,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Preview,
  Tailwind,
  Row,
  Column,
  render,
} from '@react-email/components';
import { CSSProperties } from 'react';

export interface InvoicePaymentEmailProps {
  preview: string;

  // # Company
  companyName?: string;
  companyLogoUri?: string;

  // # Colors
  primaryColor?: string;

  // # Invoice amount
  invoiceAmount: string;

  // # Invoice message
  invoiceMessage: string;

  // # Invoice total
  total: string;
  totalLabel?: string;

  // # Invoice due amount
  dueAmount: string;
  dueAmountLabel?: string;

  // # Due date
  dueDate: string;
  dueDateLabel?: string;

  // # Invoice number
  invoiceNumberLabel?: string;
  invoiceNumber: string;

  // # View invoice button
  viewInvoiceButtonLabel?: string;
  viewInvoiceButtonUrl: string;

  // # Items
  items: Array<{ label: string; quantity: string; rate: string }>;
}

export const InvoicePaymentEmail: React.FC<
  Readonly<InvoicePaymentEmailProps>
> = ({
  preview,

  // # Company
  companyName,
  companyLogoUri,

  // # Colors
  primaryColor = 'rgb(0, 82, 204)',

  // # Invoice amount
  invoiceAmount,

  // # Invoice message
  invoiceMessage,

  // # Due date
  dueDate,
  dueDateLabel = 'Due {dueDate}',

  // # Invoice number
  invoiceNumber,
  invoiceNumberLabel = 'Invoice # {invoiceNumber}',

  // # invoice total
  total,
  totalLabel = 'Total',

  // # Invoice due amount
  dueAmountLabel = 'Due Amount',
  dueAmount,

  // # View invoice button
  viewInvoiceButtonLabel = 'View Invoice',
  viewInvoiceButtonUrl,

  items,
}) => {
  return (
    <Html lang="en">
      <Head />
      <Preview>{preview}</Preview>

      <Tailwind>
        <Body style={bodyStyle}>
          <Container style={containerStyle}>
            <Section style={mainSectionStyle}>
              {companyLogoUri && (
                <Section style={logoSectionStyle}>
                  <div
                    style={{
                      ...companyLogoStyle,
                      backgroundImage: `url("${companyLogoUri}")`,
                    }}
                  >
                    Image
                  </div>
                </Section>
              )}

              <Section style={headerInfoStyle}>
                <Row>
                  <Heading style={invoiceCompanyNameStyle}>
                    {companyName}
                  </Heading>
                </Row>
                <Row>
                  <Text style={invoiceAmountStyle}>{invoiceAmount}</Text>
                </Row>
                <Row>
                  <Text style={invoiceNumberStyle}>
                    {invoiceNumberLabel?.replace(
                      '{invoiceNumber}',
                      invoiceNumber
                    )}
                  </Text>
                </Row>
                <Row>
                  <Text style={invoiceDateStyle}>
                    {dueDateLabel.replace('{dueDate}', dueDate)}
                  </Text>
                </Row>
              </Section>

              <Text style={invoiceMessageStyle}>{invoiceMessage}</Text>
              <Button
                href={viewInvoiceButtonUrl}
                style={{
                  ...viewInvoiceButtonStyle,
                  backgroundColor: primaryColor,
                }}
              >
                {viewInvoiceButtonLabel}
              </Button>

              <Section style={totalsSectionStyle}>
                {items.map((item, index) => (
                  <Row key={index} style={itemLineRowStyle}>
                    <Column width={'50%'}>
                      <Text style={listItemLabelStyle}>{item.label}</Text>
                    </Column>

                    <Column width={'50%'}>
                      <Text style={listItemAmountStyle}>
                        {item.quantity} x {item.rate}
                      </Text>
                    </Column>
                  </Row>
                ))}

                <Row style={dueAmounLineRowStyle}>
                  <Column width={'50%'}>
                    <Text style={dueAmountLineItemLabelStyle}>
                      {dueAmountLabel}
                    </Text>
                  </Column>

                  <Column width={'50%'}>
                    <Text style={dueAmountLineItemAmountStyle}>
                      {dueAmount}
                    </Text>
                  </Column>
                </Row>

                <Row style={totalLineRowStyle}>
                  <Column width={'50%'}>
                    <Text style={totalLineItemLabelStyle}>{totalLabel}</Text>
                  </Column>

                  <Column width={'50%'}>
                    <Text style={totalLineItemAmountStyle}>{total}</Text>
                  </Column>
                </Row>
              </Section>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const renderInvoicePaymentEmail = (props: InvoicePaymentEmailProps) => {
  return render(<InvoicePaymentEmail {...props} />);
};

const bodyStyle: CSSProperties = {
  backgroundColor: '#F5F5F5',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',

  padding: '40px 0',
};

const containerStyle: CSSProperties = {
  backgroundColor: '#fff',
  width: '100%',
  maxWidth: '500px',
  padding: '35px 25px',
  color: '#000',
  borderRadius: '5px',
};

const headerInfoStyle: CSSProperties = {
  textAlign: 'center',
  marginBottom: 20,
};
const mainSectionStyle: CSSProperties = {};

const invoiceAmountStyle: CSSProperties = {
  margin: 0,
  color: '#383E47',
  fontWeight: 500,
};
const invoiceNumberStyle: CSSProperties = {
  margin: 0,
  fontSize: '13px',
  color: '#404854',
};
const invoiceDateStyle: CSSProperties = {
  margin: 0,
  fontSize: '13px',
  color: '#404854',
};

const invoiceCompanyNameStyle: CSSProperties = {
  margin: 0,
  fontSize: '18px',
  fontWeight: 500,
  color: '#404854',
};

const viewInvoiceButtonStyle: CSSProperties = {
  display: 'block',
  cursor: 'pointer',
  textAlign: 'center',
  fontSize: 16,
  padding: '10px 15px',
  lineHeight: '1',
  backgroundColor: 'rgb(0, 82, 204)',
  color: '#fff',
  borderRadius: '5px',
};

const listItemLabelStyle: CSSProperties = {
  margin: 0,
};

const listItemAmountStyle: CSSProperties = {
  margin: 0,
  textAlign: 'right',
};

const invoiceMessageStyle: CSSProperties = {
  whiteSpace: 'pre-line',
  color: '#252A31',
  margin: '0 0 20px 0',
};

const dueAmounLineRowStyle: CSSProperties = {
  borderBottom: '1px solid #000',
  height: 40,
};

const totalLineRowStyle: CSSProperties = {
  borderBottom: '1px solid #000',
  height: 40,
};

const totalLineItemLabelStyle: CSSProperties = {
  ...listItemLabelStyle,
  fontWeight: 500,
};

const totalLineItemAmountStyle: CSSProperties = {
  ...listItemAmountStyle,
  fontWeight: 600,
};

const dueAmountLineItemLabelStyle: CSSProperties = {
  ...listItemLabelStyle,
  fontWeight: 500,
};

const dueAmountLineItemAmountStyle: CSSProperties = {
  ...listItemAmountStyle,
  fontWeight: 600,
};

const itemLineRowStyle: CSSProperties = {
  borderBottom: '1px solid #D9D9D9',
  height: 40,
};

const totalsSectionStyle = {
  marginTop: '20px',
  borderTop: '1px solid #D9D9D9',
};

const logoSectionStyle = {
  marginBottom: '15px',
};

const companyLogoStyle = {
  height: 90,
  width: 90,
  borderRadius: '3px',
  marginLeft: 'auto',
  marginRight: 'auto',
  textIndent: '-999999px',
  overflow: 'hidden',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  backgroundSize: 'contain',
};
