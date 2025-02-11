import { Inject, Service } from 'typedi';
import { CommonMailOptions } from '@/interfaces';
import HasTenancyService from '@/services/Tenancy/TenancyService';
import { MailTenancy } from '@/services/MailTenancy/MailTenancy';
import { formatSmsMessage } from '@/utils';
import { Tenant } from '@/system/models';
import { castArray } from 'lodash';

@Service()
export class ContactMailNotification {
  @Inject()
  private mailTenancy: MailTenancy;

  @Inject()
  private tenancy: HasTenancyService;

  /**
   * Gets the default mail address of the given contact.
   * @param {number} tenantId - Tenant id.
   * @param {number} invoiceId - Contact id.
   * @returns {Promise<Pick<CommonMailOptions, 'to' | 'from'>>}
   */
  public async getDefaultMailOptions(
    tenantId: number,
    customerId: number
  ): Promise<Pick<CommonMailOptions, 'to' | 'from'>> {
    const { Customer } = this.tenancy.models(tenantId);
    const customer = await Customer.query()
      .findById(customerId)
      .throwIfNotFound();

    const toAddresses = customer.contactAddresses;
    const fromAddresses = await this.mailTenancy.senders(tenantId);

    const toAddress = toAddresses.find((a) => a.primary);
    const fromAddress = fromAddresses.find((a) => a.primary);

    const to = toAddress?.mail ? castArray(toAddress?.mail) : [];
    const from = fromAddress?.mail ? castArray(fromAddress?.mail) : [];

    return { to, from };
  }

  /**
   * Retrieves the mail options of the given contact.
   * @param {number} tenantId - Tenant id.
   * @returns {Promise<CommonMailOptions>}
   */
  public async parseMailOptions(
    tenantId: number,
    mailOptions: CommonMailOptions,
    formatterArgs?: Record<string, any>
  ): Promise<CommonMailOptions> {
    const commonFormatArgs = await this.getCommonFormatArgs(tenantId);
    const formatArgs = {
      ...commonFormatArgs,
      ...formatterArgs,
    };
    const subjectFormatted = formatSmsMessage(mailOptions?.subject, formatArgs);
    const messageFormatted = formatSmsMessage(mailOptions?.message, formatArgs);

    return {
      ...mailOptions,
      subject: subjectFormatted,
      message: messageFormatted,
    };
  }

  /**
   * Retrieves the common format args.
   * @param {number} tenantId
   * @returns {Promise<Record<string, string>>}
   */
  public async getCommonFormatArgs(
    tenantId: number
  ): Promise<Record<string, string>> {
    const organization = await Tenant.query()
      .findById(tenantId)
      .withGraphFetched('metadata');

    return {
      ['Company Name']: organization.metadata.name,
    };
  }
}
