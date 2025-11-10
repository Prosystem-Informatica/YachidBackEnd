export class NFeService {
  async authorize(invoiceId: string) {
    console.log(`Mock autorizando NF ID: ${invoiceId}`);
    return {
      success: true,
      message: "NF autorizada com sucesso (mock)",
      protocol: "1234567890",
      xml: "<xml>Nota Fiscal simulada</xml>",
    };
  }

  async cancel(invoiceId: string, justification: string) {
    console.log(`Mock cancelando NF ID: ${invoiceId}`);
    return {
      success: true,
      message: `NF cancelada com sucesso (mock): ${justification}`,
    };
  }
}
