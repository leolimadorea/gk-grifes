import { getAllCategories } from "@/app/db/categories/GetAllCategories";

export async function GET(req) {
  try {
    const categories = await getAllCategories();
    return new Response(JSON.stringify(categories), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Erro na API ao buscar categorias:", error);
    return new Response(
      JSON.stringify({
        message: "Erro ao buscar categorias",
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
