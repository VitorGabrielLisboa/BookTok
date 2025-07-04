const API_BASE_URL = "https://openlibrary.org";

/**
 * Função para buscar livros por termo de busca principal OU por assunto/gênero.
 * @param {string} query
 * @param {string} subject
 * @returns {Promise<Object>}
 */
export const searchBooksAPI = async (query = "", subject = "") => {
  try {
    const params = [];
    let url = `${API_BASE_URL}/search.json?`;
    if (query) {
      params.push(`title=${encodeURIComponent(query)}`);
    } else if (subject) {
      params.push(`subject=${encodeURIComponent(subject)}`);
    } else {
      console.warn(
        "searchBooksAPI: Nenhum termo de busca ou assunto fornecido. Retornando vazio."
      );
      return { docs: [] };
    }

    url += params.join("&");

    console.log("Fazendo requisição para:", url); // depuraçao

    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Erro na requisição (Status: ${response.status}): ${response.statusText} - ${errorText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
    return { docs: [] }; // Retorna array vazio em caso de erro
  }
};

/**
 * Função para obter a URL da capa do livro.
 * @param {string|number} coverId - O ID da capa.
 * @param {string} size - Tamanho da imagem ('S', 'M', 'L').
 * @returns {string} - URL completa da capa.
 */
export const getBookCoverUrl = (coverId, size = "M") => {
  return coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`
    : "https://via.placeholder.com/150x200?text=Sem+Capa";
};

/**
 * Função para formatar os dados do livro recebidos da API.
 * @param {Object} book
 * @returns {Object}
 */
export const formatBookData = (book) => ({
  id: book.key.replace("/works/", ""),
  title: book.title || "Título Desconhecido",
  author: book.author_name?.[0] || "Autor desconhecido",
  year: book.first_publish_year || "Ano desconhecido",
  coverId: book.cover_i,
});

export const fetchBookDetails = async (bookId) => {
  // Mudamos o nome do parâmetro para 'bookId' para clareza
  try {
    // Constrói a URL usando o 'bookId' diretamente
    const response = await fetch(`${API_BASE_URL}/works/${bookId}.json`);

    if (!response.ok) {
      throw new Error(
        `Erro ao buscar detalhes da obra ${bookId}. Status: ${response.status} - ${response.statusText}`
      );
    }

    const data = await response.json();

    // --- Tratamento e formatação dos dados para o modal ---
    let descriptionText = "Descrição não disponível.";
    if (data.description) {
      if (typeof data.description === "string") {
        descriptionText = data.description;
      } else if (data.description.value) {
        descriptionText = data.description.value;
      }
    } else if (data.excerpts && data.excerpts.length > 0) {
      descriptionText = data.excerpts[0].text;
    }

    // Tenta extrair o nome do autor do formato complexo de /works/
    let authorName = "Autor desconhecido";

    // Se a busca inicial já trouxer o nome do autor, use ele.
    // Se não, tente buscar o nome do autor do endpoint /authors/.
    // data.authors[0].author.key é o caminho para o ID do autor na resposta /works/{id}.json
    if (
      data.authors &&
      data.authors.length > 0 &&
      data.authors[0].author &&
      data.authors[0].author.key
    ) {
      const authorKey = data.authors[0].author.key;
      const authorId = authorKey.replace("/authors/", ""); // Remove o '/authors/'

      if (authorId) {
        try {
          const authorResponse = await fetch(
            `${API_BASE_URL}/authors/${authorId}.json`
          );
          if (authorResponse.ok) {
            const authorData = await authorResponse.json();
            authorName = authorData.name || authorName; // Pega o nome do autor, ou mantém "Autor desconhecido"
          } else {
            console.warn(
              `Não foi possível buscar o nome do autor ${authorId}. Status: ${authorResponse.status}`
            );
          }
        } catch (authorError) {
          console.error(
            `Erro ao buscar nome do autor ${authorId}:`,
            authorError
          );
        }
      }
    }

    // Retorna um objeto com os dados formatados, prontos para preencher o modal
    return {
      title: data.title || "Título Desconhecido",
      author_name: [authorName], // Retorna como array para consistência no main.js
      description: descriptionText,
      subjects: data.subjects || [], // Garante que seja um array (mesmo que vazio)
      cover_i: data.covers && data.covers.length > 0 ? data.covers[0] : null, // Pega o primeiro ID de capa
    };
  } catch (error) {
    console.error(`Erro no fetchBookDetails para ID ${bookId}:`, error);
    return null;
  }
};
