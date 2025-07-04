const postsData = [
  {
    title: "5 Livros de Fantasia que Você Precisa Ler em 2024",
    author: "João Leitor",
    description:
      "Explore mundos mágicos e personagens inesquecíveis com nossa seleção dos melhores livros de fantasia para este ano.",
    img: "https://plus.unsplash.com/premium_photo-1682308191763-2813d4a2e746?q=80&w=806&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Fantasia",
  },
  {
    title: "Os Fundamentos da Filosofia Estoica para o Dia a Dia",
    author: "Maria Sabedoria",
    description:
      "Descubra como os princípios estoicos podem trazer paz e resiliência à sua vida moderna.",
    img: "https://images.unsplash.com/photo-1643281478367-154f51e3a9bd?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Filosofia",
  },
  {
    title: "A Revolução Francesa: Causas, Eventos e Legado",
    author: "Pedro Historiador",
    description:
      "Uma análise profunda de um dos momentos mais marcantes da história ocidental e suas implicações duradouras.",
    img: "https://images.unsplash.com/photo-1473163928189-364b2c4e1135?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "História",
  },
  {
    title: "Como Criar um Hábito de Leitura em 3 Passos Simples",
    author: "Maria Dicas",
    description:
      "Quer ler mais, mas não sabe por onde começar? Nossas dicas práticas vão te ajudar a incorporar a leitura na sua rotina.",
    img: "https://images.unsplash.com/photo-1607473129014-0afb7ed09c3a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Geral",
  },
  {
    title: "Misticismo e Filosofia Oriental: Uma Introdução",
    author: "Lívia Espiritual",
    description:
      "Explore as ricas tradições filosóficas e espirituais do Oriente e seu impacto na consciência moderna.",
    img: "https://images.unsplash.com/photo-1710503701216-fe4555bdd022?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Filosofia",
  },
  {
    title: "As Grandes Batalhas da Idade Média: Um Olhar Detalhado",
    author: "Roberto Guerra",
    description:
      "Um mergulho nas estratégias e consequências dos confrontos que moldaram a Europa medieval.",
    img: "https://images.unsplash.com/photo-1575550596392-20d184e3d9fe?q=80&w=834&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "História",
  },
  {
    title: "Entrevista Exclusiva: O Autor por Trás do Best-seller de Fantasia",
    author: "Pedro Entrevistas",
    description:
      "Conversamos com o renomado autor sobre seu processo criativo e inspirações para sua última obra literária.",
    img: "https://plus.unsplash.com/premium_photo-1725408045441-caab8be43801?q=80&w=841&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Fantasia",
  },
  {
    title: "Guia Completo: Os Gêneros Literários Mais Populares",
    author: "Lívia Conhecimento",
    description:
      "Explore a diversidade da literatura com nosso guia que desvenda os mistérios de cada gênero e te ajuda a encontrar sua próxima leitura.",
    img: "https://images.unsplash.com/photo-1522407183863-c0bf2256188c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Geral",
  },
  {
    title: "Desvendando a Teoria do Conhecimento",
    author: "Filósofo Curioso",
    description:
      "Uma jornada pelos mistérios de como adquirimos e validamos o conhecimento, com as principais teorias ao longo da história.",
    img: "https://images.unsplash.com/photo-1618393678187-fb258b8ee191?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Filosofia",
  },
  {
    title: "Impérios Antigos: Ascensão e Queda de Civilizações",
    author: "Historiador Crítico",
    description:
      "Analise os fatores que levaram ao florescimento e subsequente declínio dos maiores impérios da antiguidade.",
    img: "https://images.unsplash.com/photo-1560774956-22bc9b682a06?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "História",
  },
];

const postsPerPage = 3;
let currentPage = 1;
let currentCategory = "Todos";

const blogPostsContainer = document.getElementById("blog-posts-container");
const blogPagination = document.getElementById("blog-pagination");
const categoryLinks = document.querySelectorAll(".category-link");

function renderPosts(page, category) {
  blogPostsContainer.innerHTML = "";
  const filteredPosts =
    category === "Todos"
      ? postsData
      : postsData.filter((post) => post.category === category);

  const start = (page - 1) * postsPerPage;
  const end = start + postsPerPage;
  const paginatedPosts = filteredPosts.slice(start, end);

  if (paginatedPosts.length === 0) {
    blogPostsContainer.innerHTML = `
            <div class="col-12 text-center py-5">
                <p class="lead text-muted">Nenhum artigo encontrado nesta categoria.</p>
            </div>
        `;
    blogPagination.innerHTML = "";
    return;
  }

  paginatedPosts.forEach((post) => {
    const postCard = `
            <div class="col">
                <div class="card h-100 shadow-sm blog-post-card">
                    <img src="${post.img}" class="card-img-top blog-card-img" alt="${post.title}">
                    <div class="card-body">
                        <h5 class="card-title text-dark">${post.title}</h5>
                        <p class="card-text text-muted small ">Por ${post.author}</p>
                        <p class="card-text text-dark">${post.description}</p>
                    </div>
                </div>
            </div>
        `;
    blogPostsContainer.innerHTML += postCard;
  });
}

function setupPagination(category) {
  blogPagination.innerHTML = "";
  const filteredPosts =
    category === "Todos"
      ? postsData
      : postsData.filter((post) => post.category === category);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  if (totalPages <= 1 && filteredPosts.length > 0) {
    return;
  }
  if (filteredPosts.length === 0) {
    return;
  }

  for (let i = 1; i <= totalPages; i++) {
    const pageItem = document.createElement("li");
    pageItem.classList.add("page-item");
    if (i === currentPage) pageItem.classList.add("active");
    pageItem.innerHTML = `<a class="page-link" href="#">${i}</a>`;
    pageItem.addEventListener("click", (e) => {
      e.preventDefault();
      currentPage = i;
      renderPosts(currentPage, currentCategory);
      setupPagination(currentCategory);
      document
        .querySelector("main.container")
        .scrollIntoView({ behavior: "smooth" });
    });
    blogPagination.appendChild(pageItem);
  }
}
categoryLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const category = e.target.textContent;

    categoryLinks.forEach((item) => item.classList.remove("active"));
    e.target.classList.add("active");

    currentCategory = category;
    currentPage = 1;
    renderPosts(currentPage, currentCategory);
    setupPagination(currentCategory);
    document
      .querySelector("main.container")
      .scrollIntoView({ behavior: "smooth" });
  });
});

// Inicializa a página com a categoria 'Todos' selecionada e seus posts
document.addEventListener("DOMContentLoaded", () => {
  const allCategoryLink = document.querySelector(
    '.category-link[data-category="Todos"]'
  );
  if (allCategoryLink) {
    allCategoryLink.classList.add("active");
  }

  renderPosts(currentPage, currentCategory);
  setupPagination(currentCategory);
});
