import PageLayout from "./PageLayout";
import SearchForm from "../component/SearchForm";
import ProductList from "../component/ProductList";
import { getProducts, getCategories } from "../api/productApi";

class State {
  constructor(initState) {
    this.state = initState;
  }
  set(newState, render) {
    this.state = newState;
    render();
  }
  get() {
    return this.state;
  }
}

const HomePage = async (render) => {
  const isLoading = new State(true);
  const products = new State([]);

  const categories = new State({});
  const isCategoryLoading = new State(true);

  const category1 = new State("");
  const category2 = new State("");

  const limit = new State("20");
  const sort = new State("price_asc");

  const search = new State("");

  function pageRender() {
    render(
      PageLayout({
        children: () => /*HTML*/ `
         <!-- 검색 및 필터 -->
        ${SearchForm({ isLoading: isCategoryLoading.get(), limit: limit.get(), sort: sort.get(), search: search.get(), categories: categories.get(), category1: category1.get(), category2: category2.get() })}
         <!-- 상품 목록 -->
        ${ProductList({ isLoading: isLoading.get(), products: products.get() })}
       `,
      }),
    );
  }

  pageRender();

  // 상품목록 가져오기
  const getProductsData = async () => {
    isLoading.set(true, pageRender);
    const productData = await getProducts({
      limit: limit.get(),
      sort: sort.get(),
      search: search.get(),
      category1: category1.get(),
      category2: category2.get(),
    });
    products.set(productData.products, pageRender);
    isLoading.set(false, pageRender);
  };

  // 카테고리목록 가져오기
  const getCategoriesData = async () => {
    isCategoryLoading.set(true, pageRender);
    const categoryData = await getCategories();
    categories.set(categoryData, pageRender);
    isCategoryLoading.set(false, pageRender);
  };

  await getProductsData();
  await getCategoriesData();

  document.addEventListener("change", (e) => {
    // 상품수
    if (e.target.id === "limit-select") {
      const value = e.target.value;

      limit.set(value, pageRender);
      getProductsData();
    }

    // 정렬
    if (e.target.id === "sort-select") {
      const value = e.target.value;

      sort.set(value, pageRender);
      getProductsData();
    }
  });

  // 검색
  addEventListener("keydown", (e) => {
    if (e.target.id === "search-input" && e.key === "Enter") {
      const value = e.target.value;
      search.set(value, pageRender);
      getProductsData();
    }
  });

  document.addEventListener("click", (e) => {
    if (e.target.dataset.category1) {
      const value = e.target.dataset.category1;
      category1.set(value, pageRender);
      getProductsData();
    }

    if (e.target.dataset.category2) {
      const value = e.target.dataset.category2;
      category2.set(value, pageRender);
      getProductsData();
    }

    if (e.target.dataset) {
      switch (e.target.dataset.breadcrumb) {
        case "reset":
          category1.set("", pageRender);
          category2.set("", pageRender);
          getProductsData();
          break;
        case "category1":
          category2.set("", pageRender);
          getProductsData();
          break;
      }
    }
  });
};

export default HomePage;
