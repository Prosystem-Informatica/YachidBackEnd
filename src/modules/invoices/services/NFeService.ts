import {
  carregaCertificadoPath,
  emitir,
  cancelar,
  gerarPDF,
} from "node-nfe-nfce";
import { DateTime } from "luxon";
import fs from "fs";
import { AppDataSource } from "../../../config/database";
import { Enterprise } from "../../enterprise/entities/Enterprise";
import { Customer } from "../../customer/entities/Customer";
import { AppError } from "../../../shared/errors/AppError";
import { Invoice } from "../entities/envoice";
import { NFeXML } from "../entities/NFeXML";

type Endereco = {
  xLgr: string;
  nro: string;
  xBairro: string;
  cMun: string;
  xMun: string;
  UF: string;
  CEP: string;
  cPais: string;
  xPais: string;
};

export class NFeService {
  async authorize(
    invoice: Invoice,
    enterprise: Enterprise,
    customer: Customer
  ) {
    console.log(`Emitindo NF ${invoice.id} - Empresa: ${enterprise.name}`);

    if (!enterprise.cert_filename || !enterprise.cert_password) {
      throw new AppError(
        `Certificado digital ou senha não configurados para a empresa: ${enterprise.name}`,
        400
      );
    }

    if (!enterprise.csc_id || !enterprise.csc_token) {
      throw new AppError(
        `CSC (Código de Segurança do Contribuinte) não configurado para a empresa: ${enterprise.name}`,
        400
      );
    }

    const caminhoCert = `certs/${enterprise.cert_filename}`;
    const senhaCert = enterprise.cert_password;

    const certificado = await carregaCertificadoPath({
      path: caminhoCert,
      password: senhaCert,
    });

    const configuracoes = {
      empresa: {
        pem: certificado.pem,
        key: certificado.key,
        password: senhaCert,
        idCSC: enterprise.csc_id,
        CSC: enterprise.csc_token,
      },
      geral: {
        versao: "4.00",
        ambiente: Number(enterprise.environment),
        modelo: invoice.model,
      },
    };

    const empresaEndereco: Endereco =
      enterprise.address && typeof enterprise.address === "object"
        ? enterprise.address
        : {
            xLgr: "Rua Default",
            nro: "0",
            xBairro: "Centro",
            cMun: "3550308",
            xMun: "São Paulo",
            UF: "SP",
            CEP: "01000000",
            cPais: "1058",
            xPais: "Brasil",
          };

    const clienteEndereco: Endereco =
      customer.address && typeof customer.address === "object"
        ? customer.address
        : {
            xLgr: "Rua Cliente",
            nro: "0",
            xBairro: "Centro",
            cMun: "3550308",
            xMun: "São Paulo",
            UF: "SP",
            CEP: "01100001",
            cPais: "1058",
            xPais: "Brasil",
          };

    const total = Number(invoice.total);
    if (isNaN(total))
      throw new AppError(`Total da NF inválido: ${invoice.total}`, 400);

    const emit = {
      CNPJ: enterprise.cnpj_cpf,
      xNome: enterprise.name,
      enderEmit: empresaEndereco,
      IE: "392288904117",
      CRT: "1",
    };

    const dest = {
      CPF: customer.cnpj_cpf,
      xNome:
        enterprise.environment === "2"
          ? "NF-E EMITIDA EM AMBIENTE DE HOMOLOGACAO - SEM VALOR FISCAL"
          : customer.name,
      enderDest: clienteEndereco,
      indIEDest: "9",
    };

    const nfe = {
      ide: {
        cUF: "35",
        natOp: "VENDA",
        mod: invoice.model,
        serie: String(Number(invoice.serie || 1)),
        nNF: String(invoice.number),
        dhEmi: DateTime.now()
          .setZone("America/Sao_Paulo")
          .toFormat("yyyy-MM-dd'T'HH:mm:ssZZ"),
        tpNF: "1",
        idDest: "1",
        cMunFG: "3550308",
        tpImp: "1",
        tpEmis: "1",
        tpAmb: Number(enterprise.environment),
        finNFe: "1",
        indFinal: "1",
        indPres: "1",
        procEmi: "0",
        verProc: "1.0.0",
      },
      emit,
      dest,
      det_list: [
        {
          $: { nItem: "1" },
          prod: {
            cProd: "ITEM01",
            cEAN: "SEM GTIN",
            xProd:
              enterprise.environment === "2"
                ? "NF-E EMITIDA EM AMBIENTE DE HOMOLOGACAO - SEM VALOR FISCAL"
                : "Produto de venda",
            NCM: "61091000",
            CFOP: "5102",
            uCom: "UN",
            qCom: 1,
            vUnCom: Number(total.toFixed(2)),
            vProd: Number(total.toFixed(2)),
            cEANTrib: "SEM GTIN",
            uTrib: "UN",
            qTrib: 1,
            vUnTrib: Number(total.toFixed(2)),
            indTot: "1",
          },
          imposto: {
            ICMS: {
              ICMSSN102: { orig: "0", CSOSN: "102" },
            },
            PIS: { PISNT: { CST: "07" } },
            COFINS: { COFINSNT: { CST: "07" } },
          },
        },
      ],
      total: {
        ICMSTot: {
          vBC: 0.0,
          vICMS: 0.0,
          vICMSDeson: 0.0,
          vFCP: 0.0,
          vBCST: 0.0,
          vST: 0.0,
          vFCPST: 0.0,
          vFCPSTRet: 0.0,
          vProd: Number(total.toFixed(2)),
          vFrete: 0.0,
          vSeg: 0.0,
          vDesc: 0.0,
          vII: 0.0,
          vIPI: 0.0,
          vIPIDevol: 0.0,
          vPIS: 0.0,
          vCOFINS: 0.0,
          vOutro: 0.0,
          vNF: Number(total.toFixed(2)),
          vTotTrib: 0.0,
        },
      },
      transp: { modFrete: 9 },
      pag: { detPag: [{ tPag: "01", vPag: Number(total.toFixed(2)) }] },
      infAdic: {
        infCpl: `NF-e de teste emitida em ambiente de homologação - NF ${invoice.number}`,
        obsCont: [],
        obsFisco: [],
        procRef: [],
      },
    };

    console.log("📦 Objeto NFe enviado para emissão:");
    console.log(JSON.stringify(nfe, null, 2));

    let resultado: any;
    try {
      resultado = await emitir({
        documento: nfe as any,
        configuracoes: configuracoes as any,
      });

      console.log("📨 Resultado bruto da SEFAZ:", resultado);
    } catch (err: any) {
      console.error("❌ Erro detalhado na emissão da NF-e:", err);
      throw new AppError(
        `Falha na emissão da NF-e: ${err?.message || err}`,
        500
      );
    }

    const xml = resultado?.xml_completo || resultado?.xml;
    const protocolo =
      resultado?.nfeProc?.protNFe?.infProt?.nProt || resultado?.protocolo;

    if (!xml) throw new AppError("Falha ao gerar XML autorizado da NF-e", 500);

    // --- Salva XML ---
    const xmlDir = "nfe_xmls";
    if (!fs.existsSync(xmlDir)) fs.mkdirSync(xmlDir);
    const xmlPath = `${xmlDir}/nfe-${invoice.number}.xml`;
    fs.writeFileSync(xmlPath, xml);
    console.log(`✅ XML autorizado salvo em: ${xmlPath}`);

    // --- Gera DANFE ---
    try {
      const pdfDoc = await gerarPDF(xml); // retorna um PDFKit.PDFDocument
      const pdfPath = `${xmlDir}/danfe-${invoice.number}.pdf`;

      const writeStream = fs.createWriteStream(pdfPath);
      pdfDoc.pipe(writeStream);
      pdfDoc.end();

      await new Promise<void>((resolve, reject) => {
        writeStream.on("finish", () => resolve());
        writeStream.on("error", (err) => reject(err));
      });

      console.log(`🧾 DANFE gerado em: ${pdfPath}`);
    } catch (pdfErr) {
      console.warn("⚠️ Falha ao gerar DANFE PDF:", pdfErr);
    }

    // --- Salva no banco ---
    const xmlRepository = AppDataSource.getRepository(NFeXML);
    await xmlRepository.save({
      enterprise_id: enterprise.id,
      invoice_id: invoice.id,
      xml,
      protocol: protocolo || "000000000",
      issued_at: new Date(),
      configuracoes: JSON.stringify(configuracoes),
    });
    await AppDataSource.getRepository(Invoice).update(invoice.id, {
      status: "authorized",
      issued_at: new Date(),
    });

    console.log("💾 XML autorizado salvo na tabela nfe_xmls.");

    return {
      success: true,
      message: "NF autorizada com sucesso",
      protocol: protocolo,
      xml,
    };
  }

  async cancel(
    invoiceId: string,
    invoiceKey: string,
    protocol: string,
    configuracoes: any,
    justification: string
  ) {
    console.log(`🚨 Solicitando cancelamento da NF ${invoiceId}`);

    if (!invoiceKey) throw new AppError("Chave da NF-e não informada", 400);
    if (!protocol) throw new AppError("Protocolo da NF-e não informado", 400);
    if (!configuracoes)
      throw new AppError("Configurações da NF-e não fornecidas", 500);

    try {
      const cancelResult = await cancelar({
        chNFe: invoiceKey,
        nProt: protocol,
        xJust: justification,
        configuracoes,
      });

      console.log("✅ Cancelamento realizado com sucesso:", cancelResult);

      return {
        success: true,
        message: `NF ${invoiceId} cancelada com sucesso`,
        details: cancelResult,
      };
    } catch (err: any) {
      console.error("❌ Erro ao cancelar NF-e:", err);
      throw new AppError(
        `Falha ao cancelar NF ${invoiceId}: ${err?.message || err}`,
        500
      );
    }
  }
}
