import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();

const BLING_API_URL = "https://bling.com.br/Api/v3/produtos";
const BLING_API_KEY = "9a58a24dde3705314f756a7f161cd9c1d70ea907"; // Replace with your actual API key

// Helper function for delay
async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Function to create the payload in the format expected by Bling
function buildBlingProductPayload(product) {
  return {
    nome: product.title || "Produto Padrão",
    codigo: product.id.toString(),
    preco: product.price || 1.0,
    tipo: "P", // Produto
    situacao: "Ativo", // Use "Ativo" instead of "A"
    unidade: "UN",
    pesoLiq: product.weight || 1,
    pesoBruto: product.grossWeight || 1,
    gtin: product.gtin || "1234567890123",
    descricao: product.shortDescription || "Descrição curta padrão",
    marca: product.brand || "Marca Padrão",
    estoqueMinimo: 0,
    estoqueMaximo: Math.max(0, product.quantity || 0), // Avoid negative values
    larguraProduto: product.width || 1,
    alturaProduto: product.height || 1,
    profundidadeProduto: product.depth || 1,
    descricaoComplementar: product.observations || "Observações padrão",
    // Add other fields as required by the API documentation
  };
}

// Function to create a product in Bling
async function createProductInBling(product) {
  const productPayload = buildBlingProductPayload(product);

  console.log(
    "Payload enviado para criação no Bling:",
    JSON.stringify(productPayload, null, 2)
  );

  try {
    const response = await axios.post(
      `${BLING_API_URL}?apikey=${BLING_API_KEY}`,
      new URLSearchParams({
        json: JSON.stringify({ produto: productPayload }),
      }),
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log(
      `Produto "${product.title}" criado no Bling. Response: ${JSON.stringify(
        response.data,
        null,
        2
      )}`
    );

    return response.data;
  } catch (error) {
    const errorData = error.response?.data || error.message;
    console.error(
      `Erro ao criar produto "${product.title}" no Bling:`,
      JSON.stringify(errorData, null, 2)
    );

    if (error.response?.status === 429) {
      console.warn("Limite de requisições atingido. Retentando...");
      await delay(1000); // Wait before retrying
      return createProductInBling(product);
    } else {
      throw error; // Re-throw the error after logging
    }
  }
}

// Update an existing product in Bling (if needed)
async function updateProductInBling(product, blingId) {
  const productPayload = buildBlingProductPayload(product);

  console.log(
    "Payload enviado para atualização no Bling:",
    JSON.stringify(productPayload, null, 2)
  );

  try {
    const response = await axios.put(
      `${BLING_API_URL}/${blingId}?apikey=${BLING_API_KEY}`,
      new URLSearchParams({
        json: JSON.stringify({ produto: productPayload }),
      }),
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log(`Produto "${product.title}" atualizado no Bling.`);
    return response.data;
  } catch (error) {
    const errorData = error.response?.data || error.message;
    console.error(
      `Erro ao atualizar produto "${product.title}" no Bling:`,
      JSON.stringify(errorData, null, 2)
    );

    if (error.response?.status === 429) {
      console.warn("Limite de requisições atingido. Retentando...");
      await delay(1000);
      return updateProductInBling(product, blingId);
    } else {
      throw error; // Re-throw the error after logging
    }
  }
}

// Fetch products from Bling (optional for future synchronization)
async function getProductsFromBling() {
  const allProducts = [];
  let page = 1;

  try {
    while (true) {
      const response = await axios.get(
        `${BLING_API_URL}s?apikey=${BLING_API_KEY}`,
        {
          headers: {
            Accept: "application/json",
          },
          params: {
            pagina: page,
            limite: 100,
          },
        }
      );

      const products = response.data?.retorno?.produtos || [];

      if (!products.length) break;

      allProducts.push(...products);
      page++;
      await delay(1000); // Avoid rate limit
    }

    return allProducts;
  } catch (error) {
    console.error(
      "Erro ao obter produtos do Bling:",
      error.response?.data || error.message
    );
    return [];
  }
}

// Main handler for synchronization
export async function GET() {
  try {
    const localProducts = await prisma.product.findMany({
      include: {
        category: true,
      },
    });

    for (const localProduct of localProducts) {
      await createProductInBling(localProduct);
      await delay(1000); // Avoid rate limit
    }

    console.log("Sincronização concluída.");
    return NextResponse.json(
      { message: "Sincronização concluída" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao sincronizar produtos:", error.message);
    return NextResponse.json(
      { error: "Erro ao sincronizar produtos" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
