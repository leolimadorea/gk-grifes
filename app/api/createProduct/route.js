import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const accessToken = "8770429d18a79e9954cfc9a01261cb0af6a71b45"; // Substitua pelo seu token de acesso do Bling

export async function POST(req, res) {
  try {
    // Busca todos os produtos do banco de dados
    const products = await prisma.product.findMany({
      include: { category: true },
    });

    const results = [];

    // Função para atraso entre requisições (evitar limite de requisições)
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    for (const product of products) {
      try {
        // Dados para criar o produto no Bling
        const productData = {
          nome: product.title,
          codigo: `${product.id}`, // Código único do produto
          preco: product.price,
          tipo: "P", // Produto
          situacao: product.status === "IN_STOCK" ? "A" : "I", // Ativo ou Inativo
          unidade: "UN", // Unidade
          formato: "S", // Produto Simples
          descricaoCurta: product.description,
          estoque: {
            minimo: 1,
            maximo: product.quantity, // Quantidade máxima
          },
          actionEstoque: "A", // Define a quantidade atual no estoque
          quantidade: product.quantity, // Quantidade atual no estoque
          categoria: {
            id: product.categoryId, // Categoria do produto
          },
        };

        // Criação do produto no Bling
        const productResponse = await fetch(
          "https://api.bling.com.br/Api/v3/produtos",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(productData),
          }
        );

        const productResult = await productResponse.json();

        if (!productResponse.ok) {
          console.error(
            `Erro ao criar produto ${product.title}:`,
            productResult.error
          );
          results.push({
            product: product.title,
            error: productResult.error,
          });
          continue;
        }

        console.log(`Produto ${product.title} criado com sucesso no Bling!`);

        const blingProductId = productResult.data.id;

        await sleep(500);

        const stockData = {
          produto: {
            id: blingProductId,
          },
          deposito: {
            id: 14887786493,
          },
          operacao: "E",
          preco: product.price,
          custo: product.price,
          quantidade: product.quantity,
          observacoes: "Registro automático de estoque",
        };

        // Criação do registro de estoque no Bling
        const stockResponse = await fetch(
          "https://api.bling.com.br/Api/v3/estoques",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(stockData),
          }
        );

        const stockResult = await stockResponse.json();

        if (!stockResponse.ok) {
          console.error(
            `Erro ao criar estoque para o produto ${product.title}:`,
            stockResult.error
          );
          results.push({
            product: product.title,
            stockError: stockResult.error,
          });
        } else {
          console.log(
            `Estoque criado com sucesso para o produto ${product.title}!`
          );
          results.push({ product: product.title, stockSuccess: true });
        }

        // Aguarda 500ms entre requisições para evitar limite da API
        await sleep(500);
      } catch (err) {
        console.error(`Erro ao processar o produto ${product.title}:`, err);
        results.push({ product: product.title, error: err.message });
      }
    }

    // Retorna os resultados
    return new Response(JSON.stringify(results), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erro ao sincronizar produtos:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  } finally {
    await prisma.$disconnect();
  }
}
