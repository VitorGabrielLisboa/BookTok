import {
  searchBooksAPI,
  getBookCoverUrl,
  formatBookData,
  fetchBookDetails,
} from "./api.js";

// Elementos do DOM
const bookList = document.getElementById("book-list");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const resultsContainer = document.getElementById("resultsContainer");
const categoryFilterList = document.getElementById("categoryFilterList");

// elementos DOM-MODAL
const bookDetailsModal = new bootstrap.Modal(
  document.getElementById("bookDetailsModal")
);
const modalBookCover = document.getElementById("modalBookCover");
const modalBookTitle = document.getElementById("modalBookTitle");
const modalBookAuthor = document.getElementById("modalBookAuthor");
const modalBookSubjects = document.getElementById("modalBookSubjects");
const modalBookDescription = document.getElementById("modalBookDescription");

let currentSearchQuery = "";
let currentSubjectFilter = "";

// --- Funções de UI ---

/**
 @param {string} message 
 * @param {Array} books - 
 */
const renderBooks = (books) => {
  if (books.length === 0) {
    displayMessage(
      "Nenhum livro encontrado para sua busca. Tente um termo ou categoria diferente!"
    );
    return;
  }
  resultsContainer.innerHTML = "";
  bookList.innerHTML = books
    .map(
      (book) => `
            <div class="col-md-3 mb-4">
                <div class="card h-100 book-card-item"
                     data-id="${book.id}"  data-coverid="${book.coverId}"
                     style="cursor: pointer;">
                    <img src="${getBookCoverUrl(book.coverId)}"
                         class="card-img-top"
                         alt="${book.title}"
                         style="height: 200px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title text-truncate" style="max-width: 150px;">${
                          book.title
                        }</h5>
                        <p class="card-text text-muted">${book.author}</p>
                        <small class="text-muted">${book.year}</small>
                    </div>
                </div>
            </div>
            `
    )
    .join("");
};

// --- Função Principal de Busca ---

const performSearch = async () => {
  // Determina se a busca será por query principal ou por assunto
  const queryToSend = currentSearchQuery;
  const subjectToSend = currentSubjectFilter;

  try {
    const result = await searchBooksAPI(queryToSend, subjectToSend);
    const formattedBooks = result.docs.map(formatBookData);
    renderBooks(formattedBooks);
  } catch (error) {
    console.error("Erro ao carregar livros:", error);
    displayMessage(
      "Ocorreu um erro ao carregar os livros. Por favor, tente novamente mais tarde."
    );
  }
};

// --- Event Listeners ---

const handleMainSearch = () => {
  currentSearchQuery = searchInput.value.trim();
  currentSubjectFilter = "";

  searchInput.value = "";

  document
    .querySelectorAll("#categoryFilterList .list-group-item-action")
    .forEach((item) => {
      item.classList.remove("active");
    });
  const allBooksItem = document.querySelector(
    '#categoryFilterList [data-filter-value=""]'
  );
  if (allBooksItem) {
    allBooksItem.classList.add("active");
  }

  performSearch(); // Dispara a busca
};

searchButton.addEventListener("click", handleMainSearch);

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleMainSearch();
  }
});

/**
 * @param {Event} event .
 */
categoryFilterList.addEventListener("click", (event) => {
  const clickedItem = event.target.closest("li.list-group-item-action");
  if (!clickedItem) return;

  document
    .querySelectorAll("#categoryFilterList .list-group-item-action")
    .forEach((item) => {
      item.classList.remove("active");
    });
  clickedItem.classList.add("active");

  currentSubjectFilter = clickedItem.dataset.filterValue;
  currentSearchQuery = "";
  searchInput.value = "";

  performSearch();
});

bookList.addEventListener("click", async (event) => {
  const clickedCard = event.target.closest(".book-card-item");
  if (!clickedCard) return;

  const bookId = clickedCard.dataset.id;
  const coverId = clickedCard.dataset.coverid;

  if (!bookId) {
    console.warn("ID do livro não encontrado no card clicado.");
    return;
  }

  modalBookTitle.textContent = "Carregando...";
  modalBookAuthor.textContent = "";
  modalBookSubjects.textContent = "";
  modalBookDescription.textContent = "";
  modalBookCover.src = getBookCoverUrl(null);
  modalBookCover.alt = "Carregando capa...";

  bookDetailsModal.show(); // Exibe o modal

  try {
    const bookDetails = await fetchBookDetails(bookId);

    if (bookDetails) {
      // Preenche o modal com os dados formatados (que já vêm da api.js)
      modalBookTitle.textContent = bookDetails.title;
      modalBookAuthor.textContent = bookDetails.author_name
        ? bookDetails.author_name.join(", ")
        : "Autor Desconhecido";

      if (bookDetails.subjects && bookDetails.subjects.length > 0) {
        modalBookSubjects.textContent = bookDetails.subjects
          .slice(0, 5)
          .join(", ");
      } else {
        modalBookSubjects.textContent = "Não disponível";
      }

      modalBookDescription.textContent = bookDetails.description;

      // Usa o coverId do card, ou o cover_i dos detalhes se o primeiro não estiver disponível
      modalBookCover.src = getBookCoverUrl(coverId || bookDetails.cover_i);
      modalBookCover.alt = bookDetails.title;
    } else {
      modalBookTitle.textContent = "Detalhes não encontrados.";
      modalBookDescription.textContent =
        "Não foi possível carregar os detalhes deste livro.";
      modalBookSubjects.textContent = "";
      modalBookCover.src = getBookCoverUrl(null);
    }
  } catch (error) {
    console.error("Erro ao carregar detalhes do livro no modal:", error);
    modalBookTitle.textContent = "Erro!";
    modalBookDescription.textContent =
      "Não foi possível carregar os detalhes. Tente novamente.";
    modalBookSubjects.textContent = "";
    modalBookCover.src = getBookCoverUrl(null);
  }
});

window.addEventListener("DOMContentLoaded", () => {
  document
    .querySelectorAll("#categoryFilterList .list-group-item-action")
    .forEach((item) => {
      item.classList.remove("active");
    });

  const brazilianLiteratureItem = document.querySelector(
    '#categoryFilterList [data-filter-value="brazilian+literature"]'
  );
  if (brazilianLiteratureItem) {
    brazilianLiteratureItem.classList.add("active");
  }

  currentSubjectFilter = "brazilian+literature";
  currentSearchQuery = "";

  performSearch();
});

// --- Efeito de navbar ao rolar
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
