export interface EmailMessage {
  to: string;
  subject: string;
  body: string;
}

export const emailService = {
  send(_message: EmailMessage) {
    return {
      provider: "ses",
      status: "stubbed"
    } as const;
  }
};
