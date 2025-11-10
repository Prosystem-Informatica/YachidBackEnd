import NFeWizard from "nfewizard-io";
import * as fs from "fs";
import * as path from "path";

export class EmitInvoiceUseCase {
  async execute() {
    // Caminho do certificado
    const certPath = path.resolve(
      __dirname,
      "../../../../../certs/certificado2024.pfx"
    );

    if (!fs.existsSync(certPath)) {
      throw new Error(`❌ Certificado não encontrado em: ${certPath}`);
    }

    const cert = fs.readFileSync(certPath);

    // Instancia o NFeWizard
    const wizard = new NFeWizard();

    // Carrega o ambiente e certificado
    await wizard.NFE_LoadEnvironment({
      config: {
        cnpjEmitente: "12345678000199",
        pfx: cert.toString("base64"), // 🔹 normalmente é base64
        password: "12345678",
        ambiente: "homologacao",
        uf: "SP",
        versao: "4.00",
      },
    });

    // Monta os dados da NFe
    const nfeData = {
      ide: {
        cUF: 35,
        natOp: "VENDA DE MERCADORIA",
        mod: "55",
        serie: "1",
        nNF: "1",
        dhEmi: new Date().toISOString(),
        tpNF: "1",
        idDest: "1",
        cMunFG: "3550308",
        tpImp: "1",
        tpEmis: "1",
        tpAmb: "2",
        finNFe: "1",
        indFinal: "1",
        indPres: "1",
        procEmi: "0",
        verProc: "1.0.0",
      },
      emit: {
        CNPJ: "12345678000199",
        xNome: "Yachid Tecnologia LTDA",
        xFant: "Yachid",
        IE: "123456789",
        CRT: "3",
        enderEmit: {
          xLgr: "Rua Exemplo",
          nro: "100",
          xBairro: "Centro",
          cMun: "3550308",
          xMun: "São Paulo",
          UF: "SP",
          CEP: "01000000",
          cPais: "1058",
          xPais: "BRASIL",
        },
      },
      dest: {
        CPF: "12345678909",
        xNome: "Cliente de Teste",
        indIEDest: "9",
        enderDest: {
          xLgr: "Rua do Cliente",
          nro: "50",
          xBairro: "Centro",
          cMun: "3550308",
          xMun: "São Paulo",
          UF: "SP",
          CEP: "01000000",
          cPais: "1058",
          xPais: "BRASIL",
        },
      },
      det: [
        {
          prod: {
            cProd: "M001",
            xProd: "Mouse USB",
            NCM: "84716053",
            CFOP: "5102",
            uCom: "UN",
            qCom: "1.0000",
            vUnCom: "1.00",
            vProd: "1.00",
          },
          imposto: {
            ICMS: { orig: "0", CSOSN: "102" },
            PIS: { CST: "07", vBC: "0.00", pPIS: "0.00", vPIS: "0.00" },
            COFINS: {
              CST: "07",
              vBC: "0.00",
              pCOFINS: "0.00",
              vCOFINS: "0.00",
            },
          },
        },
      ],
      total: {
        ICMSTot: {
          vBC: "0.00",
          vICMS: "0.00",
          vProd: "1.00",
          vNF: "1.00",
        },
      },
    };

    // Autorização da NFe
    console.log("🚀 Enviando NFe para autorização...");
    const result = await wizard.NFE_Autorizacao(nfeData);

    console.log("✅ Resultado da SEFAZ:", result);
  }
}

// Execução direta
(async () => {
  const useCase = new EmitInvoiceUseCase();
  await useCase.execute();
})();
